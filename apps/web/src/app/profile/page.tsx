"use client";

import { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";
import { authClient } from "@/lib/auth-client";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { ProfileHeader } from "./ProfileHeader";
import { ProfileTabs, CompactProfileCard, StatsGrid, EquipmentList, AchievementsList } from "./ProfileTabs";
import { SettingsContent } from "./SettingsContent";
import { DangerZoneContent } from "./DangerZone";
import { Button } from "@/components/ui/button";
import { SwapyLayout, SwapySlot, SwapyItem, DragHandle } from "@/components/ui/swapy";

export default function ProfileClientPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { data: session } = authClient.useSession();
  
  const { data: profileData, isLoading: isProfileLoading, error: profileError } = useQuery(orpc.user.getProfile.queryOptions());
  const { data: statsData, isLoading: isStatsLoading, error: statsError } = useQuery(orpc.user.getStats.queryOptions());
  const { data: inventoryData, isLoading: isInventoryLoading, error: inventoryError } = useQuery(orpc.equipment.getUserInventory.queryOptions());
  const { data: achievementsData, isLoading: isAchievementsLoading, error: achievementsError } = useQuery(orpc.achievement.getUnlockedAchievements.queryOptions());

  const [activeTab, setActiveTab] = useState<"profile" | "settings" | "danger">("profile");

  const handleSwap = (event: { newSlotItemMap: { asArray: any[] } }) => {
    console.log('Profile layout swapped:', event.newSlotItemMap.asArray);
    // You can save the layout state to localStorage or send to server here
    // localStorage.setItem('profileLayout', JSON.stringify(event.newSlotItemMap.asArray));
  };

  useGSAP(() => {
    const isLoading = isProfileLoading || isStatsLoading || isInventoryLoading || isAchievementsLoading;
    if (!isLoading && activeTab === 'profile') {
      const allCards = document.querySelectorAll('.bento-card');
      
      if (allCards.length > 0) {
        gsap.set(allCards, { opacity: 0, y: 20, scale: 0.98 });
        
        gsap.to(allCards, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out'
        });
      }
    }
  }, { scope: containerRef, dependencies: [isProfileLoading, isStatsLoading, isInventoryLoading, isAchievementsLoading, activeTab] });

  const isLoading = isProfileLoading || isStatsLoading || isInventoryLoading || isAchievementsLoading;
  const hasError = profileError || statsError || inventoryError || achievementsError;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading Architect Profile...</p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <div className="text-center space-y-4">
          <p className="text-destructive">Error loading your profile. Please try refreshing.</p>
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </div>
      </div>
    );
  }

  // Combine data with fallbacks and proper typing
  const userProfile = {
    name: session?.user?.name || "Architect",
    email: session?.user?.email || "noobmaster69@gay.com",
    class: (profileData as any)?.characterClass || "Unknown Class",
    level: (profileData as any)?.level,
    xp: (profileData as any)?.experience,
    backstory: (profileData as any)?.backstory || `A promising architect who shows great potential in array manipulation`,
    currentHp: (profileData as any)?.currentHp,
    currentMp: (profileData as any)?.currentMp,
    currentStreak: (profileData as any)?.currentStreak,
    currentChapter: (profileData as any)?.currentChapter
  };
  
  const userStats = {
    problemsSolved: (statsData as any)?.successfulSubmissions,
    accuracy:((statsData as any).successfulSubmissions / (statsData as any).submissionCount),
    currentStreak: (statsData as any)?.loginStreak,
  };

  const userEquipment = inventoryData 

  const userAchievements = achievementsData;
  // Debug logging
  console.log('achievementsData from API:', achievementsData);
  console.log('userAchievements:', userAchievements);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="text-center">
          <ProfileHeader name={userProfile.name} />
        </div>
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {activeTab === 'profile' && (
          <SwapyLayout 
            id="profile-layout" 
            className="space-y-4"
            onSwap={handleSwap}
            config={{
              swapMode: "hover"
            }}
          >
            {/* Compact Profile Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2">
                <SwapySlot id="profile-slot" className="h-full">
                  <SwapyItem id="profile-card" className="h-full">
                    <div className="relative">
                      <CompactProfileCard 
                        className="bento-card bento-hero h-full" 
                        profile={userProfile} 
                      />
                    </div>
                  </SwapyItem>
                </SwapySlot>
              </div>
              <div>
                <SwapySlot id="stats-slot" className="h-full">
                  <SwapyItem id="stats-card" className="h-full">
                    <div className="relative h-full">
                      <StatsGrid 
                        className="bento-card bento-medium h-full" 
                        stats={userStats} 
                      />
                    </div>
                  </SwapyItem>
                </SwapySlot>
              </div>
            </div>
            
            {/* Equipment and Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
              <SwapySlot id="equipment-slot" className="h-full">
                <SwapyItem id="equipment-card" className="h-full">
                  <div className="relative h-full">
                    <EquipmentList 
                      className="bento-card bento-wide h-full" 
                      equipment={userEquipment}
                    />
                  </div>
                </SwapyItem>
              </SwapySlot>
              
              <SwapySlot id="achievements-slot" className="h-full">
                <SwapyItem id="achievements-card" className="h-full">
                  <div className="relative h-full">
                    <AchievementsList 
                      className="bento-card bento-compact h-full" 
                      achievements={userAchievements}
                    />
                  </div>
                </SwapyItem>
              </SwapySlot>
            </div>
          </SwapyLayout>
        )}

        {activeTab === 'settings' && <SettingsContent session={session} />}
        {activeTab === 'danger' && <DangerZoneContent />}
      </div>
    </div>
  );
}