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
    <main className="bg-brand-white rounded-xl shadow-md p-8 mt-10 font-body max-w-md mx-auto">
      <h1 className="text-2xl font-heading font-bold text-brand-indigo mb-4">Confirm Your Email</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border border-brand-gray rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo" />
        <input value={code} onChange={e => setCode(e.target.value)} placeholder="Confirmation Code" className="w-full border border-brand-gray rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo" />
        <button type="submit" className="bg-brand-indigo hover:bg-brand-gold transition-colors text-white px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-brand-gold">Confirm</button>
      </form>
      {message && <p className="text-sm mt-2">{message}</p>}
    </main>
  )
}
