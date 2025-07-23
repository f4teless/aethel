"use client";

import { cn } from "@/lib/utils";
import { Heart, Sparkles } from "lucide-react";

interface StatBarProps {
  current: number;
  max: number;
  type: "hp" | "mana";
  className?: string;
  showText?: boolean;
}

export function StatBar({ current, max, type, className, showText = true }: StatBarProps) {
  const percentage = Math.max(0, Math.min(100, (current / max) * 100));
  
  const isHp = type === "hp";
  const Icon = isHp ? Heart : Sparkles;
  
  const barColor = isHp 
    ? percentage > 50 ? "bg-green-500" : percentage > 25 ? "bg-yellow-500" : "bg-red-500"
    : "bg-blue-500";
    
  const glowColor = isHp 
    ? percentage > 50 ? "shadow-green-400/50" : percentage > 25 ? "shadow-yellow-400/50" : "shadow-red-400/50"
    : "shadow-blue-400/50";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Icon 
        className={cn(
          "w-5 h-5",
          isHp ? "text-red-400" : "text-blue-400"
        )} 
      />
      
      <div className="flex-1 min-w-0">
        <div className="relative bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-600">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800" />
          
          {/* Progress bar */}
          <div 
            className={cn(
              "relative h-full transition-all duration-300 ease-out",
              barColor,
              "shadow-lg",
              glowColor
            )}
            style={{ width: `${percentage}%` }}
          >
            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
          
          {/* Pulse effect for low values */}
          {percentage < 25 && (
            <div className="absolute inset-0 animate-pulse bg-red-400/20" />
          )}
        </div>
        
        {showText && (
          <div className="text-xs text-gray-400 mt-1 text-center">
            {current} / {max}
          </div>
        )}
      </div>
    </div>
  );
}

interface StatsDisplayProps {
  hp: { current: number; max: number };
  mana: { current: number; max: number };
  className?: string;
  compact?: boolean;
}

export function StatsDisplay({ hp, mana, className, compact = false }: StatsDisplayProps) {
  return (
    <div className={cn(
      "bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg",
      compact ? "p-2 space-y-1" : "p-4 space-y-3",
      className
    )}>
      <StatBar 
        current={hp.current} 
        max={hp.max} 
        type="hp" 
        showText={!compact}
      />
      <StatBar 
        current={mana.current} 
        max={mana.max} 
        type="mana" 
        showText={!compact}
      />
    </div>
  );
}

interface ManaPreviewProps {
  cost: number;
  currentMana: number;
  actionName: string;
  className?: string;
}

export function ManaPreview({ cost, currentMana, actionName, className }: ManaPreviewProps) {
  const canAfford = currentMana >= cost;
  const remainingMana = currentMana - cost;
  
  return (
    <div className={cn(
      "flex items-center gap-2 p-2 rounded border",
      canAfford 
        ? "border-blue-400/50 bg-blue-900/20" 
        : "border-red-400/50 bg-red-900/20",
      className
    )}>
      <Sparkles className={cn(
        "w-4 h-4",
        canAfford ? "text-blue-400" : "text-red-400"
      )} />
      
      <span className="text-sm font-medium">
        {actionName}: {cost} mana
      </span>
      
      {canAfford ? (
        <span className="text-xs text-blue-300">
          ({remainingMana} remaining)
        </span>
      ) : (
        <span className="text-xs text-red-300">
          (Need {cost - currentMana} more)
        </span>
      )}
    </div>
  );
}
