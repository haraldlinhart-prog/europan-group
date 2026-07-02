'use client'
import Link from 'next/link'

export default function MerchantsPage() {
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
            <li><Link href="/#about">About</Link></li>
            <li><Link href="/#shop">Shop Bonus</Link></li>
            <li><Link href="/merchants">For Merchants</Link></li>
            <li><Link href="/#contact">Contact</Link></li>
          </ul>
          <div>
            <a href="/#contact" className="btn-green">Become a Partner</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="section" style={{ paddingTop: '6rem', paddingBottom: '3rem' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <span className="eyebrow">For Merchants &amp; Shop Owners</span>
          <h1 style={{ fontFamily: 'var(--ff-d)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem' }}>
            Offer cashback in EUROPAN — without giving up your margin.
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted, #5a6b5d)', lineHeight: 1.8 }}>
            Cashback and loyalty programs don&apos;t work because customers do the math on your net price —
            they work because customers <em>feel</em> like they&apos;re paying less, while you keep your full
            listed price. That perception gap is real, well-documented purchasing psychology, and it&apos;s the
            actual mechanism behind every successful loyalty card, air-miles program and cashback portal.
            EUROPAN gives you that mechanism without building a loyalty program yourself.
          </p>
        </div>
      </section>

      {/* The argument */}
      <section className="section" style={{ background: '#F6F4F0', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <h2 className="sec-title" style={{ marginBottom: '1.5rem' }}>Why customers accept — and prefer — a higher listed price with cashback</h2>
          <p style={{ fontSize: '0.98rem', lineHeight: 1.85, marginBottom: '1.25rem' }}>
            When a customer sees &ldquo;€100, 5% back in EUROPAN,&rdquo; they don&apos;t mentally file that as
            &ldquo;€95.&rdquo; They file it as &ldquo;€100 — and I&apos;m getting something extra.&rdquo; The reward
            feels like a gift on top of the purchase, not a discount baked into it. That&apos;s precisely why
            retailers with strong loyalty programs can sustain higher list prices than pure discounters: the
            customer&apos;s attention shifts from &ldquo;is this the cheapest price&rdquo; to &ldquo;am I being
            rewarded for buying here.&rdquo;
          </p>
          <p style={{ fontSize: '0.98rem', lineHeight: 1.85, marginBottom: '1.25rem' }}>
            You keep 100% of your listed price. The EUROPAN bonus your customer earns doesn&apos;t come out of
            your margin — it&apos;s funded through your own affiliate/marketing budget, the same budget you&apos;d
            otherwise spend on discount codes, cashback portals or paid ads with a far less loyal result.
          </p>
          <p style={{ fontSize: '0.98rem', lineHeight: 1.85 }}>
            The difference between EUROPAN and a generic cashback portal: your customer&apos;s reward isn&apos;t a
            cash payout that leaves your ecosystem — it&apos;s network currency, spendable across the PAN21
            network (business addresses, company formation, and more). That keeps the relationship active and
            gives your customer a reason to come back to <em>you</em> to earn more, not just to whichever
            merchant currently has the best cashback rate.
          </p>
        </div>
      </section>

      {/* How it works for merchants */}
      <section className="section how-sec" id="how-merchants">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="eyebrow">For Merchants</span>
            <h2 className="sec-title">How the partnership works</h2>
          </div>
          <div className="how-steps">
            {[
              { title: 'You keep your price', desc: 'List your products at full price, exactly as today. Nothing changes in your checkout math.' },
              { title: 'Customer earns EUROPAN', desc: 'On a confirmed purchase, your customer is credited a percentage of the order value in EUROPAN — funded from your own affiliate budget, not deducted from your revenue.' },
              { title: 'You earn a commission too', desc: 'Every purchase made through your integration also credits your own EUROPAN balance as a partner commission — spendable across the PAN21 network.' },
              { title: 'Your customer comes back', desc: 'Unlike a one-off discount code, EUROPAN balances accumulate and stay tied to your brand as the place they earned it — a real reason to return.' },
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
            <a href="/#contact" className="btn-green-lg">Talk to us about becoming a partner →</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <img src="/europan-logo.png" alt="EUROPAN" style={{ height: '28px', width: 'auto', opacity: 0.4 }} />
          <div className="footer-links">
            <Link href="/buy">Buy EP</Link>
            <Link href="/#about">About</Link>
            <Link href="/#shop">Shop Bonus</Link>
            <Link href="/merchants">For Merchants</Link>
            <Link href="/#contact">Contact</Link>
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
