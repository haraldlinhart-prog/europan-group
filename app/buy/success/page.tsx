'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect } from 'react'
import '../../globals.css'

function SuccessContent() {
  const params = useSearchParams()
  const ep = params.get('ep') || '0'
  const email = params.get('email') || ''

  useEffect(() => {
    const l = document.documentElement.classList.contains('en') ? 'en' : 'de'
    ;(window as any).setLang?.(l)
  }, [])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--snow)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '480px', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', background: 'rgba(27,107,58,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '1.75rem' }}>✓</div>
        <div style={{ fontFamily: 'var(--ff-d)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--charcoal)', marginBottom: '0.75rem' }}>
          <span className="de-content">Zahlung erfolgreich</span><span className="en-content">Payment Successful</span>
        </div>
        <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          <span className="de-content">Ihr Guthaben von <strong style={{ color: 'var(--green)' }}>{parseFloat(ep).toFixed(2)} EP</strong> wurde Ihrem Noble-Konto{email && <> ({email})</>} gutgeschrieben.</span>
          <span className="en-content">Your balance of <strong style={{ color: 'var(--green)' }}>{parseFloat(ep).toFixed(2)} EP</strong> has been credited to your Noble account{email && <> at <strong>{email}</strong></>}.</span>
        </p>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
          <span className="de-content">Setzen Sie Ihr EUROPAN auf shop.pan21.com für den Doppel-Wums-Bonus ein — 5 % zurück bei jedem mit EP bezahlten Kauf.</span>
          <span className="en-content">Use your EUROPAN on shop.pan21.com for the Doppel-Wums bonus — 5% back on every purchase paid with EP.</span>
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://noble-limited.com/dashboard" target="_blank" rel="noopener" className="btn-green"><span className="de-content">Dashboard ansehen →</span><span className="en-content">View Dashboard →</span></a>
          <a href="https://shop.pan21.com" target="_blank" rel="noopener" className="btn-outline-green">PAN21 Shop →</a>
          <Link href="/" className="btn-ghost"><span className="de-content">← Zurück</span><span className="en-content">← Back</span></Link>
        </div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading…</div>}>
      <SuccessContent />
    </Suspense>
  )
}
