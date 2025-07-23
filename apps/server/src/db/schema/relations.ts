import { relations } from "drizzle-orm";
import { user, account, session, verification } from "./auth";
import { 
  userProfile, 
  quest, 
  userQuest, 
  achievement, 
  userAchievement, 
  equipment, 
  userEquipment, 
  userStats,
  dailyChallenge,
} from "./game";

// Auth Relations
export const userRelations = relations(user, ({ many, one }) => ({
  accounts: many(account),
  sessions: many(session),
  userProfile: one(userProfile, {
    fields: [user.id],
    references: [userProfile.userId],
  }),
  userQuests: many(userQuest),
  userAchievements: many(userAchievement),
  userEquipments: many(userEquipment),
  userStats: one(userStats, {
    fields: [user.id],
    references: [userStats.userId],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

// Game Relations
export const userProfileRelations = relations(userProfile, ({ one }) => ({
  user: one(user, {
    fields: [userProfile.userId],
    references: [user.id],
  }),
}));

export const questRelations = relations(quest, ({ many }) => ({
  userQuests: many(userQuest),
  dailyChallenges: many(dailyChallenge),
}));

export const userQuestRelations = relations(userQuest, ({ one }) => ({
  user: one(user, {
    fields: [userQuest.userId],
    references: [user.id],
  }),
  quest: one(quest, {
    fields: [userQuest.questId],
    references: [quest.id],
  }),
}));

export const achievementRelations = relations(achievement, ({ many }) => ({
  userAchievements: many(userAchievement),
}));

export const userAchievementRelations = relations(userAchievement, ({ one }) => ({
  user: one(user, {
    fields: [userAchievement.userId],
    references: [user.id],
  }),
  achievement: one(achievement, {
    fields: [userAchievement.achievementId],
    references: [achievement.id],
  }),
}));

export const equipmentRelations = relations(equipment, ({ many }) => ({
  userEquipments: many(userEquipment),
}));

export const userEquipmentRelations = relations(userEquipment, ({ one }) => ({
  user: one(user, {
    fields: [userEquipment.userId],
    references: [user.id],
  }),
  equipment: one(equipment, {
    fields: [userEquipment.equipmentId],
    references: [equipment.id],
  }),
}));

export const userStatsRelations = relations(userStats, ({ one }) => ({
  user: one(user, {
    fields: [userStats.userId],
    references: [user.id],
  }),
}));

export const dailyChallengeRelations = relations(dailyChallenge, ({ one }) => ({
  quest: one(quest, {
    fields: [dailyChallenge.questId],
    references: [quest.id],
  }),
}));
