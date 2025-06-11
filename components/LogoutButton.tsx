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
    <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 mt-4">
      Log Out
    </button>
  )
}
