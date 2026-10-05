import Link from 'next/link'

export function ImpressumLink() {
  return <Link href="/impressum"><span className="de-content">Impressum</span><span className="en-content">Legal notice</span></Link>
}

export function DatenschutzLink() {
  return <Link href="/datenschutz"><span className="de-content">Datenschutz</span><span className="en-content">Privacy policy</span></Link>
}

export default function LegalFooter() {
  return (
    <footer style={{ borderTop: '1px solid var(--lgray)', padding: '2rem 1.5rem', textAlign: 'center' }}>
      <div className="legal-links">
        <Link href="/"><span className="de-content">Startseite</span><span className="en-content">Home</span></Link>
        <Link href="/faq">FAQ</Link>
        <ImpressumLink />
        <DatenschutzLink />
      </div>
    </footer>
  )
}
