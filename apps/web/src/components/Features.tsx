import Image from "next/image";

const Features = () => {
  return (
    <div className="py-20 md:py-32">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-cinzel text-4xl md:text-5xl text-white font-bold drop-shadow-lg">
          Forge Your Legend
        </h2>
        <p className="font-cormorant italic text-xl text-white/80 mt-4 max-w-3xl mx-auto">
          Your path is your own. Specialize your skills, conquer challenges with
          allies, or prove your supremacy in the arena.
        </p>

        <div className="mt-16 grid lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {/* Feature 1: Classes */}
          <div className="text-center">
            <Image
              src="/feature-classes.webp"
              alt="A mage casting a spell"
              width={500}
              height={500}
              className="rounded-lg border-2 aspect-square border-white/10 backdrop-blur-md shadow-xl"
            />
            <h3 className="font-cinzel text-3xl text-white mt-6">
              Master Your Class
            </h3>
            <p className="font-ebg text-white/70 mt-2">
              Don't pick a class—earn it. Your proficiency in solving problems
              defines you. Become an{" "}
              <span className="text-white font-semibold">Array Knight</span>, a{" "}
              <span className="text-white font-semibold">Graph Assassin</span>,
              or a{" "}
              <span className="text-white font-semibold">Dynamic Mage</span> and
              unlock unique passive abilities.
            </p>
          </div>

          {/* Feature 2: Dungeons */}
          <div className="text-center">
            <Image
              src="/feature-dungeon.webp"
              alt="A group of adventurers at a dungeon entrance"
              width={500}
              height={500}
              className="rounded-lg border-2 aspect-square border-white/10 backdrop-blur-md shadow-xl"
            />
            <h3 className="font-cinzel text-3xl text-white mt-6">
              Conquer Dungeons
            </h3>
            <p className="font-ebg text-white/70 mt-2">
              Team up with friends and descend into themed challenge zones like
              the <span className="text-white font-semibold">Stackspire</span>{" "}
              or the{" "}
              <span className="text-white font-semibold">
                Treegrave Wilds
              </span>
              . Solve co-op puzzles to earn exclusive loot and artifacts.
            </p>
          </div>

          {/* Feature 3: PvP */}
          <div className="text-center">
            <Image
              src="/feature-pvp.webp"
              alt="Two figures facing off in an arena"
              width={500}
              height={500}
              className="rounded-lg border-2 aspect-square border-white/10 backdrop-blur-md shadow-xl"
            />
            <h3 className="font-cinzel text-3xl text-white mt-6">
              Dominate the Arena
            </h3>
            <p className="font-ebg text-white/70 mt-2">
              Face off in real-time coding duels. Out-think and out-code your
              rivals to climb the{" "}
              <span className="text-white font-semibold">
                global leaderboards
              </span>
              . Only the fastest and most elegant solutions will claim victory.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
