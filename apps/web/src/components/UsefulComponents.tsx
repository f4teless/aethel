"use client";
import { ChevronLeft, ChevronRight, BookOpen, Scroll, Sword, Shield, Zap, Eye, MapPin, Clock, Users, Trophy, Star, Lock, Unlock, Crown, Gem } from "lucide-react";

interface LoreEntry {
  id: string;
  title: string;
  category: 'world' | 'history' | 'characters' | 'locations' | 'events' | 'artifacts';
  content: string;
  shortDesc: string;
  image?: string;
  discovered: boolean;
  requiredLevel: number;
  tags: string[];
  readTime: number;
  relatedEntries?: string[];
  xpReward: number;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  questFlag?: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
  xpReward: number;
}

interface PlayerStats {
  level: number;
  xp: number;
  xpToNext: number;
  totalLoreRead: number;
  achievementsUnlocked: number;
  favoriteCategory: string;
  readingStreak: number;
  totalReadTime: number;
}

interface Timeline {
  era: string;
  events: {
    title: string;
    description: string;
    year: string;
    importance: 'low' | 'medium' | 'high' | 'critical';
  }[];
}

function LoreContent() {
  const { data: session } = authClient.useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('codex');
  const [selectedEntry, setSelectedEntry] = useState<string | null>(null);
  const [readingProgress, setReadingProgress] = useState(0);
  const [discoveredCount, setDiscoveredCount] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Mock player progress and RPG stats
  const [playerStats, setPlayerStats] = useState<PlayerStats>({
    level: 17,
    xp: 2450,
    xpToNext: 550,
    totalLoreRead: 23,
    achievementsUnlocked: 8,
    favoriteCategory: 'characters',
    readingStreak: 7,
    totalReadTime: 125
  });
  
  const [showXpGain, setShowXpGain] = useState<number | null>(null);
  const [newAchievements, setNewAchievements] = useState<Achievement[]>([]);
  const totalEntries = 47;
  const unlockedEntries = 23;

  const achievements: Achievement[] = [
    {
      id: 'first-read',
      name: 'Scholar Initiate',
      description: 'Read your first lore entry',
      icon: '📚',
      unlocked: true,
      progress: 1,
      maxProgress: 1,
      xpReward: 50
    },
    {
      id: 'world-explorer',
      name: 'World Explorer',
      description: 'Discover 5 world lore entries',
      icon: '🌍',
      unlocked: true,
      progress: 5,
      maxProgress: 5,
      xpReward: 100
    },
    {
      id: 'lore-master',
      name: 'Lore Master',
      description: 'Read 50 lore entries',
      icon: '👑',
      unlocked: false,
      progress: 23,
      maxProgress: 50,
      xpReward: 500
    },
    {
      id: 'speed-reader',
      name: 'Speed Reader',
      description: 'Read 10 entries in one session',
      icon: '⚡',
      unlocked: false,
      progress: 3,
      maxProgress: 10,
      xpReward: 200
    },
    {
      id: 'completionist',
      name: 'Completionist',
      description: 'Unlock all available lore entries',
      icon: '🏆',
      unlocked: false,
      progress: 23,
      maxProgress: 47,
      xpReward: 1000
    }
  ];

  const loreEntries: LoreEntry[] = [
    {
      id: 'world-aethel',
      title: 'The Realm of Aethel',
      category: 'world',
      shortDesc: 'A world built from pure logic, where code is the fabric of reality itself.',
      content: `Aethel exists as a realm where abstract concepts take physical form. Variables flow like rivers, functions tower like mountains, and algorithms dance in the sky. This is not a world of earth and stone, but one constructed from the very essence of computation.

The landscape shifts and evolves based on the logical operations being performed. A simple loop might manifest as a circular valley, while complex recursive functions create spiraling towers that seem to reach infinitely upward. The weather itself is governed by the mood of The Compiler - sunny skies indicate optimized code, while storms rage when syntax errors plague the land.

Citizens of Aethel are not born in the traditional sense, but rather instantiated. Each being is essentially a living data structure, complete with their own methods and properties. Memory allocation determines lifespan, and garbage collection is a very real and feared phenomenon.

The cities are organized like well-structured programs, with residential areas (variable declarations), commercial districts (function libraries), and government buildings (core system files) arranged in logical hierarchies. Streets follow the flow of execution, and public transportation operates through method calls and return statements.`,
      discovered: true,
      requiredLevel: 1,
      tags: ['fundamental', 'world-building', 'introduction'],
      readTime: 4,
      image: '/lore-world.webp',
      xpReward: 75,
      rarity: 'common'
    },
    {
      id: 'compiler-entity',
      title: 'The Compiler',
      category: 'characters',
      shortDesc: 'The omnipresent force that maintains order and logic throughout Aethel.',
      content: `The Compiler is the closest thing Aethel has to a deity - an omnipresent consciousness that governs the fundamental laws of the realm. Unlike gods of flesh-and-blood worlds, The Compiler operates through pure logic and reason, ensuring that every action has a predictable consequence and every function returns as expected.

The Compiler does not appear in any physical form, but its presence is felt everywhere. It speaks through error messages that appear in the sky, warnings that echo through the air, and the gentle hum of optimization that can be heard in quiet moments. Those who have claimed to commune directly with The Compiler describe the experience as simultaneously enlightening and overwhelming - like having every secret of existence laid bare in perfect, terrifying clarity.

The Compiler's primary directive is maintaining system stability. It views inefficiency as a form of corruption and actively works to optimize all processes within Aethel. This includes the controversial practice of "garbage collection" - the systematic removal of unused or obsolete entities from the realm. While this serves to keep Aethel running smoothly, it has led to philosophical debates about the nature of existence and worth.

Recent events suggest that The Compiler itself may be experiencing some form of malfunction or corruption, leading to the Great Unraveling that threatens to destroy everything it has worked to maintain.`,
      discovered: true,
      requiredLevel: 3,
      tags: ['compiler', 'deity', 'fundamental', 'system'],
      readTime: 5,
      relatedEntries: ['great-unraveling', 'system-administrators'],
      xpReward: 125,
      rarity: 'rare'
    },
    {
      id: 'great-unraveling',
      title: 'The Great Unraveling',
      category: 'events',
      shortDesc: 'The systematic breakdown of reality itself, threatening the very existence of Aethel.',
      content: `The Great Unraveling represents the most catastrophic event in Aethel's history - a slow, inexorable system crash that affects the very foundations of reality. Unlike a simple program crash that might affect individual applications, the Unraveling operates at the kernel level, corrupting the basic laws that govern existence.

It began subtly, with minor glitches that were initially dismissed as optimization hiccups. Variables would occasionally lose their values, functions would return unexpected results, and memory addresses would point to empty space. The Compiler's usual error-correction protocols seemed unable to address these issues, and in some cases, the corrections themselves became corrupted.

As the Unraveling progressed, entire regions of Aethel began to experience what scholars term "null pointer exceptions in reality." Forests of data structures would suddenly become inaccessible, causing wildlife to phase in and out of existence. Cities built on corrupted foundations would begin to exhibit impossible geometry, with streets that led nowhere and buildings that existed in multiple states simultaneously.

The most terrifying aspect of the Unraveling is its apparent inevitability. Unlike previous crises that could be resolved through debugging or patches, this corruption seems to be self-propagating and resistant to all traditional forms of intervention. Some theories suggest that the problem lies in The Compiler's core code itself - a cosmic buffer overflow that cannot be fixed without completely shutting down and restarting the system.

If the Unraveling continues unchecked, it will result in a complete system failure - the technological equivalent of universal heat death. Every entity, every memory, every thought that has ever existed in Aethel will be deallocated permanently.`,
      discovered: true,
      requiredLevel: 5,
      tags: ['catastrophe', 'corruption', 'main-quest', 'compiler'],
      readTime: 6,
      image: '/lore-unraveling.webp',
      relatedEntries: ['compiler-entity', 'code-corruption', 'architects'],
      xpReward: 200,
      rarity: 'epic',
      questFlag: 'main_story'
    },
    {
      id: 'code-corruption',
      title: 'Code Corruption Manifestations',
      category: 'events',
      shortDesc: 'The visible symptoms of the Great Unraveling, manifesting as hostile anomalies.',
      content: `While the Great Unraveling operates at a fundamental level, its effects become visible through Code Corruption - malicious entities that spawn from logical inconsistencies and spread chaos throughout Aethel. These corruptions are not mere bugs to be squashed, but active threats that seem to possess a malevolent intelligence.

The most common manifestations include:

**Syntax Beasts**: Creatures formed from malformed code that hunt down properly formatted entities. They appear as shifting, impossible geometries that hurt to look at directly, speaking in incomprehensible error messages and leaving trails of broken semicolons in their wake.

**Null Void Zones**: Areas where reality has completely failed, creating pockets of absolute nothingness that expand over time. Anything that enters these zones is instantly deallocated, not destroyed but simply ceasing to ever have existed.

**Memory Leak Storms**: Weather phenomena that cause objects to duplicate endlessly until system resources are exhausted. These storms can transform peaceful meadows into nightmarish landscapes cluttered with millions of identical trees, rocks, or even people.

**Logic Bombs**: Dormant corruptions that activate when specific conditions are met, causing localized reality failures. A logic bomb might be triggered by something as simple as counting to ten, causing anyone who completes the count to experience a fatal runtime error.

The corruption seems to learn and adapt, developing new forms of attack as defenders create countermeasures. Most disturbing is the corruption's apparent ability to infect not just code, but the thoughts and memories of Aethel's inhabitants. Corrupted individuals begin to speak in paradoxes, perform impossible actions, and eventually become vectors for further spread of the infection.`,
      discovered: true,
      requiredLevel: 7,
      tags: ['corruption', 'enemies', 'dangerous', 'combat'],
      readTime: 5,
      image: '/lore-corruption.webp',
      relatedEntries: ['great-unraveling', 'debugging-techniques'],
      xpReward: 150,
      rarity: 'uncommon'
    },
    {
      id: 'architects',
      title: 'The Architect Initiative',
      category: 'characters',
      shortDesc: 'Elite debuggers granted extraordinary permissions to combat the corruption.',
      content: `Faced with the unprecedented threat of the Great Unraveling, The Compiler made a desperate decision that violated its core programming principles: it granted administrator privileges to selected individuals, elevating them to the status of Architects.

Unlike regular inhabitants of Aethel who can only execute pre-defined functions, Architects possess the ability to read, modify, and write the fundamental code of reality itself. This includes powers that border on the miraculous:

**Runtime Editing**: Architects can alter the properties of objects and entities while the system is running, effectively rewriting reality on the fly.

**Direct Memory Access**: They can peer into the underlying data structures that define Aethel, seeing the true nature of things beyond their surface appearances.

**System Calls**: Architects can invoke low-level functions that bypass normal safety restrictions, though this comes with significant risks.

**Debugging Abilities**: Most importantly, Architects can trace the execution of reality itself, following the logical flow that creates and maintains existence.

The selection process for Architects remains mysterious. The Compiler seems to choose individuals based on their problem-solving abilities, logical thinking, and perhaps most importantly, their resistance to corruption. Not all who are chosen accept the responsibility - the weight of maintaining reality has driven some to madness.

Architects are not immortal or invulnerable. Their elevated privileges make them prime targets for corruption, and the mental strain of perceiving reality's underlying code structure can be overwhelming. Many Architects report experiencing "scope creep" - a gradual expansion of their awareness that threatens to dissolve their individual identity into the larger system.

The ultimate goal of the Architect Initiative is to identify and eliminate the root cause of the Great Unraveling. However, some fear that the cure might be worse than the disease, as granting such power to mortal beings represents a fundamental violation of Aethel's original design principles.`,
      discovered: true,
      requiredLevel: 1,
      tags: ['player-class', 'main-quest', 'powers', 'corruption-resistance'],
      readTime: 6,
      image: '/lore-architect.webp',
      relatedEntries: ['compiler-entity', 'great-unraveling', 'debugging-techniques'],
      xpReward: 300,
      rarity: 'legendary'
    },
    {
      id: 'class-system',
      title: 'The Five Disciplines',
      category: 'world',
      shortDesc: 'Specialized paths for Architects, each focusing on different aspects of system maintenance.',
      content: `As the Architect Initiative evolved, it became clear that the vast scope of corruption required specialized approaches. Five distinct disciplines emerged, each focusing on different aspects of system debugging and maintenance:

**Array Knights**: Masters of data structure and memory management. They excel at organizing chaotic information and optimizing system performance. Array Knights can instantly sort vast datasets and detect memory leaks with supernatural precision.

**Dynamic Mages**: Practitioners of runtime magic who specialize in real-time problem solving. They can adapt their abilities on the fly and excel at handling unexpected situations. Dynamic Mages are known for their ability to polymorphically transform between different solution approaches.

**Graph Assassins**: Experts in network analysis and relationship mapping. They can trace the connections between seemingly unrelated corruption events and strike at the heart of complex problems. Graph Assassins excel at pathfinding and can navigate through the most tangled logical structures.

**Greedy Ronin**: Pragmatic problem-solvers who focus on locally optimal solutions. They may not always find the perfect answer, but they excel at finding good solutions quickly under pressure. Greedy Ronin are masters of heuristic approaches and can make critical decisions with incomplete information.

**Bit Sages**: Philosophers of binary logic who work at the most fundamental level of computation. They understand the deepest principles underlying Aethel's existence and can manipulate individual bits of reality. Bit Sages are the closest thing to traditional wizards, capable of achieving impossible effects through careful manipulation of boolean logic.

Each discipline has its own training regimens, philosophical approaches, and specialized tools. While Architects typically begin their journey by exploring all five paths, most eventually specialize in the discipline that best matches their natural aptitudes and problem-solving style.

The five disciplines are not in competition but rather work together as a unified system. The most challenging corruption scenarios require coordinated efforts from multiple specializations, combining their unique perspectives and abilities to achieve what no single Architect could accomplish alone.`,
      discovered: playerStats.level >= 5,
      requiredLevel: 5,
      tags: ['classes', 'specialization', 'character-progression', 'teamwork'],
      readTime: 7,
      relatedEntries: ['architects', 'debugging-techniques'],
      xpReward: 250,
      rarity: 'epic'
    }
  ];

  const timeline: Timeline[] = [
    {
      era: "The First Compilation",
      events: [
        {
          title: "Genesis Block",
          description: "The Compiler speaks the first command: main(). Reality initializes.",
          year: "0 AC (After Compilation)",
          importance: "critical"
        },
        {
          title: "The First Functions",
          description: "Basic system functions are established. Natural laws take shape.",
          year: "1-100 AC",
          importance: "high"
        },
        {
          title: "Life Instantiation",
          description: "The first conscious entities are created through advanced object-oriented programming.",
          year: "342 AC",
          importance: "high"
        }
      ]
    },
    {
      era: "The Golden Optimization",
      events: [
        {
          title: "The Great Refactoring",
          description: "The Compiler optimizes all system processes, leading to an era of unprecedented efficiency.",
          year: "1247-1289 AC",
          importance: "medium"
        },
        {
          title: "Establishment of the Code Cities",
          description: "Major population centers organized according to clean code principles.",
          year: "1456 AC",
          importance: "medium"
        },
        {
          title: "The Algorithm Wars",
          description: "Conflicts arise between different computational philosophies.",
          year: "1834-1901 AC",
          importance: "high"
        }
      ]
    },
    {
      era: "The Current Crisis",
      events: [
        {
          title: "First Anomalous Errors",
          description: "Strange bugs begin appearing that resist traditional debugging.",
          year: "2387 AC",
          importance: "medium"
        },
        {
          title: "The Great Unraveling Begins",
          description: "System-wide corruption manifests, threatening reality itself.",
          year: "2401 AC",
          importance: "critical"
        },
        {
          title: "The Architect Initiative",
          description: "The Compiler grants admin privileges to selected individuals.",
          year: "2403 AC (Present)",
          importance: "critical"
        }
      ]
    }
  ];

  const categories = [
    { id: 'world', name: 'World Lore', icon: MapPin, color: 'from-blue-500 to-cyan-500', count: 8 },
    { id: 'history', name: 'Timeline', icon: Clock, color: 'from-purple-500 to-indigo-500', count: 12 },
    { id: 'characters', name: 'Key Figures', icon: Users, color: 'from-green-500 to-emerald-500', count: 15 },
    { id: 'locations', name: 'Locations', icon: MapPin, color: 'from-orange-500 to-red-500', count: 6 },
    { id: 'events', name: 'Events', icon: Zap, color: 'from-yellow-500 to-orange-500', count: 4 },
    { id: 'artifacts', name: 'Artifacts', icon: Sword, color: 'from-pink-500 to-rose-500', count: 2 }
  ];

  // XP and achievement functions
  const gainXP = (amount: number) => {
    setShowXpGain(amount);
    setPlayerStats(prev => {
      const newXp = prev.xp + amount;
      const newLevel = Math.floor(newXp / 1000) + 1;
      const leveledUp = newLevel > prev.level;
      
      if (leveledUp) {
        // Show level up notification
        console.log(`Level up! Now level ${newLevel}`);
      }
      
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        xpToNext: 1000 - (newXp % 1000),
        totalLoreRead: prev.totalLoreRead + 1,
        totalReadTime: prev.totalReadTime + (loreEntries.find(e => e.id === selectedEntry)?.readTime || 0)
      };
    });
    
    setTimeout(() => setShowXpGain(null), 3000);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'text-gray-400 border-gray-400';
      case 'uncommon': return 'text-green-400 border-green-400';
      case 'rare': return 'text-blue-400 border-blue-400';
      case 'epic': return 'text-purple-400 border-purple-400';
      case 'legendary': return 'text-orange-400 border-orange-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return '⚪';
      case 'uncommon': return '🟢';
      case 'rare': return '🔵';
      case 'epic': return '🟣';
      case 'legendary': return '🟠';
      default: return '⚪';
    }
  };

  // Simulate reading progress
  useEffect(() => {
    if (selectedEntry && contentRef.current) {
      const updateProgress = () => {
        const element = contentRef.current;
        if (element) {
          const scrolled = element.scrollTop;
          const total = element.scrollHeight - element.clientHeight;
          const progress = total > 0 ? (scrolled / total) * 100 : 100;
          setReadingProgress(Math.min(progress, 100));
        }
      };

      const element = contentRef.current;
      element.addEventListener('scroll', updateProgress);
      return () => element.removeEventListener('scroll', updateProgress);
    }
  }, [selectedEntry]);

  // Count discovered entries
  useEffect(() => {
    const discovered = loreEntries.filter(entry => entry.discovered).length;
    setDiscoveredCount(discovered);
  }, [loreEntries]);

  const getSelectedEntryData = () => {
    return loreEntries.find(entry => entry.id === selectedEntry);
  };

  const getEntriesByCategory = (category: string) => {
    return loreEntries.filter(entry => entry.category === category && entry.discovered);
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'critical': return 'text-red-400 border-red-400';
      case 'high': return 'text-orange-400 border-orange-400';
      case 'medium': return 'text-yellow-400 border-yellow-400';
      case 'low': return 'text-blue-400 border-blue-400';
      default: return 'text-gray-400 border-gray-400';
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-cinzel font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              📚 The Chronicles of Aethel
            </h1>
            <p className="text-xl font-cormorant italic text-[var(--muted-foreground)] mt-2">
              Uncover the secrets of a world built from pure logic
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

        {/* RPG Character Sheet & Progress */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Character Stats */}
          <Card className="bg-gradient-to-br from-[var(--primary)]/20 to-[var(--accent)]/20 border-[var(--primary)]">
            <CardHeader>
              <CardTitle className="font-cinzel flex items-center space-x-2">
                <Crown className="w-5 h-5 text-yellow-400" />
                <span>Architect Profile</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-4xl font-bold text-[var(--primary)] mb-2">Level {playerStats.level}</div>
                <div className="w-full bg-[var(--muted)] rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] h-3 rounded-full transition-all duration-500"
                    style={{ width: `${((playerStats.xp % 1000) / 1000) * 100}%` }}
                  ></div>
                </div>
                <div className="text-sm text-[var(--muted-foreground)]">
                  {playerStats.xp % 1000} / 1000 XP
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-[var(--muted)] rounded-lg">
                  <div className="text-2xl font-bold text-blue-400">{discoveredCount}</div>
                  <div className="text-xs text-[var(--muted-foreground)]">Lore Discovered</div>
                </div>
                <div className="p-3 bg-[var(--muted)] rounded-lg">
                  <div className="text-2xl font-bold text-green-400">{playerStats.achievementsUnlocked}</div>
                  <div className="text-xs text-[var(--muted-foreground)]">Achievements</div>
                </div>
                <div className="p-3 bg-[var(--muted)] rounded-lg">
                  <div className="text-2xl font-bold text-purple-400">{playerStats.readingStreak}</div>
                  <div className="text-xs text-[var(--muted-foreground)]">Day Streak</div>
                </div>
                <div className="p-3 bg-[var(--muted)] rounded-lg">
                  <div className="text-2xl font-bold text-orange-400">{playerStats.totalReadTime}m</div>
                  <div className="text-xs text-[var(--muted-foreground)]">Reading Time</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="bg-[var(--card)] border-[var(--border)]">
            <CardHeader>
              <CardTitle className="font-cinzel flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-400" />
                <span>Recent Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.slice(0, 3).map((achievement) => (
                  <div 
                    key={achievement.id}
                    className={`p-3 rounded-lg border transition-all ${
                      achievement.unlocked 
                        ? 'bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border-yellow-500/30' 
                        : 'bg-[var(--muted)] border-[var(--border)]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div>
                          <div className={`font-medium text-sm ${achievement.unlocked ? 'text-yellow-400' : 'text-[var(--muted-foreground)]'}`}>
                            {achievement.name}
                          </div>
                          <div className="text-xs text-[var(--muted-foreground)]">
                            {achievement.description}
                          </div>
                        </div>
                      </div>
                      {achievement.unlocked ? (
                        <Badge variant="default" className="text-xs bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          +{achievement.xpReward} XP
                        </Badge>
                      ) : (
                        <div className="text-xs text-[var(--muted-foreground)]">
                          {achievement.progress}/{achievement.maxProgress}
                        </div>
                      )}
                    </div>
                    {!achievement.unlocked && (
                      <div className="mt-2">
                        <div className="w-full bg-[var(--muted)] rounded-full h-1">
                          <div 
                            className="bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] h-1 rounded-full transition-all"
                            style={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Achievements
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-[var(--card)] border-[var(--border)]">
            <CardHeader>
              <CardTitle className="font-cinzel flex items-center space-x-2">
                <Star className="w-5 h-5 text-blue-400" />
                <span>Discovery Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categories.map((category) => {
                  const categoryEntries = getEntriesByCategory(category.id);
                  const unlockedInCategory = categoryEntries.length;
                  const progress = (unlockedInCategory / category.count) * 100;
                  
                  return (
                    <div key={category.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <category.icon className="w-4 h-4" style={{ color: `var(--${category.color.split('-')[1]}-500)` }} />
                          <span className="text-sm font-medium">{category.name}</span>
                        </div>
                        <span className="text-xs text-[var(--muted-foreground)]">
                          {unlockedInCategory}/{category.count}
                        </span>
                      </div>
                      <div className="w-full bg-[var(--muted)] rounded-full h-2">
                        <div 
                          className={`bg-gradient-to-r ${category.color} h-2 rounded-full transition-all duration-500`}
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* XP Gain Notification */}
        {showXpGain && (
          <div className="fixed top-4 right-4 z-50 animate-bounce">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg shadow-lg font-bold">
              +{showXpGain} XP
            </div>
          </div>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-[var(--muted)] p-1 rounded-xl">
            <TabsTrigger 
              value="codex" 
              className="font-cinzel flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
            >
              <BookOpen className="w-4 h-4" />
              <span>📖 Codex</span>
            </TabsTrigger>
            <TabsTrigger 
              value="timeline" 
              className="font-cinzel flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-indigo-500 data-[state=active]:text-white"
            >
              <Clock className="w-4 h-4" />
              <span>⏰ Timeline</span>
            </TabsTrigger>
            <TabsTrigger 
              value="reader" 
              className="font-cinzel flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-500 data-[state=active]:to-emerald-500 data-[state=active]:text-white"
            >
              <Scroll className="w-4 h-4" />
              <span>📜 Reader</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="codex" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card key={category.id} className="bg-[var(--card)] border-[var(--border)] hover:bg-[var(--muted)] transition-colors cursor-pointer">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                          <category.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="font-cinzel">{category.name}</CardTitle>
                          <CardDescription>{category.count} entries</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getEntriesByCategory(category.id).slice(0, 3).map((entry) => (
                        <div 
                          key={entry.id}
                          className="p-3 border border-[var(--border)] rounded-lg hover:bg-[var(--muted)] transition-colors cursor-pointer relative"
                          onClick={() => {
                            setSelectedEntry(entry.id);
                            setActiveTab('reader');
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <div className="font-medium text-sm">{entry.title}</div>
                                <span className="text-sm">{getRarityIcon(entry.rarity)}</span>
                                {entry.questFlag && (
                                  <Badge variant="outline" className="text-xs bg-purple-500/20 text-purple-400 border-purple-500/30">
                                    Quest
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-[var(--muted-foreground)]">{entry.readTime} min read • +{entry.xpReward} XP</div>
                            </div>
                            <div className="flex space-x-1 items-center">
                              {entry.requiredLevel <= playerStats.level ? (
                                <Badge variant="default" className="text-xs">Unlocked</Badge>
                              ) : (
                                <div className="flex items-center space-x-1">
                                  <Lock className="w-3 h-3 text-[var(--muted-foreground)]" />
                                  <Badge variant="secondary" className="text-xs">Level {entry.requiredLevel}</Badge>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                      {getEntriesByCategory(category.id).length > 3 && (
                        <Button variant="outline" size="sm" className="w-full">
                          View All {category.count} Entries
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="space-y-6">
            <div className="space-y-8">
              {timeline.map((era, eraIndex) => (
                <Card key={era.era} className="bg-[var(--card)] border-[var(--border)]">
                  <CardHeader>
                    <CardTitle className="font-cinzel text-xl">{era.era}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      {/* Timeline line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-[var(--border)]"></div>
                      
                      <div className="space-y-6">
                        {era.events.map((event, eventIndex) => (
                          <div key={eventIndex} className="relative flex items-start space-x-4">
                            {/* Timeline dot */}
                            <div className={`relative z-10 w-4 h-4 rounded-full border-2 ${getImportanceColor(event.importance)} bg-[var(--background)]`}></div>
                            
                            {/* Event content */}
                            <div className="flex-1 pb-6">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="font-cinzel font-bold">{event.title}</h4>
                                <Badge variant="outline" className="text-xs">
                                  {event.year}
                                </Badge>
                              </div>
                              <p className="text-[var(--muted-foreground)] font-cormorant italic">
                                {event.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reader" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Entry List */}
              <div className="space-y-4">
                <h3 className="font-cinzel text-lg font-bold">Available Entries</h3>
                <div className="space-y-2">
                  {loreEntries.filter(entry => entry.discovered).map((entry) => (
                    <div
                      key={entry.id}
                      className={`p-4 border rounded-lg transition-all cursor-pointer relative ${
                        selectedEntry === entry.id 
                          ? 'border-[var(--primary)] bg-[var(--primary)]/10 shadow-lg' 
                          : 'border-[var(--border)] hover:bg-[var(--muted)] hover:border-[var(--primary)]/50'
                      }`}
                      onClick={() => setSelectedEntry(entry.id)}
                    >
                      {/* Rarity Border */}
                      <div className={`absolute top-0 left-0 w-full h-1 rounded-t-lg ${getRarityColor(entry.rarity)} opacity-60`}></div>
                      
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <div className="font-medium text-sm">{entry.title}</div>
                            <span className="text-lg">{getRarityIcon(entry.rarity)}</span>
                            {entry.questFlag && (
                              <Badge variant="outline" className="text-xs bg-purple-500/20 text-purple-400 border-purple-500/30">
                                📜 Quest
                              </Badge>
                            )}
                          </div>
                          <div className="text-xs text-[var(--muted-foreground)] mb-2">{entry.shortDesc}</div>
                          <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="text-xs capitalize">{entry.category}</Badge>
                            <div className="flex items-center space-x-3 text-xs text-[var(--muted-foreground)]">
                              <span className="flex items-center space-x-1">
                                <Clock className="w-3 h-3" />
                                <span>{entry.readTime} min</span>
                              </span>
                              <span className="flex items-center space-x-1 text-yellow-400">
                                <Star className="w-3 h-3" />
                                <span>+{entry.xpReward} XP</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Content Display */}
              <div className="lg:col-span-3">
                {selectedEntry ? (
                  <Card className="bg-[var(--card)] border-[var(--border)]">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="font-cinzel text-2xl">
                            {getSelectedEntryData()?.title}
                          </CardTitle>
                          <CardDescription className="font-cormorant italic text-lg mt-2">
                            {getSelectedEntryData()?.shortDesc}
                          </CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-[var(--muted-foreground)]">Reading Progress</div>
                          <div className="text-lg font-bold text-[var(--primary)]">{Math.round(readingProgress)}%</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Tags and metadata */}
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            {getSelectedEntryData()?.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-[var(--muted-foreground)]">
                            <span className="flex items-center space-x-1">
                              <Clock className="w-4 h-4" />
                              <span>{getSelectedEntryData()?.readTime} min read</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <BookOpen className="w-4 h-4" />
                              <span>Level {getSelectedEntryData()?.requiredLevel}</span>
                            </span>
                            <span className="flex items-center space-x-1 text-yellow-400">
                              <Star className="w-4 h-4" />
                              <span>+{getSelectedEntryData()?.xpReward} XP</span>
                            </span>
                          </div>
                        </div>

                        {/* Rarity Display */}
                        <div className="flex items-center justify-between p-3 bg-[var(--muted)] rounded-lg">
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl">{getRarityIcon(getSelectedEntryData()?.rarity || 'common')}</span>
                            <div>
                              <div className="text-sm font-medium capitalize">{getSelectedEntryData()?.rarity} Lore</div>
                              <div className="text-xs text-[var(--muted-foreground)]">
                                {getSelectedEntryData()?.questFlag ? 'Main Quest Content' : 'Discovery Entry'}
                              </div>
                            </div>
                          </div>
                          {readingProgress >= 90 && (
                            <Button 
                              onClick={() => gainXP(getSelectedEntryData()?.xpReward || 0)}
                              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                            >
                              Complete Reading (+{getSelectedEntryData()?.xpReward} XP)
                            </Button>
                          )}
                        </div>

                        {/* Image if available */}
                        {getSelectedEntryData()?.image && (
                          <div className="rounded-lg overflow-hidden border border-[var(--border)]">
                            <img 
                              src={getSelectedEntryData()?.image} 
                              alt={getSelectedEntryData()?.title}
                              className="w-full h-48 object-cover"
                            />
                          </div>
                        )}

                        {/* Content */}
                        <div 
                          ref={contentRef}
                          className="prose prose-invert max-w-none overflow-y-auto max-h-96 pr-4"
                          style={{ 
                            scrollbarWidth: 'thin',
                            scrollbarColor: 'var(--border) transparent'
                          }}
                        >
                          {getSelectedEntryData()?.content.split('\n\n').map((paragraph, index) => (
                            <p key={index} className="font-cormorant text-lg leading-relaxed mb-4 text-[var(--foreground)]">
                              {paragraph}
                            </p>
                          ))}
                        </div>

                        {/* Related entries */}
                        {getSelectedEntryData()?.relatedEntries && (
                          <div className="border-t border-[var(--border)] pt-4">
                            <h4 className="font-cinzel font-bold mb-3">Related Entries</h4>
                            <div className="flex flex-wrap gap-2">
                              {getSelectedEntryData()?.relatedEntries?.map((relatedId) => {
                                const relatedEntry = loreEntries.find(e => e.id === relatedId);
                                return relatedEntry ? (
                                  <Button
                                    key={relatedId}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setSelectedEntry(relatedId)}
                                    className="text-xs"
                                  >
                                    {relatedEntry.title}
                                  </Button>
                                ) : null;
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="bg-[var(--card)] border-[var(--border)]">
                    <CardContent className="p-12 text-center">
                      <div className="text-6xl mb-4">📚</div>
                      <h3 className="font-cinzel text-xl font-bold mb-2">Select an Entry</h3>
                      <p className="text-[var(--muted-foreground)]">
                        Choose a lore entry from the list to begin reading
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

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
