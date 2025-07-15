import AuthGuard from "@/components/AuthGuard";

export default function LeaderboardPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl font-bold font-cinzel text-[var(--foreground)]">
              🏆 Hall of Honor
            </h1>
            <p className="text-xl text-[var(--muted-foreground)]">
              The greatest architects of our realm
            </p>
          </div>
          
          <div className="space-y-4">
            {[
              { rank: 1, name: "Master Codewarden", level: 42, xp: 15847, title: "Legendary Architect", streak: 127 },
              { rank: 2, name: "Syntax Sage", level: 38, xp: 13204, title: "Elite Developer", streak: 89 },
              { rank: 3, name: "Logic Lord", level: 35, xp: 12156, title: "Senior Engineer", streak: 73 },
              { rank: 4, name: "Algorithm Adept", level: 32, xp: 10943, title: "Full Stack Mage", streak: 56 },
              { rank: 5, name: "Debug Deity", level: 29, xp: 9876, title: "Bug Slayer", streak: 45 },
              { rank: 6, name: "Refactor Ranger", level: 27, xp: 8954, title: "Code Cleaner", streak: 34 },
              { rank: 7, name: "Test Temple Guardian", level: 25, xp: 8123, title: "Quality Keeper", streak: 28 },
              { rank: 8, name: "API Architect", level: 23, xp: 7456, title: "Interface Designer", streak: 21 },
              { rank: 9, name: "Database Druid", level: 21, xp: 6789, title: "Data Whisperer", streak: 15 },
              { rank: 10, name: "Frontend Phoenix", level: 19, xp: 6123, title: "UI Enchanter", streak: 12 },
            ].map((player, index) => (
              <div 
                key={player.rank}
                className={`
                  relative p-6 rounded-lg border-2 transition-all hover:bg-[var(--muted)]
                  ${player.rank <= 3 
                    ? 'bg-gradient-to-r from-[var(--accent)]/10 to-[var(--primary)]/10 border-[var(--accent)]' 
                    : 'bg-[var(--card)] border-[var(--border)]'
                  }
                `}
              >
                <div className="flex items-center gap-6">
                  {/* Rank */}
                  <div className={`
                    flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg
                    ${player.rank === 1 ? 'bg-yellow-500 text-black' :
                      player.rank === 2 ? 'bg-gray-400 text-black' :
                      player.rank === 3 ? 'bg-amber-600 text-white' :
                      'bg-[var(--muted)] text-[var(--foreground)]'
                    }
                  `}>
                    {player.rank === 1 ? '👑' : 
                     player.rank === 2 ? '🥈' :
                     player.rank === 3 ? '🥉' :
                     `#${player.rank}`}
                  </div>

                  {/* Player Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-bold text-[var(--foreground)] text-lg">{player.name}</h3>
                      <span className="px-2 py-1 bg-[var(--accent)]/20 text-[var(--accent)] text-sm rounded">
                        {player.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-[var(--muted-foreground)]">
                      <span>Level {player.level}</span>
                      <span>{player.xp.toLocaleString()} XP</span>
                      <span>🔥 {player.streak} day streak</span>
                    </div>
                  </div>

                  {/* Level Badge */}
                  <div className="text-right">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--primary)] flex items-center justify-center mb-2">
                      <span className="text-white font-bold text-lg">{player.level}</span>
                    </div>
                    <div className="text-xs text-[var(--muted-foreground)]">Level</div>
                  </div>
                </div>

                {/* Special Effects for Top 3 */}
                {player.rank <= 3 && (
                  <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-[var(--accent)] flex items-center justify-center animate-pulse">
                    <span className="text-xs">✨</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Your Rank */}
          <div className="mt-12 p-6 bg-[var(--card)] border-2 border-[var(--accent)] rounded-lg">
            <div className="text-center">
              <h3 className="text-lg font-bold text-[var(--foreground)] mb-2">Your Current Rank</h3>
              <div className="flex items-center justify-center gap-4">
                <div className="text-3xl font-bold text-[var(--accent)]">#47</div>
                <div className="text-[var(--muted-foreground)]">
                  <div>Level 12 • 2,847 XP</div>
                  <div>🔥 7 day streak</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
