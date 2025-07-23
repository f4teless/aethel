'use client';

import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import DashboardHeader from "./DashboardHeader";
import StoryProgress from "./StoryProgress";
import StatsGrid from "./StatsGrid";

function DashboardContent() {
  const { data: session } = authClient.useSession();
  const [currentTime, setCurrentTime] = useState<Date | null>(null);
  const [sessionStart, setSessionStart] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState(0); // seconds

  const { data: profileData, isLoading: isProfileLoading, error: profileError } = useQuery(orpc.user.getProfile.queryOptions());
  const { data: questsData, isLoading: isQuestsLoading, error: questsError } = useQuery(
    orpc.quest.getAvailableQuests.queryOptions({ input: {
      type: 'story-quest',
      limit: 1
    } })
  );

  useEffect(() => {
    let start: Date;
    const stored = typeof window !== 'undefined' ? localStorage.getItem('dashboardSessionStart') : null;
    if (stored) {
      start = new Date(stored);
    } else {
      start = new Date();
      if (typeof window !== 'undefined') {
        localStorage.setItem('dashboardSessionStart', start.toISOString());
      }
    }
    setSessionStart(start);
    setCurrentTime(new Date());
    setElapsed(Math.floor((Date.now() - start.getTime()) / 1000));
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      setElapsed(Math.floor((Date.now() - start.getTime()) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isLoading = isProfileLoading || isQuestsLoading;
  const hasError = profileError || questsError;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-2 border-[var(--primary)] border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-red-400">Error loading your profile. Please try refreshing the page.</p>
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      </div>
    );
  }

  const playerStats = {
    level: (profileData as any)?.level,
    xp: (profileData as any)?.experience,
    class: (profileData as any)?.characterClass,
    questsCompleted: (profileData as any)?.questsCompleted,
    currentStreak: (profileData as any)?.currentStreak,
    rank: (profileData as any)?.globalRanking,
    problemsSolvedToday: (profileData as any)?.problemsSolvedToday,
    problemsAttemptedToday: (profileData as any)?.problemsAttemptedToday,
  };

  const quests = (questsData as any)?.map((q: any) => ({
    id: q.id,
    title: q.title,
    description: q.description,
    difficulty: q.difficulty,
    progress: q.userProgress?.progress || 0,
    status: q.userProgress?.status || 'available',
    type: q.type
  })) || [];

  return (
    <div className="min-h-screen text-[var(--foreground)] bg-[var(--background)] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--background)] via-[var(--background)] to-[var(--muted)]/20 pointer-events-none" />

      <div className="relative z-10">
        <DashboardHeader session={session} playerStats={playerStats} currentTime={currentTime} />

        <div className="container mx-auto px-4 py-8 space-y-8">
          <StoryProgress quests={quests} />
          <StatsGrid playerStats={playerStats} elapsed={elapsed} />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}