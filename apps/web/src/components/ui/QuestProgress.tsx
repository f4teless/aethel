"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Clock, AlertTriangle, Timer } from "lucide-react";

interface QuestTimerProps {
  startTime: Date;
  graceTimeMinutes: number;
  onGraceTimeExpired?: () => void;
  onTimerUpdate?: (timeSpent: number, isOvertime: boolean) => void;
  className?: string;
}

export function QuestTimer({ 
  startTime, 
  graceTimeMinutes, 
  onGraceTimeExpired,
  onTimerUpdate,
  className 
}: QuestTimerProps) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOvertime, setIsOvertime] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      
      const timeSpentMs = now.getTime() - startTime.getTime();
      const timeSpentMinutes = timeSpentMs / (1000 * 60);
      const newIsOvertime = timeSpentMinutes > graceTimeMinutes;
      
      if (newIsOvertime && !isOvertime) {
        setIsOvertime(true);
        onGraceTimeExpired?.();
      }
      
      onTimerUpdate?.(timeSpentMs / 1000, newIsOvertime);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [startTime, graceTimeMinutes, isOvertime, onGraceTimeExpired, onTimerUpdate]);
  
  const timeSpentMs = currentTime.getTime() - startTime.getTime();
  const timeSpentMinutes = timeSpentMs / (1000 * 60);
  const graceTimeRemainingMinutes = Math.max(0, graceTimeMinutes - timeSpentMinutes);
  const overtimeMinutes = Math.max(0, timeSpentMinutes - graceTimeMinutes);
  
  const formatTime = (minutes: number) => {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <div className={cn(
      "bg-gray-900/80 backdrop-blur-sm border rounded-lg p-3",
      isOvertime ? "border-red-400/50" : "border-gray-600",
      className
    )}>
      <div className="flex items-center gap-2 mb-2">
        <Timer className={cn(
          "w-4 h-4",
          isOvertime ? "text-red-400" : "text-gray-400"
        )} />
        <span className="text-sm font-medium">
          Quest Timer
        </span>
      </div>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Time spent:</span>
          <span className={isOvertime ? "text-red-300" : "text-gray-200"}>
            {formatTime(timeSpentMinutes)}
          </span>
        </div>
        
        {!isOvertime ? (
          <div className="flex justify-between">
            <span className="text-gray-400">Grace time left:</span>
            <span className={graceTimeRemainingMinutes < 2 ? "text-yellow-300" : "text-green-300"}>
              {formatTime(graceTimeRemainingMinutes)}
            </span>
          </div>
        ) : (
          <div className="flex justify-between">
            <span className="text-red-400">Overtime:</span>
            <span className="text-red-300">
              {formatTime(overtimeMinutes)}
            </span>
          </div>
        )}
        
        {isOvertime && (
          <div className="flex items-center gap-1 mt-2 p-2 bg-red-900/30 rounded border border-red-400/50">
            <AlertTriangle className="w-4 h-4 text-red-400" />
            <span className="text-xs text-red-300">
              HP draining due to overtime!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

interface QuestProgressCardProps {
  quest: {
    id: string;
    title: string;
    difficulty: string;
    progress: number;
    status: 'available' | 'in-progress' | 'completed' | 'locked';
    timeLimit?: number;
    manaCost?: number;
    graceTime?: number;
  };
  userStats: {
    currentHp: number;
    maxHp: number;
    currentMana: number;
    maxMana: number;
  };
  onStart?: (questId: string) => void;
  onContinue?: (questId: string) => void;
  startTime?: Date;
  className?: string;
}

export function QuestProgressCard({ 
  quest, 
  userStats, 
  onStart, 
  onContinue,
  startTime,
  className 
}: QuestProgressCardProps) {
  const canAfford = quest.manaCost ? userStats.currentMana >= quest.manaCost : true;
  const isInProgress = quest.status === 'in-progress';
  const isCompleted = quest.status === 'completed';
  const isLocked = quest.status === 'locked';
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'hard': return 'text-red-400';
      case 'expert': return 'text-purple-400';
      case 'legendary': return 'text-orange-400';
      case 'mythic': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };
  
  return (
    <div className={cn(
      "bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg p-4",
      isCompleted && "border-green-400/50",
      isLocked && "border-gray-600 opacity-50",
      className
    )}>
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-100">{quest.title}</h3>
          <span className={cn("text-sm capitalize", getDifficultyColor(quest.difficulty))}>
            {quest.difficulty}
          </span>
        </div>
        
        <div className="text-right">
          {quest.manaCost && quest.manaCost > 0 && (
            <div className={cn(
              "text-sm",
              canAfford ? "text-blue-300" : "text-red-300"
            )}>
              {quest.manaCost} mana
            </div>
          )}
          
          {quest.graceTime && (
            <div className="text-xs text-gray-400">
              {quest.graceTime}min grace time
            </div>
          )}
        </div>
      </div>
      
      {/* Progress bar for in-progress quests */}
      {isInProgress && (
        <div className="mb-3">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-400">Progress</span>
            <span className="text-gray-200">{quest.progress}%</span>
          </div>
          <div className="bg-gray-700 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${quest.progress}%` }}
            />
          </div>
        </div>
      )}
      
      {/* Timer for active quests */}
      {isInProgress && startTime && quest.graceTime && (
        <QuestTimer 
          startTime={startTime}
          graceTimeMinutes={quest.graceTime}
          className="mb-3"
        />
      )}
      
      {/* Action buttons */}
      <div className="flex gap-2">
        {quest.status === 'available' && (
          <button
            onClick={() => onStart?.(quest.id)}
            disabled={!canAfford || isLocked}
            className={cn(
              "flex-1 py-2 px-4 rounded font-medium transition-colors",
              canAfford && !isLocked
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-600 text-gray-400 cursor-not-allowed"
            )}
          >
            {isLocked ? "Locked" : canAfford ? "Start Quest" : "Insufficient Mana"}
          </button>
        )}
        
        {isInProgress && (
          <button
            onClick={() => onContinue?.(quest.id)}
            className="flex-1 py-2 px-4 rounded font-medium bg-green-600 hover:bg-green-700 text-white transition-colors"
          >
            Continue
          </button>
        )}
        
        {isCompleted && (
          <div className="flex-1 py-2 px-4 rounded font-medium bg-green-600/20 text-green-400 text-center">
            Completed ✓
          </div>
        )}
      </div>
      
      {!canAfford && quest.manaCost && (
        <div className="mt-2 text-xs text-red-300">
          Need {quest.manaCost - userStats.currentMana} more mana
        </div>
      )}
    </div>
  );
}
