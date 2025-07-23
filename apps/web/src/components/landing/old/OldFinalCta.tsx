import Link from "next/link";
import { memo } from "react";


const FinalCta = memo(() => {
  return (
    <div className="relative py-20 md:py-40 bg-center text-center text-white">
      <div className="container mx-auto px-6">
        <h2 className="font-cinzel text-4xl md:text-6xl font-bold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          Your Fate Is Unwritten
        </h2>
        <p className="font-cormorant italic text-2xl text-white/80 mt-6 max-w-3xl mx-auto">
          The world of Aethel needs its Architects. Will you answer the call?
        </p>
        <div className="mt-10">
          <Link
            href="/login"
            className="inline-block px-6 py-4 font-bold font-cinzel tracking-wide rounded-md transition-colors hover:bg-white/10 hover:shadow-xl duration-200 border border-white/20 backdrop-blur-sm"
          >
            Begin Your Journey
          </Link>
        </div>
      </div>
    </div>
  );
});

export default FinalCta;