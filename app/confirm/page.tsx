'use client'
import { useState } from 'react'
import { confirmUserSignup } from '@lib/cognito'

export default function ConfirmPage() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await confirmUserSignup(email, code)
      setMessage('✅ Account confirmed! You can now log in.')
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    }
  }

  return (
    <main className="max-w-md mx-auto py-10 space-y-6">
      <h1 className="text-2xl font-bold">Confirm Your Email</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border p-2" />
        <input value={code} onChange={e => setCode(e.target.value)} placeholder="Confirmation Code" className="w-full border p-2" />
        <button type="submit" className="bg-green-600 text-white px-4 py-2">Confirm</button>
      </form>
      {message && <p className="text-sm">{message}</p>}
    </main>
  )
}
