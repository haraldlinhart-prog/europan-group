import { NextRequest, NextResponse } from 'next/server'

function escapeHtml(s: string) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Einfaches In-Memory-Rate-Limit — verhindert, dass dieser Endpunkt als Mail-Relay
// missbraucht wird (er verschickt eine Mail an eine frei angebbare Adresse).
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
function isRateLimited(ip: string) {
  const now = Date.now()
  const entry = rateLimitMap.get(ip) || { count: 0, resetAt: now + 3600000 }
  if (now > entry.resetAt) { entry.count = 0; entry.resetAt = now + 3600000 }
  entry.count++
  rateLimitMap.set(ip, entry)
  return entry.count > 3
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, amount, epAmount, website, elapsed } = await req.json()

    // Honeypot
    if (website) return NextResponse.json({ success: true })

    // Mindestzeit: ein Mensch braucht länger als 3s, um das Formular auszufüllen.
    if (typeof elapsed !== 'number' || elapsed < 3000) {
      return NextResponse.json({ error: 'Bitte versuchen Sie es erneut.' }, { status: 400 })
    }

    const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'unknown'
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Zu viele Anfragen. Bitte später erneut versuchen.' }, { status: 429 })
    }

    if (!name || !email || !amount) return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    if (String(name).length > 200) return NextResponse.json({ error: 'Invalid name' }, { status: 400 })

    const resendKey = process.env.RESEND_API_KEY
    if (!resendKey) return NextResponse.json({ success: true })

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)

    const bank = { Beneficiary:'NOBLE PRIVATE CAPITAL LIMITED', Bank:'Citibank, N.A., Hong Kong Branch', SWIFT:'CITIHKHX', Account:'390206957', Currency:'EUR', Reference:`EP Purchase — ${safeEmail}` }
    const rows = Object.entries(bank).map(([k,v])=>`<div style="display:flex;justify-content:space-between;padding:5px 0;border-bottom:1px solid #E8F0E8;font-size:0.85rem;"><span style="color:#5A6B5D;">${k}</span><strong>${v}</strong></div>`).join('')
    const html = `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:40px 32px;background:#F5F7F5;"><div style="background:#1B6B3A;padding:20px 28px;margin-bottom:24px;border-radius:4px;"><div style="color:#fff;font-size:1.1rem;font-weight:700;">EUROPAN — Wire Transfer Instructions</div></div><p style="color:#5A6B5D;line-height:1.8;margin-bottom:20px;">Dear ${safeName},<br>Please transfer <strong>€${parseFloat(amount).toFixed(2)}</strong> to receive <strong style="color:#1B6B3A;">${parseFloat(epAmount).toFixed(2)} EP</strong>.</p><div style="background:#fff;border:1px solid #D4DDD6;border-left:3px solid #1B6B3A;padding:16px 20px;margin:20px 0;">${rows}</div><p style="color:#5A6B5D;font-size:0.85rem;">Use your Noble email (${safeEmail}) as reference. EP credited within 1–3 business days.</p><p style="font-size:0.7rem;color:#aaa;margin-top:20px;">europan.group · noble-limited.com</p></div>`

    await fetch('https://api.resend.com/emails', { method:'POST', headers:{'Authorization':`Bearer ${resendKey}`,'Content-Type':'application/json'}, body:JSON.stringify({ from:'EUROPAN <noreply@pan21.com>', to:email, reply_to:'members@noble-limited.com', subject:`Wire Transfer Instructions — ${parseFloat(epAmount).toFixed(2)} EP`, html }) })
    await fetch('https://api.resend.com/emails', { method:'POST', headers:{'Authorization':`Bearer ${resendKey}`,'Content-Type':'application/json'}, body:JSON.stringify({ from:'EUROPAN <noreply@pan21.com>', to:'members@noble-limited.com', subject:`EP Wire: ${safeName} — €${parseFloat(amount).toFixed(2)}`, html:`<p><b>Name:</b> ${safeName}<br><b>Email:</b> ${safeEmail}<br><b>EUR:</b> €${parseFloat(amount).toFixed(2)}<br><b>EP:</b> ${parseFloat(epAmount).toFixed(2)}</p>` }) })

    return NextResponse.json({ success: true })
  } catch { return NextResponse.json({ error: 'Internal error' }, { status: 500 }) }
}
