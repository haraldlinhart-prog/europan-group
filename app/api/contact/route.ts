import { NextRequest, NextResponse } from 'next/server'
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message, elapsed } = body
    if (body.website) return NextResponse.json({ ok: true })
    if (typeof elapsed === 'number' && elapsed < 2000) return NextResponse.json({ ok: true })
    if (!name || !email || !message) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    const noSpaces = String(message).replace(/\s/g, '')
    if (noSpaces.length > 60 && noSpaces.length === String(message).length) return NextResponse.json({ ok: true })
    if (!email.includes('@')) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    const resendKey = process.env.RESEND_API_KEY
    const contactTo = process.env.CONTACT_TO || 'info@europan.group'
    if (!resendKey) return NextResponse.json({ ok: true })
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: 'EUROPAN <noreply@pan21.com>', to: contactTo, reply_to: email, subject: `EUROPAN Contact: ${subject || name}`, html: `<p><strong>Name:</strong> ${name}<br><strong>Email:</strong> ${email}<br><strong>Subject:</strong> ${subject || '—'}</p><p>${message}</p><p style="font-size:0.7rem;color:#aaa;">europan.group · ${elapsed}ms</p>` }),
    })
    return NextResponse.json({ ok: true })
  } catch { return NextResponse.json({ error: 'Internal error' }, { status: 500 }) }
}
