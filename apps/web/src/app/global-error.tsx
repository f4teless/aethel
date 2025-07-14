'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center text-white bg-[#202C34]">
          <div className="text-center max-w-md mx-auto px-4">
            <div className="text-6xl mb-4">💀</div>
            <h1 className="text-3xl font-cinzel font-bold mb-4">
              Critical System Failure
            </h1>
            <p className="text-white/80 font-cormorant italic mb-6">
              The CodeRealm has encountered a fatal error. The Architects are working to restore balance.
            </p>
            <button
              onClick={() => reset()}
              className="bg-transparent text-white border border-white/20 px-6 py-2 rounded-xl font-bold font-cinzel tracking-wide transition hover:bg-current/20 backdrop-blur"
            >
              Attempt Recovery
            </button>
          </div>
        </div>
      </body>
    </html>
  )
} 