"use client";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import AuthGuard from "@/components/AuthGuard";
import { useRouter } from "next/navigation";

function DashboardContent() {
  const { data: session } = authClient.useSession();
  const [currentTime, setCurrentTime] = useState(new Date());
  const router = useRouter();

  const privateData = useQuery(orpc.privateData.queryOptions());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock data for now - will be replaced with real data later
  const playerStats = {
    level: 12,
    experience: 2847,
    experienceToNext: 3500,
    class: "Dynamic Mage",
    questsCompleted: 23,
    currentStreak: 7,
    rank: 1284,
  };

  const activeQuests = [
    {
      id: 1,
      title: "The Corrupted Binary Tree",
      description: "Navigate through the twisted branches of a corrupted data structure",
      difficulty: "Medium",
      progress: 65,
      type: "Story Quest"
    },
    {
      id: 2,
      title: "Array Knight Training",
      description: "Master the fundamentals of array manipulation",
      difficulty: "Easy",
      progress: 80,
      type: "Class Quest"
    }
  ];

  const recentAchievements: Array<{name: string, description: string, icon: string}> = [
    { name: "First Victory", description: "Completed your first coding challenge", icon: "🏆" },
    { name: "Streak Master", description: "Maintained a 7-day solving streak", icon: "🔥" },
    { name: "Dynamic Apprentice", description: "Unlocked the Dynamic Mage class", icon: "🔮" }
  ];

  return (
    <div className="min-h-screen text-[var(--foreground)] bg-[var(--background)] relative">
      {/* Background pattern/texture */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--muted)]/20 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Elegant Header with theme colors */}
        <header className="border-b backdrop-blur-md border-[var(--border)] bg-[var(--background)]/80">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-full p-[2px] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]">
                  <div className="w-full h-full rounded-full bg-[var(--card)] flex items-center justify-center">
                    <span className="text-xl font-bold text-[var(--primary)]">
                      {session?.user?.name?.charAt(0).toUpperCase() || 'A'}
                    </span>
                  </div>
                </div>
                <div>
                  <h1 className="font-cinzel text-3xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                    Welcome back, Architect
                  </h1>
                  <p className="font-cormorant italic text-lg text-[var(--muted-foreground)]">
                    {session?.user?.name || 'Unknown Architect'}
                  </p>
                  <div className="flex items-center space-x-4 mt-1">
                    <Badge variant="secondary">
                      Level {playerStats.level}
                    </Badge>
                    <Badge variant="outline">
                      {playerStats.class}
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[var(--muted-foreground)]">Realm Time</div>
                <div className="font-mono text-lg text-[var(--primary)]">
                  {currentTime.toLocaleTimeString()}
                </div>
                <div className="text-xs mt-1 text-[var(--muted-foreground)]">Session: Active</div>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
            {/* Main Content - Stats & Quests */}
            <div className="xl:col-span-3 space-y-8">
              {/* Character Overview - Enhanced but elegant */}
              <Card className="backdrop-blur-md overflow-hidden">
                <div className="p-6 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10">
                  <CardTitle className="font-cinzel text-2xl mb-4">
                    Architect Profile
                  </CardTitle>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1 text-[var(--foreground)]">
                        {playerStats.level}
                      </div>
                      <div className="text-sm uppercase tracking-wider text-[var(--primary)]">Level</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1 text-[var(--foreground)]">
                        {playerStats.questsCompleted}
                      </div>
                      <div className="text-sm uppercase tracking-wider text-[var(--accent)]">Quests</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1 text-[var(--foreground)]">
                        #{playerStats.rank}
                      </div>
                      <div className="text-sm uppercase tracking-wider text-[var(--secondary)]">Rank</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold mb-1 text-[var(--foreground)]">
                        {playerStats.currentStreak}
                      </div>
                      <div className="text-sm uppercase tracking-wider text-[var(--accent)]">Streak</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 rounded-lg border bg-[var(--muted)] border-[var(--border)]">
                    <div className="flex justify-between text-sm mb-2 text-[var(--muted-foreground)]">
                      <span>Experience Progress</span>
                      <span>{playerStats.experience} / {playerStats.experienceToNext}</span>
                    </div>
                    <Progress 
                      value={(playerStats.experience / playerStats.experienceToNext) * 100} 
                      className="h-3"
                    />
                    <div className="text-xs mt-1 text-[var(--muted-foreground)]">
                      {playerStats.experienceToNext - playerStats.experience} XP to next level
                    </div>
                  </div>
                </div>
              </Card>

              {/* Active Quests - Strategic terminal element */}
              <Card className="backdrop-blur-md">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="font-cinzel text-xl">Active Missions</CardTitle>
                      <CardDescription className="font-cormorant italic">
                        Your journey through the Code Corruption continues...
                      </CardDescription>
                    </div>
                    {/* Mini terminal indicator - subtle but thematic */}
                    <div className="rounded px-3 py-1 font-mono text-xs border bg-[var(--muted)] border-[var(--border)]">
                      <span className="text-[var(--primary)]">●</span>{" "}
                      <span className="text-[var(--muted-foreground)]">ACTIVE</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeQuests.map((quest) => (
                    <div key={quest.id} className="group border rounded-lg p-4 transition-all duration-300 border-[var(--border)] bg-[var(--muted)]/50">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-lg transition-colors text-[var(--foreground)]">
                            {quest.title}
                          </h3>
                          <p className="mt-1 leading-relaxed text-[var(--muted-foreground)]">
                            {quest.description}
                          </p>
                        </div>
                        <Badge 
                          variant={quest.difficulty === 'Easy' ? 'secondary' : 'outline'}
                        >
                          {quest.difficulty}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1 mr-4">
                          <Progress value={quest.progress} className="h-2" />
                        </div>
                        <span className="text-sm font-mono text-[var(--primary)]">
                          {quest.progress}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <Badge variant="secondary">
                          {quest.type}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                        >
                          Continue
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Clean and functional */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card className="backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="font-cinzel">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full font-semibold"
                    onClick={() => router.push('/play/daily')}
                  >
                    ⚡ Daily Challenge
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push('/dungeons')}
                  >
                    🏰 Dungeons
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push('/pvp')}
                  >
                    ⚔️ Arena
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => router.push('/quests')}
                  >
                    📜 All Quests
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Achievements */}
              <Card className="backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="font-cinzel flex items-center space-x-2">
                    <span>⭐</span>
                    <span>Recent Achievements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentAchievements.map((achievement, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg transition-colors bg-[var(--accent)]/10 border-[var(--border)]">
                      <div className="text-2xl">{achievement.icon}</div>
                      <div>
                        <div className="font-semibold text-sm text-[var(--accent-foreground)]">
                          {achievement.name}
                        </div>
                        <div className="text-xs text-[var(--muted-foreground)]">
                          {achievement.description}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* System Status - Subtle terminal element */}
              {privateData.data && (
                <Card className="bg-[var(--card)]/80 border-[var(--primary)]/20 backdrop-blur-md">
                  <CardHeader className="pb-3">
                    <CardTitle className="font-mono text-[var(--primary)] text-sm flex items-center space-x-2">
                      <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse"></span>
                      <span>System Status</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="font-mono text-xs space-y-1">
                    <div className="text-[var(--primary)]">● Connection: Stable</div>
                    <div className="text-[var(--accent)]">● Latency: 12ms</div>
                    <div className="text-[var(--muted-foreground)]">● Last sync: Just now</div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
