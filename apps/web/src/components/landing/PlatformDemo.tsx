"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight,
  Play,
  Shield,
  Zap
} from "lucide-react";
import { demoSections } from "./landing";

const PlatformDemo = () => {
  const [activeDemo, setActiveDemo] = useState(0);

  const currentDemo = demoSections[activeDemo];

  const renderPreview = () => {
    const demo = currentDemo.preview;
    
    switch (demo.type) {
      case "code":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-cinzel font-bold text-[var(--foreground)]">{demo.problem}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary" className="text-xs">{demo.difficulty}</Badge>
                  <span className="text-xs text-[var(--primary)] font-mono">{demo.points}</span>
                </div>
              </div>
              <Button size="sm" className="bg-[var(--primary)] hover:bg-[var(--primary)]/80">
                <Play className="w-4 h-4 mr-1" />
                Test
              </Button>
            </div>
            <div className="bg-[var(--muted)]/20 rounded-lg p-4 border border-[var(--border)]">
              <pre className="text-sm font-mono text-[var(--foreground)] overflow-x-auto">
                <code>{demo.content}</code>
              </pre>
            </div>
          </div>
        );
        
      case "battle":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-cinzel font-bold text-[var(--foreground)]">{demo.problem}</h4>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-[var(--accent)]" />
                <span className="font-mono text-[var(--accent)] font-bold">{demo.timeLeft}</span>
              </div>
            </div>
            <div className="space-y-3">
              {demo.players?.map((player, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-[var(--card)]/40 rounded-lg border border-[var(--border)]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold">
                    {player.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-cinzel font-medium">{player.name}</span>
                      <span className="text-sm text-[var(--muted-foreground)]">{player.status}</span>
                    </div>
                    <div className="w-full bg-[var(--muted)] rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${player.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
        
      case "guild":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-cinzel font-bold text-[var(--foreground)]">{demo.expedition}</h4>
                <p className="text-sm text-[var(--muted-foreground)]">Current: {demo.currentChallenge}</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-[var(--muted-foreground)]">Progress</div>
                <div className="font-bold text-[var(--primary)]">{demo.progress}/{demo.total}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {demo.members?.map((member, index) => (
                <div key={index} className="flex items-center space-x-2 p-2 bg-[var(--card)]/40 rounded border border-[var(--border)]">
                  <Shield className="w-4 h-4 text-[var(--primary)]" />
                  <span className="text-sm font-cormorant">{member}</span>
                </div>
              ))}
            </div>
            <div className="w-full bg-[var(--muted)] rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] h-3 rounded-full"
                style={{ width: `${((demo.progress || 0) / (demo.total || 1)) * 100}%` }}
              />
            </div>
          </div>
        );
        
      case "leaderboard":
        return (
          <div className="space-y-2">
            {demo.rankings?.map((player, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  player.highlight 
                    ? "bg-[var(--primary)]/10 border-[var(--primary)]/30" 
                    : "bg-[var(--card)]/40 border-[var(--border)]"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded flex items-center justify-center text-xs font-bold ${
                    player.rank <= 3 ? "bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] text-white" : "bg-[var(--muted)] text-[var(--muted-foreground)]"
                  }`}>
                    {player.rank}
                  </div>
                  <div>
                    <div className="font-cinzel font-medium text-sm">{player.name}</div>
                    <div className="text-xs text-[var(--muted-foreground)]">{player.class}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-mono text-sm font-bold">{player.points}</div>
                  <div className={`text-xs ${player.trend === "up" ? "text-green-500" : "text-red-500"}`}>
                    {player.trend === "up" ? "↗" : "↘"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <section className="py-24 px-4 relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--muted)]/10 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_50%)] opacity-5" />
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-3xl md:text-4xl font-bold mb-4">
            Experience the Code Realm
          </h2>
          <p className="font-cormorant text-lg text-[var(--muted-foreground)] italic max-w-2xl mx-auto">
            Step into the actual platform. See what awaits beyond the threshold of reality.
          </p>
        </div>

        {/* Demo Navigation */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center space-x-2 bg-[var(--card)]/60 backdrop-blur-md rounded-full p-2 border border-[var(--border)]">
            {demoSections.map((demo, index) => {
              const IconComponent = demo.icon;
              return (
                <div key={demo.id} className="flex items-center">
                  <button
                    onClick={() => setActiveDemo(index)}
                    className={`flex items-center justify-center w-12 h-12 rounded-full transition-transform duration-300 cursor-pointer ${
                      activeDemo === index
                        ? `bg-gradient-to-r ${demo.color} text-white shadow-lg scale-110`
                        : "bg-[var(--muted)] text-[var(--muted-foreground)] hover:bg-[var(--muted)]/80"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </button>
                  {index < demoSections.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-[var(--muted-foreground)] mx-2" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Demo Description */}
          <div className="space-y-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${currentDemo.color} p-[2px]`}>
                <div className="w-full h-full rounded-full bg-[var(--card)] flex items-center justify-center">
                  <currentDemo.icon className="w-8 h-8 text-[var(--primary)]" />
                </div>
              </div>
              <div>
                <h3 className="font-cinzel text-2xl font-bold text-[var(--foreground)]">
                  {currentDemo.title}
                </h3>
                <p className="font-cormorant text-lg text-[var(--primary)] italic">
                  {currentDemo.subtitle}
                </p>
              </div>
            </div>
            <p className="font-cormorant text-lg text-[var(--muted-foreground)] leading-relaxed">
              {currentDemo.description}
            </p>
            <Button
              asChild
              className={`bg-gradient-to-r ${currentDemo.color} text-white hover:opacity-90 transition-opacity duration-300 shadow-lg font-cinzel`}
            >
              <a href="/login">
                Experience This Now
                <ChevronRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>

          {/* Interactive Preview */}
          <Card className="bg-[var(--card)]/80 border-[var(--border)] backdrop-blur-md shadow-xl">
            <CardContent className="p-6">
              {renderPreview()}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PlatformDemo;
