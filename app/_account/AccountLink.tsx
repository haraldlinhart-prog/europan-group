import type { CSSProperties, ReactNode } from 'react'

const ACCOUNT_URL = 'https://accounts.europan.group/dashboard'

// One link per language, switched by the same CSS classes as all other bilingual
// text, so the account opens in the language the visitor is reading.
export default function AccountLink({ de, en, className = '', style }: {
  de: ReactNode
  en: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <>
      <a href={`${ACCOUNT_URL}?lang=de`} className={`de-content ${className}`} style={style}>{de}</a>
      <a href={`${ACCOUNT_URL}?lang=en`} className={`en-content ${className}`} style={style}>{en}</a>
    </>
  )
}

// The entry in the page header, the same on every page.
export function NavAccountLink() {
  return <AccountLink de="Mein Konto" en="My account" className="nav-account" />
}
