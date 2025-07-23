"use client";

import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, queryKeys } from '../lib/simple-api';

export interface UserStats {
  level: number;
  experience: number;
  xpToNext: number;
  xpInCurrentLevel: number;
  currentHp: number;
  maxHp: number;
  currentMana: number;
  maxMana: number;
  graceTime: number;
  hpDrainPerMinute: number;
}

export interface StoryQuest {
  questNumber: number;
  title: string;
  chapter: number | null;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  timeCompleted?: Date | null;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  type: string;
  difficulty: string;
  questNumber: number;
  requiredLevel: number;
  experienceReward: number;
  storyChapter?: number | null;
  manaCost?: number;
  canAfford?: boolean;
  graceTime?: number;
  userProgress?: {
    status: string;
    progress: number;
    attemptsCount: number;
    timeCompleted?: Date | null;
    totalTimeSpent?: number;
    hintsUsed?: number;
  } | null;
}

// Hook for managing user profile and stats
export function useUserProfile() {
  const queryClient = useQueryClient();
  
  const {
    data: userStats,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: queryKeys.user.profile,
    queryFn: api.user.getProfile,
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes for mana regen
  });
  
  const spendManaMutation = useMutation({
    mutationFn: api.user.spendMana,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
  
  const takeDamageMutation = useMutation({
    mutationFn: api.user.takeDamage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
  
  const spendMana = useCallback(async (action: string, questId?: string) => {
    return spendManaMutation.mutateAsync({
      action: action as any,
      questId,
    });
  }, [spendManaMutation]);
  
  const takeDamage = useCallback(async (damageType: string, customDamage?: number) => {
    return takeDamageMutation.mutateAsync({
      damageType: damageType as any,
      customDamage,
    });
  }, [takeDamageMutation]);
  
  return {
    userStats,
    isLoading,
    error,
    refetch,
    spendMana,
    takeDamage,
    isSpendingMana: spendManaMutation.isPending,
    isTakingDamage: takeDamageMutation.isPending,
  };
}

// Hook for managing story progression
export function useStoryProgression() {
  const {
    data: storyQuests,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: queryKeys.quest.storyProgression,
    queryFn: api.quest.getStoryProgression,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  
  return {
    storyQuests: storyQuests || [],
    isLoading,
    error,
    refetch,
  };
}

// Hook for managing available quests
export function useAvailableQuests(type?: string) {
  const {
    data: quests,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: queryKeys.quest.available(type),
    queryFn: () => api.quest.getAvailableQuests(type ? { type: type as any } : {}),
    staleTime: 1000 * 60 * 3, // 3 minutes
  });
  
  return {
    quests: quests || [],
    isLoading,
    error,
    refetch,
  };
}

// Hook for managing active quests
export function useActiveQuests() {
  const {
    data: activeQuests,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: queryKeys.quest.active,
    queryFn: api.quest.getActiveQuests,
    staleTime: 1000 * 30, // 30 seconds (more frequent for active quests)
    refetchInterval: 1000 * 60, // Refetch every minute
  });
  
  return {
    activeQuests: activeQuests || [],
    isLoading,
    error,
    refetch,
  };
}

// Hook for managing quest actions
export function useQuestActions() {
  const queryClient = useQueryClient();
  
  const startQuestMutation = useMutation({
    mutationFn: api.quest.startQuest,
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: queryKeys.quest.active });
      queryClient.invalidateQueries({ queryKey: queryKeys.quest.available() });
      queryClient.invalidateQueries({ queryKey: queryKeys.quest.storyProgression });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
  
  const submitSolutionMutation = useMutation({
    mutationFn: api.quest.submitSolution,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.quest.active });
      queryClient.invalidateQueries({ queryKey: queryKeys.quest.available() });
      queryClient.invalidateQueries({ queryKey: queryKeys.quest.storyProgression });
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
  
  const requestHintMutation = useMutation({
    mutationFn: api.quest.requestHint,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
  
  const applyTimePenaltyMutation = useMutation({
    mutationFn: api.quest.applyTimePenalty,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.user.profile });
    },
  });
  
  const startQuest = useCallback(async (questId: string) => {
    return startQuestMutation.mutateAsync({ questId });
  }, [startQuestMutation]);
  
  const submitSolution = useCallback(async (questId: string, solution: string, timeSpent: number) => {
    return submitSolutionMutation.mutateAsync({ questId, solution, timeSpent });
  }, [submitSolutionMutation]);
  
  const requestHint = useCallback(async (questId: string) => {
    return requestHintMutation.mutateAsync({ questId });
  }, [requestHintMutation]);
  
  const applyTimePenalty = useCallback(async (questId: string, currentTime: number) => {
    return applyTimePenaltyMutation.mutateAsync({ questId, currentTime });
  }, [applyTimePenaltyMutation]);
  
  return {
    startQuest,
    submitSolution,
    requestHint,
    applyTimePenalty,
    isStartingQuest: startQuestMutation.isPending,
    isSubmittingSolution: submitSolutionMutation.isPending,
    isRequestingHint: requestHintMutation.isPending,
    isApplyingTimePenalty: applyTimePenaltyMutation.isPending,
  };
}

// Hook for daily challenge
export function useDailyChallenge() {
  const {
    data: dailyChallenge,
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: queryKeys.quest.dailyChallenge,
    queryFn: api.quest.getDailyChallenge,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
  
  return {
    dailyChallenge,
    isLoading,
    error,
    refetch,
  };
}

// Hook for managing real-time mana regeneration
export function useManaRegeneration(userStats?: UserStats) {
  const [localMana, setLocalMana] = useState<number | null>(null);
  
  useEffect(() => {
    if (!userStats) return;
    
    setLocalMana(userStats.currentMana);
    
    // Update mana every minute
    const interval = setInterval(() => {
      setLocalMana(prev => {
        if (prev === null) return userStats.currentMana;
        const newMana = Math.min(userStats.maxMana, prev + 0.2); // 1 mana per 5 minutes
        return newMana;
      });
    }, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, [userStats]);
  
  return localMana ?? userStats?.currentMana ?? 0;
}

// Hook for managing grace time countdown
export function useGraceTimeCountdown(startTime?: Date, graceTimeMinutes?: number) {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isOvertime, setIsOvertime] = useState(false);
  
  useEffect(() => {
    if (!startTime || !graceTimeMinutes) {
      setTimeRemaining(null);
      setIsOvertime(false);
      return;
    }
    
    const interval = setInterval(() => {
      const now = new Date();
      const timeSpentMs = now.getTime() - startTime.getTime();
      const timeSpentMinutes = timeSpentMs / (1000 * 60);
      const remaining = graceTimeMinutes - timeSpentMinutes;
      
      if (remaining <= 0) {
        setTimeRemaining(0);
        setIsOvertime(true);
      } else {
        setTimeRemaining(remaining);
        setIsOvertime(false);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [startTime, graceTimeMinutes]);
  
  return {
    timeRemaining,
    isOvertime,
    formattedTime: timeRemaining ? `${Math.floor(timeRemaining)}:${Math.floor((timeRemaining % 1) * 60).toString().padStart(2, '0')}` : null,
  };
}
