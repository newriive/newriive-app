'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getCurrentUserSession } from '@lib/session'
import LogoutButton from './LogoutButton'
import LoginPage from '../app/login/page'
import SignupPage from '../app/signup/page'
import ConfirmPage from '../app/confirm/page'

const navItems = [
	{ href: '/', label: 'Home' },
	{ href: '/signup', label: 'Sign Up' },
	{ href: '/login', label: 'Login' },
	{ href: '/dashboard', label: 'Dashboard' },
	{ href: '/profile', label: 'Profile' },
]

export default function Navbar() {
	const pathname = usePathname()
	const router = useRouter()
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const [showLoginModal, setShowLoginModal] = useState(false)
	const [showSignupModal, setShowSignupModal] = useState(false)
	const [showConfirmModal, setShowConfirmModal] = useState(false)

	useEffect(() => {
		getCurrentUserSession()
			.then((session) => setIsLoggedIn(!!session && session.isValid && session.isValid()))
			.catch(() => setIsLoggedIn(false))
		// Listen for custom event to show confirm modal
		const handler = (e: any) => {
			if (e.detail && e.detail.closeSignup) setShowSignupModal(false)
			setShowConfirmModal(true)
		}
		window.addEventListener('show-confirm-modal', handler)
		return () => window.removeEventListener('show-confirm-modal', handler)
	}, [])

	const filteredNavItems = navItems.filter((item) => {
		if (isLoggedIn) {
			return !['/', '/login', '/signup', '/confirm'].includes(item.href)
		} else {
			return !['/dashboard', '/profile'].includes(item.href)
		}
	})

	// Separate login/signup for right alignment if on home page
	const mainNavItems = filteredNavItems.filter(item => !['/login', '/signup'].includes(item.href))
	const authNavItems = filteredNavItems.filter(item => ['/login', '/signup'].includes(item.href))

	return (
		<>
			<nav className="bg-brand-white/80 backdrop-blur sticky top-0 z-20 shadow-md p-lg flex items-center gap-6 border-b">
				<Link href={isLoggedIn ? '/dashboard' : '/'}>
					<span className="text-2xl font-heading font-bold text-brand-indigo tracking-tight mr-8">
						Newriive
					</span>
				</Link>
				<div className="flex gap-6 flex-grow items-center">
					{mainNavItems.map(({ href, label }) => (
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
				</div>
				{!isLoggedIn && (
					<div className="flex gap-4 items-center ml-auto mr-4">
						{authNavItems.map(({ href, label }) => (
							pathname === '/' ? (
								<button
									key={href}
									onClick={() => href === '/login' ? setShowLoginModal(true) : setShowSignupModal(true)}
									className="font-heading font-semibold text-brand-indigo hover:text-brand-gold transition-colors px-3 py-1 rounded"
								>
									{label}
								</button>
							) : (
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
							)
						))}
					</div>
				)}
				{isLoggedIn && (
					<div className="flex-1 flex justify-end items-center mb-2 mr-4">
						<LogoutButton />
					</div>
				)}
			</nav>
			{/* Modal overlays with actual forms */}
			{showLoginModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
					<div className="bg-white rounded-xl shadow-lg p-8 min-w-[320px] max-w-sm relative">
						<button onClick={() => setShowLoginModal(false)} className="absolute top-2 right-2 text-brand-indigo hover:text-brand-gold text-xl">×</button>
						<LoginPage />
					</div>
				</div>
			)}
			{showSignupModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
					<div className="bg-white rounded-xl shadow-lg p-8 min-w-[320px] max-w-sm relative">
						<button onClick={() => setShowSignupModal(false)} className="absolute top-2 right-2 text-brand-indigo hover:text-brand-gold text-xl">×</button>
						<SignupPage />
					</div>
				</div>
			)}
			{showConfirmModal && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
					<div className="bg-white rounded-xl shadow-lg p-8 min-w-[320px] max-w-sm relative">
						<button onClick={() => setShowConfirmModal(false)} className="absolute top-2 right-2 text-brand-indigo hover:text-brand-gold text-xl">×</button>
						<ConfirmPage />
					</div>
				</div>
			)}
		</>
	)
}
