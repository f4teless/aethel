import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative bg-[var(--background)]/90 backdrop-blur-md border-t border-[var(--border)]">
      {/* Mystical background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--muted)]/20 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center_top,_var(--primary)_0%,_transparent_50%)] opacity-5" />

      <div className="relative z-10 container max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Column 1: Brand & Lore */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="font-cinzel text-3xl md:text-4xl font-bold tracking-wider text-[var(--foreground)] hover:text-[var(--primary)] transition-colors duration-300"
            >
              Aethel
              <span className="text-[var(--primary)] animate-pulse">.</span>
            </Link>
            <p className="mt-4 text-[var(--muted-foreground)] font-cormorant text-lg italic leading-relaxed">
              A realm on the brink of collapse.
              Only the Architects can restore the logic.
            </p>
            <div className="mt-6 flex items-center justify-center md:justify-start gap-4">
              <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse flex-shrink-0" />
              <span className="font-mono text-sm text-[var(--muted-foreground)] leading-none">
              641,033+ Architects Active
              </span>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h4 className="font-cinzel text-[var(--foreground)] mb-6 text-lg font-semibold uppercase tracking-wider">
              Your Path
            </h4>
            <div className="space-y-3 font-cormorant">
              <div>
                <Link
                  href="/login"
                  className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-300 flex items-center justify-center md:justify-start group"
                >
                  <span className="w-1 h-1 bg-[var(--muted)] rounded-full mr-2 group-hover:animate-pulse" />
                  Begin Your Oath
                </Link>
              </div>
              <div>
                <Link
                  href="/lore"
                  className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-300 flex items-center justify-center md:justify-start group"
                >
                  <span className="w-1 h-1 bg-[var(--accent)] rounded-full mr-2 group-hover:animate-pulse" />
                  Ancient Archives
                </Link>
              </div>
              <div>
                <Link
                  href="/community"
                  className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-300 flex items-center justify-center md:justify-start group"
                >
                  <span className="w-1 h-1 bg-[var(--secondary)] rounded-full mr-2 group-hover:animate-pulse" />
                  Architect Tavern
                </Link>
              </div>
              <div>
                <Link
                  href="/pvp"
                  className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-300 flex items-center justify-center md:justify-start group"
                >
                  <span className="w-1 h-1 bg-[var(--primary)] rounded-full mr-2 group-hover:animate-pulse" />
                  Code Arena
                </Link>
              </div>
            </div>
          </div>

          {/* Column 3: Community & Contact */}
          <div>
            <h4 className="font-cinzel text-[var(--foreground)] mb-6 text-lg font-semibold uppercase tracking-wider">
              The Network
            </h4>
            <div className="space-y-4">
              <div className="flex justify-center md:justify-start space-x-4">
                <a
                  href="https://discord.com/users/755804749210845236"
                  className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-300 font-cormorant"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Discord
                </a>
                <a
                  href="https://x.com/playaethel"
                  className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-300 font-cormorant"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  X/Twitter
                </a>
                <a
                  href="https://github.com/f4teless"
                  className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors duration-300 font-cormorant"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>

              <div className="mt-6 p-4 bg-[var(--muted)]/30 rounded-lg border border-[var(--border)]">
                <p className="text-xs text-[var(--muted-foreground)] font-mono text-center md:text-left">
                  Seek guidance or wish to join the Architects? Whisper to us on Discord or X/Twitter.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[var(--border)]/50 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs text-[var(--muted-foreground)] font-mono">
                © 2025 Aethel. All patterns reserved.
              </p>
            </div>

            <div className="text-center">
              <p className="font-cinzel text-lg font-bold mb-1 text-[var(--foreground)]">
                Crafted By
              </p>
              <p className="text-[var(--muted-foreground)] font-cormorant italic text-sm">
                Lost from Light
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
