import { redirect } from 'next/navigation'

// EUROPAN can no longer be bought. Old links lead to the explanation of the bonus programme.
export default function BuyPage({ searchParams }: { searchParams: { lang?: string } }) {
  redirect(searchParams.lang === 'en' || searchParams.lang === 'de' ? `/bonus?lang=${searchParams.lang}` : '/bonus')
}
