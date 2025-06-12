'use client'
import { useState } from 'react'
import { signUpUser } from '@lib/cognito'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [givenName, setGivenName] = useState('')
  const [familyName, setFamilyName] = useState('')
  const [birthdate, setBirthdate] = useState('')
  const [locale, setLocale] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState<{ [key: string]: string }>({})

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: { [key: string]: string } = {}
    if (!email) newErrors.email = 'Email is required.'
    if (!password) newErrors.password = 'Password is required.'
    if (!phoneNumber) newErrors.phoneNumber = 'Phone number is required.'
    if (!givenName) newErrors.givenName = 'First name is required.'
    if (!familyName) newErrors.familyName = 'Last name is required.'
    if (!birthdate) newErrors.birthdate = 'Birthdate is required.'
    if (!locale) newErrors.locale = 'Locale is required.'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) {
      setMessage('❌ Please fill in all required fields.')
      return
    }
    try {
      const name = `${givenName} ${familyName}`.trim()
      await signUpUser(email, password, {
        phone_number: phoneNumber,
        name,
        given_name: givenName,
        family_name: familyName,
        birthdate,
        locale,
      })
      setMessage('✅ Check your email for a confirmation code.')
      // Dispatch custom event to close signup and show confirm modal
      window.dispatchEvent(new CustomEvent('show-confirm-modal', { detail: { closeSignup: true } }))
    } catch (err: any) {
      setMessage(`❌ ${err.message}`)
    }
  }

  return (
    <main className="bg-brand-white rounded-xl shadow-md p-8 mt-10 font-body">
      <h1 className="text-2xl font-heading font-bold text-brand-indigo mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="w-full border border-brand-gray-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo" />
        {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" className="w-full border border-brand-gray-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo" />
        {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
        <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="Phone Number (e.g. +1234567890)" className="w-full border border-brand-gray-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo" />
        {errors.phoneNumber && <p className="text-red-600 text-xs mt-1">{errors.phoneNumber}</p>}
        <input value={givenName} onChange={e => setGivenName(e.target.value)} placeholder="First Name" className="w-full border border-brand-gray-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo" />
        {errors.givenName && <p className="text-red-600 text-xs mt-1">{errors.givenName}</p>}
        <input value={familyName} onChange={e => setFamilyName(e.target.value)} placeholder="Last Name" className="w-full border border-brand-gray-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo" />
        {errors.familyName && <p className="text-red-600 text-xs mt-1">{errors.familyName}</p>}
        <input value={birthdate} onChange={e => setBirthdate(e.target.value)} type="date" placeholder="Birthdate" className="w-full border border-brand-gray-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo" />
        {errors.birthdate && <p className="text-red-600 text-xs mt-1">{errors.birthdate}</p>}
        <select value={locale} onChange={e => setLocale(e.target.value)} className="w-full border border-brand-gray-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo">
          <option value="">Select Locale</option>
          <option value="en-US">English (United States)</option>
          <option value="en-GB">English (United Kingdom)</option>
          <option value="fr-FR">French (France)</option>
          <option value="es-ES">Spanish (Spain)</option>
          <option value="de-DE">German (Germany)</option>
          <option value="it-IT">Italian (Italy)</option>
          <option value="pt-PT">Portuguese (Portugal)</option>
          <option value="zh-CN">Chinese (Simplified)</option>
          <option value="ja-JP">Japanese</option>
          <option value="ko-KR">Korean</option>
        </select>
        {errors.locale && <p className="text-red-600 text-xs mt-1">{errors.locale}</p>}
        <button type="submit" className="bg-brand-indigo hover:bg-brand-gold transition-colors text-brand-white px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-brand-gold">Sign Up</button>
      </form>
      {message && <p className="text-sm mt-2">{message}</p>}
    </main>
  )
}
