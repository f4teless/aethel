import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SystemStatus() {
  return (
    <div className="p-4 h-full">
      <Card className="bg-[var(--card)]/80 border-[var(--primary)]/20 backdrop-blur-md h-full">
        <CardHeader className="pb-3">
          <CardTitle className="font-mono text-[var(--primary)] text-sm flex items-center space-x-2">
            <span className="w-2 h-2 bg-[var(--primary)] rounded-full animate-pulse"></span>
            <span>System Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="font-mono text-xs space-y-1">
          <div className="text-[var(--primary)]">● Connection: Stable</div>
          <div className="text-[var(--accent)]">● Latency: 12ms</div>
          <div className="text-[var(--muted-foreground)]">● Last sync: Just now</div>
        </CardContent>
      </Card>
    </div>
  );
}
