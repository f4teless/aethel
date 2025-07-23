"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PvPMatch {
  id: string;
  opponent: string;
  opponentClass: string;
  result: 'victory' | 'defeat' | 'ongoing';
  duration: string;
  rating: number;
  timestamp: Date;
}

interface PvPStats {
  currentRating: number;
  rank: number;
  wins: number;
  losses: number;
  winStreak: number;
  longestStreak: number;
  totalMatches: number;
  winRate: number;
}

function PvPContent() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('arena');
  const [isInQueue, setIsInQueue] = useState(false);
  const [queueTimer, setQueueTimer] = useState(0);

  // Mock data - will be replaced with real data
  const playerStats: PvPStats = {
    currentRating: 1847,
    rank: 157,
    wins: 34,
    losses: 12,
    winStreak: 7,
    longestStreak: 12,
    totalMatches: 46,
    winRate: 73.9
  };

  const recentMatches: PvPMatch[] = [
    {
      id: '1',
      opponent: 'Shadow Coder',
      opponentClass: 'Graph Assassin',
      result: 'victory',
      duration: '2:34',
      rating: 1847,
      timestamp: new Date(Date.now() - 1000 * 60 * 15)
    },
    {
      id: '2',
      opponent: 'Logic Master',
      opponentClass: 'Array Knight',
      result: 'victory',
      duration: '3:12',
      rating: 1824,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    {
      id: '3',
      opponent: 'Binary Beast',
      opponentClass: 'Dynamic Mage',
      result: 'defeat',
      duration: '4:56',
      rating: 1798,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6)
    },
    {
      id: '4',
      opponent: 'Recursive Ronin',
      opponentClass: 'Greedy Ronin',
      result: 'victory',
      duration: '1:47',
      rating: 1820,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24)
    },
    {
      id: '5',
      opponent: 'Algorithm Ace',
      opponentClass: 'Bit Sage',
      result: 'victory',
      duration: '2:18',
      rating: 1795,
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48)
    }
  ];
  // Queue timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInQueue) {
      interval = setInterval(() => {
        setQueueTimer(prev => prev + 1);
      }, 1000);
    } else {
      setQueueTimer(0);
    }
    return () => clearInterval(interval);
  }, [isInQueue]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleJoinQueue = () => {
    setIsInQueue(true);
    // Simulate finding a match after 10-30 seconds
    setTimeout(() => {
      setIsInQueue(false);
      // Navigate to battle screen (placeholder)
      // router.push('/pvp/battle');
    }, Math.random() * 20000 + 10000);
  };

  const handleLeaveQueue = () => {
    setIsInQueue(false);
  };

  const getRankBadgeColor = (rank: number) => {
    if (rank <= 10) return 'from-yellow-400 to-yellow-600';
    if (rank <= 50) return 'from-gray-300 to-gray-500';
    if (rank <= 100) return 'from-amber-600 to-amber-800';
    return 'from-slate-600 to-slate-800';
  };

  const getResultColor = (result: string) => {
    switch (result) {
      case 'victory': return 'text-green-400';
      case 'defeat': return 'text-red-400';
      case 'ongoing': return 'text-yellow-400';
      default: return 'text-[var(--muted-foreground)]';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-cinzel font-bold bg-gradient-to-r from-red-400 to-yellow-400 bg-clip-text text-transparent">
              ⚔️ Arena of Architects
            </h1>
            <p className="text-xl font-cormorant italic text-[var(--muted-foreground)] mt-2">
              Where logic meets combat, and only the sharpest minds prevail
            </p>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push('/dashboard')}
            className="font-cinzel"
          >
            Back to Dashboard
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="arena" className="font-cinzel">🎯 Arena</TabsTrigger>
            <TabsTrigger value="stats" className="font-cinzel">📊 Stats</TabsTrigger>
            <TabsTrigger value="history" className="font-cinzel">📜 History</TabsTrigger>
          </TabsList>

          <TabsContent value="arena" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Arena */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-[var(--card)] border-[var(--border)]">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-2xl flex items-center space-x-2">
                      <span>⚔️</span>
                      <span>Combat Arena</span>
                    </CardTitle>
                    <CardDescription className="font-cormorant italic">
                      Enter the battlefield and test your algorithmic prowess
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {!isInQueue ? (
                      <div className="text-center space-y-4">
                        <div className="p-8 border-2 border-dashed border-[var(--border)] rounded-lg">
                          <div className="text-6xl mb-4">⚔️</div>
                          <h3 className="font-cinzel text-xl font-bold mb-2">Ready for Battle?</h3>
                          <p className="text-[var(--muted-foreground)] mb-6">
                            Join the matchmaking queue and face a worthy opponent
                          </p>
                          <Button 
                            onClick={handleJoinQueue}
                            className="font-cinzel text-lg px-8 py-3"
                            size="lg"
                          >
                            Join Queue
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="p-8 bg-[var(--accent)]/10 border border-[var(--accent)] rounded-lg">
                          <div className="text-6xl mb-4 animate-pulse">🔍</div>
                          <h3 className="font-cinzel text-xl font-bold mb-2">Seeking Opponent...</h3>
                          <p className="text-[var(--muted-foreground)] mb-4">
                            Searching for an architect of similar skill
                          </p>
                          <div className="text-2xl font-mono text-[var(--accent)] mb-6">
                            {formatTime(queueTimer)}
                          </div>
                          <Button 
                            variant="outline"
                            onClick={handleLeaveQueue}
                            className="font-cinzel"
                          >
                            Leave Queue
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Quick Match Options */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border border-[var(--border)] rounded-lg">
                        <h4 className="font-cinzel font-bold mb-2">⚡ Quick Match</h4>
                        <p className="text-sm text-[var(--muted-foreground)] mb-3">
                          Fast-paced 3-minute rounds
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Queue for Quick Match
                        </Button>
                      </div>
                      <div className="p-4 border border-[var(--border)] rounded-lg">
                        <h4 className="font-cinzel font-bold mb-2">🎯 Ranked Match</h4>
                        <p className="text-sm text-[var(--muted-foreground)] mb-3">
                          Competitive rating battles
                        </p>
                        <Button variant="outline" size="sm" className="w-full">
                          Queue for Ranked
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Battle Modes */}
                <Card className="bg-[var(--card)] border-[var(--border)]">
                  <CardHeader>
                    <CardTitle className="font-cinzel">🎮 Battle Modes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { 
                          name: "Algorithm Duel", 
                          desc: "Classic 1v1 programming challenges",
                          icon: "🔥",
                          status: "Available"
                        },
                        { 
                          name: "Speed Coding", 
                          desc: "Race to solve problems fastest",
                          icon: "⚡",
                          status: "Available"
                        },
                        { 
                          name: "Debug Hunt", 
                          desc: "Find and fix bugs before your opponent",
                          icon: "🐛",
                          status: "Coming Soon"
                        }
                      ].map((mode) => (
                        <div 
                          key={mode.name}
                          className={`p-4 border rounded-lg transition-colors ${
                            mode.status === 'Available' 
                              ? 'border-[var(--border)] hover:bg-[var(--muted)] cursor-pointer' 
                              : 'border-[var(--border)] opacity-50 cursor-not-allowed'
                          }`}
                        >
                          <div className="text-2xl mb-2">{mode.icon}</div>
                          <h4 className="font-cinzel font-bold mb-1">{mode.name}</h4>
                          <p className="text-sm text-[var(--muted-foreground)] mb-2">{mode.desc}</p>
                          <Badge variant={mode.status === 'Available' ? 'default' : 'secondary'}>
                            {mode.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Current Rating */}
                <Card className="bg-gradient-to-br from-[var(--primary)]/10 to-[var(--accent)]/10 border-[var(--primary)]">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-center">Your Rating</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="text-4xl font-bold text-[var(--primary)]">
                      {playerStats.currentRating}
                    </div>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${getRankBadgeColor(playerStats.rank)}`}>
                      <span className="text-white font-bold">#{playerStats.rank}</span>
                    </div>
                    <div className="text-sm text-[var(--muted-foreground)]">
                      {playerStats.winStreak > 0 ? (
                        <span className="text-green-400">🔥 {playerStats.winStreak} win streak</span>
                      ) : (
                        <span>Ready for battle</span>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-[var(--card)] border-[var(--border)]">
                  <CardHeader>
                    <CardTitle className="font-cinzel">Battle Record</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Wins</span>
                      <span className="text-green-400 font-bold">{playerStats.wins}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Losses</span>
                      <span className="text-red-400 font-bold">{playerStats.losses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Win Rate</span>
                      <span className="text-[var(--primary)] font-bold">{playerStats.winRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Best Streak</span>
                      <span className="text-yellow-400 font-bold">{playerStats.longestStreak}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Latest Achievement */}
                <Card className="bg-[var(--card)] border-[var(--border)]">
                  <CardHeader>
                    <CardTitle className="font-cinzel">Latest Achievement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">🏆</div>
                      <div>
                        <div className="font-semibold">Rising Star</div>
                        <div className="text-sm text-[var(--muted-foreground)]">
                          Achieved 7 win streak
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-[var(--card)] border-[var(--border)]">
                <CardHeader className="text-center">
                  <CardTitle className="font-cinzel">Current Rating</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-[var(--primary)]">{playerStats.currentRating}</div>
                  <div className="text-sm text-[var(--muted-foreground)]">Rank #{playerStats.rank}</div>
                </CardContent>
              </Card>

              <Card className="bg-[var(--card)] border-[var(--border)]">
                <CardHeader className="text-center">
                  <CardTitle className="font-cinzel">Total Matches</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-[var(--foreground)]">{playerStats.totalMatches}</div>
                  <div className="text-sm text-[var(--muted-foreground)]">{playerStats.wins}W - {playerStats.losses}L</div>
                </CardContent>
              </Card>

              <Card className="bg-[var(--card)] border-[var(--border)]">
                <CardHeader className="text-center">
                  <CardTitle className="font-cinzel">Win Rate</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-green-400">{playerStats.winRate}%</div>
                  <Progress value={playerStats.winRate} className="mt-2" />
                </CardContent>
              </Card>

              <Card className="bg-[var(--card)] border-[var(--border)]">
                <CardHeader className="text-center">
                  <CardTitle className="font-cinzel">Current Streak</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold text-yellow-400">{playerStats.winStreak}</div>
                  <div className="text-sm text-[var(--muted-foreground)]">Best: {playerStats.longestStreak}</div>
                </CardContent>
              </Card>
            </div>

            {/* Rating Progress Chart Placeholder */}
            <Card className="bg-[var(--card)] border-[var(--border)]">
              <CardHeader>
                <CardTitle className="font-cinzel">Rating Progress</CardTitle>
                <CardDescription>Your performance over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center border border-dashed border-[var(--border)] rounded">
                  <div className="text-center">
                    <div className="text-4xl mb-2">📈</div>
                    <p className="text-[var(--muted-foreground)]">Rating chart will be displayed here</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="bg-[var(--card)] border-[var(--border)]">
              <CardHeader>
                <CardTitle className="font-cinzel">Recent Matches</CardTitle>
                <CardDescription>Your latest PvP encounters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentMatches.map((match) => (
                    <div 
                      key={match.id}
                      className="flex items-center justify-between p-4 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-3 h-3 rounded-full ${
                          match.result === 'victory' ? 'bg-green-400' :
                          match.result === 'defeat' ? 'bg-red-400' :
                          'bg-yellow-400'
                        }`} />
                        <div>
                          <div className="font-semibold">{match.opponent}</div>
                          <div className="text-sm text-[var(--muted-foreground)]">{match.opponentClass}</div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <div className={`font-bold capitalize ${getResultColor(match.result)}`}>
                          {match.result}
                        </div>
                        <div className="text-sm text-[var(--muted-foreground)]">{match.duration}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono text-[var(--primary)]">{match.rating}</div>
                        <div className="text-xs text-[var(--muted-foreground)]">
                          {match.timestamp.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default function PvPPage() {
  return (
      <PvPContent />
  );
}
