'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import '../globals.css'

const EP_RATE = 1.00
const CARD_LIMIT = 1000
const BANK = {
  Beneficiary: 'NOBLE PRIVATE CAPITAL LIMITED',
  Bank: 'Citibank, N.A., Hong Kong Branch',
  SWIFT: 'CITIHKHX',
  Account: '390206957',
  Currency: 'EUR',
  Reference: 'EP Purchase — [Your Noble Account Email]',
}

export default function BuyPage() {
  const [amount, setAmount] = useState('')
  const [epAmount, setEpAmount] = useState(0)
  const [mode, setMode] = useState<'card'|'wire'|null>(null)
  const [email, setEmail] = useState('')
  const [wireName, setWireName] = useState('')
  const [wireSubmitted, setWireSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rate] = useState(EP_RATE)

  useEffect(() => {
    const eur = parseFloat(amount) || 0
    setEpAmount(eur / rate)
    if (eur > 0 && eur <= CARD_LIMIT) setMode('card')
    else if (eur > CARD_LIMIT) setMode('wire')
    else setMode(null)
  }, [amount])

  async function handleCard(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !amount) return setError('Bitte E-Mail und Betrag eingeben.')
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/checkout', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ amount: parseFloat(amount), email }) })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError(data.error || 'Fehler.')
    } catch { setError('Netzwerkfehler.') }
    setLoading(false)
  }

  async function handleWire(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !amount || !wireName) return setError('Bitte alle Felder ausfüllen.')
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/wire', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name: wireName, email, amount: parseFloat(amount), epAmount }) })
      if (res.ok) setWireSubmitted(true)
      else setError('Fehler. Bitte direkt per E-Mail kontaktieren.')
    } catch { setError('Netzwerkfehler.') }
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--snow)' }}>
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            <img src="/europan-logo.png" alt="EUROPAN" style={{ height: '36px', width: 'auto', filter: 'invert(1)' }} />
          </Link>
          <ul className="nav-links">
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/buy" style={{ color: 'var(--green)' }}>Buy EP</Link></li>
          </ul>
          <div className="nav-actions">
            <a href="https://noble-limited.com" target="_blank" rel="noopener" className="nav-noble-link">Noble Limited ↗</a>
          </div>
        </div>
      </nav>

      <div style={{ paddingTop: '68px', display: 'grid', gridTemplateColumns: '340px 1fr', minHeight: '100vh' }}>
        {/* Sidebar */}
        <div style={{ background: 'var(--green)', padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column' }}>
          <img src="/europan-logo.png" alt="EUROPAN" style={{ height: '40px', width: 'auto', marginBottom: '1rem' }} />
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>EUROPAN Exchange</span>
          <h1 style={{ fontFamily: 'var(--ff-d)', fontSize: '2.2rem', fontWeight: 700, color: '#fff', lineHeight: 1.15, marginBottom: '0.5rem' }}>
            Buy<br /><em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>EUROPAN</em>
          </h1>
          <div style={{ height: '2px', background: 'rgba(255,255,255,0.2)', margin: '1.5rem 0' }} />
          <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '1.25rem 1.5rem', borderRadius: '6px' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}>Current Rate</span>
            <span style={{ fontFamily: 'var(--ff-d)', fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>€{rate.toFixed(2)} = 1 EP</span>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '4px 12px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, display: 'inline-block', marginBottom: '4px' }}>💳 Credit Card</div>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', lineHeight: 1.6 }}>Up to €1,000 · Instant · Visa, MC, Amex</p>
            </div>
            <div>
              <div style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, display: 'inline-block', marginBottom: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>🏦 Bank Transfer</div>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', lineHeight: 1.6 }}>€1,000 and above · 1–3 business days</p>
            </div>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
              EUROPAN is a private network currency issued by Noble Limited, registered in England & Wales. Not a regulated financial instrument.
            </p>
          </div>
        </div>

        {/* Main */}
        <div style={{ padding: '4rem 3.5rem', maxWidth: '560px' }}>
          {wireSubmitted ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(27,107,58,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem' }}>✓</div>
              <h2 style={{ fontFamily: 'var(--ff-d)', fontSize: '2rem', color: 'var(--charcoal)', marginBottom: '0.75rem' }}>Wire Confirmed</h2>
              <p style={{ color: 'var(--gray)', lineHeight: 1.8 }}>Instructions sent to {email}. Your EP will be credited within 1–3 business days.</p>
              <Link href="/" className="btn-green" style={{ marginTop: '2rem', display: 'inline-block' }}>← Back to EUROPAN</Link>
            </div>
          ) : (
            <>
              {/* Amount */}
              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.5rem' }}>Amount in EUR</label>
                <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${amount ? 'var(--green)' : 'var(--lgray)'}`, background: '#fff', borderRadius: '6px', overflow: 'hidden', transition: 'border-color 0.2s' }}>
                  <span style={{ padding: '0 1.25rem', fontFamily: 'var(--ff-d)', fontSize: '1.4rem', color: 'var(--muted)', borderRight: '1px solid var(--lgray)' }}>€</span>
                  <input type="number" min="1" max="100000" step="1" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} style={{ flex: 1, border: 'none', padding: '1rem 1.25rem', fontFamily: 'var(--ff-d)', fontSize: '2rem', color: 'var(--charcoal)', background: 'transparent', outline: 'none', fontWeight: 400 }} />
                </div>
                {parseFloat(amount) > 0 && (
                  <div style={{ marginTop: '0.6rem', fontSize: '0.9rem', color: 'var(--gray)' }}>
                    You receive: <strong style={{ color: 'var(--green)' }}>{epAmount.toFixed(2)} EP</strong>
                    <span style={{ marginLeft: '0.5rem', fontSize: '0.75rem', color: 'var(--muted)' }}>@ €{rate.toFixed(2)}/EP</span>
                  </div>
                )}
                {mode && (
                  <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', padding: '0.6rem 0.9rem', borderRadius: '4px', background: mode === 'card' ? 'rgba(27,107,58,0.07)' : 'rgba(30,40,32,0.05)', color: mode === 'card' ? 'var(--green2)' : 'var(--charcoal)', border: `1px solid ${mode === 'card' ? 'rgba(27,107,58,0.2)' : 'var(--lgray)'}` }}>
                    {mode === 'card' ? '💳 Credit card payment · instant delivery' : '🏦 Bank transfer required for amounts above €1,000'}
                  </div>
                )}
              </div>

              {/* Card form */}
              {mode === 'card' && (
                <form onSubmit={handleCard} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3 style={{ fontFamily: 'var(--ff-d)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--charcoal)' }}>Credit Card Payment</h3>
                  <div className="fg">
                    <label>Your Noble Account Email *</label>
                    <input type="email" required placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                    <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '3px' }}>EP will be credited to this Noble account.</p>
                  </div>
                  <div style={{ background: 'var(--white)', border: '1px solid var(--lgray)', padding: '1rem', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '0.82rem', borderBottom: '1px solid var(--lgray)' }}><span style={{ color: 'var(--gray)' }}>Amount</span><strong>€{parseFloat(amount||'0').toFixed(2)}</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '0.82rem', borderBottom: '1px solid var(--lgray)' }}><span style={{ color: 'var(--gray)' }}>EUROPAN received</span><strong>{epAmount.toFixed(2)} EP</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '0.82rem' }}><span style={{ color: 'var(--gray)' }}>Payment</span><strong>Stripe · Secure</strong></div>
                  </div>
                  {error && <p className="form-err">{error}</p>}
                  <button type="submit" className="btn-green-lg" disabled={loading} style={{ width: '100%' }}>
                    {loading ? 'Redirecting…' : `Pay €${parseFloat(amount||'0').toFixed(2)} →`}
                  </button>
                  <p style={{ fontSize: '0.7rem', color: 'var(--muted)', textAlign: 'center' }}>Secured by Stripe · Visa · Mastercard · Amex · Apple Pay</p>
                </form>
              )}

              {/* Wire form */}
              {mode === 'wire' && (
                <form onSubmit={handleWire} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3 style={{ fontFamily: 'var(--ff-d)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--charcoal)' }}>Bank Transfer</h3>
                  <div style={{ background: 'var(--white)', border: '1px solid var(--lgray)', borderLeft: '3px solid var(--green)', padding: '1.25rem 1.5rem', borderRadius: '0 6px 6px 0' }}>
                    <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '0.75rem' }}>Bank Details</div>
                    {Object.entries(BANK).map(([k,v]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--lgray)', fontSize: '0.82rem' }}>
                        <span style={{ color: 'var(--gray)' }}>{k}</span><strong style={{ color: 'var(--charcoal)' }}>{v}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="fg"><label>Full Name *</label><input type="text" required placeholder="As on your bank account" value={wireName} onChange={e => setWireName(e.target.value)} /></div>
                  <div className="fg">
                    <label>Noble Account Email *</label>
                    <input type="email" required placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
                    <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '3px' }}>EP credited to this Noble account after funds received.</p>
                  </div>
                  {error && <p className="form-err">{error}</p>}
                  <button type="submit" className="btn-green-lg" disabled={loading} style={{ width: '100%' }}>
                    {loading ? 'Sending…' : 'Confirm Wire Transfer →'}
                  </button>
                </form>
              )}

              {!mode && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)', fontSize: '0.9rem' }}>Enter an amount above to see payment options.</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
