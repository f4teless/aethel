import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TodaySessionProps {
  playerStats: {
    problemsSolvedToday: number;
    problemsAttemptedToday: number;
  };
  elapsed: number;
}

export default function TodaySession({ playerStats, elapsed }: TodaySessionProps) {
  function formatElapsed(seconds: number) {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    if (h > 0) return `${h}h ${m}m`;
    return `${m}m`;
  }

  return (
    <div className="p-4 h-full">
      <Card className="bg-[var(--card)]/80 border-[var(--accent)]/20 backdrop-blur-md h-full">
        <CardHeader className="pb-3">
          <CardTitle className="font-mono text-[var(--accent)] text-sm flex items-center space-x-2">
            <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
            <span>Today's Session</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="font-mono text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-[var(--muted-foreground)]">Time Active:</span>
            <span className="text-[var(--accent)]">{formatElapsed(elapsed)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--muted-foreground)]">Problems Solved:</span>
            <span className="text-[var(--primary)]">{playerStats.problemsSolvedToday}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-[var(--muted-foreground)]">Success Rate:</span>
            <span className="text-accent-background">
              {playerStats.problemsAttemptedToday > 0
                ? `${((playerStats.problemsSolvedToday / playerStats.problemsAttemptedToday) * 100).toFixed(0)}%`
                : "0%"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
