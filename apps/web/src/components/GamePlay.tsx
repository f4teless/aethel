const GamePlay = () => {
  return (
    <div className="py-20 md:py-32 bg-cover bg-center">
      <div className="container mx-auto px-6 flex flex-col items-center text-center">
        <h2 className="font-cinzel text-4xl md:text-5xl text-white font-bold drop-shadow-lg">
          Wield Algorithms as Weapons
        </h2>
        <p className="font-cormorant italic text-xl text-white/80 mt-4 max-w-3xl mx-auto">
          The battlefield is your terminal. The fight is your code.
        </p>

        {/* Stylized UI Mockup */}
        <div className="mt-12 w-full max-w-4xl bg--[#202C34]/70 border border-slate-700 rounded-xl shadow-2xl backdrop-blur-xl overflow-hidden">
          {/* Narrative Header */}
          <div className="bg-black/30 p-4 border-b border-slate-700">
            <p className="font-cormorant italic text-lg text-slate-300">
              📜 CHRONICLER: "A Data Golem lumbers towards you, its armor a
              mess of unsorted integers. To shatter its defense, you must
              implement a sorting algorithm faster than its own chaotic
              processing."
            </p>
          </div>

          {/* Code Battle Area */}
          <div className="p-6">
            <div className="font-mono text-left bg-black/50 p-4 rounded-md border border-slate-600">
              <p className="text-green-400">
                &gt; Problem: "Sort the Golem's Core"
              </p>
              <p className="text-blue-400 mt-2">
                def sort_core(core_fragments: list[int]) -&gt; list[int]:
              </p>
              <p className="text-white/90 pl-4"># Your logic here...</p>
              <p className="text-white/90 pl-4">
                <span className="animate-pulse">|</span>
              </p>
            </div>

            <div className="mt-4 flex justify-end">
              <button className="text-white font-bold py-2 px-6 shadow-lg font-cinzel tracking-wider bg-transparent rounded-md transition hover:bg-current/20 hover:shadow-xl duration-200 border border-white/20 backdrop-blur-sm">
                EXECUTE
              </button>
            </div>
          </div>

          {/* Combat Log Footer */}
          <div className="bg-black/30 p-4 border-t border-slate-700 font-mono text-sm text-left">
            <p className="text-slate-400">
              &gt; Running tests against Golem's defenses...
            </p>
            <p className="text-green-500">&gt; Test 1/5: PASS</p>
            <p className="text-green-500">&gt; Test 2/5: PASS</p>
            <p className="text-slate-400">&gt; ...</p>
            <p className="text-yellow-400">
              &gt; Logic accepted. Golem defenses shattered.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
