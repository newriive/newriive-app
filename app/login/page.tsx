'use client'
import { useState } from 'react'
import { signInUser } from '@lib/cognito'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const session = await signInUser(email, password)
      const idToken = session.getIdToken().getJwtToken()

      // TODO: Store token securely (cookie, localStorage, etc.)
      console.log('ID Token:', idToken)

      setMessage('✅ Logged in successfully!')
      router.push('/dashboard')
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    }
  }

  return (
    <main className="bg-brand-white rounded-xl shadow-md p-8 mt-10 font-body">
      <h1 className="text-2xl font-heading font-bold text-brand-indigo mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border border-brand-gray-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border border-brand-gray-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo" />
        <button type="submit" className="bg-brand-indigo hover:bg-brand-gold transition-colors text-brand-white px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-brand-gold">Log In</button>
      </form>
      {message && <p className="text-sm mt-2">{message}</p>}
    </main>
  )
}
