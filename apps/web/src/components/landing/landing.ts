import { Brain, Sword, Users, Trophy } from "lucide-react";

export const demoSections = [
  {
    id: 1,
    title: "Code Challenges",
    subtitle: "Algorithmic Mastery",
    icon: Brain,
    color: "from-[var(--primary)] to-[var(--accent)]",
    description: "Solve progressively challenging algorithms while uncovering the mysteries of the corrupted realm.",
    preview: {
      type: "code",
      content: `function purgeCorruption(node) {
    // Your magic begins here...
    if (!node || node.corrupted) {
      return null;
    }
    
    const purified = {
      ...node,
      data: decrypt(node.data),
      children: node.children?.map(purgeCorruption)
    };
    
    return purified;
  }`,
      problem: "Purge the Syntax Spire",
      difficulty: "Adept Level",
      points: "250 XP"
    }
  },
  {
    id: 2,
    title: "Arena Battles",
    subtitle: "Real-time PvP",
    icon: Sword,
    color: "from-[var(--accent)] to-[var(--primary)]",
    description: "Battle other Architects in real-time coding duels. Speed, logic, and cunning determine victory.",
    preview: {
      type: "battle",
      players: [
        { name: "You", avatar: "A", progress: 65, status: "Compiling..." },
        { name: "VoidWalker", avatar: "V", progress: 72, status: "Debugging" }
      ],
      timeLeft: "2:34",
      problem: "Shortest Path Through the Labyrinth"
    }
  },
  {
    id: 3,
    title: "Co-op Dungeons",
    subtitle: "Collaborative Quests",
    icon: Users,
    color: "from-[var(--secondary)] to-[var(--primary)]",
    description: "Join forces with fellow Architects to tackle massive algorithmic dungeons and ancient corruptions.",
    preview: {
      type: "guild",
      expedition: "The Recursion Depths",
      members: ["ArrayKnight", "GraphMage", "TreeWarden", "You"],
      progress: 3,
      total: 5,
      currentChallenge: "Balancing the Binary Sanctum"
    }
  },
  {
    id: 4,
    title: "Live Leaderboards",
    subtitle: "Compete & Ascend",
    icon: Trophy,
    color: "from-[var(--primary)] via-[var(--accent)] to-[var(--primary)]",
    description: "Track your mastery against Architects worldwide. Every solution, every victory, every corruption purged matters.",
    preview: {
      type: "leaderboard",
      rankings: [
        { rank: 1, name: "MasterCompiler", class: "Graph Assassin", points: "15,847", trend: "up" },
        { rank: 2, name: "VoidWalker", class: "Dynamic Mage", points: "15,203", trend: "down" },
        { rank: 3, name: "CodeSage", class: "Array Knight", points: "14,956", trend: "up" },
        { rank: 47, name: "You", class: "Initiate", points: "2,341", trend: "up", highlight: true }
      ]
    }
  }
];

export const hero = [
  //lore: A world once governed by logic... now broken.
  {
    heading: "You Awaken with No Memory. Only Instinct.",
    subheading:
      "A world of broken logic stretches before you. Your fate unfolds from here.",
    cta: "Step Into the Shadows",
    tagline:
      "Over 600,000 have tried. You're either the next legend... or a forgotten variable.",
    lore: "The mist clears, revealing the remnants of a corrupted codebase...",
  },
  {
    heading: "Every Architect Has a Story. Yours Begins Now.",
    subheading:
      "Born of error. Forged in syntax. Your journey begins at the edge of the digital abyss.",
    cta: "Compile Your Saga",
    tagline:
      "While you hesitate, another challenger climbs the ranks. There is no rest.",
    lore: "In the ruins of the Syntax Spire, whispers of fallen heroes echo...",
  },
  {
    heading: "A Thousand Fates Lie Buried in Code. Yours Rises from the Ashes.",
    subheading:
      "Face trials. Defeat bugs. Unlock your legend — one problem at a time.",
    cta: "Face Your First Trial",
    tagline: "Outthink. Outcode. Overcome. The server awaits its champion.",
    lore: "Fate stirs. Logic trembles. The ancient bugs begin to crawl again...",
  },
  {
    heading: "The Logic of Aethel Is Under Siege.",
    subheading:
      "A 'Great Unraveling' corrupts the source code. Only an Architect who masters the arcane art of code can restore balance.",
    cta: "Enter the CodeRealm",
    tagline: "The clock is ticking. Mastery waits for no one. Join the fight.",
    lore: "The Compiler cracked — releasing chaos once thought sealed forever...",
  },
  {
    heading: "You Are Not the First to Awaken. But You Might Be the Last.",
    subheading:
      "Thousands before you failed. Debugged. Broken. But the source code of fate weaves a different path for you.",
    cta: "Defy the Loop",
    tagline:
      "Legacy is written by the victors. The rest are merely commented out.",
    lore: "A faint spark flickers in the void, calling to the next Architect...",
  },
  {
    heading: "A Single Syntax Error Is Unraveling Reality.",
    subheading:
      "They call it the Corruption. You call it a challenge. You are the final firewall between Aethel and oblivion.",
    cta: "Become the Firewall",
    tagline:
      "In a world of broken code, every character matters. Make yours count.",
    lore: "It began with a null pointer, dereferenced at the dawn of time...",
  },
  {
    heading: "The CodeRealm Lies in Ruin. Heroes Are Forgotten.",
    subheading:
      "Magic is fading. Monsters thrive in corrupted logic. But a spark awakens—you.",
    cta: "Awaken Your Fate",
    tagline:
      "641,033 are already fighting for the top. You're either next… or forgotten.",
    lore: "Legends speak of a forgotten line — one that rewrites destiny...",
  },
  {
    heading: "You Were Never Meant to Be Ordinary.",
    subheading:
      "Embark on a journey where logic meets legend. Code your way through battles, quests, and mysteries.",
    cta: "Write Your Destiny",
    tagline:
      "Join 641,033 challengers — no mercy, no rest, just code and conquest.",
    lore: "In the shadows of the Mainframe Temple, a new line awakens...",
  },
  {
    heading: "They Say Heroes Are Forged, Not Born.",
    subheading:
      "In Aethel, they are coded. Your journey from Novice to Legend is a single keystroke away.",
    cta: "Write Your Destiny",
    tagline:
      "The top 1% aren't just faster. They're more elegant. Prove your worth.",
    lore: "Legends speak of a forgotten function—one that could rewrite destiny itself...",
  },
];