import Link from "next/link";
import { Button } from "@/components/ui/button";

type HeroData = {
  heading?: string;
  lore?: string;
  subheading?: string;
  cta?: string;
};

export default function Hero({
  heroData = {},
  isLoaded = false,
}: {
  heroData?: HeroData;
  isLoaded?: boolean;
}) {
    const headingSentences = (heroData.heading ?? "")
    .split(".")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
    
    return (
        <section className="h-dvh flex items-center justify-center px-4">
          <div className={`text-center max-w-6xl mx-auto duration-1200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <p className="font-cormorant italic text-xl mb-3 drop-shadow">
              <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2 animate-pulse" />
              {heroData.lore}
            </p>

            <h1 className="font-cinzel text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {headingSentences.map((sentence, i) => (
                <span key={i} className="block">
                  {sentence}.
                  {i === headingSentences.length - 1 && (
                    <span className="ml-1 animate-pulse">|</span>
                  )}
                </span>
              ))}
            </h1>

            <p className="font-cormorant text-lg md:text-xl lg:text-2xl text-[var(--muted-foreground)] mb-8 italic leading-relaxed max-w-4xl mx-auto">
              {heroData.subheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                asChild
                size="lg"
                className="font-cinzel text-lg px-8 py-6 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] hover:opacity-90 transition-all duration-300 shadow-lg"
              >
                <Link href="/login">
                  {heroData.cta}
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="font-cinzel text-lg px-8 py-6 border-[var(--border)] hover:bg-[var(--muted)] transition-all duration-300"
              >
                <Link href="/lore">
                  Explore the Mysteries
                </Link>
              </Button>
            </div>

          </div>
        </section>
    )}