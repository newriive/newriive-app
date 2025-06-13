'use client'

import { CognitoUserAttribute } from 'amazon-cognito-identity-js'
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
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({
    given_name: '',
    family_name: '',
    name: '',
    phone_number: '',
    birthdate: '',
    locale: '',
  })
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState('')

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
        else {
          setAttributes(attrs)
          // Set form values from attributes
          const attrObj = Object.fromEntries(
            attrs.map((attr) => [attr.getName(), attr.getValue()]),
          )
          setForm({
            given_name: attrObj.given_name || '',
            family_name: attrObj.family_name || '',
            name: attrObj.name || '',
            phone_number: attrObj.phone_number || '',
            birthdate: attrObj.birthdate || '',
            locale: attrObj.locale || '',
          })
        }
        setLoading(false)
      })
    })
  }, [])

  if (loading)
    return (
      <main className="bg-brand-white rounded-xl shadow-md p-8 mt-10 font-body max-w-md mx-auto">
        <p>Loading...</p>
      </main>
    )
  if (error)
    return (
      <main className="bg-brand-white rounded-xl shadow-md p-8 mt-10 font-body max-w-md mx-auto">
        <p className="text-red-600">{error}</p>
      </main>
    )

  // Only show these attributes, in this order
  const displayOrder = [
    { key: 'email', label: 'Email' },
    { key: 'given_name', label: 'First Name' },
    { key: 'family_name', label: 'Last Name' },
    { key: 'name', label: 'Full Name' },
    { key: 'phone_number', label: 'Phone Number' },
    { key: 'birthdate', label: 'Birthdate' },
    { key: 'locale', label: 'Locale' },
  ]
  const attrMap = Object.fromEntries(
    attributes.map((attr) => [attr.getName(), attr.getValue()]),
  )

  const handleEdit = () => {
    setEditMode(true)
    setSaveError('')
  }
  const handleCancel = () => {
    setEditMode(false)
    setSaveError('')
    setForm({
      given_name: attrMap.given_name || '',
      family_name: attrMap.family_name || '',
      name: attrMap.name || '',
      phone_number: attrMap.phone_number || '',
      birthdate: attrMap.birthdate || '',
      locale: attrMap.locale || '',
    })
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setForm((f) => {
      // If editing given_name or family_name, update name as well
      if (name === 'given_name' || name === 'family_name') {
        const newGiven = name === 'given_name' ? value : f.given_name
        const newFamily = name === 'family_name' ? value : f.family_name
        return {
          ...f,
          [name]: value,
          name: `${newGiven} ${newFamily}`.trim(),
        }
      }
      return { ...f, [name]: value }
    })
  }
  const handleSave = async () => {
    setSaving(true)
    setSaveError('')
    const user = userPool.getCurrentUser()
    if (!user) {
      setSaveError('Not logged in')
      setSaving(false)
      return
    }
    user.getSession((err: any, session: any) => {
      if (err || !session) {
        setSaveError('Session error')
        setSaving(false)
        return
      }
      const attrs = [
        new CognitoUserAttribute({
          Name: 'given_name',
          Value: form.given_name,
        }),
        new CognitoUserAttribute({
          Name: 'family_name',
          Value: form.family_name,
        }),
        new CognitoUserAttribute({ Name: 'name', Value: form.name }),
        new CognitoUserAttribute({
          Name: 'phone_number',
          Value: form.phone_number,
        }),
        new CognitoUserAttribute({ Name: 'birthdate', Value: form.birthdate }),
        new CognitoUserAttribute({ Name: 'locale', Value: form.locale }),
      ]
      user.updateAttributes(attrs, (err: any) => {
        if (err) {
          setSaveError('Could not update profile')
        } else {
          setEditMode(false)
          user.getUserAttributes((err: any, attrs: any[]) => {
            if (!err && attrs) setAttributes(attrs)
          })
        }
        setSaving(false)
      })
    })
  }

  return (
    <main className="bg-brand-white rounded-xl shadow-md p-8 mt-10 font-body max-w-md mx-auto relative">
      {!editMode && (
        <button
          className="absolute top-6 right-6 bg-brand-gold text-brand-white px-4 py-1 rounded-md shadow hover:bg-brand-indigo transition-colors font-heading font-semibold"
          type="button"
          aria-label="Edit Profile"
          onClick={handleEdit}
        >
          Edit
        </button>
      )}
      <h1 className="text-2xl font-heading font-bold text-brand-indigo mb-4">
        Your Profile
      </h1>
      <ul className="space-y-2">
        {displayOrder.map(({ key, label }) =>
          !editMode ? (
            attrMap[key] ? (
              <li
                key={key}
                className="flex justify-between border-b border-brand-gray py-2"
              >
                <span className="font-semibold text-brand-dark">{label}</span>
                <span className="text-brand-indigo break-all">
                  {attrMap[key]}
                </span>
              </li>
            ) : null
          ) : key === 'email' ? (
            <li
              key={key}
              className="flex justify-between border-b border-brand-gray py-2 items-center"
            >
              <span className="font-semibold text-brand-dark w-1/2">
                {label}
              </span>
              <span className="text-brand-indigo break-all w-1/2 text-right">
                {attrMap[key]}
              </span>
            </li>
          ) : key === 'locale' ? (
            <li
              key={key}
              className="flex justify-between border-b border-brand-gray py-2 items-center"
            >
              <span className="font-semibold text-brand-dark w-1/2">
                {label}
              </span>
              <select
                name="locale"
                value={form.locale}
                onChange={handleChange}
                className="w-1/2 border border-brand-gray-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo text-right"
              >
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
            </li>
          ) : (
            <li
              key={key}
              className="flex justify-between border-b border-brand-gray py-2 items-center"
            >
              <span className="font-semibold text-brand-dark w-1/2">
                {label}
              </span>
              <input
                name={key}
                type={key === 'birthdate' ? 'date' : 'text'}
                value={form[key as keyof typeof form] || ''}
                onChange={handleChange}
                className="w-1/2 border border-brand-gray-light rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-indigo text-right"
              />
            </li>
          ),
        )}
      </ul>
      {editMode && (
        <div className="flex gap-4 mt-6 justify-end">
          <button
            type="button"
            className="bg-brand-indigo text-brand-white px-4 py-2 rounded-md shadow hover:bg-brand-gold transition-colors font-heading font-semibold"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save'}
          </button>
          <button
            type="button"
            className="bg-brand-gray-light text-brand-dark px-4 py-2 rounded-md shadow hover:bg-brand-gray transition-colors font-heading font-semibold"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancel
          </button>
        </div>
      )}
      {saveError && <p className="text-red-600 text-sm mt-2">{saveError}</p>}
    </main>
  )
}
