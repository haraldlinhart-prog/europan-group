import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  const body = await req.text()
  let event: any
  try { event = JSON.parse(body) } catch { return NextResponse.json({ error: 'Invalid' }, { status: 400 }) }

  if (event.type === 'checkout.session.completed') {
    const s = event.data.object
    const email = s.metadata?.noble_email
    const ep = parseFloat(s.metadata?.ep_amount || '0')

    if (email && ep > 0 && process.env.NOBLE_API_KEY) {
      const creditOk = await fetch(`${process.env.NOBLE_API_URL || 'https://noble-limited.com'}/api/v1/credit`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${process.env.NOBLE_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email, coin_id: 'europan', amount: ep, type: 'credit',
          description: `EUROPAN purchase via Stripe — ${s.id}`, reference: s.id,
        }),
      }).then(r => r.ok).catch(() => false)

      // Onboarding email is best-effort — a failure here must never look like the
      // purchase itself failed. The credit above is the transaction that actually
      // matters; this is a follow-up notification, sent only once the credit
      // succeeded so we never tell someone "you can spend this everywhere" for
      // money that didn't actually arrive.
      if (creditOk) {
        await sendNetworkWelcomeEmail(email, ep).catch(err =>
          console.error('EUROPAN welcome email failed:', err)
        )
      }
    }
  }

  return NextResponse.json({ received: true })
}

async function sendNetworkWelcomeEmail(email: string, epAmount: number) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) return
  const resend = new Resend(resendKey)

  const epFormatted = ')( ' + (epAmount % 1 === 0 ? epAmount.toFixed(0) : epAmount.toFixed(2).replace('.', ','))

  const html = `
    <div style="font-family:Georgia,serif;max-width:580px;margin:0 auto;padding:40px 32px;background:#F5F7F5;">
      <div style="text-align:center;margin-bottom:32px;">
        <span style="font-size:1.4rem;color:#1E2820;font-weight:700;">EUROPAN</span>
      </div>

      <h2 style="font-family:Georgia,serif;font-weight:400;color:#1E2820;margin-bottom:16px;">
        Ihr Guthaben ist da: ${epFormatted}
      </h2>

      <p style="color:#5A6B5D;line-height:1.8;margin-bottom:20px;">
        Vielen Dank für Ihren Kauf. Ihr EUROPAN-Guthaben steht Ihnen ab sofort zur
        Verfügung — mit Ihrer E-Mail-Adresse und Ihrer PIN können Sie es überall dort
        einsetzen, wo EUROPAN akzeptiert wird.
      </p>

      <p style="color:#1E2820;line-height:1.8;margin-bottom:12px;font-weight:600;">
        Und das ist mehr, als man auf den ersten Blick denkt:
      </p>

      <p style="color:#5A6B5D;line-height:1.8;margin-bottom:20px;">
        EUROPAN ist keine Währung für eine einzelne Website — es ist die
        Netzwerkwährung von PAN21, einsetzbar quer über ein Netzwerk, das unter
        anderem umfasst:
      </p>

      <ul style="color:#5A6B5D;line-height:2;padding-left:20px;margin-bottom:24px;">
        <li>Firmengründung in mehr als 8 Ländern</li>
        <li>Büroadressen an über 100 Standorten weltweit</li>
        <li>Webhosting und Domain-Registrierung, z.&nbsp;B. bei
          <a href="https://1euro-hosting.de" style="color:#1B6B3A;">1euro-hosting.de</a>
        </li>
        <li>und viele weitere Angebote, die laufend hinzukommen</li>
      </ul>

      <p style="color:#5A6B5D;line-height:1.8;margin-bottom:24px;">
        Sie müssen sich dafür nirgendwo neu anmelden — Ihre EUROPAN-E-Mail-Adresse
        und PIN funktionieren netzwerkweit, überall dort, wo Sie das
        EUROPAN-Zahlungssymbol sehen.
      </p>

      <p style="color:#8A9E8D;font-size:0.8rem;line-height:1.6;">
        Diese E-Mail wurde an ${email} gesendet, weil unter dieser Adresse gerade
        EUROPAN-Guthaben erworben wurde.
      </p>
    </div>
  `

  await resend.emails.send({
    from: 'noreply@pan21.com',
    to: email,
    reply_to: 'support@pan21.com',
    subject: `Ihr EUROPAN-Guthaben ist da — und wo Sie es überall einsetzen können`,
    html,
  })
}
