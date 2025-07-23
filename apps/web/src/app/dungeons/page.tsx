export default function DungeonsPage() {
  return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold font-cinzel text-[var(--foreground)]">
              🏰 The Dungeons
            </h1>
            <p className="text-xl text-[var(--muted-foreground)]">
              Code challenges await brave architects...
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                { name: "Syntax Caverns", level: "Beginner", reward: "50 XP" },
                { name: "Algorithm Abyss", level: "Intermediate", reward: "150 XP" },
                { name: "Logic Labyrinth", level: "Advanced", reward: "300 XP" },
                { name: "Data Structure Depths", level: "Expert", reward: "500 XP" },
                { name: "Recursion Ruins", level: "Master", reward: "750 XP" },
                { name: "Performance Peaks", level: "Legendary", reward: "1000 XP" }
              ].map((dungeon, index) => (
                <div 
                  key={dungeon.name}
                  className="bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 hover:bg-[var(--muted)] transition-colors cursor-pointer"
                >
                  <h3 className="font-bold text-[var(--foreground)] mb-2">{dungeon.name}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] mb-4">{dungeon.level}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-[var(--accent)] font-semibold">{dungeon.reward}</span>
                    <button className="px-3 py-1 bg-[var(--accent)] text-[var(--accent-foreground)] rounded text-sm hover:opacity-90 transition-opacity">
                      Enter
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
}
