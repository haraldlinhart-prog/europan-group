// lib/sessionToken.ts — issues short-lived, signed session tokens proving "this email
// was already verified via email+PIN here on europan.group". europan.online's
// click-reward endpoint verifies these to skip asking for the PIN again.
//
// MUST use the exact same algorithm as europan-online/lib/session-token.js — HMAC-SHA256
// over base64url(JSON payload), same field names, same TTL. EUROPAN_SESSION_SECRET must
// be set to the identical value on both sides (treat like NOBLE_INTERNAL_API_KEY).

import crypto from 'crypto'

const TOKEN_TTL_SECONDS = 24 * 60 * 60 // 24h

function b64url(buf: Buffer): string {
  return buf.toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
}

export function signSessionToken(email: string, secret: string): string {
  const payload = { email, exp: Math.floor(Date.now() / 1000) + TOKEN_TTL_SECONDS }
  const payloadB64 = b64url(Buffer.from(JSON.stringify(payload)))
  const sig = crypto.createHmac('sha256', secret).update(payloadB64).digest()
  return `${payloadB64}.${b64url(sig)}`
}
