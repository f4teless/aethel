"use client";

import { useQuery } from "@tanstack/react-query";
import { orpc } from "@/utils/orpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function ApiTest() {
  // Test user profile
  const { data: profileData, isLoading: profileLoading, error: profileError } = useQuery(
    orpc.user.getProfile.queryOptions()
  );

  // Test available quests
  const { data: questsData, isLoading: questsLoading, error: questsError } = useQuery(
    orpc.quest.getAvailableQuests.queryOptions({
      limit: 5,
      offset: 0
    })
  );

  // Test achievements
  const { data: achievementsData, isLoading: achievementsLoading, error: achievementsError } = useQuery(
    orpc.achievement.getUnlockedAchievements.queryOptions()
  );

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-2xl font-bold">API Test Results</h2>
      
      {/* Profile Test */}
      <Card>
        <CardHeader>
          <CardTitle>User Profile</CardTitle>
          <CardDescription>Testing user.getProfile</CardDescription>
        </CardHeader>
        <CardContent>
          {profileLoading && <p>Loading...</p>}
          {profileError && <p className="text-red-500">Error: {profileError.message}</p>}
          {profileData && (
            <div className="space-y-2">
              <p><strong>Level:</strong> {profileData.level}</p>
              <p><strong>Character Class:</strong> {profileData.characterClass}</p>
              <p><strong>Experience:</strong> {profileData.experience}</p>
              <p><strong>HP:</strong> {profileData.currentHp}/{profileData.maxHp}</p>
              <p><strong>Mana:</strong> {profileData.currentMana}/{profileData.maxMana}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quests Test */}
      <Card>
        <CardHeader>
          <CardTitle>Available Quests</CardTitle>
          <CardDescription>Testing quest.getAvailableQuests</CardDescription>
        </CardHeader>
        <CardContent>
          {questsLoading && <p>Loading...</p>}
          {questsError && <p className="text-red-500">Error: {questsError.message}</p>}
          {questsData && (
            <div className="space-y-2">
              <p><strong>Quest Count:</strong> {questsData.length}</p>
              {questsData.slice(0, 2).map((questItem: any) => (
                <div key={questItem.quest.id} className="border p-2 rounded">
                  <p><strong>{questItem.quest.title}</strong></p>
                  <p>Status: {questItem.userProgress?.status || 'available'}</p>
                  <p>Progress: {questItem.userProgress?.progress || 0}%</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Achievements Test */}
      <Card>
        <CardHeader>
          <CardTitle>Unlocked Achievements</CardTitle>
          <CardDescription>Testing achievement.getUnlockedAchievements</CardDescription>
        </CardHeader>
        <CardContent>
          {achievementsLoading && <p>Loading...</p>}
          {achievementsError && <p className="text-red-500">Error: {achievementsError.message}</p>}
          {achievementsData && (
            <div className="space-y-2">
              <p><strong>Achievement Count:</strong> {achievementsData.length}</p>
              {achievementsData.slice(0, 3).map((achievement: any) => (
                <div key={achievement.achievement.id} className="border p-2 rounded">
                  <p><strong>{achievement.achievement.name}</strong></p>
                  <p>{achievement.achievement.description}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
