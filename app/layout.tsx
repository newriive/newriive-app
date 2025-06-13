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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&family=Montserrat:wght@700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gradient-to-br from-brand-gray-light to-brand-white min-h-screen font-body text-brand-dark/90">
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}
