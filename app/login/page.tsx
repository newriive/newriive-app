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
    <main className="max-w-md mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border p-2" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border p-2" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2">Log In</button>
      </form>
      {message && <p className="text-sm">{message}</p>}
    </main>
  )
}
