import { NextRequest, NextResponse } from 'next/server'

// GET /api/fx-rate?currency=GBP
//
// Returns the rate a customer gets when buying EUROPAN with a foreign currency:
// applied_rate = market_rate * (1 - FX_MARGIN_PCT)
//
// Example: market rate 1 GBP = 1.17 EUR, margin 3% -> applied_rate = 1.1349
// A customer paying 100 GBP receives 113.49 EP instead of the "true" 117 EP —
// the difference is our margin, same principle as any bureau de change.
//
// EUR itself always stays at a strict 1:1 peg (no margin) — margin only applies
// to the foreign-currency conversion step, not to EUROPAN's own EUR valuation.
//
// Uses the free, keyless Frankfurter API (ECB reference rates, updated once per
// business day) — no signup, no quota, no cost.

const SUPPORTED = ['GBP', 'USD', 'CHF']
const DEFAULT_MARGIN_PCT = 0.03 // 3% — override via FX_MARGIN_PCT env var (e.g. "0.03")

export async function GET(req: NextRequest) {
  const currency = (req.nextUrl.searchParams.get('currency') || '').toUpperCase()

  if (currency === 'EUR') {
    return NextResponse.json(
      { currency: 'EUR', market_rate: 1, applied_rate: 1, margin_pct: 0, updated: new Date().toISOString() },
      { headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, s-maxage=300' } }
    )
  }

  if (!SUPPORTED.includes(currency)) {
    return NextResponse.json({ error: 'Unsupported currency', supported: SUPPORTED }, { status: 400 })
  }

  const marginPct = parseFloat(process.env.FX_MARGIN_PCT || '') || DEFAULT_MARGIN_PCT

  try {
    const r = await fetch(`https://api.frankfurter.dev/v1/latest?from=${currency}&to=EUR`, {
      next: { revalidate: 3600 }, // ECB updates ~once/day, cache for an hour
    })
    if (!r.ok) throw new Error('FX provider error')
    const data = await r.json()
    const marketRate = Number(data?.rates?.EUR)
    if (!marketRate || marketRate <= 0) throw new Error('Invalid rate')

    const appliedRate = Math.round(marketRate * (1 - marginPct) * 10000) / 10000

    return NextResponse.json(
      {
        currency,
        market_rate: marketRate,
        applied_rate: appliedRate,
        margin_pct: marginPct,
        rate_date: data?.date || null,
        updated: new Date().toISOString(),
      },
      { headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, s-maxage=300' } }
    )
  } catch (err) {
    console.error('FX rate fetch failed:', err)
    return NextResponse.json({ error: 'Rate temporarily unavailable' }, { status: 502 })
  }
}
