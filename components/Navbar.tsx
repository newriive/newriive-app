'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getCurrentUserSession } from '@lib/session'

const navItems = [
	{ href: '/', label: 'Home' },
	{ href: '/signup', label: 'Sign Up' },
	{ href: '/confirm', label: 'Confirm' },
	{ href: '/login', label: 'Login' },
	{ href: '/dashboard', label: 'Dashboard' },
]

export default function Navbar() {
	const pathname = usePathname()
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		getCurrentUserSession()
			.then((session) => setIsLoggedIn(!!session && session.isValid && session.isValid()))
			.catch(() => setIsLoggedIn(false))
	}, [])

	const filteredNavItems = navItems.filter((item) => {
		if (isLoggedIn) {
			// Hide home, login, signup, confirm when logged in
			return !['/', '/login', '/signup', '/confirm'].includes(item.href)
		} else {
			// Hide dashboard when logged out
			return item.href !== '/dashboard'
		}
	})

	return (
		<nav className="bg-brand-white/80 backdrop-blur sticky top-0 z-20 shadow-md p-lg flex items-center gap-6 border-b">
			<Link href={isLoggedIn ? '/dashboard' : '/'}>
				<span className="text-2xl font-heading font-bold text-brand-indigo tracking-tight mr-8">
					Newriive
				</span>
			</Link>
			{filteredNavItems.map(({ href, label }) => (
				<Link key={href} href={href} className="relative group">
					<span
						className={
							pathname === href
								? 'text-brand-indigo font-semibold underline underline-offset-4'
								: 'text-brand-text-dark group-hover:text-brand-gold transition-colors'
						}
					>
						{label}
					</span>
				</Link>
			))}
		</nav>
	)
}
