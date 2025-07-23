import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { formatLabel } from "@/utils/format";

interface Quest {
  id: string;
  title: string;
  description: string;
  difficulty: string;
  progress: number;
  status: string;
  type: string;
}

interface StoryProgressProps {
  quests: Quest[];
}

export default function StoryProgress({ quests }: StoryProgressProps) {
  return (
    <Card className="backdrop-blur-md">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-cinzel text-xl">Story Progress</CardTitle>
            <CardDescription className="font-cormorant italic">
              Continue your journey through the corrupted realm...
            </CardDescription>
          </div>
          <div className="rounded px-3 py-1 font-mono text-xs border bg-[var(--muted)] border-[var(--border)]">
            <span className="text-[var(--primary)]">●</span>{" "}
            <span className="text-[var(--muted-foreground)]">IN PROGRESS</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {quests.map((quest) => (
          <div key={quest.id} className="group border rounded-lg p-4 transition-all duration-300 border-[var(--border)] bg-[var(--muted)]/50">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-semibold text-lg transition-colors text-[var(--foreground)]">
                  {quest.title}
                </h3>
                <p className="mt-1 leading-relaxed text-[var(--muted-foreground)]">
                  {quest.description}
                </p>
              </div>
              <Badge
                variant={quest.difficulty === 'easy' ? 'secondary' : 'outline'}
              >
                {formatLabel(quest.difficulty)}
              </Badge>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex-1 mr-4">
                <Progress value={quest.progress} className="h-2" />
              </div>
              <span className="text-sm font-mono text-[var(--primary)]">
                {quest.progress}%
              </span>
            </div>

            <div className="flex justify-between items-center">
              <Badge variant="secondary">
                {formatLabel(quest.type)}
              </Badge>
              <Button
                size="sm"
                variant="outline"
              >
                Continue
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
