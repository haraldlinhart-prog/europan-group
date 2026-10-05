import type { Metadata } from 'next'
import LegalShell from '../_legal/LegalShell'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung / Privacy policy',
  description: 'Datenschutzerklärung von europan.group. Privacy policy of europan.group.',
  alternates: { canonical: 'https://www.europan.group/datenschutz' },
}

export default function DatenschutzPage() {
  return (
    <LegalShell>
      <div className="de-block">
        <h1>Datenschutzerklärung</h1>

        <h2>1. Verantwortlicher</h2>
        <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist die PAN21.com International LLC, 7533 South Center View CT, STE R, West Jordan, UT 84084, USA, vertreten durch Harald Linhart. E-Mail: <a href="mailto:dsgvo@pan21.com">dsgvo@pan21.com</a>, Telefon: +49 30 5684450-0.</p>

        <h2>2. Hosting</h2>
        <p>Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Beim Aufruf der Website verarbeitet Vercel technisch notwendige Daten wie IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Referrer und Browserinformationen (Server-Logfiles), um die Website auszuliefern und vor Missbrauch zu schützen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem sicheren und stabilen Betrieb). Mit Vercel besteht ein Vertrag zur Auftragsverarbeitung; Datenübermittlungen in die USA erfolgen auf Grundlage der EU-Standardvertragsklauseln.</p>

        <h2>3. Cookies</h2>
        <p>Diese Website setzt keine Cookies zu Analyse- oder Werbezwecken. Wenn Sie über einen Empfehlungslink mit Partnercode (Parameter „ref“) auf diese Website gelangen, wird der Code im Cookie „pan_ref“ gespeichert (Laufzeit 30 Tage), um Empfehlungen zuzuordnen; bei einem Kauf wird der Code an das Partnerprogramm pan-finanzvertrieb.de übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Abrechnung von Empfehlungen). Die gewählte Sprache wird nur im lokalen Speicher Ihres Browsers abgelegt.</p>

        <h2>4. Besucherzählung mit PAN21counter</h2>
        <p>Zur Zählung der Seitenaufrufe nutzen wir den eigenen Besucherzähler PAN21counter (pan21counter.de). Er setzt keine Cookies und erstellt keine Nutzerprofile. Aus der IP-Adresse wird beim Aufruf ein gekürzter, täglich wechselnder Hashwert gebildet, um Mehrfachzählungen am selben Tag zu vermeiden; die IP-Adresse selbst wird nicht gespeichert. Einzelne Aufrufe werden nach drei Tagen gelöscht, danach bleiben nur zusammengefasste Tageszahlen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer einfachen Reichweitenmessung).</p>

        <h2>5. Werbebanner</h2>
        <p>Werbebanner werden über unseren eigenen Adserver ads.pan21.com ausgeliefert. Dabei wird die IP-Adresse technisch bedingt verarbeitet, um das Banner auszuliefern; es werden keine Nutzerprofile erstellt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO.</p>

        <h2>6. Kontaktformular und E-Mail</h2>
        <p>Wenn Sie uns über das Kontaktformular oder per E-Mail schreiben, verarbeiten wir Ihre Angaben (z. B. Name, E-Mail-Adresse, Nachricht), um Ihre Anfrage zu beantworten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit Ihre Anfrage auf einen Vertrag zielt, sonst Art. 6 Abs. 1 lit. f DSGVO. Die Daten werden gelöscht, sobald sie nicht mehr benötigt werden und keine gesetzlichen Aufbewahrungspflichten bestehen. Der E-Mail-Versand erfolgt über Resend (Resend Inc., USA) auf Grundlage eines Auftragsverarbeitungsvertrags und der EU-Standardvertragsklauseln.</p>

        <h2>7. Zahlungen</h2>
        <p>Zahlungen werden über Stripe (Stripe Payments Europe Ltd., 1 Grand Canal Street Lower, Dublin 2, Irland) abgewickelt. Dabei werden die für die Zahlung erforderlichen Daten an Stripe übermittelt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.</p>
        <p>Bei einem Kauf per Banküberweisung verarbeiten wir Ihren Namen, Ihre E-Mail-Adresse und den Betrag, um die Zahlung zuzuordnen. Zur Gutschrift und Anzeige Ihres EUROPAN-Guthabens werden Ihre E-Mail-Adresse und der Betrag an Noble Limited (noble-limited.com) übermittelt, die die Guthaben führt. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO.</p>

        <h2>8. Newsletter</h2>
        <p>Für den Newsletter nutzen wir beehiiv (Beehiiv Inc., USA). Wenn Sie sich anmelden, werden Ihre E-Mail-Adresse und Anmeldedaten bei beehiiv gespeichert. Rechtsgrundlage ist Ihre Einwilligung (Art. 6 Abs. 1 lit. a DSGVO), die Sie jederzeit über den Abmeldelink widerrufen können.</p>

        <h2>9. KI-Chat / Sprachanruf</h2>
        <p>Der KI-Chat bzw. Sprachanruf wird erst geladen, wenn Sie ihn aktiv starten. Dann werden Ihre Eingaben bzw. Ihre Stimme an den Anbieter übermittelt, um das Gespräch zu führen. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b bzw. f DSGVO.</p>

        <h2>10. Schriftarten</h2>
        <p>Die Schriftarten dieser Website werden lokal von unserem Server geladen. Es findet keine Verbindung zu Servern von Google oder anderen Schriftanbietern statt.</p>

        <h2>11. Eingebettete Inhalte</h2>
        <p>Die Website bindet Inhalte von externen Servern ein: ein Video von video.pan21.com, Angebotsbilder von shop.pan21.com, Banner von ffa-links.de, swiss-quality.de und german-quality.net sowie das Skript zur Zuordnung von Empfehlungen von pan-finanzvertrieb.de. Beim Laden dieser Inhalte wird Ihre IP-Adresse technisch bedingt an den jeweiligen Server übertragen.</p>

        <h2>12. Ihre Rechte</h2>
        <p>Sie haben das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (Art. 21). Erteilte Einwilligungen können Sie jederzeit mit Wirkung für die Zukunft widerrufen. Außerdem haben Sie das Recht, sich bei einer Datenschutz-Aufsichtsbehörde zu beschweren. Wenden Sie sich für Ihre Anliegen an <a href="mailto:dsgvo@pan21.com">dsgvo@pan21.com</a>.</p>

        <p>Stand: Oktober 2026</p>
      </div>

      <div className="en-block">
        <h1>Privacy policy</h1>

        <h2>1. Controller</h2>
        <p>The controller responsible for data processing on this website is PAN21.com International LLC, 7533 South Center View CT, STE R, West Jordan, UT 84084, USA, represented by Harald Linhart. Email: <a href="mailto:dsgvo@pan21.com">dsgvo@pan21.com</a>, phone: +49 30 5684450-0.</p>

        <h2>2. Hosting</h2>
        <p>This website is hosted by Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA. When you visit the website, Vercel processes technically necessary data such as your IP address, date and time, the page requested, the referrer and browser information (server log files) in order to deliver the website and protect it against misuse. The legal basis is Art. 6(1)(f) GDPR (legitimate interest in secure and stable operation). A data processing agreement is in place with Vercel; transfers of data to the USA are based on the EU Standard Contractual Clauses.</p>

        <h2>3. Cookies</h2>
        <p>This website does not set any cookies for analytics or advertising purposes. If you arrive via a referral link containing a partner code (parameter “ref”), the code is stored in the cookie “pan_ref” (lifetime 30 days) to attribute referrals; when you make a purchase, the code is transmitted to the partner programme pan-finanzvertrieb.de. The legal basis is Art. 6(1)(f) GDPR (legitimate interest in settling referrals). Your language choice is only stored in your browser’s local storage.</p>

        <h2>4. Visitor counting with PAN21counter</h2>
        <p>To count page views, we use our own visitor counter PAN21counter (pan21counter.de). It does not set cookies and does not create user profiles. When a page is requested, a shortened hash value that changes daily is derived from the IP address to avoid counting the same visitor more than once per day; the IP address itself is not stored. Individual page views are deleted after three days, after which only aggregated daily totals remain. The legal basis is Art. 6(1)(f) GDPR (legitimate interest in simple reach measurement).</p>

        <h2>5. Advertising banners</h2>
        <p>Advertising banners are delivered via our own ad server ads.pan21.com. For technical reasons, your IP address is processed in order to deliver the banner; no user profiles are created. The legal basis is Art. 6(1)(f) GDPR.</p>

        <h2>6. Contact form and email</h2>
        <p>If you contact us via the contact form or by email, we process the information you provide (e.g. name, email address, message) in order to answer your enquiry. The legal basis is Art. 6(1)(b) GDPR where your enquiry relates to a contract, otherwise Art. 6(1)(f) GDPR. The data is deleted as soon as it is no longer required and no statutory retention obligations apply. Emails are sent via Resend (Resend Inc., USA) on the basis of a data processing agreement and the EU Standard Contractual Clauses.</p>

        <h2>7. Payments</h2>
        <p>Payments are processed by Stripe (Stripe Payments Europe Ltd., 1 Grand Canal Street Lower, Dublin 2, Ireland). The data required for the payment is transmitted to Stripe for this purpose. The legal basis is Art. 6(1)(b) GDPR.</p>
        <p>For purchases by bank transfer, we process your name, email address and the amount in order to match your payment. To credit and display your EUROPAN balance, your email address and the amount are transmitted to Noble Limited (noble-limited.com), which maintains the balances. The legal basis is Art. 6(1)(b) GDPR.</p>

        <h2>8. Newsletter</h2>
        <p>We use beehiiv (Beehiiv Inc., USA) for our newsletter. When you subscribe, your email address and sign-up data are stored with beehiiv. The legal basis is your consent (Art. 6(1)(a) GDPR), which you can withdraw at any time via the unsubscribe link.</p>

        <h2>9. AI chat / voice call</h2>
        <p>The AI chat or voice call is only loaded once you actively start it. Your input or voice is then transmitted to the provider in order to conduct the conversation. The legal basis is Art. 6(1)(b) or (f) GDPR.</p>

        <h2>10. Fonts</h2>
        <p>The fonts used on this website are loaded locally from our own server. No connection is made to servers operated by Google or other font providers.</p>

        <h2>11. Embedded content</h2>
        <p>The website embeds content from external servers: a video from video.pan21.com, offer images from shop.pan21.com, banners from ffa-links.de, swiss-quality.de and german-quality.net, and the referral attribution script from pan-finanzvertrieb.de. When this content is loaded, your IP address is transmitted to the respective server for technical reasons.</p>

        <h2>12. Your rights</h2>
        <p>You have the right of access (Art. 15 GDPR), rectification (Art. 16), erasure (Art. 17), restriction of processing (Art. 18), data portability (Art. 20) and to object to processing based on Art. 6(1)(f) GDPR (Art. 21). You can withdraw any consent you have given at any time with effect for the future. You also have the right to lodge a complaint with a data protection supervisory authority. Please send any requests to <a href="mailto:dsgvo@pan21.com">dsgvo@pan21.com</a>.</p>

        <p>Status: October 2026</p>
      </div>
    </LegalShell>
  )
}
