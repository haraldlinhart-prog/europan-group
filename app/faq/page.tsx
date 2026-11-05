'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import { NavAccountLink } from '../_account/AccountLink'
import '../home.css'

type Faq = { id: string; q_de: string; q_en: string; a_de: React.ReactNode; a_en: React.ReactNode }

const FAQS: Faq[] = [
  {
    id: 'what-is-europan',
    q_de: 'Was ist EUROPAN eigentlich?',
    q_en: 'What actually is EUROPAN?',
    a_de: <>EUROPAN (EP) ist ein <strong>Bonus- und Cashback-Punktesystem</strong>. Sie erhalten Punkte bei Käufen auf shop.pan21.com und setzen sie dort gegen den Preis von Bestellungen ein. 1&nbsp;EP hat bei der Einlösung einen Wert von 1,00&nbsp;€. EUROPAN kann nicht gekauft, nicht in Euro ausgezahlt und nicht übertragen werden.</>,
    a_en: <>EUROPAN (EP) is a <strong>bonus and cashback points system</strong>. You receive points on purchases on shop.pan21.com and redeem them there against the price of orders. 1 EP has a redemption value of €1.00. EUROPAN cannot be bought, paid out in euro or transferred.</>,
  },
  {
    id: 'account-vs-balance',
    q_de: 'Muss ich mich registrieren, um EUROPAN zu sammeln?',
    q_en: 'Do I have to register to collect EUROPAN?',
    a_de: <>Nein. Zum Sammeln reicht Ihre <strong>E-Mail-Adresse</strong>. Mit Ihrem ersten Bonus entsteht automatisch ein einfaches Punktekonto zu dieser Adresse, ohne Unterlagen und ohne Prüfung.</>,
    a_en: <>No. Collecting only requires your <strong>email address</strong>. With your first bonus, a simple points account is created automatically for this address, with no documents and no review.</>,
  },
  {
    id: 'temporary-record',
    q_de: 'Warum sehe ich manchmal den Begriff „Konto" im Zusammenhang mit meinem Guthaben?',
    q_en: 'Why do I sometimes see the word "account" mentioned alongside my balance?',
    a_de: <>Aus rein technischen Gründen gibt es im Hintergrund einen einfachen Datensatz, der Ihre Punkte Ihrer E-Mail-Adresse zuordnet — dieser dient <strong>ausschließlich der Verwaltung Ihres EUROPAN-Guthabens</strong>. Es handelt sich dabei nicht um ein reguläres Bankkonto, es gibt keine Karte und keinen Kredit. Ansehen können Sie ihn jederzeit unter <a href="https://accounts.europan.group/dashboard?lang=de" style={{ color: 'var(--gold)', fontWeight: 700 }}>Mein Konto</a>.</>,
    a_en: <>For purely technical reasons, there is a simple record in the background that links your points to your email address — this exists <strong>solely to manage your EUROPAN balance</strong>. It is not a regular bank account: there is no card and no credit involved. You can view it any time under <a href="https://accounts.europan.group/dashboard?lang=en" style={{ color: 'var(--gold)', fontWeight: 700 }}>My account</a>.</>,
  },
  {
    id: 'check-balance',
    q_de: 'Wie prüfe ich mein aktuelles Guthaben?',
    q_en: 'How do I check my current balance?',
    a_de: <>Mit Ihrem ersten Bonus erhalten Sie per E-Mail eine 4-stellige PIN. Mit E-Mail + PIN können Sie Ihr Guthaben jederzeit auf teilnehmenden PAN21-Seiten abfragen, z.&nbsp;B. im EUROPAN-Bestellwidget auf shop.pan21.com. Guthaben und Buchungen sehen Sie außerdem unter <a href="https://accounts.europan.group/dashboard?lang=de" style={{ color: 'var(--gold)', fontWeight: 700 }}>Mein Konto</a>; dafür schicken wir Ihnen einen Anmeldelink an Ihre E-Mail-Adresse.</>,
    a_en: <>With your first bonus you'll receive a 4-digit PIN by email. With email + PIN you can check your balance any time on participating PAN21 sites, e.g. in the EUROPAN order widget on shop.pan21.com. You can also see your balance and bookings under <a href="https://accounts.europan.group/dashboard?lang=en" style={{ color: 'var(--gold)', fontWeight: 700 }}>My account</a>; we send a sign-in link to your email address for this.</>,
  },
  {
    id: 'doppel-wums',
    q_de: 'Was ist der Doppel-Wums-Bonus?',
    q_en: 'What is the Doppel-Wums bonus?',
    a_de: <>Wenn Ihr komplettes EUROPAN-Guthaben reicht, um eine Bestellung komplett zu bezahlen, erhalten Sie zusätzlich zum regulären EUROPAN-Bonus (2&nbsp;%) einen Doppel-Wums-Bonus von 3&nbsp;% obendrauf. Er gilt nur, wenn das Guthaben die Bestellung <strong>vollständig</strong> deckt — kein Teileinsatz.</>,
    a_en: <>If your full EUROPAN balance is enough to pay for an order completely, you get an extra Doppel-Wums bonus of 3% on top of the regular 2% EUROPAN bonus. It only applies when the balance covers the order <strong>in full</strong> — no partial use.</>,
  },
  {
    id: 'regulation',
    q_de: 'Ist EUROPAN eine Geldanlage?',
    q_en: 'Is EUROPAN an investment?',
    a_de: <>Nein. EUROPAN ist ein Bonus- und Cashback-Punktesystem und kein gehandelter Vermögenswert. Die Punkte lassen sich nur im PAN21 Shop und auf unseren eigenen Seiten einlösen.</>,
    a_en: <>No. EUROPAN is a bonus and cashback points system, not a traded asset. Points can only be redeemed in the PAN21 Shop and on our own sites.</>,
  },
]

export default function FaqPage() {
  useEffect(() => {
    const l = (window as any).__europanLang === 'en' ? 'en' : 'de'
    ;(window as any).setLang?.(l)

    const hash = window.location.hash.replace('#', '')
    if (hash) {
      const el = document.getElementById(hash) as HTMLDetailsElement | null
      if (el) {
        el.open = true
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'center' }), 100)
      }
    }
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--snow)' }}>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">)( EUROPAN</Link>
          <div className="nav-actions">
            <NavAccountLink />
            <div className="lang-switch">
              <button data-lang-btn="de" className="active" onClick={() => (window as any).setLang('de')}>DE</button>
              <button data-lang-btn="en" onClick={() => (window as any).setLang('en')}>EN</button>
            </div>
            <Link href="/bonus" className="btn-green"><span className="de-content">EUROPAN sammeln</span><span className="en-content">Collect EUROPAN</span></Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <p style={{ fontFamily: 'var(--ff-b)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>FAQ</p>
        <h1 style={{ fontFamily: 'var(--ff-d)', fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: 'var(--charcoal)', marginBottom: '0.75rem', lineHeight: 1.15 }}>
          <span className="de-content">Häufige Fragen</span><span className="en-content">Frequently Asked Questions</span>
        </h1>
        <p style={{ color: 'var(--gray)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          <span className="de-content">Kurze Antworten zu Ihren EUROPAN-Punkten und Ihrem Konto.</span>
          <span className="en-content">Short answers about your EUROPAN points and your account.</span>
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {FAQS.map(faq => (
            <details key={faq.id} id={faq.id} style={{ background: 'var(--white)', border: '1px solid var(--lgray)', borderRadius: '8px', padding: '1rem 1.25rem' }}>
              <summary style={{ cursor: 'pointer', fontFamily: 'var(--ff-b)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--charcoal)' }}>
                <span className="de-content">{faq.q_de}</span><span className="en-content">{faq.q_en}</span>
              </summary>
              <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--lgray)', color: 'var(--gray)', fontSize: '0.88rem', lineHeight: 1.75 }}>
                <span className="de-content">{faq.a_de}</span><span className="en-content">{faq.a_en}</span>
              </div>
            </details>
          ))}
        </div>

        <p style={{ marginTop: '2.5rem', fontSize: '0.85rem', color: 'var(--muted)', textAlign: 'center' }}>
          <span className="de-content">Frage nicht dabei? </span><span className="en-content">Question not here? </span>
          <Link href="/#contact" style={{ color: 'var(--gold)', fontWeight: 700 }}>
            <span className="de-content">Kontakt aufnehmen →</span><span className="en-content">Get in touch →</span>
          </Link>
        </p>
      </div>

      <footer style={{ borderTop: '1px solid var(--lgray)', padding: '2rem 1.5rem', textAlign: 'center' }}>
        <p style={{ fontSize: '0.72rem', color: 'var(--muted)', lineHeight: 1.7, maxWidth: '640px', margin: '0 auto' }}>
          © {new Date().getFullYear()} EUROPAN · <span className="de-content">Herausgegeben von Noble Private Capital Ltd (handelnd als „Noble Limited") · Eingetragen in Neuseeland · EUROPAN (EP) ist ein Bonus- und Cashback-Punktesystem.</span><span className="en-content">Issued by Noble Private Capital Ltd (trading as "Noble Limited") · Registered in New Zealand · EUROPAN (EP) is a bonus and cashback points system.</span>
        </p>
        <div className="legal-links" style={{ marginTop: '1rem' }}>
          <Link href="/impressum"><span className="de-content">Impressum</span><span className="en-content">Legal notice</span></Link>
          <Link href="/datenschutz"><span className="de-content">Datenschutz</span><span className="en-content">Privacy policy</span></Link>
        </div>
      </footer>
    </div>
  )
}
