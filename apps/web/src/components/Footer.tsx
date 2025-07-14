import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-[#202C34] text-slate-400 border-t border-slate-800">
      <div className="container max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Column 1: Logo & Tagline */}
        <div>
          <Link
            href="/"
            className="font-cinzel text-3xl font-bold tracking-widest text-white"
          >
            Aethel<span className="text-slate-400">.</span>
          </Link>
          <p className="mt-2 text-sm font-ebg ">
            A realm on the brink of collapse.
            <br />
            Only the Architects can restore the logic.
          </p>
        </div>

        {/* Column 2: Links */}
        <div className="font-cinzel uppercase tracking-wider text-sm">
          <h4 className="text-white mb-4 text-lg font-semibold">Explore</h4>
          <div className="space-y-2">
            <p>
              <Link href="/login" className="hover:text-white transition">
                Oath
              </Link>
            </p>
            <p>
              <Link href="/lore" className="hover:text-white transition">
                Lore
              </Link>
            </p>
            <p>
              <Link href="/community" className="hover:text-white transition">
                Community
              </Link>
            </p>
            <p>
              <Link href="/leaderboard" className="hover:text-white transition">
                PvP Rankings
              </Link>
            </p>
          </div>
        </div>

        {/* Column 3: Community */}
        <div>
          <h4 className="font-cinzel uppercase tracking-wider text-white mb-4 text-lg font-semibold">
            Join the Architects
          </h4>
          <div className="flex justify-center md:justify-start space-x-4 mt-2">
            {/* Replace with your actual links and use SVG icons for these */}
            <a
              href="https://discord.com/users/755804749210845236"
              className="hover:text-white transition"
            >
              Discord
            </a>
            <a
              href="https://x.com/playaethel"
              className="hover:text-white transition"
            >
              Twitter/X
            </a>
            <a
              href="https://github.com/f4teless"
              className="hover:text-white transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-800 py-4">
        <p className="text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Aethel. All Rights Reserved.
        </p>
        {/* Credits / Copyright */}
        <div className="text-center mt-4">
          <h3 className="font-cinzel text-xl font-bold mb-2">Crafted By</h3>
          <p className="text-white/80 font-cormorant italic">
            Lost from Light
            <br />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
