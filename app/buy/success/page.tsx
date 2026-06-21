'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import '../../globals.css'

function SuccessContent() {
  const params = useSearchParams()
  const ep = params.get('ep') || '0'
  const email = params.get('email') || ''
  return (
    <div style={{ minHeight: '100vh', background: 'var(--snow)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ maxWidth: '480px', textAlign: 'center' }}>
        <div style={{ width: '72px', height: '72px', background: 'rgba(27,107,58,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', fontSize: '1.75rem' }}>✓</div>
        <div style={{ fontFamily: 'var(--ff-d)', fontSize: '2.2rem', fontWeight: 700, color: 'var(--charcoal)', marginBottom: '0.75rem' }}>Payment Successful</div>
        <p style={{ color: 'var(--gray)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
          Your balance of <strong style={{ color: 'var(--green)' }}>{parseFloat(ep).toFixed(2)} EP</strong> has been credited to your Noble account{email && <> at <strong>{email}</strong></>}.
        </p>
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.75, marginBottom: '2.5rem' }}>
          Use your EUROPAN on shop.pan21.com for the Doppel-Wums bonus — 5% back on every purchase paid with EP.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://noble-limited.com/dashboard" target="_blank" rel="noopener" className="btn-green">View Dashboard →</a>
          <a href="https://shop.pan21.com" target="_blank" rel="noopener" className="btn-outline-green">PAN21 Shop →</a>
          <Link href="/" className="btn-ghost">← Back</Link>
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
