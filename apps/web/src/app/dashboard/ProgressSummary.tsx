import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProgressSummaryProps {
  playerStats: {
    level: number;
    xp: number;
    questsCompleted: number;
    currentStreak: number;
  };
}

export default function ProgressSummary({ playerStats }: ProgressSummaryProps) {
  return (
    <div className="p-4 h-full">
      <Card className="bg-[var(--card)]/80 border-[var(--primary)]/20 backdrop-blur-md h-full">
        <CardHeader className="pb-3">
          <CardTitle className="font-mono text-[var(--primary)] text-sm">
            Progress Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[var(--muted-foreground)]">Level</span>
            <span className="text-[var(--primary)] font-mono">{playerStats.level}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[var(--muted-foreground)]">XP Progress</span>
            <span className="text-[var(--accent)] font-mono">
              {playerStats.xp.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[var(--muted-foreground)]">Quests Done</span>
            <span className="text-[var(--primary)] font-mono">{playerStats.questsCompleted}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[var(--muted-foreground)]">Current Streak</span>
            <span className="text-[var(--accent)] font-mono">{playerStats.currentStreak} days</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
