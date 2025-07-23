"use client";

const baseURL = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:8787";

// Simple fetch wrapper with authentication
async function apiCall(endpoint: string, options: RequestInit = {}) {
  // Ensure all ORPC requests have a body, even if empty
  const defaultOptions: RequestInit = {
    method: 'POST',
    body: JSON.stringify({}),
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  const response = await fetch(`${baseURL}${endpoint}`, defaultOptions);

  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }

  return response.json();
}

// Simple API client for now
export const api = {
  user: {
    getProfile: () => apiCall('/rpc/user/getProfile'),
    updateProfile: (data: any) => apiCall('/rpc/user/updateProfile', {
      body: JSON.stringify(data),
    }),
    getStats: () => apiCall('/rpc/user/getStats'),
    spendMana: (data: { action: string; questId?: string }) => 
      apiCall('/rpc/user/spendMana', {
        body: JSON.stringify(data),
      }),
    takeDamage: (data: { damageType: string; customDamage?: number }) =>
      apiCall('/rpc/user/takeDamage', {
        body: JSON.stringify(data),
      }),
  },
  quest: {
    getAvailableQuests: (params?: { type?: string; limit?: number; offset?: number }) =>
      apiCall('/rpc/quest/getAvailableQuests', {
        body: JSON.stringify(params || {}),
      }),
    getStoryProgression: () => apiCall('/rpc/quest/getStoryProgression'),
    getActiveQuests: () => apiCall('/rpc/quest/getActiveQuests'),
    startQuest: (data: { questId: string }) =>
      apiCall('/rpc/quest/startQuest', {
        body: JSON.stringify(data),
      }),
    submitSolution: (data: { questId: string; solution: string; timeSpent: number }) =>
      apiCall('/rpc/quest/submitSolution', {
        body: JSON.stringify(data),
      }),
    requestHint: (data: { questId: string }) =>
      apiCall('/rpc/quest/requestHint', {
        body: JSON.stringify(data),
      }),
    getDailyChallenge: () => apiCall('/rpc/quest/getDailyChallenge'),
    applyTimePenalty: (data: { questId: string; currentTime: number }) =>
      apiCall('/rpc/quest/applyTimePenalty', {
        body: JSON.stringify(data),
      }),
  },
};

export const queryKeys = {
  user: {
    profile: ['user', 'profile'] as const,
    stats: ['user', 'stats'] as const,
  },
  quest: {
    available: (type?: string) => ['quest', 'available', type] as const,
    storyProgression: ['quest', 'story-progression'] as const,
    active: ['quest', 'active'] as const,
    dailyChallenge: ['quest', 'daily-challenge'] as const,
  },
} as const;
