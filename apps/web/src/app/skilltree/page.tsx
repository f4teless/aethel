
export default function SkillTreePage() {
  return (
      <div className="min-h-screen p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-6 mb-12">
            <h1 className="text-4xl font-bold font-cinzel text-[var(--foreground)]">
              🌳 The Skill Tree of Mastery
            </h1>
            <p className="text-xl text-[var(--muted-foreground)]">
              Enhance your coding abilities and unlock new powers
            </p>
          </div>
          
          <div className="relative">
            {/* Skill Tree Visualization */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Frontend Branch */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[var(--accent)] text-center">Frontend Mastery</h2>
                {[
                  { name: "HTML Fundamentals", level: 5, maxLevel: 5, unlocked: true },
                  { name: "CSS Artistry", level: 4, maxLevel: 5, unlocked: true },
                  { name: "JavaScript Sorcery", level: 3, maxLevel: 5, unlocked: true },
                  { name: "React Mastery", level: 2, maxLevel: 5, unlocked: true },
                  { name: "Next.js Expertise", level: 1, maxLevel: 5, unlocked: false },
                ].map((skill, index) => (
                  <div 
                    key={skill.name}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      skill.unlocked 
                        ? 'bg-[var(--card)] border-[var(--accent)] hover:bg-[var(--muted)] cursor-pointer' 
                        : 'bg-[var(--muted)] border-[var(--border)] opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-[var(--foreground)]">{skill.name}</span>
                      <span className="text-sm text-[var(--muted-foreground)]">
                        {skill.level}/{skill.maxLevel}
                      </span>
                    </div>
                    <div className="w-full bg-[var(--muted)] rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                      />
                    </div>
                    {!skill.unlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl">🔒</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Backend Branch */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[var(--accent)] text-center">Backend Mastery</h2>
                {[
                  { name: "Node.js Foundation", level: 3, maxLevel: 5, unlocked: true },
                  { name: "Database Design", level: 2, maxLevel: 5, unlocked: true },
                  { name: "API Architecture", level: 1, maxLevel: 5, unlocked: true },
                  { name: "DevOps Mastery", level: 0, maxLevel: 5, unlocked: false },
                  { name: "Cloud Architecture", level: 0, maxLevel: 5, unlocked: false },
                ].map((skill, index) => (
                  <div 
                    key={skill.name}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      skill.unlocked 
                        ? 'bg-[var(--card)] border-[var(--primary)] hover:bg-[var(--muted)] cursor-pointer' 
                        : 'bg-[var(--muted)] border-[var(--border)] opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-[var(--foreground)]">{skill.name}</span>
                      <span className="text-sm text-[var(--muted-foreground)]">
                        {skill.level}/{skill.maxLevel}
                      </span>
                    </div>
                    <div className="w-full bg-[var(--muted)] rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full"
                        style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                      />
                    </div>
                    {!skill.unlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl">🔒</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Soft Skills Branch */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-[var(--accent)] text-center">Architect Skills</h2>
                {[
                  { name: "Problem Solving", level: 4, maxLevel: 5, unlocked: true },
                  { name: "Code Review", level: 3, maxLevel: 5, unlocked: true },
                  { name: "Team Leadership", level: 2, maxLevel: 5, unlocked: true },
                  { name: "System Design", level: 1, maxLevel: 5, unlocked: false },
                  { name: "Mentorship", level: 0, maxLevel: 5, unlocked: false },
                ].map((skill, index) => (
                  <div 
                    key={skill.name}
                    className={`relative p-4 rounded-lg border-2 transition-all ${
                      skill.unlocked 
                        ? 'bg-[var(--card)] border-[var(--accent)] hover:bg-[var(--muted)] cursor-pointer' 
                        : 'bg-[var(--muted)] border-[var(--border)] opacity-50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-[var(--foreground)]">{skill.name}</span>
                      <span className="text-sm text-[var(--muted-foreground)]">
                        {skill.level}/{skill.maxLevel}
                      </span>
                    </div>
                    <div className="w-full bg-[var(--muted)] rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-violet-500 h-2 rounded-full"
                        style={{ width: `${(skill.level / skill.maxLevel) * 100}%` }}
                      />
                    </div>
                    {!skill.unlocked && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-2xl">🔒</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Skill Points Display */}
            <div className="mt-12 text-center">
              <div className="inline-flex items-center gap-4 bg-[var(--card)] border border-[var(--border)] rounded-lg px-6 py-3">
                <span className="text-[var(--foreground)]">Available Skill Points:</span>
                <span className="text-2xl font-bold text-[var(--accent)]">3</span>
                <button className="px-4 py-2 bg-[var(--accent)] text-[var(--accent-foreground)] rounded hover:opacity-90 transition-opacity">
                  Use Points
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
