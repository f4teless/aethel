import Image from "next/image";

const Pillars = () => {
  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-cinzel text-4xl md:text-5xl text-white font-bold drop-shadow-lg">
          A World Woven from Code
        </h2>
        <p className="font-cormorant italic text-xl text-white/80 mt-4 max-w-3xl mx-auto">
          Once perfect, the world of Aethel is now breaking apart — its logic
          fading, its memory leaking. The Compiler sleeps. The Corruption
          spreads. Only Architects like you—wielders of logic—can fight back
          the Corruption that threatens to unravel existence.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {/* Pillar 1: AI Story */}
          <div className="bg-black/20 p-8 rounded-lg border border-white/10 backdrop-blur-md shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="h-16 w-16 mx-auto mb-4 text-slate-400 flex items-center justify-center">
              <Image src="/BrainIcon.svg" alt="Brain Icon" width={64} height={64} />
            </div>
            <h3 className="font-cinzel text-2xl text-white font-semibold">
              Narrative-Driven
            </h3>
            <p className="text-white/70 mt-2 font-ebg">
              Embark on an epic saga crafted by a powerful AI Chronicler. Your
              choices, victories, and failures shape a story that is uniquely
              yours.
            </p>
          </div>

          {/* Pillar 2: Code Combat */}
          <div className="bg-black/20 p-8 rounded-lg border border-white/10 backdrop-blur-md shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="h-16 w-16 mx-auto mb-4 text-slate-400 flex items-center justify-center">
              <Image src="/CodeIcon.svg" alt="code-icon" width={64} height={64} />
            </div>
            <h3 className="font-cinzel text-2xl text-white font-semibold">
              Code is Combat
            </h3>
            <p className="text-white/70 mt-2 font-ebg">
              Your mind is your weapon. Solve algorithmic challenges to defeat
              enemies, shatter arcane seals, and debug a world falling apart.
            </p>
          </div>

          {/* Pillar 3: Community */}
          <div className="bg-black/20 p-8 rounded-lg border border-white/10 backdrop-blur-md shadow-xl hover:-translate-y-2 transition-transform duration-300">
            <div className="h-16 w-16 mx-auto mb-4 text-slate-400 flex items-center justify-center">
              <Image src="/CommunityIcon.svg" alt="community-icon" width={64} height={64} />
            </div>
            <h3 className="font-cinzel text-2xl text-white font-semibold">
              Living World
            </h3>
            <p className="text-white/70 mt-2 font-ebg">
              Compete for global glory in the PvP Arena, team up with friends to
              conquer dungeons, and unite in server-wide events to save Aethel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pillars;
