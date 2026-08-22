import { NextRequest, NextResponse } from 'next/server'

const SUPPORTED = ['EUR', 'GBP', 'USD', 'CHF']
const DEFAULT_MARGIN_PCT = 0.03

// Haertung 22.08.26: siehe shop-pan21/app/api/checkout/route.ts fuer den
// Hintergrund (bestaetigter Card-Testing-Bot-Angriff, 21.-22.08.26).
// Bei diesem Endpoint besonders wichtig, da Betraege bis 100.000 EUR
// zulaessig sind.
async function isRateLimited(ip: string): Promise<boolean> {
  try {
    const res = await fetch(`${process.env.NOBLE_API_URL}/rate-limit-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NOBLE_API_KEY}`,
      },
      body: JSON.stringify({
        bucket_key: `europangroup-checkout:${ip}`,
        max_count: 5,
        window_seconds: 3600,
      }),
      signal: AbortSignal.timeout(2500),
    })
    if (!res.ok) return false
    const data = await res.json()
    return data.allowed === false
  } catch (e) {
    console.error('Rate-limit check failed (fail-open):', e)
    return false
  }
}

async function getAppliedRate(currency: string): Promise<number> {
  if (currency === 'EUR') return 1
  const marginPct = parseFloat(process.env.FX_MARGIN_PCT || '') || DEFAULT_MARGIN_PCT
  const r = await fetch(`https://api.frankfurter.dev/v1/latest?from=${currency}&to=EUR`)
  if (!r.ok) throw new Error('FX provider error')
  const data = await r.json()
  const marketRate = Number(data?.rates?.EUR)
  if (!marketRate || marketRate <= 0) throw new Error('Invalid rate')
  return Math.round(marketRate * (1 - marginPct) * 10000) / 10000
}

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
    if (await isRateLimited(ip)) {
      return NextResponse.json({ error: 'Zu viele Anfragen. Bitte später erneut versuchen.' }, { status: 429 })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://europan.group'
    const siteHost = new URL(siteUrl).host
    const rawOrigin = req.headers.get('origin') || req.headers.get('referer') || ''
    let requestHost = ''
    try {
      requestHost = rawOrigin ? new URL(rawOrigin).host : ''
    } catch {
      requestHost = ''
    }
    if (requestHost !== siteHost) {
      return NextResponse.json({ error: 'Ungültige Anfrage-Herkunft.' }, { status: 403 })
    }

    const { amount, email, currency: rawCurrency, affiliate_ref } = await req.json()
    const currency = (rawCurrency || 'EUR').toUpperCase()

    if (!amount || !email || amount < 1 || amount > 100000) return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Ungültige E-Mail-Adresse.' }, { status: 400 })
    }
    if (!SUPPORTED.includes(currency)) return NextResponse.json({ error: 'Unsupported currency' }, { status: 400 })

    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) return NextResponse.json({ error: 'Not configured' }, { status: 500 })

    // Rate is always computed server-side — never trust a client-supplied EP amount.
    const appliedRate = await getAppliedRate(currency)
    const epAmount = (parseFloat(amount) * appliedRate).toFixed(2)

    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${stripeKey}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        'payment_method_types[]': 'card',
        'line_items[0][price_data][currency]': currency.toLowerCase(),
        'line_items[0][price_data][unit_amount]': String(Math.round(amount * 100)),
        'line_items[0][price_data][product_data][name]': `EUROPAN (EP) — ${epAmount} EP`,
        'line_items[0][quantity]': '1',
        'mode': 'payment',
        'customer_email': email,
        'success_url': `${siteUrl}/buy/success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(email)}&ep=${epAmount}`,
        'cancel_url': `${siteUrl}/buy`,
        'metadata[noble_email]': email,
        'metadata[ep_amount]': epAmount,
        'metadata[paid_currency]': currency,
        'metadata[paid_amount]': String(amount),
        'metadata[applied_rate]': String(appliedRate),
        'metadata[affiliate_ref]': typeof affiliate_ref === 'string' ? affiliate_ref.trim() : '',
      }),
    })
    const session = await res.json()
    if (!res.ok) return NextResponse.json({ error: session.error?.message }, { status: 500 })
    return NextResponse.json({ url: session.url, ep_amount: epAmount, applied_rate: appliedRate })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
