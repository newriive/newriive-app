import Navbar from '@components/Navbar'
import '../styles/globals.css'

export const metadata = {
  title: 'Newriive',
  description: 'Empowering immigrants with personalized tools and resources.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Custom fonts moved to _document.tsx for global loading */}
      </head>
      <body className="bg-gradient-to-br from-brand-gray-light to-brand-white min-h-screen font-body text-brand-dark/90">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
