"use client";

import { useState, useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: string;
  authorClass: string;
  timestamp: Date;
  replies: number;
  likes: number;
  category: string;
  tags: string[];
}

interface Guild {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  leader: string;
  level: number;
  focus: string;
  recruiting: boolean;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  type: 'tournament' | 'workshop' | 'social' | 'challenge';
  participants: number;
  maxParticipants?: number;
}

function CommunityContent() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('feed');
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');

  // Mock data - will be replaced with real data
  const forumPosts: ForumPost[] = [
    {
      id: '1',
      title: 'Tips for mastering dynamic programming',
      content: 'Just completed the DP dungeon and wanted to share some insights that helped me...',
      author: 'AlgoMaster92',
      authorClass: 'Dynamic Mage',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      replies: 23,
      likes: 45,
      category: 'Strategy',
      tags: ['dynamic-programming', 'tips', 'algorithms']
    },
    {
      id: '2',
      title: 'New PvP meta discussion',
      content: 'With the recent updates to the arena, what strategies are you finding most effective?',
      author: 'BattleCoder',
      authorClass: 'Array Knight',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
      replies: 67,
      likes: 89,
      category: 'PvP',
      tags: ['pvp', 'strategy', 'meta']
    },
    {
      id: '3',
      title: 'Looking for study group partners',
      content: 'Anyone interested in forming a group to tackle the harder dungeons together?',
      author: 'StudyBuddy',
      authorClass: 'Bit Sage',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
      replies: 12,
      likes: 28,
      category: 'LFG',
      tags: ['study-group', 'dungeons', 'collaboration']
    },
    {
      id: '4',
      title: 'Graph algorithms visualization tool',
      content: 'I built a tool to help visualize graph traversal algorithms. Thought it might help others!',
      author: 'GraphGuru',
      authorClass: 'Graph Assassin',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12),
      replies: 34,
      likes: 156,
      category: 'Resources',
      tags: ['graphs', 'visualization', 'tools']
    }
  ];

  const guilds: Guild[] = [
    {
      id: '1',
      name: 'Code Crusaders',
      description: 'Elite guild focused on competitive programming and algorithm mastery',
      memberCount: 247,
      leader: 'AlgorithmKing',
      level: 15,
      focus: 'Competitive Programming',
      recruiting: true
    },
    {
      id: '2',
      name: 'Debug Dynasty',
      description: 'Masters of finding and fixing the most elusive bugs',
      memberCount: 189,
      leader: 'BugHunter',
      level: 12,
      focus: 'Debugging & Testing',
      recruiting: true
    },
    {
      id: '3',
      name: 'Binary Brotherhood',
      description: 'Low-level programming enthusiasts and system architects',
      memberCount: 156,
      leader: 'BitWizard',
      level: 18,
      focus: 'Systems Programming',
      recruiting: false
    },
    {
      id: '4',
      name: 'Frontend Fellowship',
      description: 'UI/UX masters and web development specialists',
      memberCount: 312,
      leader: 'PixelPerfect',
      level: 11,
      focus: 'Frontend Development',
      recruiting: true
    }
  ];

  const upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Weekly Algorithm Tournament',
      description: 'Test your skills against the best architects in timed challenges',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
      type: 'tournament',
      participants: 156,
      maxParticipants: 256
    },
    {
      id: '2',
      title: 'Advanced Graph Theory Workshop',
      description: 'Deep dive into complex graph algorithms with expert guidance',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
      type: 'workshop',
      participants: 43,
      maxParticipants: 50
    },
    {
      id: '3',
      title: 'Community Game Night',
      description: 'Casual gaming session and networking with fellow architects',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      type: 'social',
      participants: 78
    },
    {
      id: '4',
      title: 'Speed Coding Challenge',
      description: 'How fast can you solve 10 programming problems?',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10),
      type: 'challenge',
      participants: 89,
      maxParticipants: 100
    }
  ];

  const topContributors = [
    { name: 'CodeSensei', posts: 234, reputation: 4567, class: 'Array Knight' },
    { name: 'AlgoQueen', posts: 189, reputation: 3894, class: 'Dynamic Mage' },
    { name: 'DebugMaster', posts: 156, reputation: 3421, class: 'Bit Sage' },
    { name: 'GraphGod', posts: 143, reputation: 3156, class: 'Graph Assassin' },
    { name: 'OptimalOz', posts: 134, reputation: 2987, class: 'Greedy Ronin' }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'tournament': return '🏆';
      case 'workshop': return '🎓';
      case 'social': return '🎉';
      case 'challenge': return '⚡';
      default: return '📅';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'tournament': return 'from-yellow-400 to-orange-500';
      case 'workshop': return 'from-blue-400 to-indigo-500';
      case 'social': return 'from-green-400 to-teal-500';
      case 'challenge': return 'from-purple-400 to-pink-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const handleCreatePost = () => {
    if (newPostTitle.trim() && newPostContent.trim()) {
      // TODO: Implement post creation
      console.log('Creating post:', { title: newPostTitle, content: newPostContent });
      setNewPostTitle('');
      setNewPostContent('');
    }
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-cinzel font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              🏛️ Community Hub
            </h1>
            <p className="text-xl font-cormorant italic text-[var(--muted-foreground)] mt-2">
              Where architects gather to share knowledge and forge alliances
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed" className="font-cinzel">📰 Feed</TabsTrigger>
            <TabsTrigger value="guilds" className="font-cinzel">⚔️ Guilds</TabsTrigger>
            <TabsTrigger value="events" className="font-cinzel">📅 Events</TabsTrigger>
            <TabsTrigger value="leaderboard" className="font-cinzel">🏆 Contributors</TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Feed */}
              <div className="lg:col-span-2 space-y-6">
                {/* Create Post */}
                <Card className="bg-[var(--card)] border-[var(--border)]">
                  <CardHeader>
                    <CardTitle className="font-cinzel">Share Your Knowledge</CardTitle>
                    <CardDescription>
                      Help fellow architects with tips, questions, or discoveries
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Input
                      placeholder="What's on your mind, architect?"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                      className="font-medium"
                    />
                    <textarea
                      placeholder="Share your thoughts, ask questions, or offer help..."
                      value={newPostContent}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPostContent(e.target.value)}
                      rows={3}
                      className="w-full p-3 border border-[var(--border)] rounded-md bg-[var(--background)] text-[var(--foreground)] resize-none focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-2">
                        <Badge variant="outline">Strategy</Badge>
                        <Badge variant="outline">PvP</Badge>
                        <Badge variant="outline">Resources</Badge>
                      </div>
                      <Button 
                        onClick={handleCreatePost}
                        disabled={!newPostTitle.trim() || !newPostContent.trim()}
                        className="font-cinzel"
                      >
                        Post
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Forum Posts */}
                <div className="space-y-4">
                  {forumPosts.map((post) => (
                    <Card key={post.id} className="bg-[var(--card)] border-[var(--border)] hover:bg-[var(--muted)] transition-colors cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold">
                            {post.author.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="flex-1 space-y-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <h3 className="font-cinzel font-bold text-lg">{post.title}</h3>
                                <div className="flex items-center space-x-2 text-sm text-[var(--muted-foreground)]">
                                  <span className="font-medium">{post.author}</span>
                                  <span>•</span>
                                  <Badge variant="secondary" className="text-xs">{post.authorClass}</Badge>
                                  <span>•</span>
                                  <span>{formatTimeAgo(post.timestamp)}</span>
                                </div>
                              </div>
                              <Badge variant="outline">{post.category}</Badge>
                            </div>
                            <p className="text-[var(--muted-foreground)]">{post.content}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex space-x-1">
                                {post.tags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-[var(--muted-foreground)]">
                                <span className="flex items-center space-x-1">
                                  <span>💬</span>
                                  <span>{post.replies}</span>
                                </span>
                                <span className="flex items-center space-x-1">
                                  <span>❤️</span>
                                  <span>{post.likes}</span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Active Users */}
                <Card className="bg-[var(--card)] border-[var(--border)]">
                  <CardHeader>
                    <CardTitle className="font-cinzel">🟢 Online Now</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {['CodeNinja', 'AlgoWizard', 'DebugQueen', 'SyntaxSage', 'LogicLord'].map((user) => (
                        <div key={user} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary)] to-[var(--accent)] flex items-center justify-center text-white font-bold text-sm">
                            {user.slice(0, 2)}
                          </div>
                          <span className="text-sm">{user}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-[var(--card)] border-[var(--border)]">
                  <CardHeader>
                    <CardTitle className="font-cinzel">Community Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Members</span>
                      <span className="font-bold text-[var(--primary)]">12,847</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Posts Today</span>
                      <span className="font-bold text-green-400">234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Active Guilds</span>
                      <span className="font-bold text-blue-400">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Online Now</span>
                      <span className="font-bold text-yellow-400">1,156</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Trending Topics */}
                <Card className="bg-[var(--card)] border-[var(--border)]">
                  <CardHeader>
                    <CardTitle className="font-cinzel">🔥 Trending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {['#dynamic-programming', '#pvp-meta', '#graph-algorithms', '#debugging-tips', '#code-review'].map((topic, index) => (
                        <div key={topic} className="flex items-center justify-between">
                          <span className="text-sm text-[var(--primary)]">{topic}</span>
                          <Badge variant="secondary" className="text-xs">
                            {Math.floor(Math.random() * 100) + 50}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="guilds" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guilds.map((guild) => (
                <Card key={guild.id} className="bg-[var(--card)] border-[var(--border)] hover:bg-[var(--muted)] transition-colors">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-cinzel">{guild.name}</CardTitle>
                      <Badge 
                        variant={guild.recruiting ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {guild.recruiting ? "Recruiting" : "Closed"}
                      </Badge>
                    </div>
                    <CardDescription className="font-cormorant italic">
                      {guild.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-[var(--muted-foreground)]">Members</div>
                        <div className="font-bold">{guild.memberCount}</div>
                      </div>
                      <div>
                        <div className="text-[var(--muted-foreground)]">Level</div>
                        <div className="font-bold text-[var(--primary)]">{guild.level}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-[var(--muted-foreground)]">Focus</div>
                        <div className="font-medium">{guild.focus}</div>
                      </div>
                      <div className="col-span-2">
                        <div className="text-[var(--muted-foreground)]">Leader</div>
                        <div className="font-medium">{guild.leader}</div>
                      </div>
                    </div>
                    <Button 
                      className="w-full font-cinzel" 
                      variant={guild.recruiting ? "default" : "outline"}
                      disabled={!guild.recruiting}
                    >
                      {guild.recruiting ? "Apply to Join" : "View Details"}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Create Guild CTA */}
            <Card className="bg-gradient-to-r from-[var(--primary)]/10 to-[var(--accent)]/10 border-[var(--primary)]">
              <CardContent className="p-6 text-center">
                <h3 className="font-cinzel text-xl font-bold mb-2">Start Your Own Guild</h3>
                <p className="text-[var(--muted-foreground)] mb-4">
                  Gather like-minded architects and embark on epic coding quests together
                </p>
                <Button className="font-cinzel">Create Guild</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="events" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="bg-[var(--card)] border-[var(--border)] hover:bg-[var(--muted)] transition-colors">
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getEventColor(event.type)} flex items-center justify-center text-2xl`}>
                        {getEventIcon(event.type)}
                      </div>
                      <div>
                        <CardTitle className="font-cinzel">{event.title}</CardTitle>
                        <CardDescription className="font-cormorant italic">
                          {event.date.toLocaleDateString()} at {event.date.toLocaleTimeString()}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-[var(--muted-foreground)]">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        <span className="text-[var(--muted-foreground)]">Participants: </span>
                        <span className="font-bold">
                          {event.participants}
                          {event.maxParticipants && ` / ${event.maxParticipants}`}
                        </span>
                      </div>
                      <Badge variant="outline" className="capitalize">
                        {event.type}
                      </Badge>
                    </div>
                    <Button className="w-full font-cinzel">
                      {event.maxParticipants && event.participants >= event.maxParticipants 
                        ? "Event Full" 
                        : "Join Event"
                      }
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Create Event CTA */}
            <Card className="bg-gradient-to-r from-[var(--accent)]/10 to-[var(--primary)]/10 border-[var(--accent)]">
              <CardContent className="p-6 text-center">
                <h3 className="font-cinzel text-xl font-bold mb-2">Host Your Own Event</h3>
                <p className="text-[var(--muted-foreground)] mb-4">
                  Organize workshops, tournaments, or social gatherings for the community
                </p>
                <Button variant="outline" className="font-cinzel">Create Event</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="bg-[var(--card)] border-[var(--border)]">
              <CardHeader>
                <CardTitle className="font-cinzel">🏆 Top Contributors</CardTitle>
                <CardDescription>
                  The most active and helpful members of our community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div 
                      key={contributor.name}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                        index < 3 
                          ? 'bg-gradient-to-r from-[var(--accent)]/10 to-[var(--primary)]/10 border-[var(--accent)]' 
                          : 'border-[var(--border)] hover:bg-[var(--muted)]'
                      }`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`
                          flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg
                          ${index === 0 ? 'bg-yellow-500 text-black' :
                            index === 1 ? 'bg-gray-400 text-black' :
                            index === 2 ? 'bg-amber-600 text-white' :
                            'bg-[var(--muted)] text-[var(--foreground)]'
                          }
                        `}>
                          {index === 0 ? '👑' : 
                           index === 1 ? '🥈' :
                           index === 2 ? '🥉' :
                           `#${index + 1}`}
                        </div>
                        <div>
                          <div className="font-bold text-lg">{contributor.name}</div>
                          <div className="text-sm text-[var(--muted-foreground)]">{contributor.class}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-[var(--primary)]">
                          {contributor.reputation.toLocaleString()}
                        </div>
                        <div className="text-sm text-[var(--muted-foreground)]">
                          {contributor.posts} posts
                        </div>
                      </div>
                      {index < 3 && (
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center animate-pulse">
                          <span className="text-xs">✨</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Achievements */}
            <Card className="bg-[var(--card)] border-[var(--border)]">
              <CardHeader>
                <CardTitle className="font-cinzel">🎖️ Community Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "Helper", desc: "Answered 50 questions", icon: "🤝", count: "1,234" },
                    { name: "Mentor", desc: "Guided 10 new members", icon: "🎓", count: "567" },
                    { name: "Content Creator", desc: "Created 25 helpful posts", icon: "✍️", count: "890" }
                  ].map((achievement) => (
                    <div key={achievement.name} className="text-center p-4 border border-[var(--border)] rounded-lg">
                      <div className="text-3xl mb-2">{achievement.icon}</div>
                      <div className="font-cinzel font-bold">{achievement.name}</div>
                      <div className="text-sm text-[var(--muted-foreground)] mb-2">{achievement.desc}</div>
                      <div className="text-lg font-bold text-[var(--primary)]">{achievement.count}</div>
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

export default function CommunityPage() {
  return (
    <CommunityContent />
  )
}