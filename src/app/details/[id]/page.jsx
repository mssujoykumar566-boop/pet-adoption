
import { notFound } from 'next/navigation'
import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import PetDetails from '@/components/cardComponents/PetDetails'

export default async function Details({ params }) {
  const { id } = await params

  try {
    const session = await auth.api.getSession({
      headers: await headers()
    })

    const token = session?.token

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}pets/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token || ''}`
        },
        cache: 'no-store'
      }
    )

    if (!res.ok) {
      return notFound()
    }

    const pet = await res.json()

    if (!pet) {
      return notFound()
    }

    return <PetDetails pet={pet} />

  } catch (error) {
    console.log('Details page error:', error)
    return notFound()
  }
}