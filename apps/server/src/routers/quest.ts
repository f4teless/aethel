import { eq, and, desc, sql } from "drizzle-orm";
import z from "zod";
import { db } from "../db";
import { quest, userQuest, userProfile, dailyChallenge } from "../db/schema";
import { protectedProcedure, publicProcedure } from "../lib/orpc";

export const questRouter = {
  // Get all available quests for the current user
  getAvailableQuests: protectedProcedure
    .input(z.object({
      type: z.enum(['story-quest', 'class-quest', 'daily-challenge', 'dungeon', 'achievement-quest']).optional(),
      limit: z.number().default(20),
      offset: z.number().default(0),
    }))
    .handler(async ({ input, context }) => {
      const userId = context.session!.user.id;
      const { type, limit, offset } = input;
      
      // Get user profile to check level and class requirements
      const profile = await db
        .select()
        .from(userProfile)
        .where(eq(userProfile.userId, userId))
        .limit(1);
      
      if (profile.length === 0) {
        throw new Error('User profile not found');
      }
      
      const userLevel = profile[0].level;
      const userClass = profile[0].characterClass;
      
      // Build base query conditions
      let whereConditions = [
        eq(quest.isActive, true),
        sql`${quest.requiredLevel} <= ${userLevel}`,
        // Class requirement check - null means no class requirement
      ];
      
      // Add type filter if specified and supported by schema
      const supportedTypes = ['story-quest', 'side-quest', 'daily-challenge', 'dungeon'] as const;
      if (type && supportedTypes.includes(type as any)) {
        whereConditions.push(eq(quest.type, type as typeof supportedTypes[number]));
      }
      
      const results = await db
        .select({
          quest: quest,
          userProgress: {
            status: userQuest.status,
            progress: userQuest.progress,
            attemptsCount: userQuest.attemptsCount,
            timeCompleted: userQuest.timeCompleted,
          }
        })
        .from(quest)
        .leftJoin(userQuest, and(
          eq(userQuest.questId, quest.id),
          eq(userQuest.userId, userId)
        ))
        .where(and(...whereConditions))
        .orderBy(quest.requiredLevel, quest.createdAt)
        .limit(limit)
        .offset(offset);
      
      return results.map(result => ({
        ...result.quest,
        userProgress: result.userProgress,
      }));
    }),

  // Get user's active quests
  getActiveQuests: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session!.user.id;
    
    const activeQuests = await db
      .select({
        quest: quest,
        progress: userQuest.progress,
        status: userQuest.status,
        attemptsCount: userQuest.attemptsCount,
        startedAt: userQuest.startedAt,
        updatedAt: userQuest.updatedAt,
      })
      .from(userQuest)
      .innerJoin(quest, eq(userQuest.questId, quest.id))
      .where(
        and(
          eq(userQuest.userId, userId),
          eq(userQuest.status, 'in-progress')
        )
      )
      .orderBy(desc(userQuest.updatedAt));
    
    return activeQuests;
  }),

  // Start a quest
  startQuest: protectedProcedure
    .input(z.object({
      questId: z.string().uuid(),
    }))
    .handler(async ({ input, context }) => {
      const userId = context.session!.user.id;
      const { questId } = input;
      
      // Check if user already has this quest
      const existingQuest = await db
        .select()
        .from(userQuest)
        .where(
          and(
            eq(userQuest.userId, userId),
            eq(userQuest.questId, questId)
          )
        )
        .limit(1);
      
      if (existingQuest.length > 0) {
        // Update existing quest status
        const updated = await db
          .update(userQuest)
          .set({
            status: 'in-progress',
            updatedAt: new Date(),
          })
          .where(
            and(
              eq(userQuest.userId, userId),
              eq(userQuest.questId, questId)
            )
          )
          .returning();
        
        return updated[0];
      }
      
      // Create new quest progress
      const newQuest = await db
        .insert(userQuest)
        .values({
          userId,
          questId,
          status: 'in-progress',
          progress: 0,
        })
        .returning();
      
      return newQuest[0];
    }),

  // Submit quest solution
  submitSolution: protectedProcedure
    .input(z.object({
      questId: z.string().uuid(),
      solution: z.string(),
      timeTaken: z.number().optional(), // in seconds
    }))
    .handler(async ({ input, context }) => {
      const userId = context.session!.user.id;
      const { questId, solution, timeTaken } = input;
      
      // Get quest details
      const questDetails = await db
        .select()
        .from(quest)
        .where(eq(quest.id, questId))
        .limit(1);
      
      if (questDetails.length === 0) {
        throw new Error('Quest not found');
      }
      
      // Get or create user quest progress
      let userQuestRecord = await db
        .select()
        .from(userQuest)
        .where(
          and(
            eq(userQuest.userId, userId),
            eq(userQuest.questId, questId)
          )
        )
        .limit(1);
      
      if (userQuestRecord.length === 0) {
        // Create new record
        const newRecord = await db
          .insert(userQuest)
          .values({
            userId,
            questId,
            status: 'in-progress',
            progress: 0,
          })
          .returning();
        userQuestRecord = newRecord;
      }
      
      // TODO: Implement solution validation logic here
      // For now, we'll assume all solutions are correct
      const isCorrect = true; // This should be replaced with actual validation
      
      const updatedQuest = await db
        .update(userQuest)
        .set({
          status: isCorrect ? 'completed' : 'in-progress',
          progress: isCorrect ? 100 : userQuestRecord[0].progress,
          attemptsCount: userQuestRecord[0].attemptsCount + 1,
          lastSubmission: solution,
          timeCompleted: isCorrect ? new Date() : userQuestRecord[0].timeCompleted,
          updatedAt: new Date(),
        })
        .where(
          and(
            eq(userQuest.userId, userId),
            eq(userQuest.questId, questId)
          )
        )
        .returning();
      
      // If quest completed, update user stats and add experience
      if (isCorrect) {
        await db
          .update(userProfile)
          .set({
            questsCompleted: sql`${userProfile.questsCompleted} + 1`,
            problemsSolved: sql`${userProfile.problemsSolved} + 1`,
            experience: sql`${userProfile.experience} + ${questDetails[0].experienceReward}`,
            updatedAt: new Date(),
          })
          .where(eq(userProfile.userId, userId));
      }
      
      return {
        ...updatedQuest[0],
        isCorrect,
        experienceGained: isCorrect ? questDetails[0].experienceReward : 0,
      };
    }),

  // Get quest details by ID
  getQuestById: protectedProcedure
    .input(z.object({
      questId: z.string().uuid(),
    }))
    .handler(async ({ input, context }) => {
      const userId = context.session!.user.id;
      const { questId } = input;
      
      const questData = await db
        .select({
          quest: quest,
          userProgress: {
            status: userQuest.status,
            progress: userQuest.progress,
            attemptsCount: userQuest.attemptsCount,
            lastSubmission: userQuest.lastSubmission,
            timeCompleted: userQuest.timeCompleted,
          }
        })
        .from(quest)
        .leftJoin(userQuest, and(
          eq(userQuest.questId, quest.id),
          eq(userQuest.userId, userId)
        ))
        .where(eq(quest.id, questId))
        .limit(1);
      
      if (questData.length === 0) {
        throw new Error('Quest not found');
      }
      
      return {
        ...questData[0].quest,
        userProgress: questData[0].userProgress,
      };
    }),

  // Get daily challenge
  getDailyChallenge: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session!.user.id;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of day
    
    const dailyQuest = await db
      .select({
        dailyChallenge: dailyChallenge,
        quest: quest,
        userProgress: {
          status: userQuest.status,
          progress: userQuest.progress,
          timeCompleted: userQuest.timeCompleted,
        }
      })
      .from(dailyChallenge)
      .innerJoin(quest, eq(dailyChallenge.questId, quest.id))
      .leftJoin(userQuest, and(
        eq(userQuest.questId, quest.id),
        eq(userQuest.userId, userId)
      ))
      .where(eq(dailyChallenge.date, today))
      .limit(1);
    
    if (dailyQuest.length === 0) {
      return null; // No daily challenge for today
    }
    
    return {
      ...dailyQuest[0].quest,
      dailyBonus: dailyQuest[0].dailyChallenge.bonusExperience,
      specialReward: dailyQuest[0].dailyChallenge.specialReward,
      userProgress: dailyQuest[0].userProgress,
    };
  }),

  // Get quest statistics
  getQuestStats: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session!.user.id;
    
    const stats = await db
      .select({
        totalQuests: sql<number>`count(*)`,
        completedQuests: sql<number>`count(case when ${userQuest.status} = 'completed' then 1 end)`,
        inProgressQuests: sql<number>`count(case when ${userQuest.status} = 'in-progress' then 1 end)`,
        averageAttempts: sql<number>`avg(${userQuest.attemptsCount})`,
      })
      .from(userQuest)
      .where(eq(userQuest.userId, userId));
    
    return stats[0];
  }),
};
