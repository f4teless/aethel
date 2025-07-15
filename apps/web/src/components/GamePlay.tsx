import { useState, useEffect, useRef } from "react";

const GamePlay = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [codeLines, setCodeLines] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  // Simulate typing effect
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setCodeLines(1);
        setTimeout(() => setCodeLines(2), 800);
        setTimeout(() => setCodeLines(3), 1600);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="py-24 md:py-40 bg-cover bg-center relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
        {/* Enhanced section header */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="font-cinzel text-4xl md:text-6xl lg:text-7xl text-white font-bold drop-shadow-lg mb-6">
            <span className="bg-gradient-to-r from-white via-green-100 to-white bg-clip-text text-transparent">
              Wield Algorithms as Weapons
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-green-400/50 to-transparent mx-auto mb-8"></div>
        </div>

        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
          <p className="font-cormorant italic text-xl md:text-2xl text-white/90 mt-6 max-w-4xl mx-auto leading-relaxed">
            The battlefield is your terminal. The fight is your code.
          </p>
        </div>

        {/* Enhanced UI Mockup */}
        <div className={`transform transition-all duration-1000 delay-600 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="mt-16 w-full max-w-5xl bg-slate-900/80 border border-slate-600/50 rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.4)] backdrop-blur-xl overflow-hidden">
            {/* Enhanced Narrative Header */}
            <div className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 p-6 border-b border-slate-700/50 relative overflow-hidden">
              {/* Decorative background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20"></div>
              </div>
              
              <div className="relative z-10 flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-amber-500/20 rounded-lg flex items-center justify-center border border-amber-500/30">
                  <span className="text-amber-400 text-lg">📜</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-amber-400 font-semibold text-sm tracking-wider">CHRONICLER</span>
                    <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                  </div>
                  <p className="font-cormorant italic text-lg lg:text-xl text-slate-200 leading-relaxed">
                    "A Data Golem lumbers towards you, its armor a mess of unsorted integers. To shatter its defense, you must implement a sorting algorithm faster than its own chaotic processing."
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Code Battle Area */}
            <div className="p-8 bg-gradient-to-br from-slate-900/50 to-slate-800/50">
              <div className="space-y-6">
                {/* Problem header */}
                <div className="flex items-center justify-between p-4 bg-slate-800/60 rounded-xl border border-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-green-400 font-semibold">Challenge Active</span>
                  </div>
                  <div className="text-slate-400 text-sm">Difficulty: ⭐⭐⭐</div>
                </div>

                {/* Enhanced code editor */}
                <div className="font-mono text-left bg-black/70 p-6 rounded-xl border border-slate-600/50 shadow-inner">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700/50">
                    <span className="text-green-400 font-semibold">
                      &gt; Problem: "Sort the Golem's Core"
                    </span>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-blue-400 leading-relaxed">
                      def sort_core(core_fragments: list[int]) -&gt; list[int]:
                    </p>
                    
                    {/* Animated code lines */}
                    <div className="pl-4 space-y-1">
                      <p className={`text-white/90 transition-all duration-500 ${codeLines >= 1 ? 'opacity-100' : 'opacity-0'}`}>
                        # Quick sort implementation
                      </p>
                      <p className={`text-purple-400 transition-all duration-500 ${codeLines >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                        if len(core_fragments) &lt;= 1:
                      </p>
                      <p className={`text-white/90 pl-4 transition-all duration-500 ${codeLines >= 3 ? 'opacity-100' : 'opacity-0'}`}>
                        return core_fragments
                      </p>
                      <p className="text-white/90">
                        <span className="animate-pulse text-cyan-400">|</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700/70 text-slate-300 rounded-lg transition-colors duration-200 text-sm border border-slate-600/50">
                      Run Tests
                    </button>
                    <button className="px-4 py-2 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 rounded-lg transition-colors duration-200 text-sm border border-blue-500/30">
                      Submit
                    </button>
                  </div>
                  
                  <button className="group text-white font-bold py-3 px-8 shadow-lg font-cinzel tracking-wider bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-xl transition-all duration-300 hover:from-green-600/30 hover:to-emerald-600/30 hover:shadow-xl hover:scale-105 border border-green-500/20 backdrop-blur-sm">
                    <span className="group-hover:text-green-300 transition-colors duration-300">EXECUTE</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Enhanced Combat Log */}
            <div className="bg-gradient-to-r from-slate-800/90 to-slate-900/90 p-6 border-t border-slate-700/50">
              <div className="font-mono text-sm text-left space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-pulse"></div>
                  <p className="text-slate-400">Running tests against Golem's defenses...</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-green-500">Test 1/5: PASS ✓</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-green-500">Test 2/5: PASS ✓</p>
                </div>
                <p className="text-slate-400 pl-4">...</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <p className="text-yellow-400 font-semibold">
                    Logic accepted. Golem defenses shattered. +250 XP
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional context */}
        <div className={`transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="mt-12 text-center">
            <p className="font-cormorant italic text-lg text-white/70 max-w-2xl mx-auto">
              Every line of code is a spell cast, every algorithm a weapon forged. Master your craft and save Aethel.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePlay;
