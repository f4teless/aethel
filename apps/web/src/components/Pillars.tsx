import Image from "next/image";
import { useState, useEffect, useRef } from "react";

const Pillars = () => {
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
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  const pillars = [
    {
      icon: "/BrainIcon.svg",
      title: "Narrative-Driven",
      description: "Embark on an epic saga crafted by a powerful AI Chronicler. Your choices, victories, and failures shape a story that is uniquely yours.",
      gradient: "from-blue-600/20 to-cyan-600/20",
      hoverGradient: "from-blue-600/30 to-cyan-600/30",
      iconBg: "bg-blue-500/20",
      delay: 0
    },
    {
      icon: "/CodeIcon.svg", 
      title: "Code is Combat",
      description: "Your mind is your weapon. Solve algorithmic challenges to defeat enemies, shatter arcane seals, and debug a world falling apart.",
      gradient: "from-purple-600/20 to-pink-600/20",
      hoverGradient: "from-purple-600/30 to-pink-600/30",
      iconBg: "bg-purple-500/20",
      delay: 200
    },
    {
      icon: "/CommunityIcon.svg",
      title: "Living World", 
      description: "Compete for global glory in the PvP Arena, team up with friends to conquer dungeons, and unite in server-wide events to save Aethel.",
      gradient: "from-emerald-600/20 to-teal-600/20",
      hoverGradient: "from-emerald-600/30 to-teal-600/30",
      iconBg: "bg-emerald-500/20",
      delay: 400
    }
  ];

  return (
    <div ref={ref} className="py-24 md:py-40 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-600/5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-emerald-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Enhanced section header */}
        <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <h2 className="font-cinzel text-4xl md:text-6xl lg:text-7xl text-white font-bold drop-shadow-lg mb-6">
            <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              A World Woven from Code
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent mx-auto mb-8"></div>
        </div>

        <div className={`transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}>
          <p className="font-cormorant italic text-xl md:text-2xl text-white/90 mt-6 max-w-4xl mx-auto leading-relaxed">
            Once perfect, the world of Aethel is now breaking apart — its logic
            fading, its memory leaking. The Compiler sleeps. The Corruption
            spreads. Only Architects like you—wielders of logic—can fight back
            the Corruption that threatens to unravel existence.
          </p>
        </div>

        {/* Enhanced pillar cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mt-20 max-w-7xl mx-auto">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={`group transform transition-all duration-700 ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${600 + pillar.delay}ms` }}
            >
              <div className={`relative bg-gradient-to-br ${pillar.gradient} p-8 lg:p-10 rounded-2xl border border-white/10 backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_48px_rgba(0,0,0,0.4)] hover:-translate-y-3 transition-all duration-500 overflow-hidden`}>
                {/* Card background effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.hoverGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                
                {/* Floating icon container */}
                <div className="relative z-10">
                  <div className={`w-20 h-20 lg:w-24 lg:h-24 mx-auto mb-6 ${pillar.iconBg} rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-white/20 transition-all duration-300`}>
                    <Image 
                      src={pillar.icon} 
                      alt={`${pillar.title} Icon`} 
                      width={48} 
                      height={48}
                      className="group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <h3 className="font-cinzel text-2xl lg:text-3xl text-white font-semibold mb-4 group-hover:text-white transition-colors duration-300">
                    {pillar.title}
                  </h3>

                  <p className="text-white/80 group-hover:text-white/90 font-ebg leading-relaxed text-base lg:text-lg transition-colors duration-300">
                    {pillar.description}
                  </p>
                </div>

                {/* Decorative corner elements */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/5 to-transparent rounded-bl-2xl"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-white/5 to-transparent rounded-tr-2xl"></div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional visual separator */}
        <div className={`transform transition-all duration-1000 delay-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <div className="mt-20 flex justify-center">
            <div className="w-2 h-2 bg-white/40 rounded-full mx-2"></div>
            <div className="w-2 h-2 bg-white/60 rounded-full mx-2"></div>
            <div className="w-2 h-2 bg-white/40 rounded-full mx-2"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pillars;
