'use client'
import Link from 'next/link'
import { useEffect } from 'react'

export default function LegalShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const l = document.documentElement.classList.contains('en') ? 'en' : 'de'
    ;(window as any).setLang?.(l)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--snow)', display: 'flex', flexDirection: 'column' }}>
      <nav className="nav">
        <div className="nav-inner">
          <Link href="/" className="nav-logo">)( EUROPAN</Link>
          <div className="nav-actions">
            <div className="lang-switch">
              <button data-lang-btn="de" className="active" onClick={() => (window as any).setLang('de')}>DE</button>
              <button data-lang-btn="en" onClick={() => (window as any).setLang('en')}>EN</button>
            </div>
          </div>
        </div>
      </nav>

      <main className="legal-page">{children}</main>

      <footer style={{ borderTop: '1px solid var(--lgray)', padding: '2rem 1.5rem', textAlign: 'center' }}>
        <div className="legal-links">
          <Link href="/"><span className="de-content">Startseite</span><span className="en-content">Home</span></Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/impressum"><span className="de-content">Impressum</span><span className="en-content">Legal notice</span></Link>
          <Link href="/datenschutz"><span className="de-content">Datenschutz</span><span className="en-content">Privacy policy</span></Link>
        </div>
      </footer>
    </div>
  )
}
