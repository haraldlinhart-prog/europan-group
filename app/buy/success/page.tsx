import { redirect } from 'next/navigation'

// EUROPAN can no longer be bought, so there is no purchase to confirm here.
export default function BuySuccessPage() {
  redirect('/bonus')
}
