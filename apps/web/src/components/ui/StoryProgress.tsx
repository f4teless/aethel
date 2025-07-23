"use client";

import { cn } from "@/lib/utils";
import { BookOpen, Lock, CheckCircle, Clock } from "lucide-react";

interface StoryQuestItem {
  questNumber: number;
  title: string;
  chapter: number | null;
  status: 'locked' | 'available' | 'in-progress' | 'completed';
  timeCompleted?: Date | null;
}

interface StoryProgressProps {
  storyQuests: StoryQuestItem[];
  onQuestClick?: (questNumber: number) => void;
  className?: string;
}

export function StoryProgress({ storyQuests, onQuestClick, className }: StoryProgressProps) {
  const currentQuest = storyQuests.find(q => q.status === 'in-progress' || q.status === 'available');
  const completedCount = storyQuests.filter(q => q.status === 'completed').length;
  const totalQuests = storyQuests.length;
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-400" />;
      case 'available':
        return <BookOpen className="w-5 h-5 text-yellow-400" />;
      case 'locked':
      default:
        return <Lock className="w-5 h-5 text-gray-500" />;
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'available': return 'Available';
      case 'locked': return 'Locked';
      default: return 'Unknown';
    }
  };
  
  const getChapterTitle = (chapter: number | null) => {
    if (!chapter) return 'Prologue';
    
    const chapterNames = {
      1: 'The Awakening',
      2: 'Corruption Spreads',
      3: 'Memory Palace',
      4: 'The Deep Algorithms',
      5: 'Graph Mysteries'
    };
    
    return chapterNames[chapter as keyof typeof chapterNames] || `Chapter ${chapter}`;
  };
  
  return (
    <div className={cn(
      "bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-lg p-6",
      className
    )}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="w-6 h-6 text-blue-400" />
        <div>
          <h2 className="text-xl font-bold text-gray-100">Story Progress</h2>
          <p className="text-sm text-gray-400">
            {completedCount} of {totalQuests} quests completed
          </p>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-400">Overall Progress</span>
          <span className="text-gray-200">
            {Math.round((completedCount / totalQuests) * 100)}%
          </span>
        </div>
        <div className="bg-gray-700 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedCount / totalQuests) * 100}%` }}
          />
        </div>
      </div>
      
      {/* Current quest highlight */}
      {currentQuest && (
        <div 
          className="mb-4 p-4 rounded-lg border border-blue-400/50 bg-blue-900/20 cursor-pointer hover:bg-blue-900/30 transition-colors"
          onClick={() => onQuestClick?.(currentQuest.questNumber)}
        >
          <div className="flex items-center gap-3">
            {getStatusIcon(currentQuest.status)}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-100">
                  {currentQuest.title}
                </span>
                <span className="text-xs px-2 py-1 bg-blue-600/50 text-blue-200 rounded">
                  {getChapterTitle(currentQuest.chapter)}
                </span>
              </div>
              <p className="text-sm text-gray-400 mt-1">
                {getStatusText(currentQuest.status)}
              </p>
            </div>
          </div>
        </div>
      )}
      
      {/* Quest list */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {storyQuests.map((quest) => (
          <div
            key={quest.questNumber}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg transition-colors",
              quest.status === 'locked' 
                ? "opacity-50" 
                : "hover:bg-gray-800/50 cursor-pointer",
              quest === currentQuest && "bg-blue-900/10"
            )}
            onClick={() => quest.status !== 'locked' && onQuestClick?.(quest.questNumber)}
          >
            {getStatusIcon(quest.status)}
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={cn(
                  "font-medium truncate",
                  quest.status === 'locked' ? "text-gray-500" : "text-gray-200"
                )}>
                  {quest.questNumber === 0 ? 'Prologue' : `Quest ${quest.questNumber}`}
                </span>
                {quest.chapter !== null && (
                  <span className="text-xs px-1.5 py-0.5 bg-gray-700 text-gray-300 rounded text-nowrap">
                    Ch. {quest.chapter}
                  </span>
                )}
              </div>
              <p className={cn(
                "text-sm truncate",
                quest.status === 'locked' ? "text-gray-600" : "text-gray-400"
              )}>
                {quest.title}
              </p>
            </div>
            
            {quest.timeCompleted && (
              <div className="text-xs text-gray-500">
                {new Date(quest.timeCompleted).toLocaleDateString()}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {storyQuests.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No story quests available</p>
        </div>
      )}
    </div>
  );
}
