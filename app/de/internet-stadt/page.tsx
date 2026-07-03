'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import '../../home.css'

type Offer = {
  id: string
  title: string
  description: string
  category: string
  image_url: string | null
}

const OFFERS_API = 'https://europan.online/api/offers'

export default function InternetStadtPage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [loadingOffers, setLoadingOffers] = useState(true)
  const [category, setCategory] = useState<string | null>(null)

  const [email, setEmail] = useState('')
  const [pin, setPin] = useState('')
  const [verifying, setVerifying] = useState(false)
  const [verifyError, setVerifyError] = useState('')
  const [session, setSession] = useState<{ email: string; token: string } | null>(null)

  useEffect(() => {
    const l = document.documentElement.classList.contains('en') ? 'en' : 'de'
    ;(window as any).setLang?.(l)

    // Reuse a previously verified session if it's still fresh (localStorage doesn't
    // know about the token's expiry, but a stale token simply gets rejected server-side
    // on europan.online, which falls back to asking for the PIN there — no broken state).
    try {
      const saved = localStorage.getItem('eo_session')
      if (saved) setSession(JSON.parse(saved))
    } catch {}

    fetch(OFFERS_API)
      .then(r => r.json())
      .then(d => setOffers(d.offers || []))
      .catch(() => {})
      .finally(() => setLoadingOffers(false))
  }, [])

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault()
    setVerifying(true)
    setVerifyError('')
    try {
      const r = await fetch('/api/verify-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, pin }),
      })
      const d = await r.json()
      if (d.verified) {
        const s = { email: d.email, token: d.token }
        setSession(s)
        localStorage.setItem('eo_session', JSON.stringify(s))
      } else {
        setVerifyError(d.error || 'Verifizierung fehlgeschlagen.')
      }
    } catch {
      setVerifyError('Netzwerkfehler — bitte erneut versuchen.')
    }
    setVerifying(false)
  }

  function offerLink(offerId: string) {
    const base = `https://europan.online/go.html?offer=${offerId}`
    if (session) {
      return `${base}&token=${encodeURIComponent(session.token)}&email=${encodeURIComponent(session.email)}`
    }
    return base
  }

  const categories = [...new Set(offers.map(o => o.category))].sort()
  const filtered = category ? offers.filter(o => o.category === category) : offers

  return (
    <div style={{ minHeight: '100vh', background: 'var(--snow)' }}>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">
            <img src="/europan-logo-header.png" alt="EUROPAN" style={{ height: '30px', width: 'auto', filter: 'invert(1)' }} />
          </Link>
          <div className="lang-switch">
            <button data-lang-btn="de" className="active" onClick={() => (window as any).setLang('de')}>DE</button>
            <button data-lang-btn="en" onClick={() => (window as any).setLang('en')}>EN</button>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <p style={{ fontFamily: 'var(--ff-b)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>
          <span className="de-content">Internet-Stadt</span><span className="en-content">Internet City</span>
        </p>
        <h1 style={{ fontFamily: 'var(--ff-d)', fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: 'var(--charcoal)', marginBottom: '0.75rem', lineHeight: 1.15 }}>
          <span className="de-content">Angebote entdecken &amp; EUROPAN verdienen</span>
          <span className="en-content">Discover offers &amp; earn EUROPAN</span>
        </h1>
        <p style={{ color: 'var(--gray)', lineHeight: 1.7, marginBottom: '2rem', maxWidth: '640px' }}>
          <span className="de-content">Angebote unserer Partner — für jeden Besuch gibt's EUROPAN, beim Kauf teilen wir uns das Cashback mit Ihnen.</span>
          <span className="en-content">Offers from our partners — get EUROPAN for every visit, and we share the cashback with you on purchase.</span>
        </p>

        {!session ? (
          <div style={{ background: 'var(--white)', border: '1px solid var(--lgray)', borderRadius: 10, padding: '1.5rem', maxWidth: 480, marginBottom: '2.5rem' }}>
            <h3 style={{ fontFamily: 'var(--ff-d)', fontSize: '1.05rem', marginBottom: '0.5rem' }}>
              <span className="de-content">Einmalig verifizieren</span><span className="en-content">Verify once</span>
            </h3>
            <p style={{ fontSize: '0.82rem', color: 'var(--gray)', lineHeight: 1.6, marginBottom: '1rem' }}>
              <span className="de-content">Mit E-Mail + PIN verifizieren Sie sich einmal für diese Sitzung — danach müssen Sie beim Klicken auf ein Angebot nicht erneut Ihre PIN eingeben.</span>
              <span className="en-content">Verify once with email + PIN for this session — after that, clicking through to an offer won't ask for your PIN again.</span>
            </p>
            <form onSubmit={handleVerify} style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <input type="email" required placeholder="ihre@email.de" value={email} onChange={e => setEmail(e.target.value)}
                style={{ flex: 1, minWidth: 160, padding: '0.6rem 0.8rem', border: '1px solid var(--lgray)', borderRadius: 6, fontSize: '0.85rem' }} />
              <input type="password" required inputMode="numeric" maxLength={4} placeholder="PIN" value={pin} onChange={e => setPin(e.target.value.replace(/\D/g, ''))}
                style={{ width: 80, padding: '0.6rem 0.6rem', border: '1px solid var(--lgray)', borderRadius: 6, fontSize: '0.85rem', textAlign: 'center' }} />
              <button type="submit" disabled={verifying}
                style={{ padding: '0.6rem 1.1rem', border: 'none', borderRadius: 6, background: 'var(--green)', color: '#fff', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer' }}>
                {verifying ? '…' : 'OK'}
              </button>
            </form>
            {verifyError && <p style={{ color: '#c0392b', fontSize: '0.8rem', marginTop: '0.6rem' }}>{verifyError}</p>}
          </div>
        ) : (
          <div style={{ background: 'rgba(27,107,58,0.08)', border: '1px solid var(--green)', borderRadius: 8, padding: '0.75rem 1.1rem', maxWidth: 480, marginBottom: '2rem', fontSize: '0.82rem', color: 'var(--green)' }}>
            ✓ <span className="de-content">Verifiziert als {session.email} — Klicks unten geben direkt EUROPAN, ohne erneute PIN-Eingabe.</span>
            <span className="en-content">Verified as {session.email} — clicks below earn EUROPAN directly, no PIN needed again.</span>
          </div>
        )}

        {categories.length > 1 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <button onClick={() => setCategory(null)} style={{ padding: '0.35rem 0.9rem', borderRadius: 100, border: '1px solid var(--lgray)', background: !category ? 'var(--green)' : '#fff', color: !category ? '#fff' : 'var(--gray)', fontSize: '0.78rem', cursor: 'pointer' }}>Alle</button>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{ padding: '0.35rem 0.9rem', borderRadius: 100, border: '1px solid var(--lgray)', background: category === cat ? 'var(--green)' : '#fff', color: category === cat ? '#fff' : 'var(--gray)', fontSize: '0.78rem', cursor: 'pointer' }}>{cat}</button>
            ))}
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {loadingOffers && <p style={{ color: 'var(--muted)' }}>Angebote werden geladen…</p>}
          {!loadingOffers && filtered.length === 0 && <p style={{ color: 'var(--muted)' }}>Noch keine Angebote.</p>}
          {filtered.map(o => (
            <div key={o.id} style={{ border: '1px solid var(--lgray)', borderRadius: 10, overflow: 'hidden', background: '#fff', display: 'flex', flexDirection: 'column' }}>
              {o.image_url && <img src={o.image_url} alt="" style={{ width: '100%', height: 140, objectFit: 'cover', background: 'var(--snow)' }} />}
              <div style={{ padding: '1.1rem 1.25rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--gold)', fontWeight: 700, marginBottom: '0.35rem' }}>{o.category}</div>
                <h3 style={{ fontFamily: 'var(--ff-d)', fontSize: '1.05rem', margin: '0 0 0.5rem' }}>{o.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray)', lineHeight: 1.6, flex: 1, marginBottom: '1rem' }}>{o.description}</p>
                <a href={offerLink(o.id)} target="_blank" rel="noopener" style={{ display: 'inline-block', textAlign: 'center', background: 'var(--green)', color: '#fff', padding: '0.55rem', borderRadius: 6, fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                  <span className="de-content">Angebot ansehen →</span><span className="en-content">View offer →</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
