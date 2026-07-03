import { NextRequest, NextResponse } from 'next/server'
import { signSessionToken } from '../../../lib/sessionToken'

const NOBLE_BASE_URL = 'https://www.noble-limited.com' // apex redirect drops Authorization — always www.

// Verifies email+PIN (same check the widget uses for balance lookups) and, on success,
// issues a signed session token. The token proves "this email was already verified
// here" to other EUROPAN properties (currently: europan.online's Internet-Stadt) so the
// person doesn't have to re-enter their PIN a second time within the same session.
export async function POST(req: NextRequest) {
  try {
    const { email, pin } = await req.json()
    if (!email || !pin) {
      return NextResponse.json({ verified: false, error: 'E-Mail und PIN erforderlich' }, { status: 400 })
    }
    if (!process.env.NOBLE_API_KEY || !process.env.EUROPAN_SESSION_SECRET) {
      return NextResponse.json({ verified: false, error: 'Verifizierung derzeit nicht verfügbar' }, { status: 500 })
    }

    const r = await fetch(`${NOBLE_BASE_URL}/api/v1/balance-by-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.NOBLE_API_KEY}` },
      body: JSON.stringify({ email, pin, coin_id: 'europan' }),
    })

    if (r.status === 429) {
      return NextResponse.json({ verified: false, error: 'Zu viele Versuche — bitte 15 Minuten warten.' }, { status: 429 })
    }
    if (!r.ok) {
      return NextResponse.json({ verified: false, error: 'E-Mail oder PIN falsch.' }, { status: 401 })
    }

    const token = signSessionToken(email, process.env.EUROPAN_SESSION_SECRET)
    return NextResponse.json({ verified: true, token, email })
  } catch (e) {
    console.error('Session verification failed:', e)
    return NextResponse.json({ verified: false, error: 'Interner Fehler' }, { status: 500 })
  }
}
