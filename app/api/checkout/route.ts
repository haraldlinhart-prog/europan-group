import { NextRequest, NextResponse } from 'next/server'

const SUPPORTED = ['EUR', 'GBP', 'USD', 'CHF']
const DEFAULT_MARGIN_PCT = 0.03

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
    const { amount, email, currency: rawCurrency, affiliate_ref } = await req.json()
    const currency = (rawCurrency || 'EUR').toUpperCase()

    if (!amount || !email || amount < 1 || amount > 100000) return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    if (!SUPPORTED.includes(currency)) return NextResponse.json({ error: 'Unsupported currency' }, { status: 400 })

    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) return NextResponse.json({ error: 'Not configured' }, { status: 500 })

    // Rate is always computed server-side — never trust a client-supplied EP amount.
    const appliedRate = await getAppliedRate(currency)
    const epAmount = (parseFloat(amount) * appliedRate).toFixed(2)

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://europan.group'
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
