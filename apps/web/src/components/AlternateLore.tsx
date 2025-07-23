"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function LorePage() {
  const [activeTimeline, setActiveTimeline] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const timelineEvents = [
    {
      era: "Layer 1: The Code Corruption",
      year: "Chapters 1-84",
      title: "The Awakening",
      description: "You fell asleep debugging code on Earth, only to awaken in a realm where your programming knowledge manifests as supernatural abilities. Reality appears corrupted by rogue algorithms.",
      impact: "Discovery of Pattern-Touch abilities"
    },
    {
      era: "Layer 2: Memory Architecture", 
      year: "Chapters 85-168",
      title: "The Truth of Death",
      description: "Memory inconsistencies reveal the shocking truth - you died on Earth. This realm is a collective memory system where the deceased maintain reality through algorithmic thinking.",
      impact: "Revelation of death and memory conflicts"
    },
    {
      era: "Layer 3: The Simulation",
      year: "Chapters 169-252", 
      title: "Beta Tester Revelation",
      description: "Perfect algorithmic behavior patterns reveal an impossible truth - this isn't death, but an advanced AI simulation where you were a trapped beta tester all along.",
      impact: "Discovery of artificial nature of reality"
    },
    {
      era: "Layer 4: Pattern Wars",
      year: "Chapters 253-336",
      title: "Reality Hacker Weapon",
      description: "The 'beta test' was a lie. You were recruited from Earth as a reality-manipulation weapon in a cosmic war between competing universal paradigms.",
      impact: "Escalation to cosmic-scale conflicts"
    },
    {
      era: "Layer 5: Logic Plague",
      year: "Chapters 337-420",
      title: "The Cosmic Immunity",
      description: "The ultimate revelation - all previous layers were misdirection. You possess natural immunity to a Logic Plague infecting multiple realities, and Earth recruited you for a cosmic medical crisis.",
      impact: "Final truth and universal stakes"
    }
  ];

  const classes = [
    {
      name: "Array Knight",
      sigil: "🛡️",
      domain: "Arrays, Strings, Sliding Window",
      philosophy: "\"Order through sequence, power through position.\"",
      description: "Masters of sequential data and linear thinking. Array Knights believe that all chaos can be tamed through proper indexing and systematic approaches.",
      ability: "Shield Block: One extra wrong submission attempt per battle",
      weakness: "Struggles with non-linear data structures"
    },
    {
      name: "Branch Walker", 
      sigil: "🌲",
      domain: "Binary Trees, Tree Traversal",
      philosophy: "\"From root to leaf, every path tells a story.\"",
      description: "Navigators of hierarchical structures who see the forest through the trees. They excel at understanding relationships and dependencies.",
      ability: "Tree Depth: Can see maximum tree depth before solving",
      weakness: "Gets lost in overly complex graph networks"
    },
    {
      name: "Stack Sentinel",
      sigil: "📚", 
      domain: "Stacks, Queues, Recursive Structures",
      philosophy: "\"Last in, first out - order matters in chaos.\"",
      description: "Guardians of call stacks and execution order. They understand the delicate balance of recursive thinking and iterative control.",
      ability: "Stack Guard: Not penalized for stack overflow errors", 
      weakness: "Can get trapped in infinite recursion without base cases"
    },
    {
      name: "Priority Keeper",
      sigil: "⚖️",
      domain: "Heaps, Priority Queues, Sorting", 
      philosophy: "\"The most important always rises to the surface.\"",
      description: "Masters of organization and optimization who instinctively know what deserves attention first. They bring order to chaos through intelligent prioritization.",
      ability: "Order Sense: Hint about optimal time complexity needed",
      weakness: "Can over-optimize simple problems that don't need it"
    },
    {
      name: "Dynamic Mage",
      sigil: "🔮",
      domain: "DP, Recursion, Memoization",
      philosophy: "\"The past informs the future, patterns repeat with purpose.\"",
      description: "Wielders of recursive spells and optimization techniques. They see patterns within patterns and excel at breaking down complex problems into manageable subproblems.",
      ability: "Manaflow: Reduced XP penalty on failed attempts",
      weakness: "Can get lost in over-complicated recursive solutions"
    },
    {
      name: "Graph Assassin",
      sigil: "🕷️", 
      domain: "Graphs, Networks, BFS/DFS",
      philosophy: "\"Every connection is a pathway to victory.\"",
      description: "Silent hunters who navigate the web of relationships between data. They strike swiftly through the shortest paths and understand the hidden connections others miss.",
      ability: "Pathfinder: Free complexity analysis hint per match",
      weakness: "Vulnerable when connections are sparse or disconnected"
    },
    {
      name: "Greedy Ronin",
      sigil: "🔥",
      domain: "Greedy Algorithms, Sorting, Math",
      philosophy: "\"Take the best option now, perfect the path as you walk.\"",
      description: "Lone warriors who make quick, locally optimal decisions. They excel at finding immediate solutions and trusting their instincts over complex planning.",
      ability: "Finishing Blow: Bonus XP for highly optimal solutions",
      weakness: "May miss globally optimal solutions in complex scenarios"
    },
    {
      name: "Bit Sage",
      sigil: "�",
      domain: "Bitmasking, Binary Manipulation", 
      philosophy: "\"Truth lives in the smallest details.\"",
      description: "Ancient masters who work at the fundamental level of reality itself. They manipulate individual bits and see the binary truth behind all existence.",
      ability: "Nullify: Can disable opponent's passive ability for one problem",
      weakness: "Can lose sight of higher-level abstractions and patterns"
    }
  ];

  const mysteriousEvents = [
    {
      title: "Memory Inconsistencies",
      location: "Reality Layer Boundaries",
      description: "Experienced Architects report conflicting memories about their arrival, suggesting deeper truths about the nature of this realm.",
      status: "Under Investigation"
    },
    {
      title: "Earth Signal Interference",
      location: "Deep Code Sectors",
      description: "Strange transmissions from Earth detected in corrupted zones, hinting at ongoing connections to the world of origin.",
      status: "Classified"
    },
    {
      title: "The Recursion Whispers",
      location: "Dynamic Programming Temples",
      description: "Some mages report hearing echoes of their own solutions from problems they haven't solved yet, suggesting temporal loops in the learning process.",
      status: "Temporal Anomaly"
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Parallax Header */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-gradient-to-br from-[var(--primary)]/20 via-[var(--background)] to-[var(--accent)]/20"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 font-mono border-[var(--primary)]/30 bg-[var(--primary)]/10"
          >
            <span className="w-2 h-2 bg-[var(--primary)] rounded-full mr-2 animate-pulse" />
            CLASSIFIED ARCHIVES • CLEARANCE LEVEL: ARCHITECT
          </Badge>
          
          <h1 className="font-cinzel text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] bg-clip-text text-transparent">
            Chronicles of Aethel
          </h1>
          
          <p className="font-cormorant text-xl md:text-2xl text-[var(--muted-foreground)] italic leading-relaxed">
            Uncover the truth of your journey from Earth to a realm where programming knowledge becomes supernatural power. Reality has layers within layers, young Architect.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 bg-[var(--background)]">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <Tabs defaultValue="timeline" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-[var(--muted)] border border-[var(--border)]">
              <TabsTrigger value="timeline" className="font-cinzel">Reality Layers</TabsTrigger>
              <TabsTrigger value="classes" className="font-cinzel">Architect Classes</TabsTrigger>
              <TabsTrigger value="mysteries" className="font-cinzel">Anomalies</TabsTrigger>
              <TabsTrigger value="codex" className="font-cinzel">Pattern Codex</TabsTrigger>
            </TabsList>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="mt-8">
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="font-cinzel text-3xl font-bold mb-4">The Five Reality Layers</h2>
                  <p className="font-cormorant text-[var(--muted-foreground)] italic">
                    Each revelation reshapes everything you thought you knew
                  </p>
                </div>

                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--primary)] via-[var(--accent)] to-[var(--primary)] transform md:-translate-x-1/2" />

                  {timelineEvents.map((event, index) => (
                    <div key={index} className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                      {/* Timeline Dot */}
                      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-[var(--primary)] rounded-full border-2 border-[var(--background)] transform md:-translate-x-1/2 z-10" />

                      {/* Content Card */}
                      <Card className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:mr-1/2 md:pr-8' : 'md:ml-1/2 md:pl-8'} bg-[var(--card)]/80 border-[var(--border)] backdrop-blur-md max-w-lg`}>
                        <CardHeader>
                          <div className="flex justify-between items-start mb-2">
                            <Badge variant="secondary" className="font-mono text-xs">
                              {event.year}
                            </Badge>
                            <Badge variant="outline" className="font-mono text-xs">
                              {event.era}
                            </Badge>
                          </div>
                          <CardTitle className="font-cinzel text-xl">{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="font-cormorant text-[var(--muted-foreground)] mb-4 leading-relaxed">
                            {event.description}
                          </p>
                          <div className="text-sm">
                            <span className="font-cinzel font-semibold text-[var(--primary)]">Impact: </span>
                            <span className="font-cormorant italic">{event.impact}</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Classes Tab */}
            <TabsContent value="classes" className="mt-8">
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="font-cinzel text-3xl font-bold mb-4">The Five Architect Classes</h2>
                  <p className="font-cormorant text-[var(--muted-foreground)] italic">
                    Each path offers unique approaches to the art of Pattern manipulation
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {classes.map((archClass, index) => (
                    <Card key={index} className="bg-[var(--card)]/80 border-[var(--border)] backdrop-blur-md hover:bg-[var(--muted)]/50 transition-all duration-300 group">
                      <CardHeader className="text-center">
                        <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                          {archClass.sigil}
                        </div>
                        <CardTitle className="font-cinzel text-xl">{archClass.name}</CardTitle>
                        <p className="font-cormorant italic text-[var(--primary)] text-sm">
                          {archClass.philosophy}
                        </p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="font-cormorant text-[var(--muted-foreground)] leading-relaxed text-sm">
                          {archClass.description}
                        </p>
                        
                        <div>
                          <h4 className="font-cinzel text-sm font-semibold mb-2 text-[var(--accent)]">Skill Domain:</h4>
                          <p className="text-xs font-cormorant text-[var(--muted-foreground)]">
                            {archClass.domain}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-cinzel text-sm font-semibold mb-2 text-[var(--primary)]">PvP Ability:</h4>
                          <p className="text-xs font-cormorant text-[var(--muted-foreground)]">
                            {archClass.ability}
                          </p>
                        </div>

                        <div>
                          <h4 className="font-cinzel text-sm font-semibold text-[var(--destructive)]">Known Weakness:</h4>
                          <p className="text-xs font-cormorant text-[var(--muted-foreground)] italic">
                            {archClass.weakness}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Mysteries Tab */}
            <TabsContent value="mysteries" className="mt-8">
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="font-cinzel text-3xl font-bold mb-4">Reality Anomalies</h2>
                  <p className="font-cormorant text-[var(--muted-foreground)] italic">
                    Disturbances in the layers of reality that hint at deeper truths
                  </p>
                </div>

                <div className="space-y-6">
                  {mysteriousEvents.map((mystery, index) => (
                    <Card key={index} className="bg-[var(--card)]/80 border-[var(--border)] backdrop-blur-md">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="font-cinzel text-xl">{mystery.title}</CardTitle>
                          <Badge 
                            variant={mystery.status === 'Classified' ? 'destructive' : mystery.status === 'Temporal Anomaly' ? 'secondary' : 'outline'}
                            className="font-mono text-xs"
                          >
                            {mystery.status}
                          </Badge>
                        </div>
                        <p className="font-cormorant text-[var(--primary)] italic">
                          📍 {mystery.location}
                        </p>
                      </CardHeader>
                      <CardContent>
                        <p className="font-cormorant text-[var(--muted-foreground)] leading-relaxed">
                          {mystery.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Pattern Codex Tab */}
            <TabsContent value="codex" className="mt-8">
              <div className="space-y-8">
                <div className="text-center mb-12">
                  <h2 className="font-cinzel text-3xl font-bold mb-4">The Pattern Codex</h2>
                  <p className="font-cormorant text-[var(--muted-foreground)] italic">
                    Fundamental laws and principles that govern the Code Realm
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="bg-[var(--card)]/80 border-[var(--border)] backdrop-blur-md">
                    <CardHeader>
                      <CardTitle className="font-cinzel">The Seven Laws of Logic</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        "Every problem has at least one solution",
                        "Optimization is an art, not a necessity",
                        "Recursion without base case leads to madness",
                        "The shortest path is not always the best path",
                        "Memory leaks corrupt both code and soul",
                        "Premature optimization is the root of all evil",
                        "Documentation is the bridge between minds"
                      ].map((law, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <span className="font-mono text-[var(--primary)] font-bold">{index + 1}.</span>
                          <span className="font-cormorant text-[var(--muted-foreground)]">{law}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card className="bg-[var(--card)]/80 border-[var(--border)] backdrop-blur-md">
                    <CardHeader>
                      <CardTitle className="font-cinzel">Corruption Symptoms</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {[
                        "Variables changing without assignment",
                        "Infinite loops that mysteriously terminate",
                        "Functions returning before being called",
                        "Memory addresses pointing to the past",
                        "Code that executes in reverse order",
                        "Data structures that exist in multiple states",
                        "Algorithms that solve problems they weren't designed for"
                      ].map((symptom, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <span className="text-[var(--destructive)]">⚠️</span>
                          <span className="font-cormorant text-[var(--muted-foreground)]">{symptom}</span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Call to Action */}
        <section className="py-16 px-4 bg-[var(--muted)]/20">
          <div className="container mx-auto max-w-4xl text-center">
            <Card className="bg-gradient-to-br from-[var(--card)] to-[var(--muted)] border-[var(--border)] backdrop-blur-md">
              <CardContent className="p-12">
                <h2 className="font-cinzel text-3xl md:text-4xl font-bold mb-6">
                  Ready to Join the Pattern?
                </h2>
                <p className="font-cormorant text-lg text-[var(--muted-foreground)] mb-8 italic">
                  Reality has layers within layers, and each Architect must discover their own truth. 
                  Will you help unravel the mystery of your arrival?
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    asChild
                    size="lg"
                    className="font-cinzel text-lg px-8 py-6 bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] hover:opacity-90 transition-all duration-300 shadow-lg"
                  >
                    <Link href="/login">
                      Begin Your Training
                    </Link>
                  </Button>
                  
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="font-cinzel text-lg px-8 py-6 border-[var(--border)] hover:bg-[var(--muted)] transition-all duration-300"
                  >
                    <Link href="/">
                      Return to Realm Gates
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
