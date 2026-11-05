import { NextResponse } from 'next/server'

// EUROPAN can no longer be bought; it is a bonus programme. The previous version is in the git history.
export async function POST() {
  return NextResponse.json({ error: 'Not available' }, { status: 404 })
}
