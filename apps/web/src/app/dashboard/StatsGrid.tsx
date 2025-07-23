import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import ProgressSummary from "./ProgressSummary";
import TodaySession from "./TodaySession";
import SystemStatus from "./SystemStatus";

interface StatsGridProps {
  playerStats: any;
  elapsed: number;
}

export default function StatsGrid({ playerStats, elapsed }: StatsGridProps) {
  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-[300px] rounded-lg border">
      <ResizablePanel defaultSize={33} minSize={25}>
        <ProgressSummary playerStats={playerStats} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={33} minSize={25}>
        <TodaySession playerStats={playerStats} elapsed={elapsed} />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={34} minSize={25}>
        <SystemStatus />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
