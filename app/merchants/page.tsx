'use client'
import Link from 'next/link'
import { useEffect } from 'react'

export default function MerchantsPage() {
  useEffect(() => {
    const l = document.documentElement.classList.contains('en') ? 'en' : 'de'
    ;(window as any).setLang?.(l)
  }, [])

  const steps = [
    { title_de: 'Sie behalten Ihren Preis', title_en: 'You keep your price', desc_de: 'Listen Sie Ihre Produkte zum vollen Preis, genau wie heute. An Ihrer Checkout-Rechnung ändert sich nichts.', desc_en: 'List your products at full price, exactly as today. Nothing changes in your checkout math.' },
    { title_de: 'Kunde erhält EUROPAN', title_en: 'Customer earns EUROPAN', desc_de: 'Bei einem bestätigten Kauf wird Ihrem Kunden ein Prozentsatz des Bestellwerts in EUROPAN gutgeschrieben — finanziert aus Ihrem eigenen Affiliate-Budget, nicht von Ihrem Umsatz abgezogen.', desc_en: 'On a confirmed purchase, your customer is credited a percentage of the order value in EUROPAN — funded from your own affiliate budget, not deducted from your revenue.' },
    { title_de: 'Auch Sie verdienen eine Provision', title_en: 'You earn a commission too', desc_de: 'Jeder Kauf über Ihre Integration schreibt zusätzlich Ihrem eigenen EUROPAN-Guthaben eine Partner-Provision gut — einsetzbar im gesamten PAN21-Netzwerk.', desc_en: 'Every purchase made through your integration also credits your own EUROPAN balance as a partner commission — spendable across the PAN21 network.' },
    { title_de: 'Ihr Kunde kommt wieder', title_en: 'Your customer comes back', desc_de: 'Anders als ein einmaliger Rabattcode bleibt EUROPAN-Guthaben bestehen und an Ihre Marke als Entstehungsort gebunden — ein echter Grund wiederzukommen.', desc_en: 'Unlike a one-off discount code, EUROPAN balances accumulate and stay tied to your brand as the place they earned it — a real reason to return.' },
  ]

  return (
    <div>
      {/* Nav */}
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/" className="nav-logo">
            <img src="/europan-logo-header.png" alt="EUROPAN" style={{ height: "30px", width: "auto", filter: "invert(1)" }} />
          </Link>
          <ul className="nav-links">
            <li><Link href="/#about"><span className="de-content">Über uns</span><span className="en-content">About</span></Link></li>
            <li><Link href="/#shop"><span className="de-content">Shop-Bonus</span><span className="en-content">Shop Bonus</span></Link></li>
            <li><Link href="/merchants"><span className="de-content">Für Händler</span><span className="en-content">For Merchants</span></Link></li>
            <li><Link href="/#contact"><span className="de-content">Kontakt</span><span className="en-content">Contact</span></Link></li>
          </ul>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div className="lang-switch">
              <button data-lang-btn="de" className="active" onClick={() => (window as any).setLang('de')}>DE</button>
              <button data-lang-btn="en" onClick={() => (window as any).setLang('en')}>EN</button>
            </div>
            <a href="/#contact" className="btn-green"><span className="de-content">Partner werden</span><span className="en-content">Become a Partner</span></a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="section" style={{ paddingTop: '6rem', paddingBottom: '3rem' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <span className="eyebrow"><span className="de-content">Für Händler & Shop-Betreiber</span><span className="en-content">For Merchants &amp; Shop Owners</span></span>
          <h1 style={{ fontFamily: 'var(--ff-d)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 700, lineHeight: 1.15, marginBottom: '1.25rem' }}>
            <span className="de-content">Cashback in EUROPAN anbieten — ohne Ihre Marge aufzugeben.</span>
            <span className="en-content">Offer cashback in EUROPAN — without giving up your margin.</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-muted, #5a6b5d)', lineHeight: 1.8 }}>
            <span className="de-content">Cashback- und Bonusprogramme funktionieren nicht, weil Kunden Ihren Nettopreis nachrechnen — sie funktionieren, weil Kunden das Gefühl haben, weniger zu zahlen, während Sie Ihren vollen Listenpreis behalten. Diese Wahrnehmungslücke ist real, gut dokumentierte Kaufpsychologie, und genau das ist der Mechanismus hinter jeder erfolgreichen Kundenkarte, jedem Meilenprogramm und jedem Cashback-Portal. EUROPAN gibt Ihnen diesen Mechanismus, ohne dass Sie selbst ein Bonusprogramm aufbauen müssen.</span>
            <span className="en-content">Cashback and loyalty programs don&apos;t work because customers do the math on your net price — they work because customers <em>feel</em> like they&apos;re paying less, while you keep your full listed price. That perception gap is real, well-documented purchasing psychology, and it&apos;s the actual mechanism behind every successful loyalty card, air-miles program and cashback portal. EUROPAN gives you that mechanism without building a loyalty program yourself.</span>
          </p>
        </div>
      </section>

      {/* The argument */}
      <section className="section" style={{ background: '#F6F4F0', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <h2 className="sec-title" style={{ marginBottom: '1.5rem' }}>
            <span className="de-content">Warum Kunden einen höheren Listenpreis mit Cashback akzeptieren — und sogar bevorzugen</span>
            <span className="en-content">Why customers accept — and prefer — a higher listed price with cashback</span>
          </h2>
          <p style={{ fontSize: '0.98rem', lineHeight: 1.85, marginBottom: '1.25rem' }}>
            <span className="de-content">Sieht ein Kunde „100 €, 5 % zurück in EUROPAN", rechnet er das gedanklich nicht zu „95 €" um. Er verbucht es als „100 € — und ich bekomme noch etwas obendrauf". Der Bonus fühlt sich wie ein Geschenk zum Kauf an, nicht wie ein eingepreister Rabatt. Genau deshalb können Händler mit starken Bonusprogrammen höhere Listenpreise halten als reine Rabattanbieter: Die Aufmerksamkeit des Kunden verschiebt sich von „ist das der günstigste Preis" zu „werde ich fürs Kaufen hier belohnt".</span>
            <span className="en-content">When a customer sees &ldquo;€100, 5% back in EUROPAN,&rdquo; they don&apos;t mentally file that as &ldquo;€95.&rdquo; They file it as &ldquo;€100 — and I&apos;m getting something extra.&rdquo; The reward feels like a gift on top of the purchase, not a discount baked into it. That&apos;s precisely why retailers with strong loyalty programs can sustain higher list prices than pure discounters: the customer&apos;s attention shifts from &ldquo;is this the cheapest price&rdquo; to &ldquo;am I being rewarded for buying here.&rdquo;</span>
          </p>
          <p style={{ fontSize: '0.98rem', lineHeight: 1.85, marginBottom: '1.25rem' }}>
            <span className="de-content">Sie behalten 100 % Ihres Listenpreises. Der EUROPAN-Bonus, den Ihr Kunde verdient, geht nicht von Ihrer Marge ab — er wird aus Ihrem eigenen Affiliate-/Marketingbudget finanziert, demselben Budget, das Sie sonst für Rabattcodes, Cashback-Portale oder bezahlte Werbung mit deutlich weniger loyalem Ergebnis ausgeben würden.</span>
            <span className="en-content">You keep 100% of your listed price. The EUROPAN bonus your customer earns doesn&apos;t come out of your margin — it&apos;s funded through your own affiliate/marketing budget, the same budget you&apos;d otherwise spend on discount codes, cashback portals or paid ads with a far less loyal result.</span>
          </p>
          <p style={{ fontSize: '0.98rem', lineHeight: 1.85 }}>
            <span className="de-content">Der Unterschied zwischen EUROPAN und einem gewöhnlichen Cashback-Portal: Die Belohnung Ihres Kunden ist keine Bar-Auszahlung, die Ihr Ökosystem verlässt — sie ist Netzwerkwährung, einsetzbar im gesamten PAN21-Netzwerk (Geschäftsadressen, Firmengründung und mehr). Das hält die Beziehung aktiv und gibt Ihrem Kunden einen Grund, zu <em>Ihnen</em> zurückzukommen, um mehr zu verdienen — nicht einfach zum Händler mit der gerade besten Cashback-Rate.</span>
            <span className="en-content">The difference between EUROPAN and a generic cashback portal: your customer&apos;s reward isn&apos;t a cash payout that leaves your ecosystem — it&apos;s network currency, spendable across the PAN21 network (business addresses, company formation, and more). That keeps the relationship active and gives your customer a reason to come back to <em>you</em> to earn more, not just to whichever merchant currently has the best cashback rate.</span>
          </p>
        </div>
      </section>

      {/* How it works for merchants */}
      <section className="section how-sec" id="how-merchants">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span className="eyebrow"><span className="de-content">Für Händler</span><span className="en-content">For Merchants</span></span>
            <h2 className="sec-title"><span className="de-content">So funktioniert die Partnerschaft</span><span className="en-content">How the partnership works</span></h2>
          </div>
          <div className="how-steps">
            {steps.map((s, i) => (
              <div key={i} className="how-step">
                <div className="how-num">{String(i+1).padStart(2,'0')}</div>
                <div>
                  <h3 className="how-title"><span className="de-content">{s.title_de}</span><span className="en-content">{s.title_en}</span></h3>
                  <p className="how-desc"><span className="de-content">{s.desc_de}</span><span className="en-content">{s.desc_en}</span></p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <a href="/#contact" className="btn-green-lg"><span className="de-content">Sprechen Sie mit uns über eine Partnerschaft →</span><span className="en-content">Talk to us about becoming a partner →</span></a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-inner">
          <img src="/europan-logo.png" alt="EUROPAN" style={{ height: '28px', width: 'auto', opacity: 0.4 }} />
          <div className="footer-links">
            <Link href="/buy"><span className="de-content">EP kaufen</span><span className="en-content">Buy EP</span></Link>
            <Link href="/#about"><span className="de-content">Über uns</span><span className="en-content">About</span></Link>
            <Link href="/#shop"><span className="de-content">Shop-Bonus</span><span className="en-content">Shop Bonus</span></Link>
            <Link href="/merchants"><span className="de-content">Für Händler</span><span className="en-content">For Merchants</span></Link>
            <Link href="/#contact"><span className="de-content">Kontakt</span><span className="en-content">Contact</span></Link>
            <a href="https://noble-limited.com" target="_blank" rel="noopener">Noble Limited</a>
            <a href="https://shop.pan21.com" target="_blank" rel="noopener">PAN21 Shop</a>
          </div>
          <p className="footer-legal">
            © {new Date().getFullYear()} EUROPAN · <span className="de-content">Herausgegeben von Noble Private Capital Ltd (handelnd als „Noble Limited") · Eingetragen in Neuseeland · EUROPAN (EP) ist eine private Netzwerkwährung, kein reguliertes Finanzinstrument und kein öffentlich gehandelter Vermögenswert.</span><span className="en-content">Issued by Noble Private Capital Ltd (trading as "Noble Limited") · Registered in New Zealand · EUROPAN (EP) is a private network currency, not a regulated financial instrument or publicly traded asset.</span>
          </p>
        </div>
      </footer>
    </div>
  )
}
