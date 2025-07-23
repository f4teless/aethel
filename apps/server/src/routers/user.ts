import { eq, desc, sql } from "drizzle-orm";
import z from "zod";
import { db } from "../db";
import { userProfile, userStats, user } from "../db/schema";
import { protectedProcedure } from "../lib/orpc";

export const userRouter = {
  // Get current user's profile
  getProfile: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session!.user.id;
    
    const profile = await db
      .select()
      .from(userProfile)
      .where(eq(userProfile.userId, userId))
      .limit(1);
    
    if (profile.length === 0) {
      // Create default profile for new user
      const newProfile = await db
        .insert(userProfile)
        .values({
          userId,
          characterClass: 'array-knight',
          level: 1,
          experience: 0,
        })
        .returning();
      
      return newProfile[0];
    }
    
    return profile[0];
  }),

  // Update user profile
  updateProfile: protectedProcedure
    .input(z.object({
      characterClass: z.enum(['array-knight', 'dynamic-mage', 'graph-assassin', 'greedy-ronin', 'bit-sage']).optional(),
      title: z.string().optional(),
      backstory: z.string().optional(),
      avatar: z.string().optional(),
    }))
    .handler(async ({ input, context }) => {
      const userId = context.session!.user.id;
      
      const updated = await db
        .update(userProfile)
        .set({
          ...input,
          updatedAt: new Date(),
        })
        .where(eq(userProfile.userId, userId))
        .returning();
      
      return updated[0];
    }),

  // Get user statistics
  getStats: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session!.user.id;
    
    const stats = await db
      .select()
      .from(userStats)
      .where(eq(userStats.userId, userId))
      .limit(1);
    
    if (stats.length === 0) {
      // Create default stats for new user
      const newStats = await db
        .insert(userStats)
        .values({
          userId,
        })
        .returning();
      
      return newStats[0];
    }
    
    return stats[0];
  }),

  // Get leaderboard data
  getLeaderboard: protectedProcedure
    .input(z.object({
      type: z.enum(['pvp', 'class']),
      characterClass: z.enum(['array-knight', 'dynamic-mage', 'graph-assassin', 'greedy-ronin', 'bit-sage']).optional(),
      limit: z.number().default(50),
      offset: z.number().default(0),
    }))
    .handler(async ({ input }) => {
      const { type, characterClass, limit, offset } = input;
      
      const baseQuery = db
        .select({
          userId: userProfile.userId,
          name: user.name,
          characterClass: userProfile.characterClass,
          level: userProfile.level,
          score: type === 'pvp' ? userProfile.pvpRating : userProfile.problemsSolved,
          ranking: type === 'pvp' ? userProfile.globalRanking : userProfile.classRanking,
        })
        .from(userProfile)
        .innerJoin(user, eq(userProfile.userId, user.id));
      
      // Apply class filter if needed
      const filteredQuery = type === 'class' && characterClass 
        ? baseQuery.where(eq(userProfile.characterClass, characterClass))
        : baseQuery;
      
      const orderColumn = type === 'pvp' ? userProfile.pvpRating : userProfile.problemsSolved;
      
      const results = await filteredQuery
        .orderBy(desc(orderColumn))
        .limit(limit)
        .offset(offset);
      
      return results;
    }),

  // Update user experience and level
  addExperience: protectedProcedure
    .input(z.object({
      experience: z.number().min(1),
      source: z.string(), // quest completion, achievement, etc.
    }))
    .handler(async ({ input, context }) => {
      const userId = context.session!.user.id;
      const { experience, source } = input;
      
      // Get current profile
      const currentProfile = await db
        .select()
        .from(userProfile)
        .where(eq(userProfile.userId, userId))
        .limit(1);
      
      if (currentProfile.length === 0) {
        throw new Error('User profile not found');
      }
      
      const profile = currentProfile[0];
      let newExperience = profile.experience + experience;
      let newLevel = profile.level;
      
      const updated = await db
        .update(userProfile)
        .set({
          experience: newExperience,
          level: newLevel,
          updatedAt: new Date(),
        })
        .where(eq(userProfile.userId, userId))
        .returning();
      
      return {
        ...updated[0],
        experienceGained: experience,
        leveledUp: newLevel > profile.level,
        source,
      };
    }),

  // Get user's rank and position
  getUserRank: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session!.user.id;
    
    // Get global rank based on total problems solved
    const globalRank = await db
      .select({ count: sql<number>`count(*)` })
      .from(userProfile)
      .where(sql`${userProfile.problemsSolved} > (
        SELECT ${userProfile.problemsSolved} 
        FROM ${userProfile} 
        WHERE ${userProfile.userId} = ${userId}
      )`);
    
    // Get class rank
    const userClass = await db
      .select({ characterClass: userProfile.characterClass })
      .from(userProfile)
      .where(eq(userProfile.userId, userId))
      .limit(1);
    
    if (userClass.length === 0) {
      throw new Error('User profile not found');
    }
    
    const classRank = await db
      .select({ count: sql<number>`count(*)` })
      .from(userProfile)
      .where(sql`${userProfile.characterClass} = ${userClass[0].characterClass} 
        AND ${userProfile.problemsSolved} > (
          SELECT ${userProfile.problemsSolved} 
          FROM ${userProfile} 
          WHERE ${userProfile.userId} = ${userId}
        )`);
    
    return {
      globalRank: (globalRank[0]?.count || 0) + 1,
      classRank: (classRank[0]?.count || 0) + 1,
      characterClass: userClass[0].characterClass,
    };
  }),
};
