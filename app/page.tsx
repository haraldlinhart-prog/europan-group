'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import './home.css'

const EP_RATE = 1.00

export default function HomePage() {
  const [rate, setRate] = useState(EP_RATE)
  const [formstart, setFormstart] = useState(0)
  const [contactStatus, setContactStatus] = useState<'idle'|'sending'|'ok'|'err'>('idle')
  const [contactErr, setContactErr] = useState('')

  useEffect(() => {
    fetch('/api/rate').then(r => r.json()).then(d => setRate(d.rate || EP_RATE)).catch(() => {})
    setFormstart(Date.now())
  }, [])

  async function handleContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('website')) return
    if (Date.now() - formstart < 3000) return
    const msg = String(data.get('message') || '')
    const noSpaces = msg.replace(/\s/g, '')
    if (noSpaces.length > 60 && noSpaces.length === msg.length) return
    setContactStatus('sending'); setContactErr('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: data.get('name'), email: data.get('email'), subject: data.get('subject'), message: data.get('message'), elapsed: Date.now() - formstart }),
      })
      if (res.ok) { setContactStatus('ok'); form.reset(); setFormstart(Date.now()) }
      else { const d = await res.json(); setContactErr(d.error || 'Fehler'); setContactStatus('err') }
    } catch { setContactErr('Netzwerkfehler'); setContactStatus('err') }
  }

  return (
    <div>
      {/* Nav */}
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            <div className="nav-logo-mark">EP</div>
            <div>
              <span className="nav-logo-text">EUROPAN</span>
              <span className="nav-logo-sub">Private Digital Currency</span>
            </div>
          </Link>
          <ul className="nav-links">
            <li><Link href="#about">About</Link></li>
            <li><Link href="#shop">Shop Bonus</Link></li>
            <li><Link href="#how">How It Works</Link></li>
            <li><Link href="#contact">Contact</Link></li>
            <li><Link href="/buy">Buy EP</Link></li>
          </ul>
          <div className="nav-actions">
            <a href="https://noble-limited.com" target="_blank" rel="noopener" className="nav-noble-link">Noble Limited ↗</a>
            <Link href="/buy" className="btn-green">Buy EUROPAN</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-stars">★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★ ★</div>
        <div className="container hero-inner">
          <div>
            <div className="hero-kicker">🇪🇺 Noble Private Currency Network</div>
            <h1 className="hero-h1">
              EUROPAN —<br />
              <em>The European</em><br />
              Private Currency
            </h1>
            <p className="hero-sub">
              EUROPAN (EP) is the private European digital currency of the Noble network.
              Stable, members-only, and uniquely linked to the PAN21 Shop bonus system.
              Buy with credit card or bank transfer.
            </p>
            <div className="hero-actions">
              <Link href="/buy" className="btn-green-lg">Buy EUROPAN →</Link>
              <Link href="#how" className="btn-ghost">How It Works</Link>
            </div>
          </div>
          <div className="coin-display">
            <div className="ep-coin-wrap">
              <div className="ep-ring" />
              <div className="ep-coin">
                <img src="/europan-logo.png" alt="EUROPAN" style={{ width: '110px', height: 'auto', marginBottom: '6px' }} />
                <span className="ep-name">EUROPAN</span>
              </div>
            </div>
            <div className="ep-info-card">
              <div className="ep-info-row">
                <span className="ep-info-label">Current Rate</span>
                <span className="ep-info-val">€{rate.toFixed(2)} / EP</span>
              </div>
              <div className="ep-info-row">
                <span className="ep-info-label">Network</span>
                <span className="ep-info-val">Noble Limited</span>
              </div>
              <div className="ep-info-row">
                <span className="ep-info-label">Shop Bonus</span>
                <span className="ep-info-val">Doppel-Wums ✓</span>
              </div>
              <div className="ep-info-row">
                <span className="ep-info-label">Type</span>
                <span className="ep-info-val">Private · EU</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="stats-bar">
        <div className="container stats-inner">
          {[
            { val: `€${rate.toFixed(2)}`, label: 'Per EUROPAN' },
            { val: '€1,000', label: 'Card limit' },
            { val: '5%', label: 'Doppel-Wums Bonus' },
            { val: '24/7', label: 'Account access' },
          ].map(s => (
            <div key={s.label} className="stat">
              <span className="stat-val">{s.val}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* About */}
      <section className="section about-sec" id="about">
        <div className="container about-inner">
          <div className="about-text">
            <span className="eyebrow">What is EUROPAN?</span>
            <h2 className="sec-title">
              European Private Currency<br />
              <em>For a Private Network</em>
            </h2>
            <div className="green-rule" />
            <p>
              EUROPAN (EP) is the private European utility currency of Noble Limited's investment network.
              Not traded on any public exchange, not speculative — a stable private digital currency
              for verified Noble members.
            </p>
            <p style={{ marginTop: '1rem' }}>
              What makes EUROPAN unique among the four Noble currencies is its direct connection
              to the PAN21 Shop: every purchase on shop.pan21.com earns you EUROPAN — and paying
              with EUROPAN activates the Doppel-Wums bonus of 5% back.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Noble members hold EUROPAN alongside N-Coin, SwissyCash and CryptoCoin
              in their private Noble dashboard.
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link href="/buy" className="btn-green">Buy EUROPAN →</Link>
              <a href="https://noble-limited.com/membership" target="_blank" rel="noopener" className="btn-outline-green">Noble Membership</a>
            </div>
          </div>
          <div className="about-props">
            {[
              { icon: '🛒', title: 'Shop Bonus Currency', desc: 'Every purchase on shop.pan21.com earns 2% EUROPAN. Pay with EUROPAN to activate the Doppel-Wums: 5% back.' },
              { icon: '🔒', title: 'Private Network Only', desc: 'EUROPAN is not publicly traded. Access is exclusively for verified Noble Limited members.' },
              { icon: '⚡', title: 'Instant Transfers', desc: 'Transfer EP to any Noble member instantly. Balances update in real time on your Noble dashboard.' },
              { icon: '🇪🇺', title: 'European Identity', desc: 'Designed for European entrepreneurs, investors and businesses within the PAN21 network.' },
            ].map(p => (
              <div key={p.title} className="prop-card">
                <span className="prop-icon">{p.icon}</span>
                <h3 className="prop-title">{p.title}</h3>
                <p className="prop-desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop Bonus */}
      <section className="shop-bonus-sec" id="shop">
        <div className="container">
          <span className="eyebrow" style={{ color: 'rgba(255,255,255,0.5)' }}>PAN21 Shop Integration</span>
          <h2 style={{ fontFamily: 'var(--ff-d)', fontSize: 'clamp(1.8rem,3vw,2.5rem)', fontWeight: 700, color: '#fff', marginBottom: '0.75rem', lineHeight: 1.2 }}>
            EUROPAN ist die Bonus-Währung<br />des PAN21 Shops
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.95rem', maxWidth: '520px', lineHeight: 1.8 }}>
            Firmengründungen, Gesellschaftsverwaltung und internationale Strukturen — alle Produkte auf
            shop.pan21.com belohnen Sie mit EUROPAN.
          </p>
          <div className="bonus-cards">
            {[
              { icon: '🧾', title: 'Kauf mit Stripe', desc: 'Zahlen Sie mit Kreditkarte auf shop.pan21.com und erhalten Sie automatisch 2% des Kaufpreises als EUROPAN gutgeschrieben.' },
              { icon: '🎉', title: 'Doppel-Wums', desc: 'Zahlen Sie Ihren Einkauf direkt mit EUROPAN oder einer anderen Noble-Währung — Sie erhalten 5% EUROPAN-Bonus zurück.' },
              { icon: '🤝', title: 'Affiliate Provision', desc: 'Empfehlen Sie den PAN21 Shop weiter. Bei jedem Kauf über Ihren Affiliate-Link erhalten Sie 5% des Kaufpreises in EUROPAN.' },
            ].map(c => (
              <div key={c.title} className="bonus-card">
                <div className="bonus-icon">{c.icon}</div>
                <h3 className="bonus-title">{c.title}</h3>
                <p className="bonus-text">{c.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="https://shop.pan21.com" target="_blank" rel="noopener" style={{ background: '#fff', color: 'var(--green)', padding: '0.9rem 2rem', borderRadius: '6px', fontWeight: 700, fontSize: '0.9rem', display: 'inline-block' }}>
              PAN21 Shop besuchen →
            </a>
            <Link href="/buy" style={{ background: 'rgba(255,255,255,0.12)', color: '#fff', border: '1px solid rgba(255,255,255,0.25)', padding: '0.9rem 2rem', borderRadius: '6px', fontWeight: 600, fontSize: '0.9rem', display: 'inline-block' }}>
              EUROPAN kaufen →
            </Link>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section how-sec" id="how">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="eyebrow">How to Buy</span>
            <h2 className="sec-title">Simple. <em>European. Private.</em></h2>
          </div>
          <div className="how-steps">
            {[
              { title: 'Choose your amount', desc: 'Up to €1,000 by credit card — instant delivery. Above €1,000 by bank transfer to Noble Private Capital Limited in Hong Kong.' },
              { title: 'Pay securely', desc: 'Card payments via Stripe (Visa, Mastercard, Amex, Apple Pay). Bank transfers reference your Noble account email for identification.' },
              { title: 'Receive EUROPAN', desc: 'Your EP balance is credited to your Noble Limited dashboard automatically. Card orders are instant — bank transfers within 1–3 business days.' },
              { title: 'Use in the network & shop', desc: 'Pay on shop.pan21.com with EP for the Doppel-Wums bonus, transfer to Noble members, or accumulate as a stable private store of value.' },
            ].map((s, i) => (
              <div key={i} className="how-step">
                <div className="how-num">{String(i+1).padStart(2,'0')}</div>
                <div>
                  <h3 className="how-title">{s.title}</h3>
                  <p className="how-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link href="/buy" className="btn-green-lg">Buy EUROPAN Now →</Link>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section trust-sec">
        <div className="container">
          <div style={{ marginBottom: '3.5rem' }}>
            <span className="eyebrow">Trust & Security</span>
            <h2 className="sec-title">Stable. <em>Private. Documented.</em></h2>
            <p className="sec-sub">EUROPAN is built on the same infrastructure as N-Coin, SwissyCash and CryptoCoin — with the added dimension of the PAN21 Shop integration.</p>
          </div>
          <div className="trust-grid">
            {[
              { title: 'Issued by Noble Limited', text: 'EUROPAN is issued and managed by Noble Limited, registered in England and Wales. All balances, transactions and credits are handled through the Noble platform.' },
              { title: 'Fixed 1:1 Rate — €1.00 = 1 EP', text: 'No speculation, no volatility, no gas fees. EUROPAN is pegged at €1.00. A stable private currency for stable private value.' },
              { title: 'Not Publicly Traded', text: 'EUROPAN is not listed on any exchange. Its stability comes precisely from its closed-network character — available only to Noble members.' },
              { title: 'Stripe-Secured Payments', text: 'Card purchases use Stripe, PCI-DSS compliant. Your card data is never stored on our servers.' },
              { title: 'Shop-Integrated Bonus', text: 'EUROPAN is the only Noble currency with a direct bonus integration on shop.pan21.com — earning you EP on every purchase.' },
              { title: 'API-Backed Balances', text: 'Every EP balance is maintained in the Noble Limited platform, accessible 24/7 via your secure member dashboard. Fully auditable.' },
            ].map(c => (
              <div key={c.title} className="trust-card">
                <h3 className="trust-title">{c.title}</h3>
                <p className="trust-text">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Noble banner */}
      <section className="noble-banner">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="eyebrow" style={{ color: 'rgba(76,175,125,0.6)' }}>Noble Currency Network</span>
          <h2 style={{ fontFamily: 'var(--ff-d)', fontSize: 'clamp(1.6rem,3vw,2.5rem)', fontWeight: 400, color: '#fff', marginBottom: '1rem', lineHeight: 1.2 }}>
            EUROPAN is one of four private currencies<br />issued by Noble Limited
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.9rem', maxWidth: '480px', margin: '0 auto 2.5rem', lineHeight: 1.8 }}>
            Noble members hold EUROPAN, N-Coin, SwissyCash and CryptoCoin in a single dashboard.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://noble-limited.com/join" target="_blank" rel="noopener" className="btn-green">Apply for Noble Membership →</a>
            <a href="https://n-coins.net" target="_blank" rel="noopener" className="btn-outline-green" style={{ borderColor: 'rgba(76,175,125,0.4)', color: 'rgba(76,175,125,0.8)' }}>N-Coin ↗</a>
            <a href="https://swissycash.com" target="_blank" rel="noopener" className="btn-outline-green" style={{ borderColor: 'rgba(76,175,125,0.4)', color: 'rgba(76,175,125,0.8)' }}>SwissyCash ↗</a>
            <a href="https://crypto-coins.org" target="_blank" rel="noopener" className="btn-outline-green" style={{ borderColor: 'rgba(76,175,125,0.4)', color: 'rgba(76,175,125,0.8)' }}>CryptoCoin ↗</a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section contact-sec" id="contact">
        <div className="container contact-inner">
          <div>
            <span className="eyebrow">Contact</span>
            <h2 className="sec-title">Get in <em>Touch</em></h2>
            <div className="green-rule" />
            <p style={{ fontSize: '0.9rem', color: 'var(--gray)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Questions about EUROPAN, your Noble account, or the PAN21 Shop bonus system?
              We respond within one business day.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { label: 'Email', val: 'info@europan.group', href: 'mailto:info@europan.group' },
                { label: 'Shop', val: 'shop.pan21.com', href: 'https://shop.pan21.com' },
                { label: 'Network', val: 'noble-limited.com', href: 'https://noble-limited.com' },
              ].map(c => (
                <div key={c.label} style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: 'var(--gray)' }}>
                  <span style={{ fontWeight: 600, color: 'var(--charcoal)', minWidth: '70px' }}>{c.label}</span>
                  <a href={c.href} style={{ color: 'var(--green)' }}>{c.val}</a>
                </div>
              ))}
            </div>
          </div>
          <div className="c-form">
            {contactStatus === 'ok' ? (
              <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>✓</div>
                <div style={{ fontFamily: 'var(--ff-d)', fontSize: '1.3rem', color: 'var(--charcoal)', marginBottom: '0.5rem' }}>Message Sent</div>
                <p style={{ color: 'var(--gray)', fontSize: '0.875rem' }}>We will respond within one business day.</p>
              </div>
            ) : (
              <form onSubmit={handleContact} noValidate>
                <div className="hp-field"><input type="text" name="website" tabIndex={-1} autoComplete="off" /></div>
                <div className="form-row">
                  <div className="fg"><label>Name *</label><input type="text" name="name" placeholder="Your name" required /></div>
                  <div className="fg"><label>Email *</label><input type="email" name="email" placeholder="your@email.com" required /></div>
                </div>
                <div className="fg">
                  <label>Subject</label>
                  <select name="subject">
                    <option value="">Please select</option>
                    <option value="Buy EUROPAN">Buy EUROPAN</option>
                    <option value="Account / Balance">Account / Balance</option>
                    <option value="Shop Bonus">PAN21 Shop Bonus</option>
                    <option value="Noble Membership">Noble Membership</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="fg"><label>Message *</label><textarea name="message" placeholder="How can we help?" required /></div>
                <button type="submit" className="form-submit" disabled={contactStatus === 'sending'}>
                  {contactStatus === 'sending' ? 'Sending…' : 'Send Message →'}
                </button>
                {contactStatus === 'err' && <p className="form-err">{contactErr}</p>}
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <img src="/europan-logo.png" alt="EUROPAN" style={{ height: '28px', width: 'auto', opacity: 0.4 }} />
          <div className="footer-links">
            <Link href="/buy">Buy EP</Link>
            <Link href="#about">About</Link>
            <Link href="#shop">Shop Bonus</Link>
            <Link href="#how">How It Works</Link>
            <Link href="#contact">Contact</Link>
            <a href="https://noble-limited.com" target="_blank" rel="noopener">Noble Limited</a>
            <a href="https://shop.pan21.com" target="_blank" rel="noopener">PAN21 Shop</a>
          </div>
          <p className="footer-legal">
            © {new Date().getFullYear()} EUROPAN · Issued by Noble Limited · Registered in England &amp; Wales ·
            EUROPAN (EP) is a private network currency, not a regulated financial instrument or publicly traded asset.
          </p>
        </div>
      </footer>
    </div>
  )
}
