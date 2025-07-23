import { eq, and, desc, sql } from "drizzle-orm";
import z from "zod";
import { db } from "../db";
import { achievement, userAchievement, userProfile, user } from "../db/schema";
import { protectedProcedure } from "../lib/orpc";

export const achievementRouter = {
  // Get all achievements with user progress
  getAllAchievements: protectedProcedure
    .input(z.object({
      type: z.enum(['progress', 'streak', 'class-mastery', 'special', 'community']).optional(),
      limit: z.number().default(50),
      offset: z.number().default(0),
    }))
    .handler(async ({ input, context }) => {
      const userId = context.session!.user.id;
      const { type, limit, offset } = input;
      
      let whereConditions = [eq(achievement.isActive, true)];
      
      if (type) {
        whereConditions.push(eq(achievement.type, type));
      }
      
      const achievements = await db
        .select({
          achievement: achievement,
          userProgress: {
            progress: userAchievement.progress,
            unlockedAt: userAchievement.unlockedAt,
            isUnlocked: sql<boolean>`${userAchievement.id} IS NOT NULL`,
          }
        })
        .from(achievement)
        .leftJoin(userAchievement, and(
          eq(userAchievement.achievementId, achievement.id),
          eq(userAchievement.userId, userId)
        ))
        .where(and(...whereConditions))
        .orderBy(desc(userAchievement.unlockedAt), achievement.name)
        .limit(limit)
        .offset(offset);
      
      return achievements.map(result => ({
        ...result.achievement,
        userProgress: result.userProgress,
      }));
    }),

  // Get user's unlocked achievements
  getUnlockedAchievements: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session!.user.id;
    
    const unlockedAchievements = await db
      .select({
        achievement: achievement,
        unlockedAt: userAchievement.unlockedAt,
        progress: userAchievement.progress,
      })
      .from(userAchievement)
      .innerJoin(achievement, eq(userAchievement.achievementId, achievement.id))
      .where(eq(userAchievement.userId, userId))
      .orderBy(desc(userAchievement.unlockedAt));
    
    return unlockedAchievements;
  }),

  // Get recent achievements (last 10)
  getRecentAchievements: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session!.user.id;
    
    const recentAchievements = await db
      .select({
        achievement: achievement,
        unlockedAt: userAchievement.unlockedAt,
      })
      .from(userAchievement)
      .innerJoin(achievement, eq(userAchievement.achievementId, achievement.id))
      .where(eq(userAchievement.userId, userId))
      .orderBy(desc(userAchievement.unlockedAt))
      .limit(10);
    
    return recentAchievements;
  }),

  // Unlock an achievement (internal use)
  unlockAchievement: protectedProcedure
    .input(z.object({
      achievementId: z.string().uuid(),
      progress: z.number().default(100),
    }))
    .handler(async ({ input, context }) => {
      const userId = context.session!.user.id;
      const { achievementId, progress } = input;
      
      // Check if achievement is already unlocked
      const existing = await db
        .select()
        .from(userAchievement)
        .where(
          and(
            eq(userAchievement.userId, userId),
            eq(userAchievement.achievementId, achievementId)
          )
        )
        .limit(1);
      
      if (existing.length > 0) {
        // Update progress if not fully unlocked
        if (existing[0].progress < 100) {
          const updated = await db
            .update(userAchievement)
            .set({ progress: Math.min(progress, 100) })
            .where(
              and(
                eq(userAchievement.userId, userId),
                eq(userAchievement.achievementId, achievementId)
              )
            )
            .returning();
          
          return updated[0];
        }
        
        return existing[0];
      }
      
      // Get achievement details for rewards
      const achievementDetails = await db
        .select()
        .from(achievement)
        .where(eq(achievement.id, achievementId))
        .limit(1);
      
      if (achievementDetails.length === 0) {
        throw new Error('Achievement not found');
      }
      
      // Create new achievement unlock
      const newAchievement = await db
        .insert(userAchievement)
        .values({
          userId,
          achievementId,
          progress,
        })
        .returning();
      
      // Award experience if achievement is fully unlocked
      if (progress >= 100 && achievementDetails[0].experienceReward > 0) {
        await db
          .update(userProfile)
          .set({
            experience: sql`${userProfile.experience} + ${achievementDetails[0].experienceReward}`,
            updatedAt: new Date(),
          })
          .where(eq(userProfile.userId, userId));
      }
      
      return {
        ...newAchievement[0],
        experienceGained: progress >= 100 ? achievementDetails[0].experienceReward : 0,
        achievement: achievementDetails[0],
      };
    }),

  // Check and update achievement progress
  checkAchievementProgress: protectedProcedure
    .input(z.object({
      type: z.enum(['quest_completed', 'streak_maintained', 'level_up', 'class_mastery']),
      value: z.number(),
      metadata: z.record(z.string(), z.any()).optional(),
    }))
    .handler(async ({ input, context }) => {
      const userId = context.session!.user.id;
      const { type, value, metadata } = input;
      
      // Get user profile for context
      const profile = await db
        .select()
        .from(userProfile)
        .where(eq(userProfile.userId, userId))
        .limit(1);
      
      if (profile.length === 0) {
        throw new Error('User profile not found');
      }
      
      // Define achievement triggers based on type
      const triggers: Record<string, any> = {
        quest_completed: {
          'first-victory': profile[0].questsCompleted === 1,
          'quest-master': profile[0].questsCompleted >= 10,
          'legendary-architect': profile[0].questsCompleted >= 100,
        },
        streak_maintained: {
          'streak-starter': profile[0].currentStreak >= 3,
          'streak-master': profile[0].currentStreak >= 7,
          'unstoppable': profile[0].currentStreak >= 30,
        },
        level_up: {
          'rising-star': profile[0].level >= 5,
          'experienced-coder': profile[0].level >= 20,
          'master-architect': profile[0].level >= 50,
        },
      };
      
      const triggeredAchievements = [];
      
      // Check for triggered achievements
      for (const [achievementKey, condition] of Object.entries(triggers[type] || {})) {
        if (condition) {
          // Find achievement by name/key (you'd need to implement this mapping)
          const matchingAchievement = await db
            .select()
            .from(achievement)
            .where(sql`lower(${achievement.name}) LIKE ${`%${achievementKey.replace('-', ' ')}%`}`)
            .limit(1);
          
          if (matchingAchievement.length > 0) {
            // Call unlockAchievement directly with proper parameters
            const unlockResult = await db
              .insert(userAchievement)
              .values({
                userId,
                achievementId: matchingAchievement[0].id,
                progress: 100,
              })
              .onConflictDoNothing()
              .returning();
            
            if (unlockResult.length > 0) {
              triggeredAchievements.push({
                ...unlockResult[0],
                achievement: matchingAchievement[0],
              });
            }
          }
        }
      }
      
      return triggeredAchievements;
    }),

  // Get achievement statistics
  getAchievementStats: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session!.user.id;
    
    const stats = await db
      .select({
        totalAchievements: sql<number>`count(*)`,
        unlockedAchievements: sql<number>`count(${userAchievement.id})`,
        completionPercentage: sql<number>`
          round(
            (count(${userAchievement.id})::decimal / count(*)::decimal) * 100, 
            2
          )
        `,
      })
      .from(achievement)
      .leftJoin(userAchievement, and(
        eq(userAchievement.achievementId, achievement.id),
        eq(userAchievement.userId, userId)
      ))
      .where(eq(achievement.isActive, true));
    
    return stats[0];
  }),
};
