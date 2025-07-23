import Link from "next/link";

interface HeroData {
  heading: string;
  subheading: string;
  cta: string;
  tagline?: string;
  lore?: string;
}

const Hero = ({ heroData }: { heroData: HeroData }) => {
  const selected = heroData;

  const headingSentences = (selected.heading ?? "")
    .split(".")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  const loreIntro =
    selected.lore ?? "A world once governed by logic... now broken.";

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] text-center px-4">
      <p className="font-cormorant italic text-xl text-white/70 mb-4 drop-shadow">
        {loreIntro}
      </p>

      <div className="font-cinzel text-5xl md:text-6xl font-bold text-white space-y-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        {headingSentences.map((sentence, i) => (
          <p key={i}>
            {sentence}.
            {i === headingSentences.length - 1 && (
              <span className="ml-1 animate-pulse">|</span>
            )}
          </p>
        ))}
      </div>

      <div className="font-cormorant italic text-2xl text-white/80 px-6 mt-6 max-w-3xl drop-shadow-sm">
        {selected.subheading}
      </div>

      <div className="mt-10">
        <Link
          href="/"
          className="bg-transparent text-white px-8 py-3 rounded-md transition font-cinzel text-xl shadow-lg hover:bg-current/20 hover:shadow-xl hover:scale-105 duration-200 border border-white/20 backdrop-blur-sm"
        >
          {selected.cta}
        </Link>
      </div>

      {selected.tagline && (
        <p className="mt-4 text-white/70 text-sm font-medium italic max-w-xl px-4">
          {selected.tagline}
        </p>
      )}
    </div>
  );
};

export default Hero;