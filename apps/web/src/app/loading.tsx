export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white mx-auto"></div>
        <p className="mt-4 font-cinzel text-xl">Loading the CodeRealm...</p>
        <p className="mt-2 font-cormorant italic text-white/70">The Architects are preparing your journey</p>
      </div>
    </div>
  );
} 