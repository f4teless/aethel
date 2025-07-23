import { eq, desc, sql, and } from "drizzle-orm";
import z from "zod";
import { db } from "../db";
import { communityEvent, userProfile, user, dailyChallenge, quest } from "../db/schema";
import { protectedProcedure, publicProcedure } from "../lib/orpc";

export const communityRouter = {
  // Get community events
  getEvents: publicProcedure
    .input(z.object({
      status: z.enum(['upcoming', 'live', 'completed']).optional(),
      limit: z.number().default(10),
      offset: z.number().default(0),
    }))
    .handler(async ({ input }) => {
      const { status, limit, offset } = input;
      
      let whereConditions = [eq(communityEvent.isActive, true)];
      
      if (status) {
        whereConditions.push(eq(communityEvent.status, status));
      }
      
      const events = await db
        .select()
        .from(communityEvent)
        .where(and(...whereConditions))
        .orderBy(desc(communityEvent.createdAt))
        .limit(limit)
        .offset(offset);
      
      return events;
    }),

  // Get PvP leaderboard
  getPvPLeaderboard: publicProcedure
    .input(z.object({
      limit: z.number().default(50),
      offset: z.number().default(0),
    }))
    .handler(async ({ input }) => {
      const { limit, offset } = input;
      
      const leaderboard = await db
        .select({
          userId: userProfile.userId,
          name: user.name,
          characterClass: userProfile.characterClass,
          level: userProfile.level,
          pvpRating: userProfile.pvpRating,
          problemsSolved: userProfile.problemsSolved,
          rank: sql<number>`ROW_NUMBER() OVER (ORDER BY ${userProfile.pvpRating} DESC)`,
        })
        .from(userProfile)
        .innerJoin(user, eq(userProfile.userId, user.id))
        .orderBy(desc(userProfile.pvpRating))
        .limit(limit)
        .offset(offset);
      
      return leaderboard;
    }),

  // Get class-specific leaderboard
  getClassLeaderboard: publicProcedure
    .input(z.object({
      characterClass: z.enum(['array-knight', 'dynamic-mage', 'graph-assassin', 'greedy-ronin', 'bit-sage']),
      limit: z.number().default(50),
      offset: z.number().default(0),
    }))
    .handler(async ({ input }) => {
      const { characterClass, limit, offset } = input;
      
      const leaderboard = await db
        .select({
          userId: userProfile.userId,
          name: user.name,
          characterClass: userProfile.characterClass,
          level: userProfile.level,
          problemsSolved: userProfile.problemsSolved,
          accuracy: userProfile.accuracy,
          rank: sql<number>`ROW_NUMBER() OVER (ORDER BY ${userProfile.problemsSolved} DESC)`,
        })
        .from(userProfile)
        .innerJoin(user, eq(userProfile.userId, user.id))
        .where(eq(userProfile.characterClass, characterClass))
        .orderBy(desc(userProfile.problemsSolved))
        .limit(limit)
        .offset(offset);
      
      return leaderboard;
    }),

  // Get top performers across all classes
  getTopPerformers: publicProcedure
    .input(z.object({
      limit: z.number().default(10),
    }))
    .handler(async ({ input }) => {
      const { limit } = input;
      
      const topPerformers = await db
        .select({
          userId: userProfile.userId,
          name: user.name,
          characterClass: userProfile.characterClass,
          level: userProfile.level,
          problemsSolved: userProfile.problemsSolved,
          pvpRating: userProfile.pvpRating,
          accuracy: userProfile.accuracy,
          currentStreak: userProfile.currentStreak,
        })
        .from(userProfile)
        .innerJoin(user, eq(userProfile.userId, user.id))
        .orderBy(
          desc(userProfile.level),
          desc(userProfile.problemsSolved),
          desc(userProfile.pvpRating)
        )
        .limit(limit);
      
      return topPerformers;
    }),

  // Get architect spotlight (featured user)
  getArchitectSpotlight: publicProcedure.handler(async () => {
    // Get a high-performing user to spotlight
    const spotlight = await db
      .select({
        userId: userProfile.userId,
        name: user.name,
        characterClass: userProfile.characterClass,
        level: userProfile.level,
        problemsSolved: userProfile.problemsSolved,
        pvpRating: userProfile.pvpRating,
        accuracy: userProfile.accuracy,
        currentStreak: userProfile.currentStreak,
        title: userProfile.title,
      })
      .from(userProfile)
      .innerJoin(user, eq(userProfile.userId, user.id))
      .where(sql`${userProfile.level} >= 10`)
      .orderBy(desc(userProfile.problemsSolved))
      .limit(1);
    
    if (spotlight.length === 0) {
      return null;
    }
    
    return spotlight[0];
  }),

  // Get daily bounty (challenge)
  getDailyBounty: publicProcedure.handler(async () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const dailyBounty = await db
      .select({
        quest: quest,
        bonusExperience: dailyChallenge.bonusExperience,
        specialReward: dailyChallenge.specialReward,
        completionCount: dailyChallenge.completionCount,
      })
      .from(dailyChallenge)
      .innerJoin(quest, eq(dailyChallenge.questId, quest.id))
      .where(eq(dailyChallenge.date, today))
      .limit(1);
    
    if (dailyBounty.length === 0) {
      return null;
    }
    
    return {
      title: dailyBounty[0].quest.title,
      description: dailyBounty[0].quest.description,
      difficulty: dailyBounty[0].quest.difficulty,
      experienceReward: dailyBounty[0].quest.experienceReward + dailyBounty[0].bonusExperience,
      specialReward: dailyBounty[0].specialReward,
      completionCount: dailyBounty[0].completionCount,
    };
  }),

  // Create or update community event (admin only - you'd add auth for this)
  createEvent: protectedProcedure
    .input(z.object({
      title: z.string().min(1),
      description: z.string().min(1),
      eventType: z.string(),
      status: z.enum(['upcoming', 'live', 'completed']).default('upcoming'),
      startDate: z.date().optional(),
      endDate: z.date().optional(),
      rewards: z.record(z.string(), z.any()).optional(),
    }))
    .handler(async ({ input }) => {
      const newEvent = await db
        .insert(communityEvent)
        .values({
          title: input.title,
          description: input.description,
          eventType: input.eventType,
          status: input.status,
          startDate: input.startDate,
          endDate: input.endDate,
          rewards: input.rewards || {},
        })
        .returning();
      
      return newEvent[0];
    }),

  // Get user's community statistics
  getCommunityStats: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session!.user.id;
    
    // Get user's profile and ranking
    const userProfile_data = await db
      .select()
      .from(userProfile)
      .where(eq(userProfile.userId, userId))
      .limit(1);
    
    if (userProfile_data.length === 0) {
      throw new Error('User profile not found');
    }
    
    const profile = userProfile_data[0];
    
    // Calculate global rank
    const globalRank = await db
      .select({ count: sql<number>`count(*)` })
      .from(userProfile)
      .where(sql`${userProfile.problemsSolved} > ${profile.problemsSolved}`);
    
    // Calculate class rank
    const classRank = await db
      .select({ count: sql<number>`count(*)` })
      .from(userProfile)
      .where(
        and(
          profile.characterClass ? eq(userProfile.characterClass, profile.characterClass) : sql`1=1`,
          sql`${userProfile.problemsSolved} > ${profile.problemsSolved}`
        )
      );
    
    // Get total users for percentage calculations
    const totalUsers = await db
      .select({ count: sql<number>`count(*)` })
      .from(userProfile);
    
    const totalClassUsers = await db
      .select({ count: sql<number>`count(*)` })
      .from(userProfile)
      .where(profile.characterClass ? eq(userProfile.characterClass, profile.characterClass) : sql`1=1`);
    
    return {
      globalRank: (globalRank[0]?.count || 0) + 1,
      classRank: (classRank[0]?.count || 0) + 1,
      globalPercentile: Math.round(((totalUsers[0]?.count || 1) - (globalRank[0]?.count || 0)) / (totalUsers[0]?.count || 1) * 100),
      classPercentile: Math.round(((totalClassUsers[0]?.count || 1) - (classRank[0]?.count || 0)) / (totalClassUsers[0]?.count || 1) * 100),
      totalUsers: totalUsers[0]?.count || 0,
      totalClassUsers: totalClassUsers[0]?.count || 0,
    };
  }),

  // Get community activity feed
  getActivityFeed: publicProcedure
    .input(z.object({
      limit: z.number().default(20),
    }))
    .handler(async ({ input }) => {
      const { limit } = input;
      
      // This would be more complex in a real implementation
      // For now, return recent events and achievements
      const recentEvents = await db
        .select({
          id: communityEvent.id,
          title: communityEvent.title,
          description: communityEvent.description,
          eventType: communityEvent.eventType,
          status: communityEvent.status,
          createdAt: communityEvent.createdAt,
          type: sql<string>`'event'`,
        })
        .from(communityEvent)
        .where(eq(communityEvent.isActive, true))
        .orderBy(desc(communityEvent.createdAt))
        .limit(limit);
      
      return recentEvents;
    }),
};
