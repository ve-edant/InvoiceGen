// app/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-4xl font-bold mb-6">Welcome to Invoice Generator</h1>
      <p className="text-lg mb-8">Create and manage your professional invoices easily.</p>
      <button
        onClick={() => router.push('/dashboard/invoice-create')}
        className="mt-4 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-colors duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
      >
        Get Started
      </button>
    </main>
  );
}
