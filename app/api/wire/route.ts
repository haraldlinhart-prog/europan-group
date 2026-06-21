import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  try {
    const { name, email, amount, epAmount } = await req.json()
    if (!name || !email || !amount) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) return NextResponse.json({ success: true })
    const bank = { Beneficiary:'NOBLE PRIVATE CAPITAL LIMITED', Bank:'Citibank, N.A., Hong Kong Branch', SWIFT:'CITIHKHX', Account:'390206957', Currency:'EUR', Reference:`EP Purchase — ${email}` }
    const rows = Object.entries(bank).map(([k,v])=>`<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #E8F0E8;font-size:0.85rem;"><span style="color:#5A6B5D;">${k}</span><strong>${v}</strong></div>`).join('')
    const html = `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 32px;background:#F5F7F5;"><div style="background:#1B6B3A;padding:20px 28px;margin-bottom:24px;border-radius:4px;"><div style="color:#fff;font-size:1.1rem;font-weight:700;">EUROPAN — Wire Transfer Instructions</div></div><p style="color:#5A6B5D;line-height:1.8;margin-bottom:20px;">Dear ${name},<br>Please transfer <strong>€${parseFloat(amount).toFixed(2)}</strong> to receive <strong style="color:#1B6B3A;">${parseFloat(epAmount).toFixed(2)} EP</strong>.</p><div style="background:#fff;border:1px solid #D4DDD6;border-left:3px solid #1B6B3A;padding:16px 20px;margin:20px 0;">${rows}</div><p style="color:#5A6B5D;font-size:0.85rem;">Use your Noble email (${email}) as reference. EP credited within 1–3 business days.</p><p style="font-size:0.7rem;color:#aaa;margin-top:20px;">europan.group · noble-limited.com</p></div>`
    await fetch('https://api.resend.com/emails', { method:'POST', headers:{'Authorization':`Bearer ${resendKey}`,'Content-Type':'application/json'}, body:JSON.stringify({ from:'EUROPAN <noreply@pan21.com>', to:email, reply_to:'members@noble-limited.com', subject:`Wire Transfer Instructions — ${parseFloat(epAmount).toFixed(2)} EP`, html }) })
    await fetch('https://api.resend.com/emails', { method:'POST', headers:{'Authorization':`Bearer ${resendKey}`,'Content-Type':'application/json'}, body:JSON.stringify({ from:'EUROPAN <noreply@pan21.com>', to:'members@noble-limited.com', subject:`EP Wire: ${name} — €${parseFloat(amount).toFixed(2)}`, html:`<p><b>Name:</b> ${name}<br><b>Email:</b> ${email}<br><b>EUR:</b> €${parseFloat(amount).toFixed(2)}<br><b>EP:</b> ${parseFloat(epAmount).toFixed(2)}</p>` }) })
    return NextResponse.json({ success: true })
  } catch { return NextResponse.json({ error: 'Internal error' }, { status: 500 }) }
}
