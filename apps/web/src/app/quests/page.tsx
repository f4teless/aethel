import AuthGuard from "@/components/AuthGuard";

export default function QuestsPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold font-cinzel text-[var(--foreground)]">
              📜 The Quest Board
            </h1>
            <p className="text-xl text-[var(--muted-foreground)]">
              Your coding journey through the realm of Aethel
            </p>
            
            <div className="space-y-6 mt-12">
              {[
                { 
                  title: "Master React Hooks", 
                  description: "Learn the ancient arts of useState, useEffect, and custom hooks",
                  progress: 75,
                  status: "In Progress",
                  reward: "200 XP + React Mastery Badge"
                },
                { 
                  title: "Conquer TypeScript", 
                  description: "Wield the power of static typing to prevent runtime errors",
                  progress: 100,
                  status: "Completed",
                  reward: "300 XP + Type Safety Emblem"
                },
                { 
                  title: "Database Design Mysteries", 
                  description: "Uncover the secrets of efficient data storage and retrieval",
                  progress: 30,
                  status: "In Progress",
                  reward: "400 XP + Data Architect Title"
                },
                { 
                  title: "API Architecture Ascension", 
                  description: "Build scalable and maintainable backend systems",
                  progress: 0,
                  status: "Locked",
                  reward: "500 XP + Backend Master Cloak"
                }
              ].map((quest, index) => (
                <div 
                  key={quest.title}
                  className={`bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 ${
                    quest.status === 'Locked' ? 'opacity-50' : 'hover:bg-[var(--muted)]'
                  } transition-colors`}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="font-bold text-[var(--foreground)] mb-2">{quest.title}</h3>
                      <p className="text-[var(--muted-foreground)] mb-3">{quest.description}</p>
                      <p className="text-sm text-[var(--accent)]">{quest.reward}</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm ${
                      quest.status === 'Completed' ? 'bg-green-500/20 text-green-400' :
                      quest.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {quest.status}
                    </span>
                  </div>
                  
                  {quest.status !== 'Locked' && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm text-[var(--muted-foreground)]">
                        <span>Progress</span>
                        <span>{quest.progress}%</span>
                      </div>
                      <div className="w-full bg-[var(--muted)] rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${quest.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
