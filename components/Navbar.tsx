'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/signup', label: 'Sign Up' },
  { href: '/confirm', label: 'Confirm' },
  { href: '/login', label: 'Login' },
  { href: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-white shadow p-4 flex gap-4">
      {navItems.map(({ href, label }) => (
        <Link key={href} href={href}>
          <span className={pathname === href ? 'text-blue-600 font-semibold' : 'text-gray-600'}>
            {label}
          </span>
        </Link>
      ))}
    </nav>
  )
}
