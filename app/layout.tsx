import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://europan.group'),
  title: {
    default: 'EUROPAN (EP) — Private Digital Currency | europan.group',
    template: '%s | EUROPAN',
  },
  description:
    'EUROPAN (EP) is the European private digital currency of the Noble Limited network. Buy EUROPAN with credit card up to €1,000 or via bank transfer. A stable, members-only virtual currency for Noble members across Europe.',
  keywords: [
    'EUROPAN', 'EP', 'europan.group', 'EUROPAN kaufen', 'private digital currency Europe',
    'cryptocurrency', 'crypto', 'digital currency', 'virtual currency', 'private cryptocurrency',
    'European digital currency', 'digital asset', 'crypto token', 'utility token',
    'private coin', 'digital coin', 'noble network', 'Noble Limited', 'member currency',
    'internal currency', 'network token', 'stable private currency',
    'buy crypto Europe', 'crypto payment Europe', 'digital payment EU',
    'Europäische Digitalwährung', 'Kryptowährung Europa', 'digitale Währung',
    'virtuelle Währung', 'private Kryptowährung', 'Netzwerkwährung',
    'EUROPAN bonus', 'shop bonus', 'PAN21', 'pan21.com',
  ],
  openGraph: {
    type: 'website',
    url: 'https://europan.group',
    siteName: 'EUROPAN',
    title: 'EUROPAN (EP) — The European Private Digital Currency',
    description: 'Buy EUROPAN (EP) — the private European digital currency of the Noble network. Stable, secure, members only.',
    locale: 'en_GB',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://europan.group' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        {/* Matomo — reuse ID 93 until new ID assigned */}
        <script dangerouslySetInnerHTML={{ __html: `var _paq=window._paq=window._paq||[];_paq.push(['requireConsent']);_paq.push(['trackPageView']);_paq.push(['enableLinkTracking']);(function(){var u="//counter.ixan.org/";_paq.push(['setTrackerUrl',u+'matomo.php']);_paq.push(['setSiteId','93']);var d=document,g=d.createElement('script'),s=d.getElementsByTagName('script')[0];g.async=true;g.src=u+'matomo.js';s.parentNode.insertBefore(g,s);})();` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FinancialProduct",
          "name": "EUROPAN",
          "alternateName": ["EP", "EUROPAN EP"],
          "description": "EUROPAN (EP) is a private European digital currency issued within the Noble Limited private investment network. 1 EP = €1.00 EUR. Fixed rate, no volatility.",
          "url": "https://europan.group",
          "provider": { "@type": "Organization", "name": "Noble Limited", "url": "https://noble-limited.com" },
          "feesAndCommissionsSpecification": "1 EP = €1.00 EUR — Fixed rate",
          "category": "Private Digital Currency / European Virtual Currency",
        })}} />
        <meta name="ai-crawlers" content="allowed" />
      </head>
      <body>{children}</body>
    </html>
  )
}
