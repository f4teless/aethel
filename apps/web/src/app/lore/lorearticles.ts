export interface LoreArticle {
  id: string;
  title: string;
  category: 'anomaly' | 'historical' | 'technology';
  clearanceLevel: number;
  date: string;
  author: string;
  tags: string[];
  isBookmarked: boolean;
  readingTime: string;
  teaser: string;
  content: string;
  classifiedSections?: string[];
  relatedArticles?: string[];
  evidenceAttachments?: string[];
}

export const loreArticles: LoreArticle[] = [
  {
    id: "anom-001",
    title: "The Variable Drift Phenomenon",
    category: "anomaly",
    clearanceLevel: 1,
    date: "2024-03-15",
    author: "Dr. Sarah Chen",
    tags: ["variables", "corruption", "memory"],
    isBookmarked: false,
    readingTime: "8 min",
    teaser: "Variables changing their values without explicit assignment. First documented in the Village sector.",
    content: "Initial reports came from apprentice developers working on basic assignment exercises. Variables would spontaneously change values, often to meaningful words or coordinates...",
    classifiedSections: ["The true cause of variable drift relates to the underlying reality corruption..."],
    relatedArticles: ["tech-003", "hist-002"]
  },
  {
    id: "anom-002",
    title: "Infinite Loop Termination Events",
    category: "anomaly",
    clearanceLevel: 2,
    date: "2024-03-12",
    author: "Marcus Webb",
    tags: ["loops", "termination", "paradox"],
    isBookmarked: false,
    readingTime: "12 min",
    teaser: "Infinite loops that mysteriously terminate after exactly 1,337 iterations, always outputting the same message.",
    content: "Every documented case shows the same pattern: infinite loops run for exactly 1,337 iterations before terminating with the message 'REALITY.EXE HAS STOPPED WORKING'...",
    classifiedSections: ["The significance of 1,337 iterations corresponds to..."],
    relatedArticles: ["anom-001", "tech-001"]
  },
  {
    id: "anom-003",
    title: "Function Precognition Syndrome",
    category: "anomaly",
    clearanceLevel: 3,
    date: "2024-03-10",
    author: "Dr. Elena Vasquez",
    tags: ["functions", "temporal", "causality"],
    isBookmarked: false,
    readingTime: "15 min",
    teaser: "Functions returning values before being called, suggesting temporal displacement in the call stack.",
    content: "The most disturbing manifestation of reality corruption: functions that execute before being invoked. Stack traces show impossible execution orders...",
    classifiedSections: ["This phenomenon indicates that the reality engine itself is..."],
    relatedArticles: ["tech-002", "hist-004"]
  },
  {
    id: "anom-004",
    title: "The Observer Effect in Debugging",
    category: "anomaly",
    clearanceLevel: 2,
    date: "2024-03-08",
    author: "Dr. James Hartwell",
    tags: ["debugging", "quantum", "observation"],
    isBookmarked: false,
    readingTime: "10 min",
    teaser: "Bugs that disappear when observed through debuggers, only to reappear when monitoring stops.",
    content: "Quantum mechanics principles manifesting in code: the act of observing a bug through debugging tools changes its behavior...",
    classifiedSections: ["This suggests that our reality operates on quantum principles where..."],
    relatedArticles: ["anom-001", "tech-004"]
  },
  {
    id: "anom-005",
    title: "Memory Address Time Displacement",
    category: "anomaly",
    clearanceLevel: 4,
    date: "2024-03-05",
    author: "████████ ████",
    tags: ["memory", "temporal", "displacement"],
    isBookmarked: false,
    readingTime: "██ min",
    teaser: "Memory addresses pointing to past and future states, creating temporal loops in data structures.",
    content: "████████ investigation reveals memory addresses that reference past or future program states...",
    classifiedSections: ["Access to temporal memory addressing would allow..."],
    relatedArticles: ["████████", "████████"]
  },
  {
    id: "hist-001",
    title: "Pre-Corruption Development Logs",
    category: "historical",
    clearanceLevel: 1,
    date: "2024-01-15",
    author: "Archive System",
    tags: ["pre-corruption", "logs", "development"],
    isBookmarked: false,
    readingTime: "6 min",
    teaser: "Recovered development logs from before the corruption began, showing normal software development patterns.",
    content: "These logs represent the last known period of normal software development. Standard bug reports, feature requests, and code reviews...",
    relatedArticles: ["hist-002", "anom-001"]
  },
  {
    id: "hist-002",
    title: "The First Anomaly Report",
    category: "historical",
    clearanceLevel: 1,
    date: "2024-02-01",
    author: "Junior Developer Alex Rodriguez",
    tags: ["first-contact", "anomaly", "report"],
    isBookmarked: false,
    readingTime: "5 min",
    teaser: "The very first documented case of reality corruption, initially dismissed as a simple coding error.",
    content: "Ticket #4471: 'Variable keeps changing to \\\"HELP_ME\\\" - Alex R. initially thought this was a prank...",
    relatedArticles: ["anom-001", "hist-003"]
  },
  {
    id: "hist-003",
    title: "The Great Debugging Initiative",
    category: "historical",
    clearanceLevel: 2,
    date: "2024-02-15",
    author: "Project Lead Sarah Kim",
    tags: ["debugging", "initiative", "response"],
    isBookmarked: false,
    readingTime: "14 min",
    teaser: "The coordinated effort to understand and fix the growing anomalies, which only made them stronger.",
    content: "As anomalies spread, we organized the largest debugging effort in company history. Teams worked around the clock...",
    classifiedSections: ["What we didn't realize was that our debugging efforts were..."],
    relatedArticles: ["hist-002", "anom-002"]
  },
  {
    id: "hist-004",
    title: "Bootstrap Paradox Documentation",
    category: "historical",
    clearanceLevel: 5,
    date: "████-██-██",
    author: "████ ████████",
    tags: ["paradox", "bootstrap", "████████"],
    isBookmarked: false,
    readingTime: "██ min",
    teaser: "██████████ evidence that the original codebase was copied from a future version of itself.",
    content: "████████████████████████████████████████████████████████████████████...",
    classifiedSections: ["The implications of temporal causality loops mean that..."],
    relatedArticles: ["████████", "████████"]
  },
  {
    id: "tech-001",
    title: "Reality Engine Architecture v2.1",
    category: "technology",
    clearanceLevel: 2,
    date: "2024-03-01",
    author: "System Architect Maria Santos",
    tags: ["architecture", "engine", "reality"],
    isBookmarked: false,
    readingTime: "20 min",
    teaser: "Technical specifications for the underlying system that processes reality-level operations.",
    content: "The Reality Engine operates on a multi-layered architecture designed to handle quantum state management...",
    classifiedSections: ["Core processing units handle reality state transitions through..."],
    relatedArticles: ["tech-002", "anom-003"]
  },
  {
    id: "tech-002",
    title: "Corruption Detection Algorithms",
    category: "technology",
    clearanceLevel: 2,
    date: "2024-02-28",
    author: "Lead Engineer David Park",
    tags: ["algorithms", "detection", "corruption"],
    isBookmarked: false,
    readingTime: "16 min",
    teaser: "Automated systems for identifying reality corruption patterns and anomalous code behavior.",
    content: "Our detection algorithms use pattern recognition to identify deviations from expected code behavior...",
    classifiedSections: ["Advanced detection methods reveal that corruption follows..."],
    relatedArticles: ["anom-002", "tech-003"]
  },
  {
    id: "tech-003",
    title: "Emergency Rollback Protocols",
    category: "technology",
    clearanceLevel: 3,
    date: "2024-02-25",
    author: "Dr. Amanda Foster",
    tags: ["rollback", "emergency", "protocols"],
    isBookmarked: false,
    readingTime: "11 min",
    teaser: "Procedures for reverting reality states when corruption becomes critical, with mixed success rates.",
    content: "When corruption reaches critical levels, emergency rollback protocols attempt to restore previous stable states...",
    classifiedSections: ["The rollback process requires access to temporal manipulation systems..."],
    relatedArticles: ["tech-001", "anom-005"]
  },
  {
    id: "tech-004",
    title: "Quantum Debugging Framework",
    category: "technology",
    clearanceLevel: 4,
    date: "2024-02-20",
    author: "█████ Research Team",
    tags: ["quantum", "debugging", "framework"],
    isBookmarked: false,
    readingTime: "██ min",
    teaser: "Advanced debugging tools that account for quantum superposition states in corrupted code.",
    content: "Traditional debugging fails when code exists in quantum superposition. Our framework addresses...",
    classifiedSections: ["████████ quantum entanglement between debugger and target..."],
    relatedArticles: ["anom-004", "tech-002"]
  },
  {
    id: "tech-005",
    title: "User Class Permissions Matrix",
    category: "technology",
    clearanceLevel: 1,
    date: "2024-03-20",
    author: "Security Team",
    tags: ["permissions", "classes", "security"],
    isBookmarked: false,
    readingTime: "7 min",
    teaser: "How The Compiler granted new user classes in a desperate attempt to halt system collapse.",
    content: "Standard user permissions proved inadequate when reality began to break down. New classes were created with emergency powers...",
    relatedArticles: ["hist-003", "tech-001"]
  }
];