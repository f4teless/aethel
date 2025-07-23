import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { formatLabel } from '@/utils/format';

interface DashboardHeaderProps {
  session: any;
  playerStats: {
    level: number;
    class: string;
  };
  currentTime: Date | null;
}

export default function DashboardHeader({ session, playerStats, currentTime }: DashboardHeaderProps) {
  return (
    <header className="border-b backdrop-blur-md border-[var(--border)] bg-[var(--background)]/80">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src={session?.user.image ?? "/default-profile.jpg"} alt="User Avatar" width={64} height={64} className=" rounded-full p-[2px] bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]" />
            <div>
              <h1 className="font-cinzel text-3xl font-bold bg-gradient-to-r from-[var(--primary)] to-[var(--accent)] bg-clip-text text-transparent">
                Welcome back, Architect
              </h1>
              <p className="font-cormorant italicurrentChapterc text-lg text-[var(--muted-foreground)]">
                {session?.user?.name || 'Unknown Architect'}
              </p>
              <div className="flex items-center space-x-4 mt-1">
                <Badge variant="secondary">
                  Level {playerStats.level}
                </Badge>
                <Badge variant="outline">
                  {formatLabel(playerStats.class || 'Unknown Class')}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-[var(--muted-foreground)]">Realm Time</div>
            <div className="font-mono text-lg text-[var(--primary)]">
              {currentTime ? currentTime.toLocaleTimeString() : '--:--:--'}
            </div>
            <div className="text-xs mt-1 text-[var(--muted-foreground)]">Session: Active</div>
          </div>
        </div>
      </div>
    </header>
  );
}
