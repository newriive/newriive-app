'use client'

import { useEffect, useState } from 'react'
import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
}
const userPool = new CognitoUserPool(poolData)

export default function ProfilePage() {
  const [attributes, setAttributes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const user = userPool.getCurrentUser()
    if (!user) {
      setError('Not logged in')
      setLoading(false)
      return
    }
    user.getSession((err: any, session: any) => {
      if (err || !session) {
        setError('Session error')
        setLoading(false)
        return
      }
      user.getUserAttributes((err: any, attrs: any[]) => {
        if (err) setError('Could not fetch attributes')
        else setAttributes(attrs)
        setLoading(false)
      })
    })
  }, [])

  if (loading) return <main className="bg-brand-white rounded-xl shadow-md p-8 mt-10 font-body max-w-md mx-auto"><p>Loading...</p></main>
  if (error) return <main className="bg-brand-white rounded-xl shadow-md p-8 mt-10 font-body max-w-md mx-auto"><p className="text-red-600">{error}</p></main>

  // Only show these attributes, in this order
  const displayOrder = [
    { key: 'email', label: 'Email' },
    { key: 'name', label: 'Full Name' },
    { key: 'phone_number', label: 'Phone Number' },
    { key: 'birthdate', label: 'Birthdate' },
    { key: 'locale', label: 'Locale' },
  ]
  const attrMap = Object.fromEntries(attributes.map(attr => [attr.getName(), attr.getValue()]))

  return (
    <main className="bg-brand-white rounded-xl shadow-md p-8 mt-10 font-body max-w-md mx-auto">
      <h1 className="text-2xl font-heading font-bold text-brand-indigo mb-4">Your Profile</h1>
      <ul className="space-y-2">
        {displayOrder.map(({ key, label }) =>
          attrMap[key] ? (
            <li key={key} className="flex justify-between border-b border-brand-gray py-2">
              <span className="font-semibold text-brand-dark">{label}</span>
              <span className="text-brand-indigo break-all">{attrMap[key]}</span>
            </li>
          ) : null
        )}
      </ul>
    </main>
  )
}
