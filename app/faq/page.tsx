'use client'
import Link from 'next/link'
import { useEffect } from 'react'
import '../home.css'

type Faq = { id: string; q_de: string; q_en: string; a_de: React.ReactNode; a_en: React.ReactNode }

const FAQS: Faq[] = [
  {
    id: 'what-is-europan',
    q_de: 'Was ist EUROPAN eigentlich?',
    q_en: 'What actually is EUROPAN?',
    a_de: <>EUROPAN (EP) ist ein <strong>Prepaid-Guthaben</strong> für das PAN21-Netzwerk. Sie kaufen Guthaben — 1&nbsp;€ Gutscheinwert entspricht 1&nbsp;€ EUROPAN — und setzen es direkt gegen den Preis von Buchungen bei teilnehmenden PAN21-Seiten ein, z.&nbsp;B. auf shop.pan21.com oder pan-office.de.</>,
    a_en: <>EUROPAN (EP) is a <strong>prepaid balance</strong> for the PAN21 network. You purchase balance — €1 of voucher value equals €1 of EUROPAN — and redeem it directly against the price of bookings on participating PAN21 sites, e.g. shop.pan21.com or pan-office.de.</>,
  },
  {
    id: 'account-vs-balance',
    q_de: 'Brauche ich ein Konto bei noble-limited.com, um EUROPAN zu kaufen?',
    q_en: 'Do I need an account at noble-limited.com to buy EUROPAN?',
    a_de: <>Nein. Für den Kauf reicht Ihre <strong>E-Mail-Adresse</strong> — mehr nicht. EUROPAN-Guthaben und eine vollständige Registrierung bei Noble Limited sind zwei unterschiedliche Dinge:
      <ul style={{ margin: '0.6rem 0 0', paddingLeft: '1.2rem', lineHeight: 1.8 }}>
        <li><strong>EUROPAN-Guthaben</strong> — einfaches Prepaid-Guthaben, verknüpft mit Ihrer E-Mail. Kein Login, keine Unterlagen, keine Prüfung nötig.</li>
        <li><strong>Noble-Registrierung</strong> — eine separate, vollständige Mitgliedschaft bei noble-limited.com mit Profil und Login, die Sie <em>optional</em> und unabhängig vom EUROPAN-Kauf einrichten können.</li>
      </ul>
    </>,
    a_en: <>No. Purchasing only requires your <strong>email address</strong> — nothing else. EUROPAN balance and a full Noble Limited registration are two separate things:
      <ul style={{ margin: '0.6rem 0 0', paddingLeft: '1.2rem', lineHeight: 1.8 }}>
        <li><strong>EUROPAN balance</strong> — a simple prepaid balance linked to your email. No login, no documents, no review needed.</li>
        <li><strong>Noble registration</strong> — a separate, full membership at noble-limited.com with a profile and login, which you can set up <em>optionally</em>, independent of buying EUROPAN.</li>
      </ul>
    </>,
  },
  {
    id: 'temporary-record',
    q_de: 'Warum sehe ich manchmal den Begriff „Konto" im Zusammenhang mit meinem Guthaben?',
    q_en: 'Why do I sometimes see the word "account" mentioned alongside my balance?',
    a_de: <>Aus rein technischen Gründen legt unser Partner Noble Limited im Hintergrund einen einfachen Datensatz an, der Ihr Guthaben Ihrer E-Mail-Adresse zuordnet — dieser dient <strong>ausschließlich der Verwaltung Ihres EUROPAN-Guthabens</strong>. Es handelt sich dabei nicht um ein reguläres Bankkonto, es gibt kein Login, keine Karte und keinen Kredit. Dieser Datensatz besteht, solange Sie Guthaben halten, und ist unabhängig von einer vollständigen Noble-Registrierung.</>,
    a_en: <>For purely technical reasons, our partner Noble Limited creates a simple record in the background that links your balance to your email address — this exists <strong>solely to manage your EUROPAN balance</strong>. It is not a regular bank account: there is no login, no card, and no credit involved. This record exists for as long as you hold a balance, independent of a full Noble registration.</>,
  },
  {
    id: 'check-balance',
    q_de: 'Wie prüfe ich mein aktuelles Guthaben?',
    q_en: 'How do I check my current balance?',
    a_de: <>Nach dem Kauf erhalten Sie per E-Mail eine 4-stellige PIN. Mit E-Mail + PIN können Sie Ihr Guthaben jederzeit auf teilnehmenden PAN21-Seiten abfragen, z.&nbsp;B. im EUROPAN-Bestellwidget bei pan-office.de oder shop.pan21.com.</>,
    a_en: <>After purchase you'll receive a 4-digit PIN by email. With email + PIN you can check your balance any time on participating PAN21 sites, e.g. in the EUROPAN order widget on pan-office.de or shop.pan21.com.</>,
  },
  {
    id: 'doppel-wums',
    q_de: 'Was ist der Doppel-Wums-Bonus?',
    q_en: 'What is the Doppel-Wums bonus?',
    a_de: <>Wenn Ihr komplettes EUROPAN-Guthaben reicht, um eine Bestellung komplett zu bezahlen, erhalten Sie zusätzlich zum regulären EUROPAN-Bonus (2&nbsp;%) einen Doppel-Wums-Bonus von 3&nbsp;% obendrauf. Er gilt nur, wenn das Guthaben die Bestellung <strong>vollständig</strong> deckt — kein Teileinsatz.</>,
    a_en: <>If your full EUROPAN balance is enough to pay for an order completely, you get an extra Doppel-Wums bonus of 3% on top of the regular 2% EUROPAN bonus. It only applies when the balance covers the order <strong>in full</strong> — no partial use.</>,
  },
  {
    id: 'full-registration',
    q_de: 'Lohnt sich die vollständige Registrierung bei Noble Limited?',
    q_en: 'Is a full Noble Limited registration worth it?',
    a_de: <>Für reines EUROPAN-Guthaben nicht zwingend nötig. Eine vollständige Registrierung bei <a href="https://www.noble-limited.com/join?src=europan" target="_blank" rel="noopener" style={{ color: 'var(--gold)', fontWeight: 700 }}>noble-limited.com</a> lohnt sich, wenn Sie ein Login mit Dashboard, Transaktionsübersicht und Zugriff auf weitere Noble-Netzwerkwährungen möchten. Sie können das jederzeit unabhängig vom EUROPAN-Kauf nachholen — mit derselben E-Mail-Adresse wird Ihr vorhandenes Guthaben dabei automatisch übernommen.</>,
    a_en: <>Not strictly necessary for plain EUROPAN balance. A full registration at <a href="https://www.noble-limited.com/join?src=europan" target="_blank" rel="noopener" style={{ color: 'var(--gold)', fontWeight: 700 }}>noble-limited.com</a> is worth it if you want a login with a dashboard, transaction history, and access to the other Noble network currencies. You can do this any time, independent of buying EUROPAN — using the same email will automatically carry your existing balance over.</>,
  },
  {
    id: 'regulation',
    q_de: 'Ist EUROPAN reguliert oder handelt es sich um eine Geldanlage?',
    q_en: 'Is EUROPAN regulated, or is it an investment?',
    a_de: <>Nein. EUROPAN ist eine private Netzwerkwährung, kein reguliertes Finanzinstrument und kein öffentlich gehandelter Vermögenswert. Es dient ausschließlich der Zahlung innerhalb des PAN21-Netzwerks.</>,
    a_en: <>No. EUROPAN is a private network currency, not a regulated financial instrument or publicly traded asset. It exists solely for payment within the PAN21 network.</>,
  },
]

export default function FaqPage() {
  useEffect(() => {
    const l = document.documentElement.classList.contains('en') ? 'en' : 'de'
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
            <div className="lang-switch">
              <button data-lang-btn="de" className="active" onClick={() => (window as any).setLang('de')}>DE</button>
              <button data-lang-btn="en" onClick={() => (window as any).setLang('en')}>EN</button>
            </div>
            <Link href="/buy" className="btn-green"><span className="de-content">EUROPAN kaufen</span><span className="en-content">Buy EUROPAN</span></Link>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '3rem 1.5rem 5rem' }}>
        <p style={{ fontFamily: 'var(--ff-b)', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '0.5rem' }}>FAQ</p>
        <h1 style={{ fontFamily: 'var(--ff-d)', fontSize: 'clamp(1.8rem,4vw,2.6rem)', color: 'var(--charcoal)', marginBottom: '0.75rem', lineHeight: 1.15 }}>
          <span className="de-content">Häufige Fragen</span><span className="en-content">Frequently Asked Questions</span>
        </h1>
        <p style={{ color: 'var(--gray)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
          <span className="de-content">Kurze Antworten zu EUROPAN-Guthaben, Ihrer E-Mail-Verknüpfung und der optionalen Registrierung bei Noble Limited.</span>
          <span className="en-content">Short answers about EUROPAN balance, your email link, and the optional Noble Limited registration.</span>
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
          © {new Date().getFullYear()} EUROPAN · <span className="de-content">Herausgegeben von Noble Private Capital Ltd (handelnd als „Noble Limited") · Eingetragen in Neuseeland · EUROPAN (EP) ist eine private Netzwerkwährung, kein reguliertes Finanzinstrument und kein öffentlich gehandelter Vermögenswert.</span><span className="en-content">Issued by Noble Private Capital Ltd (trading as "Noble Limited") · Registered in New Zealand · EUROPAN (EP) is a private network currency, not a regulated financial instrument or publicly traded asset.</span>
        </p>
      </footer>
    </div>
  )
}
