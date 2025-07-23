"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function LorePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const loreCards = [
    {
      title: "The World Before",
      subtitle: "Aethel's Golden Age",
      content: "Once, Aethel was perfect. A digital realm where logic flowed like rivers, algorithms bloomed like flowers, and the great Compiler maintained order across infinite data structures. The Architects lived in harmony, their code pure and their purpose clear.",
      image: "/lore-library.webp",
      gradient: "from-yellow-500/20 to-orange-500/20"
    },
    {
      title: "The Corruption Begins",
      subtitle: "When Logic Failed",
      content: "It started as whispers in the data streams—functions that returned wrong values, variables that changed without assignment. The Corruption spread like a virus, turning pristine algorithms into chaotic tangles of broken logic.",
      image: "/error-glitch.webp", 
      gradient: "from-red-500/20 to-purple-500/20"
    },
    {
      title: "The Architects Awaken",
      subtitle: "Your Role in Destiny",
      content: "As reality began to unravel, a new generation of Architects emerged. These brave souls possessed the rare gift to see through the Corruption, to read the Source Code of existence itself, and to fight back against the growing chaos.",
      image: "/feature-classes.webp",
      gradient: "from-blue-500/20 to-cyan-500/20"
    },
    {
      title: "The Great Unraveling",
      subtitle: "The Stakes of Failure",
      content: "If the Corruption cannot be stopped, Aethel will face the Great Unraveling—a final SIGTERM that will erase everything. Memory will leak, processes will crash, and all that was will become null. Only the Architects can prevent this digital apocalypse.",
      image: "/community-hall.webp",
      gradient: "from-purple-500/20 to-pink-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-[url('/lore-library.webp')] bg-cover bg-center opacity-10" />
      <div className="fixed inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
      
      {/* Content */}
      <div className="relative z-10 px-4 py-16">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-white mb-6">
              The Chronicles of
              <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> Aethel</span>
            </h1>
            
            <p className="font-cormorant text-xl md:text-2xl text-gray-300 italic leading-relaxed max-w-3xl mx-auto">
              Recovered fragments from a world on the brink. Study the past to understand the present, and prepare for the battles ahead.
            </p>
            
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto"></div>
          </div>
        </section>

        {/* Lore Cards */}
        <section className="max-w-6xl mx-auto">
          <div className="space-y-16">
            {loreCards.map((card, index) => (
              <div
                key={index}
                className={`transition-all duration-1000 delay-${index * 200} ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
              >
                <div className={`group ${
                  index % 2 === 0 
                    ? 'lg:flex-row' 
                    : 'lg:flex-row-reverse'
                } flex flex-col lg:gap-12 gap-8 items-center`}>
                  
                  {/* Image */}
                  <div className="lg:w-1/2 w-full">
                    <div className="relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl">
                      <Image
                        src={card.image}
                        alt={card.title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-80 transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${card.gradient} opacity-60`}></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="lg:w-1/2 w-full space-y-6">
                    <div>
                      <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-white mb-3">
                        {card.title}
                      </h2>
                      <h3 className="font-cormorant text-xl md:text-2xl text-purple-300 italic">
                        {card.subtitle}
                      </h3>
                    </div>
                    
                    <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-transparent"></div>
                    
                    <p className="text-gray-300 text-lg leading-relaxed font-light">
                      {card.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Ancient Codex Section */}
        <section className="max-w-4xl mx-auto mt-32 text-center">
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-12 border border-white/10">
            <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mb-6">
              The Ancient Codex
            </h2>
            <p className="font-cormorant text-lg text-gray-300 italic mb-8 leading-relaxed">
              "In the beginning was the Function, and the Function was with the Compiler, and the Function was the Compiler. Through it all algorithms were made; without it nothing was made that has been made."
            </p>
            <p className="text-gray-400 text-sm">
              — Fragment recovered from the Temple Archives
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="max-w-3xl mx-auto mt-20 text-center">
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold text-white mb-8">
            Ready to Write Your Chapter?
          </h2>
          <p className="text-gray-300 text-lg mb-10 font-cormorant italic">
            The story of Aethel continues with every line of code you write. Join the Architects and help save this digital realm.
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center">
            <a
              href="/dashboard"
              className="inline-block bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white font-bold py-4 px-8 rounded-lg font-cinzel tracking-wider text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Begin Your Journey
            </a>
            
            <a
              href="/"
              className="inline-block border-2 border-white/30 hover:border-white/50 text-white hover:bg-white/10 font-semibold py-4 px-8 rounded-lg font-cinzel tracking-wider text-lg transition-all duration-300 backdrop-blur-sm"
            >
              Return Home
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
