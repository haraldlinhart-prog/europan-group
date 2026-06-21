import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  const body = await req.text()
  let event: any
  try { event = JSON.parse(body) } catch { return NextResponse.json({ error: 'Invalid' }, { status: 400 }) }
  if (event.type === 'checkout.session.completed') {
    const s = event.data.object
    const email = s.metadata?.noble_email
    const ep = parseFloat(s.metadata?.ep_amount || '0')
    if (email && ep > 0 && process.env.NOBLE_API_KEY) {
      await fetch(`${process.env.NOBLE_API_URL||'https://noble-limited.com'}/api/v1/credit`, { method:'POST', headers:{'Authorization':`Bearer ${process.env.NOBLE_API_KEY}`,'Content-Type':'application/json'}, body:JSON.stringify({ email, coin_id:'europan', amount:ep, type:'credit', description:`EUROPAN purchase via Stripe — ${s.id}`, reference:s.id }) }).catch(()=>{})
    }
  }
  return NextResponse.json({ received: true })
}
