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
  const [currency, setCurrency] = useState('EUR')
  const [rate, setRate] = useState(EP_RATE)
  const [rateLoading, setRateLoading] = useState(false)
  const [website, setWebsite] = useState('') // Honeypot
  const [formstart] = useState(() => Date.now())

  useEffect(() => {
    const l = document.documentElement.classList.contains('en') ? 'en' : 'de'
    ;(window as any).setLang?.(l)
  }, [])

  useEffect(() => {
    setRateLoading(true)
    fetch(`/api/fx-rate?currency=${currency}`)
      .then(r => r.json())
      .then(d => { if (d.applied_rate) setRate(d.applied_rate) })
      .catch(() => {})
      .finally(() => setRateLoading(false))
  }, [currency])

  useEffect(() => {
    const inputAmt = parseFloat(amount) || 0
    const eurEquivalent = inputAmt * rate
    setEpAmount(eurEquivalent)
    if (inputAmt > 0 && eurEquivalent <= CARD_LIMIT) setMode('card')
    else if (eurEquivalent > CARD_LIMIT) { setMode('wire'); if (currency !== 'EUR') setCurrency('EUR') }
    else setMode(null)
  }, [amount, rate])

  const isEn = () => typeof document !== 'undefined' && document.documentElement.classList.contains('en')

  async function handleCard(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !amount) return setError(isEn() ? 'Please enter email and amount.' : 'Bitte E-Mail und Betrag eingeben.')
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/checkout', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ amount: parseFloat(amount), email, currency }) })
      const data = await res.json()
      if (data.url) window.location.href = data.url
      else setError(data.error || (isEn() ? 'Error.' : 'Fehler.'))
    } catch { setError(isEn() ? 'Network error.' : 'Netzwerkfehler.') }
    setLoading(false)
  }

  async function handleWire(e: React.FormEvent) {
    e.preventDefault()
    if (website) return // Bot hat das Honeypot-Feld ausgefüllt
    if (!email || !amount || !wireName) return setError(isEn() ? 'Please fill in all fields.' : 'Bitte alle Felder ausfüllen.')
    setLoading(true); setError('')
    try {
      const res = await fetch('/api/wire', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ name: wireName, email, amount: parseFloat(amount), epAmount, website, elapsed: Date.now() - formstart }) })
      if (res.ok) setWireSubmitted(true)
      else setError(isEn() ? 'Error. Please contact us directly by email.' : 'Fehler. Bitte direkt per E-Mail kontaktieren.')
    } catch { setError(isEn() ? 'Network error.' : 'Netzwerkfehler.') }
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
            <li><Link href="/#about"><span className="de-content">Über uns</span><span className="en-content">About</span></Link></li>
            <li><Link href="/buy" style={{ color: 'var(--green)' }}><span className="de-content">EP kaufen</span><span className="en-content">Buy EP</span></Link></li>
          </ul>
          <div className="nav-actions">
            <div className="lang-switch">
              <button data-lang-btn="de" className="active" onClick={() => (window as any).setLang('de')}>DE</button>
              <button data-lang-btn="en" onClick={() => (window as any).setLang('en')}>EN</button>
            </div>
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
            <span className="de-content">EUROPAN<br /><em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>kaufen</em></span>
            <span className="en-content">Buy<br /><em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.7)', fontWeight: 400 }}>EUROPAN</em></span>
          </h1>
          <div style={{ height: '2px', background: 'rgba(255,255,255,0.2)', margin: '1.5rem 0' }} />
          <img src="/vouchers/europan-service.png" alt="EUROPAN Guthaben" style={{ width: '100%', height: 'auto', borderRadius: '8px', marginBottom: '1.5rem' }} />
          <div style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '1.25rem 1.5rem', borderRadius: '6px' }}>
            <span style={{ fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', display: 'block', marginBottom: '4px' }}><span className="de-content">Aktueller Kurs</span><span className="en-content">Current Rate</span></span>
            <span style={{ fontFamily: 'var(--ff-d)', fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>€1.00 = 1 EP</span>
          </div>
          <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ background: 'rgba(255,255,255,0.15)', color: '#fff', padding: '4px 12px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, display: 'inline-block', marginBottom: '4px' }}>💳 <span className="de-content">Kreditkarte</span><span className="en-content">Credit Card</span></div>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', lineHeight: 1.6 }}><span className="de-content">Bis zu 1.000 € · Sofort · Visa, MC, Amex</span><span className="en-content">Up to €1,000 · Instant · Visa, MC, Amex</span></p>
            </div>
            <div>
              <div style={{ background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', padding: '4px 12px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 700, display: 'inline-block', marginBottom: '4px', border: '1px solid rgba(255,255,255,0.2)' }}>🏦 <span className="de-content">Überweisung</span><span className="en-content">Bank Transfer</span></div>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: '4px', lineHeight: 1.6 }}><span className="de-content">Ab 1.000 € · 1–3 Werktage</span><span className="en-content">€1,000 and above · 1–3 business days</span></p>
            </div>
          </div>
          <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.15)' }}>
            <p style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.7 }}>
              <span className="de-content">EUROPAN ist eine private Netzwerkwährung, herausgegeben von Noble Private Capital Ltd (handelnd als „Noble Limited"), eingetragen in Neuseeland. Kein reguliertes Finanzinstrument.</span>
              <span className="en-content">EUROPAN is a private network currency issued by Noble Private Capital Ltd (trading as "Noble Limited"), registered in New Zealand. Not a regulated financial instrument.</span>
            </p>
          </div>
        </div>

        {/* Main */}
        <div style={{ padding: '4rem 3.5rem', maxWidth: '560px' }}>
          {wireSubmitted ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ width: '64px', height: '64px', background: 'rgba(27,107,58,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', fontSize: '1.5rem' }}>✓</div>
              <h2 style={{ fontFamily: 'var(--ff-d)', fontSize: '2rem', color: 'var(--charcoal)', marginBottom: '0.75rem' }}><span className="de-content">Überweisung bestätigt</span><span className="en-content">Wire Confirmed</span></h2>
              <p style={{ color: 'var(--gray)', lineHeight: 1.8 }}>
                <span className="de-content">Anweisungen an {email} gesendet. Ihr EP wird innerhalb von 1–3 Werktagen gutgeschrieben.</span>
                <span className="en-content">Instructions sent to {email}. Your EP will be credited within 1–3 business days.</span>
              </p>
              <Link href="/" className="btn-green" style={{ marginTop: '2rem', display: 'inline-block' }}><span className="de-content">← Zurück zu EUROPAN</span><span className="en-content">← Back to EUROPAN</span></Link>
            </div>
          ) : (
            <>
              {/* Currency selector */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.75rem' }}><span className="de-content">Zahlungswährung</span><span className="en-content">Payment Currency</span></label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  {['EUR', 'GBP', 'USD'].map(c => (
                    <button key={c} onClick={() => setCurrency(c)}
                      style={{ padding: '0.5rem 1rem', border: `2px solid ${currency === c ? 'var(--green)' : 'var(--lgray)'}`, background: currency === c ? 'var(--green)' : '#fff', color: currency === c ? '#fff' : 'var(--charcoal)', borderRadius: '6px', cursor: 'pointer', fontFamily: 'var(--ff-b)', fontWeight: 700, fontSize: '0.85rem' }}>
                      {c}
                    </button>
                  ))}
                </div>
                {currency !== 'EUR' && (
                  <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '0.5rem' }}>
                    <span className="de-content">Wechselkurs inkl. Marge — {rateLoading ? 'wird geladen…' : `1 ${currency} = ${rate.toFixed(4)} EP`}</span>
                    <span className="en-content">Exchange rate incl. margin — {rateLoading ? 'loading…' : `1 ${currency} = ${rate.toFixed(4)} EP`}</span>
                  </p>
                )}
              </div>

              {/* Quick packages */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.75rem' }}><span className="de-content">Schnellauswahl</span><span className="en-content">Quick Select</span></label>
                {currency === 'EUR' ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.6rem' }}>
                    {[10, 25, 50, 100].map(pkg => (
                      <button
                        key={pkg}
                        onClick={() => setAmount(String(pkg))}
                        style={{
                          padding: 0,
                          border: `2px solid ${amount === String(pkg) ? 'var(--green)' : 'var(--lgray)'}`,
                          background: '#fff',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          overflow: 'hidden',
                          transition: 'all 0.15s',
                          lineHeight: 0,
                        }}
                      >
                        <img src={`/vouchers/europan${pkg}.png`} alt={`EUROPAN ${pkg} EUR`} style={{ width: '100%', height: 'auto', display: 'block' }} />
                      </button>
                    ))}
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem' }}>
                    {[10, 25, 50, 100].map(pkg => (
                      <button
                        key={pkg}
                        onClick={() => setAmount(String(pkg))}
                        style={{
                          padding: '0.75rem 0.5rem',
                          border: `2px solid ${amount === String(pkg) ? 'var(--green)' : 'var(--lgray)'}`,
                          background: amount === String(pkg) ? 'var(--green)' : '#fff',
                          color: amount === String(pkg) ? '#fff' : 'var(--charcoal)',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontFamily: 'var(--ff-b)',
                          transition: 'all 0.15s',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '2px',
                        }}
                      >
                        <span style={{ fontFamily: 'var(--ff-d)', fontSize: '1.1rem', fontWeight: 700 }}>{pkg}</span>
                        <span style={{ fontSize: '0.62rem', opacity: 0.7, letterSpacing: '0.08em' }}>{currency}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Amount */}
              <div style={{ marginBottom: '2.5rem' }}>
                <label style={{ fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--muted)', display: 'block', marginBottom: '0.5rem' }}>
                  <span className="de-content">Oder freier Betrag in {currency}</span><span className="en-content">Or enter a custom amount in {currency}</span>
                </label>
                <div style={{ display: 'flex', alignItems: 'center', border: `1.5px solid ${amount ? 'var(--green)' : 'var(--lgray)'}`, background: '#fff', borderRadius: '6px', overflow: 'hidden', transition: 'border-color 0.2s' }}>
                  <span style={{ padding: '0 1.25rem', fontFamily: 'var(--ff-d)', fontSize: '1.4rem', color: 'var(--muted)', borderRight: '1px solid var(--lgray)' }}>{currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : '$'}</span>
                  <input type="number" min="1" max="100000" step="1" placeholder="0" value={amount} onChange={e => setAmount(e.target.value)} style={{ flex: 1, border: 'none', padding: '1rem 1.25rem', fontFamily: 'var(--ff-d)', fontSize: '2rem', color: 'var(--charcoal)', background: 'transparent', outline: 'none', fontWeight: 400 }} />
                </div>
                {parseFloat(amount) > 0 && (
                  <div style={{ marginTop: '0.6rem', fontSize: '0.9rem', color: 'var(--gray)' }}>
                    <span className="de-content">Sie erhalten: </span><span className="en-content">You receive: </span>
                    <strong style={{ color: 'var(--green)' }}>{epAmount.toFixed(2)} EP</strong>
                  </div>
                )}
                {mode && (
                  <div style={{ marginTop: '0.75rem', fontSize: '0.8rem', padding: '0.6rem 0.9rem', borderRadius: '4px', background: mode === 'card' ? 'rgba(27,107,58,0.07)' : 'rgba(30,40,32,0.05)', color: mode === 'card' ? 'var(--green2)' : 'var(--charcoal)', border: `1px solid ${mode === 'card' ? 'rgba(27,107,58,0.2)' : 'var(--lgray)'}` }}>
                    {mode === 'card'
                      ? <><span className="de-content">💳 Kreditkartenzahlung · sofortige Gutschrift</span><span className="en-content">💳 Credit card payment · instant delivery</span></>
                      : <><span className="de-content">🏦 Für Beträge über 1.000 € ist eine Überweisung erforderlich (nur in EUR)</span><span className="en-content">🏦 Bank transfer required for amounts above €1,000 (EUR only)</span></>}
                  </div>
                )}
              </div>

              {/* Card form */}
              {mode === 'card' && (
                <form onSubmit={handleCard} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <h3 style={{ fontFamily: 'var(--ff-d)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--charcoal)' }}><span className="de-content">Kreditkartenzahlung</span><span className="en-content">Credit Card Payment</span></h3>
                  <div className="fg">
                    <label><span className="de-content">Ihre E-Mail-Adresse *</span><span className="en-content">Your Email Address *</span></label>
                    <input type="email" required placeholder="ihre@email.de" value={email} onChange={e => setEmail(e.target.value)} />
                    <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '3px' }}><span className="de-content">Ihr EUROPAN-Guthaben wird dieser E-Mail-Adresse zugeordnet und ist jederzeit abrufbar.</span><span className="en-content">Your EUROPAN balance will be linked to this email address and available any time.</span></p>
                  </div>
                  <div style={{ background: 'var(--white)', border: '1px solid var(--lgray)', padding: '1rem', borderRadius: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '0.82rem', borderBottom: '1px solid var(--lgray)' }}><span style={{ color: 'var(--gray)' }}><span className="de-content">Betrag</span><span className="en-content">Amount</span></span><strong>€{parseFloat(amount||'0').toFixed(2)}</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '0.82rem', borderBottom: '1px solid var(--lgray)' }}><span style={{ color: 'var(--gray)' }}><span className="de-content">Erhaltenes EUROPAN</span><span className="en-content">EUROPAN received</span></span><strong>{epAmount.toFixed(2)} EP</strong></div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', fontSize: '0.82rem' }}><span style={{ color: 'var(--gray)' }}><span className="de-content">Zahlung</span><span className="en-content">Payment</span></span><strong>Stripe · <span className="de-content">Sicher</span><span className="en-content">Secure</span></strong></div>
                  </div>
                  {error && <p className="form-err">{error}</p>}
                  <button type="submit" className="btn-green-lg" disabled={loading} style={{ width: '100%' }}>
                    {loading
                      ? <><span className="de-content">Weiterleitung…</span><span className="en-content">Redirecting…</span></>
                      : <><span className="de-content">{`${parseFloat(amount||'0').toFixed(2)} € bezahlen →`}</span><span className="en-content">{`Pay €${parseFloat(amount||'0').toFixed(2)} →`}</span></>}
                  </button>
                  <p style={{ fontSize: '0.7rem', color: 'var(--muted)', textAlign: 'center' }}><span className="de-content">Abgesichert durch Stripe · Visa · Mastercard · Amex · Apple Pay</span><span className="en-content">Secured by Stripe · Visa · Mastercard · Amex · Apple Pay</span></p>
                </form>
              )}

              {/* Wire form */}
              {mode === 'wire' && (
                <form onSubmit={handleWire} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }} aria-hidden="true">
                    <label htmlFor="wire-website">Website</label>
                    <input id="wire-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={website} onChange={e => setWebsite(e.target.value)} />
                  </div>
                  <h3 style={{ fontFamily: 'var(--ff-d)', fontSize: '1.4rem', fontWeight: 700, color: 'var(--charcoal)' }}><span className="de-content">Banküberweisung</span><span className="en-content">Bank Transfer</span></h3>
                  <div style={{ background: 'var(--white)', border: '1px solid var(--lgray)', borderLeft: '3px solid var(--green)', padding: '1.25rem 1.5rem', borderRadius: '0 6px 6px 0' }}>
                    <div style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--green)', marginBottom: '0.75rem' }}><span className="de-content">Bankverbindung</span><span className="en-content">Bank Details</span></div>
                    {Object.entries(BANK).map(([k,v]) => (
                      <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: '1px solid var(--lgray)', fontSize: '0.82rem' }}>
                        <span style={{ color: 'var(--gray)' }}>{k}</span><strong style={{ color: 'var(--charcoal)' }}>{v}</strong>
                      </div>
                    ))}
                  </div>
                  <div className="fg"><label><span className="de-content">Vollständiger Name *</span><span className="en-content">Full Name *</span></label><input type="text" required placeholder="Wie auf Ihrem Bankkonto" value={wireName} onChange={e => setWireName(e.target.value)} /></div>
                  <div className="fg">
                    <label><span className="de-content">E-Mail-Adresse *</span><span className="en-content">Email Address *</span></label>
                    <input type="email" required placeholder="ihre@email.de" value={email} onChange={e => setEmail(e.target.value)} />
                    <p style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: '3px' }}><span className="de-content">Ihr EUROPAN-Guthaben wird dieser E-Mail-Adresse zugeordnet, sobald der Betrag eingegangen ist.</span><span className="en-content">Your EUROPAN balance will be linked to this email address once the payment is received.</span></p>
                  </div>
                  {error && <p className="form-err">{error}</p>}
                  <button type="submit" className="btn-green-lg" disabled={loading} style={{ width: '100%' }}>
                    {loading
                      ? <><span className="de-content">Wird gesendet…</span><span className="en-content">Sending…</span></>
                      : <><span className="de-content">Überweisung bestätigen →</span><span className="en-content">Confirm Wire Transfer →</span></>}
                  </button>
                </form>
              )}

              {!mode && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)', fontSize: '0.9rem' }}>
                  <span className="de-content">Geben Sie oben einen Betrag ein, um Zahlungsoptionen zu sehen.</span>
                  <span className="en-content">Enter an amount above to see payment options.</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
