'use client'
import { useRouter } from 'next/navigation'
import { logoutUser } from '@lib/logout'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    logoutUser()
    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 hover:bg-red-700 transition-colors text-brand-white px-4 py-2 mt-4 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-red-400 font-body"
    >
      Log Out
    </button>
  )
}
