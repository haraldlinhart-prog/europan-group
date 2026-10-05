import type { Metadata } from 'next'
import LegalShell from '../_legal/LegalShell'

export const metadata: Metadata = {
  title: 'Impressum / Legal notice',
  description: 'Impressum von europan.group – Angaben gemäß § 5 DDG. Legal notice of europan.group.',
  alternates: { canonical: 'https://www.europan.group/impressum' },
}

export default function ImpressumPage() {
  return (
    <LegalShell>
      <div className="de-block">
        <h1>Impressum</h1>
        <p>Angaben gemäß § 5 DDG</p>
        <p>
          PAN21.com International LLC<br />
          7533 South Center View CT, STE R<br />
          West Jordan, UT 84084<br />
          USA
        </p>
        <p>
          Vertreten durch: Harald Linhart<br />
          Registrierung: Utah Division of Corporations, Registernummer 14723637-0163
        </p>
        <h2>Kontakt</h2>
        <p>
          Telefon: <a href="tel:+493056844500">+49 30 5684450-0</a><br />
          E-Mail: <a href="mailto:dsgvo@pan21.com">dsgvo@pan21.com</a>
        </p>
        <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
        <p>Harald Linhart, Anschrift wie oben</p>
        <h2>Verbraucherstreitbeilegung</h2>
        <p>Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      </div>

      <div className="en-block">
        <h1>Legal notice</h1>
        <p>Information pursuant to § 5 DDG (German Digital Services Act)</p>
        <p>
          PAN21.com International LLC<br />
          7533 South Center View CT, STE R<br />
          West Jordan, UT 84084<br />
          USA
        </p>
        <p>
          Represented by: Harald Linhart<br />
          Registration: Utah Division of Corporations, registration no. 14723637-0163
        </p>
        <h2>Contact</h2>
        <p>
          Phone: <a href="tel:+493056844500">+49 30 5684450-0</a><br />
          Email: <a href="mailto:dsgvo@pan21.com">dsgvo@pan21.com</a>
        </p>
        <h2>Responsible for content pursuant to § 18 (2) MStV</h2>
        <p>Harald Linhart, address as above</p>
        <h2>Consumer dispute resolution</h2>
        <p>We are neither willing nor obliged to take part in dispute resolution proceedings before a consumer arbitration board.</p>
      </div>
    </LegalShell>
  )
}
