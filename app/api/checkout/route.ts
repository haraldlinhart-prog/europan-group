import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  try {
    const { amount, email } = await req.json()
    if (!amount || !email || amount < 1 || amount > 1000) return NextResponse.json({ error: 'Invalid amount' }, { status: 400 })
    const stripeKey = process.env.STRIPE_SECRET_KEY
    if (!stripeKey) return NextResponse.json({ error: 'Not configured' }, { status: 500 })
    const epAmount = parseFloat(amount).toFixed(2)
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://europan.group'
    const res = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${stripeKey}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'payment_method_types[]':'card', 'line_items[0][price_data][currency]':'eur', 'line_items[0][price_data][unit_amount]':String(Math.round(amount*100)), 'line_items[0][price_data][product_data][name]':`EUROPAN (EP) — ${epAmount} EP`, 'line_items[0][quantity]':'1', 'mode':'payment', 'customer_email':email, 'success_url':`${siteUrl}/buy/success?session_id={CHECKOUT_SESSION_ID}&email=${encodeURIComponent(email)}&ep=${epAmount}`, 'cancel_url':`${siteUrl}/buy`, 'metadata[noble_email]':email, 'metadata[ep_amount]':epAmount }),
    })
    const session = await res.json()
    if (!res.ok) return NextResponse.json({ error: session.error?.message }, { status: 500 })
    return NextResponse.json({ url: session.url })
  } catch { return NextResponse.json({ error: 'Internal error' }, { status: 500 }) }
}
