
"use client";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";
import { Button } from "@/components/ui/button";

export default function QuestsPage() {
  // Fetch available quests from API
  const { data: availableQuests, isLoading, error } = useQuery(
    orpc.quest.getAvailableQuests.queryOptions({input: {
      limit: 10
    }})
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold font-cinzel text-[var(--foreground)]">
              📜 The Quest Board
            </h1>
            <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full mx-auto"></div>
            <p className="text-[var(--muted-foreground)]">Loading your available quests...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold font-cinzel text-[var(--foreground)]">
              📜 The Quest Board
            </h1>
            <p className="text-red-400">Error loading quests. Please try again.</p>
            <Button onClick={() => window.location.reload()}>Refresh</Button>
          </div>
        </div>
      </div>
    );
  }

  const quests = availableQuests || [];

  return (
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
              {quests.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[var(--muted-foreground)]">No quests available yet. Check back soon!</p>
                </div>
              ) : (
                quests.map((questItem) => (
                  <div 
                    key={questItem.id}
                    className={`bg-[var(--card)] border border-[var(--border)] rounded-lg p-6 ${
                      questItem.userProgress?.status === 'locked' ? 'opacity-50' : 'hover:bg-[var(--muted)]'
                    } transition-colors`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-[var(--foreground)] mb-2">{questItem.title}</h3>
                        <p className="text-[var(--muted-foreground)] mb-3">{questItem.description}</p>
                        <p className="text-sm text-[var(--accent)]">{questItem.experienceReward} XP{questItem.specialReward && ` + ${questItem.quest.specialReward}`}</p>
                      </div>
                      <span className={`px-3 py-1 rounded text-sm ${
                        questItem.userProgress?.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        questItem.userProgress?.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                        questItem.userProgress?.status === 'locked' ? 'bg-gray-500/20 text-gray-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {questItem.userProgress?.status || 'Available'}
                      </span>
                    </div>
                    
                    {questItem.userProgress?.status !== 'locked' && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-[var(--muted-foreground)]">
                          <span>Progress</span>
                          <span>{questItem.userProgress?.progress || 0}%</span>
                        </div>
                        <div className="w-full bg-[var(--muted)] rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[var(--accent)] to-[var(--primary)] h-2 rounded-full transition-all duration-300"
                            style={{ width: `${questItem.userProgress?.progress || 0}%` }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
  );
}
