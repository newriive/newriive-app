'use client'

export default function Home() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-20 text-center">
      <h1 className="text-4xl md:text-5xl font-heading text-brand-indigo mb-6">
        Welcome to Newriive
      </h1>
      <p className="text-lg md:text-xl text-brand-text-dark mb-10">
        A modern toolkit for immigrants — track your journey, access resources,
        and feel at home faster.
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="/signup"
          className="bg-brand-indigo text-white px-6 py-3 rounded hover:bg-indigo-700 transition"
        >
          Get Started
        </a>
        <a
          href="/login"
          className="border border-brand-indigo text-brand-indigo px-6 py-3 rounded hover:bg-brand-indigo hover:text-white transition"
        >
          Log In
        </a>
      </div>
    </main>
  )
}
