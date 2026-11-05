import { NextResponse } from 'next/server'

// Purchases by bank transfer are switched off while purchases are limited to 100 euro.
// The previous version is in the git history.
export async function POST() {
  return NextResponse.json({ error: 'Not available' }, { status: 404 })
}
