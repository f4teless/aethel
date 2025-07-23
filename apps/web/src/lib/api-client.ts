import { createORPCClient } from "@orpc/client";
import { ORPCTanStackQueryClient } from "@orpc/tanstack-query";
import type { AppRouter } from "../../../server/src/routers";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8787";

// Create the base ORPC client
export const orpcClient = createORPCClient<AppRouter>({
  url: `${baseURL}/rpc`,
  fetch: (input: RequestInfo | URL, init?: RequestInit) => {
    return fetch(input, {
      ...init,
      credentials: "include", // Include cookies for authentication
    });
  },
});

// Create TanStack Query client
export const orpcQueryClient = new ORPCTanStackQueryClient(orpcClient);

// Type-safe API calls
export const api = {
  // User routes
  user: {
    getProfile: () => orpcClient.user.getProfile(),
    updateProfile: (data: Parameters<typeof orpcClient.user.updateProfile>[0]) => 
      orpcClient.user.updateProfile(data),
    getStats: () => orpcClient.user.getStats(),
    getLeaderboard: (params: Parameters<typeof orpcClient.user.getLeaderboard>[0]) => 
      orpcClient.user.getLeaderboard(params),
    addExperience: (data: Parameters<typeof orpcClient.user.addExperience>[0]) => 
      orpcClient.user.addExperience(data),
    spendMana: (data: Parameters<typeof orpcClient.user.spendMana>[0]) => 
      orpcClient.user.spendMana(data),
    takeDamage: (data: Parameters<typeof orpcClient.user.takeDamage>[0]) => 
      orpcClient.user.takeDamage(data),
    getUserRank: () => orpcClient.user.getUserRank(),
  },
  
  // Quest routes
  quest: {
    getAvailableQuests: (params?: Parameters<typeof orpcClient.quest.getAvailableQuests>[0]) => 
      orpcClient.quest.getAvailableQuests(params || {}),
    getStoryProgression: () => orpcClient.quest.getStoryProgression(),
    getActiveQuests: () => orpcClient.quest.getActiveQuests(),
    startQuest: (data: Parameters<typeof orpcClient.quest.startQuest>[0]) => 
      orpcClient.quest.startQuest(data),
    submitSolution: (data: Parameters<typeof orpcClient.quest.submitSolution>[0]) => 
      orpcClient.quest.submitSolution(data),
    requestHint: (data: Parameters<typeof orpcClient.quest.requestHint>[0]) => 
      orpcClient.quest.requestHint(data),
    getDailyChallenge: () => orpcClient.quest.getDailyChallenge(),
    applyTimePenalty: (data: Parameters<typeof orpcClient.quest.applyTimePenalty>[0]) => 
      orpcClient.quest.applyTimePenalty(data),
  },
  
  // Achievement routes
  achievement: {
    getAllAchievements: (params?: Parameters<typeof orpcClient.achievement.getAllAchievements>[0]) => 
      orpcClient.achievement.getAllAchievements(params || {}),
    getUnlockedAchievements: () => orpcClient.achievement.getUnlockedAchievements(),
    getRecentAchievements: () => orpcClient.achievement.getRecentAchievements(),
  },
  
  // Community routes
  community: {
    getEvents: (params?: Parameters<typeof orpcClient.community.getEvents>[0]) => 
      orpcClient.community.getEvents(params || {}),
    getPvPLeaderboard: (params?: Parameters<typeof orpcClient.community.getPvPLeaderboard>[0]) => 
      orpcClient.community.getPvPLeaderboard(params || {}),
    getDailyChallenges: (params?: Parameters<typeof orpcClient.community.getDailyChallenges>[0]) => 
      orpcClient.community.getDailyChallenges(params || {}),
  },
  
  // Equipment routes
  equipment: {
    getAllEquipment: (params?: Parameters<typeof orpcClient.equipment.getAllEquipment>[0]) => 
      orpcClient.equipment.getAllEquipment(params || {}),
    getUserInventory: () => orpcClient.equipment.getUserInventory(),
    getUserEquippedItems: () => orpcClient.equipment.getUserEquippedItems(),
    equipItem: (data: Parameters<typeof orpcClient.equipment.equipItem>[0]) => 
      orpcClient.equipment.equipItem(data),
    unequipItem: (data: Parameters<typeof orpcClient.equipment.unequipItem>[0]) => 
      orpcClient.equipment.unequipItem(data),
  },
};

// TanStack Query hooks
export const queryKeys = {
  user: {
    profile: ['user', 'profile'] as const,
    stats: ['user', 'stats'] as const,
    leaderboard: (type: string, characterClass?: string) => 
      ['user', 'leaderboard', type, characterClass] as const,
    rank: ['user', 'rank'] as const,
  },
  quest: {
    available: (type?: string) => ['quest', 'available', type] as const,
    storyProgression: ['quest', 'story-progression'] as const,
    active: ['quest', 'active'] as const,
    dailyChallenge: ['quest', 'daily-challenge'] as const,
  },
  achievement: {
    all: (type?: string) => ['achievement', 'all', type] as const,
    unlocked: ['achievement', 'unlocked'] as const,
    recent: ['achievement', 'recent'] as const,
  },
  community: {
    events: (status?: string) => ['community', 'events', status] as const,
    pvpLeaderboard: ['community', 'pvp-leaderboard'] as const,
    dailyChallenges: (status?: string) => ['community', 'daily-challenges', status] as const,
  },
  equipment: {
    all: (type?: string) => ['equipment', 'all', type] as const,
    inventory: ['equipment', 'inventory'] as const,
    equipped: ['equipment', 'equipped'] as const,
  },
} as const;

// Helper to get fresh user profile data
export const getUserProfile = async () => {
  try {
    const profile = await api.user.getProfile();
    return profile;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
    throw error;
  }
};

// Helper to check mana availability
export const checkManaAffordability = async (cost: number) => {
  try {
    const profile = await api.user.getProfile();
    return profile.currentMana >= cost;
  } catch (error) {
    console.error('Failed to check mana:', error);
    return false;
  }
};

export default orpcClient;
