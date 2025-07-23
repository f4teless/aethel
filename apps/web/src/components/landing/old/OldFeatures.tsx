import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const features = [
    {
      image: "/feature-classes.webp",
      title: "Master Your Class",
      description: "Don't pick a class—earn it. Your proficiency in solving problems defines you. Become an",
      highlights: ["Array Knight", "Graph Assassin", "Dynamic Mage"],
      suffix: "and unlock unique passive abilities.",
      gradient: "from-amber-500/20 to-orange-500/20",
      delay: 0
    },
    {
      image: "/feature-dungeon.webp", 
      title: "Conquer Dungeons",
      description: "Team up with friends and descend into themed challenge zones like the",
      highlights: ["Stackspire", "Treegrave Wilds"],
      suffix: ". Solve co-op puzzles to earn exclusive loot and artifacts.",
      gradient: "from-emerald-500/20 to-teal-500/20",
      delay: 200
    },
    {
      image: "/feature-pvp.webp",
      title: "Dominate the Arena", 
      description: "Face off in real-time coding duels. Out-think and out-code your rivals to climb the",
      highlights: ["global leaderboards"],
      suffix: ". Only the fastest and most elegant solutions will claim victory.",
      gradient: "from-red-500/20 to-pink-500/20",
      delay: 400
    }
  ];

  return (
    <div ref={ref} className="py-24 md:py-40 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-purple-600/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Enhanced section header */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="font-cinzel text-4xl md:text-6xl lg:text-7xl text-white font-bold drop-shadow-lg mb-6">
            <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              Forge Your Legend
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-purple-400/50 to-transparent mx-auto mb-8"></div>
        </div>

        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
          <p className="font-cormorant italic text-xl md:text-2xl text-white/90 mt-6 max-w-4xl mx-auto leading-relaxed">
            Your path is your own. Specialize your skills, conquer challenges with
            allies, or prove your supremacy in the arena.
          </p>
        </div>

        {/* Enhanced feature grid */}
        <div className="mt-20 grid lg:grid-cols-3 gap-12 lg:gap-16 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${600 + feature.delay}ms` }}
            >
              <div className="text-center space-y-6">
                {/* Enhanced image container */}
                <div className="relative overflow-hidden rounded-2xl border-2 border-white/10 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] group-hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] transition-all duration-500">
                  <div className="relative aspect-square">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Gradient overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                    
                    {/* Decorative corner effects */}
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-white/10 to-transparent rounded-tr-2xl"></div>
                  </div>
                </div>

                {/* Enhanced content */}
                <div className="space-y-4">
                  <h3 className="font-cinzel text-3xl lg:text-4xl text-white font-bold group-hover:text-white transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <div className="font-ebg text-white/80 group-hover:text-white/90 leading-relaxed text-base lg:text-lg transition-colors duration-300">
                    <p>
                      {feature.description}{" "}
                      {feature.highlights.map((highlight, i) => (
                        <span key={i}>
                          <span className="text-white font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            {highlight}
                          </span>
                          {i < feature.highlights.length - 1 ? ", a " : " "}
                        </span>
                      ))}
                      {feature.suffix}
                    </p>
                  </div>
                </div>

                {/* Feature accent line */}
                <div className="w-16 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent mx-auto group-hover:via-white/50 transition-all duration-300"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className={`transform transition-all duration-1000 delay-1200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
          <div className="mt-20 text-center">
            <p className="font-cormorant italic text-xl text-white/70 mb-6">
              Choose your path, master your craft, become a legend.
            </p>
            <div className="flex justify-center">
              <div className="w-3 h-3 bg-white/30 rounded-full mx-2 animate-pulse"></div>
              <div className="w-3 h-3 bg-white/50 rounded-full mx-2 animate-pulse delay-150"></div>
              <div className="w-3 h-3 bg-white/30 rounded-full mx-2 animate-pulse delay-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
