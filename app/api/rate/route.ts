import { NextResponse } from 'next/server'
export async function GET() {
  return NextResponse.json({ rate: 1.00, currency: 'EUR', symbol: 'EP', name: 'EUROPAN', updated: new Date().toISOString() }, { headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, s-maxage=300' } })
}
