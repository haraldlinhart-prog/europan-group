import type { Metadata } from 'next'
import LegalShell from '../_legal/LegalShell'
import AccountLink from '../_account/AccountLink'

export const metadata: Metadata = {
  title: 'EUROPAN sammeln / Collect EUROPAN',
  description: 'EUROPAN ist ein Bonus- und Cashback-Punktesystem. EUROPAN is a bonus and cashback points system.',
  alternates: { canonical: 'https://www.europan.group/bonus' },
}

export default function BonusPage() {
  return (
    <LegalShell>
      <div className="de-block">
        <h1>EUROPAN sammeln</h1>
        <p>EUROPAN (EP) ist ein Bonus- und Cashback-Punktesystem. Sie erhalten Punkte beim Einkaufen und lösen sie im PAN21 Shop ein.</p>

        <h2>So sammeln Sie</h2>
        <p>Bei jedem Kauf auf <a href="https://shop.pan21.com/">shop.pan21.com</a> erhalten Sie 2 % des Kaufpreises als EUROPAN. Ihr Konto entsteht dabei automatisch zu Ihrer E-Mail-Adresse.</p>

        <h2>So lösen Sie ein</h2>
        <p>1 EP hat bei der Einlösung einen Wert von 1,00 €. Zahlen Sie den ganzen Bestellwert mit EP, erhalten Sie zusätzlich den Doppel-Wums-Bonus.</p>

        <h2>Was nicht geht</h2>
        <p>EUROPAN kann nicht gegen Geld gekauft, nicht in Euro ausgezahlt und nicht auf andere übertragen werden.</p>

        <h2>Ihre Punkte</h2>
        <p>Punktestand und Buchungen sehen Sie unter <AccountLink de="Mein Konto" en="My account" />.</p>
      </div>

      <div className="en-block">
        <h1>Collect EUROPAN</h1>
        <p>EUROPAN (EP) is a bonus and cashback points system. You receive points when you shop and redeem them in the PAN21 Shop.</p>

        <h2>How to collect</h2>
        <p>On every purchase on <a href="https://shop.pan21.com/en">shop.pan21.com</a>, you receive 2% of the purchase price as EUROPAN. Your account is created automatically for your email address.</p>

        <h2>How to redeem</h2>
        <p>1 EP has a redemption value of €1.00. If you pay the full order value with EP, you also get the Doppel-Wums bonus.</p>

        <h2>What is not possible</h2>
        <p>EUROPAN cannot be bought for money, paid out in euro or transferred to others.</p>

        <h2>Your points</h2>
        <p>You can see your points and bookings under <AccountLink de="Mein Konto" en="My account" />.</p>
      </div>
    </LegalShell>
  )
}
