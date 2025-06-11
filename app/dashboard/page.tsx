'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CognitoUserSession } from 'amazon-cognito-identity-js'
import { getCurrentUserSession } from '@lib/session'
import LogoutButton from '@components/LogoutButton'

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const router = useRouter()

  useEffect(() => {
    async function verifySession() {
      try {
        const session: CognitoUserSession | null = await getCurrentUserSession()
        if (!session || !session.isValid()) {
          router.push('/login')
        } else {
          setMessage('✅ Welcome to your dashboard!')
        }
      } catch (err) {
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }

    verifySession()
  }, [router])

  if (loading) return <p>Loading...</p>

  return (
    <main className="bg-brand-white rounded-xl shadow-md p-8 mt-10 font-body">
      <h1 className="text-2xl font-heading font-bold text-brand-indigo mb-4">Dashboard</h1>
      <p className="mb-4">{message}</p>
      <LogoutButton />
    </main>
  )
}
