'use client'
import { useState } from 'react'
import { forgotPassword, confirmForgotPassword } from '@lib/auth'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [step, setStep] = useState<'request' | 'confirm'>('request')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      await forgotPassword(email)
      setStep('confirm')
      setMessage('✅ Check your email for the verification code.')
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    try {
      await confirmForgotPassword(email, code, newPassword)
      setMessage('✅ Password reset! You can now log in.')
      setStep('request')
      setEmail('')
      setCode('')
      setNewPassword('')
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="bg-brand-white rounded-xl shadow-md p-8 mt-10 font-body max-w-md mx-auto">
      <h1 className="text-2xl font-heading font-bold text-brand-indigo mb-4">
        Forgot Password
      </h1>
      {step === 'request' ? (
        <form onSubmit={handleRequest} className="space-y-4">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full border border-brand-gray-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo"
            required
          />
          <button
            type="submit"
            className="bg-brand-indigo hover:bg-brand-gold transition-colors text-brand-white px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-brand-gold"
            disabled={loading}
          >
            {loading ? 'Sending...' : 'Send Reset Code'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleConfirm} className="space-y-4">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Verification Code"
            className="w-full border border-brand-gray-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo"
            required
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            className="w-full border border-brand-gray-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo"
            required
          />
          <button
            type="submit"
            className="bg-brand-indigo hover:bg-brand-gold transition-colors text-brand-white px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-brand-gold"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      )}
      {message && <p className="text-sm mt-2">{message}</p>}
    </main>
  )
}
