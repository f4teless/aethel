import { boolean, integer, pgEnum, pgTable, text, timestamp, uuid, real, jsonb, index, uniqueIndex } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const characterClassEnum = pgEnum('character_class', [
  'array-knight',
  'dynamic-mage',
  'graph-assassin',
  'greedy-ronin',
  'bit-sage',
  'branch-walker',
  'stack-sentinel',
  'priority-keeper'
]);

export const questStatusEnum = pgEnum('quest_status', [
  'locked',
  'available', 
  'in-progress',
  'completed'
]);

export const questTypeEnum = pgEnum('quest_type', [
  'story-quest',
  'side-quest',
  'daily-challenge',
  'dungeon',
]);

export const difficultyEnum = pgEnum('difficulty', [
  'easy',
  'medium', 
  'hard',
  'expert',
  'legendary',
  'mythic'
]);

export const achievementTypeEnum = pgEnum('achievement_type', [
  'progress',
  'streak',
  'class-mastery',
  'special',
  'community'
]);

export const equipmentTypeEnum = pgEnum('equipment_type', [
  'weapon',
  'armor',
  'accessory',
  'consumable',
  'artifact'
]);

export const rarityEnum = pgEnum('rarity', [
  'common',
  'uncommon', 
  'rare',
  'epic',
  'legendary'
]);

export const userProfile = pgTable("user_profile", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .unique(),
  
  characterClass: characterClassEnum("character_class"),
  level: integer("level").default(1).notNull(),
  experience: integer("experience").default(0).notNull(),
  
  currentHp: integer("current_hp").default(100).notNull(),
  currentMp: integer("current_mp").default(60).notNull(),

  lastMpRegen: timestamp("last_mp_regen").defaultNow().notNull(),
  lastHpUpdate: timestamp("last_hp_update").defaultNow().notNull(),
  
  currentChapter: integer("current_chapter").default(1).notNull(),
  currentLayer: integer("current_layer").default(1).notNull(),
  storyProgress: jsonb("story_progress"),
  
  questsCompleted: integer("quests_completed").default(0).notNull(),
  problemsSolved: integer("problems_solved").default(0).notNull(),
  problemsSolvedToday: integer("problems_solved_today").default(0).notNull(),
  problemsAttemptedToday: integer("problems_attempted_today").default(0).notNull(),
  currentStreak: integer("current_streak").default(0).notNull(),
  longestStreak: integer("longest_streak").default(0).notNull(),
  
  pvpRating: integer("pvp_rating").default(0).notNull(),
  classRanking: integer("class_ranking").default(9999).notNull(),
  globalRanking: integer("global_ranking").default(9999).notNull(),
  
  title: text("title").default("Novice Architect"),
  backstory: text("backstory").default("A budding architect with a passion for problem-solving."),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("user_profile_user_id_idx").on(table.userId),
  index("user_profile_level_idx").on(table.level),
  index("user_profile_class_ranking_idx").on(table.characterClass, table.classRanking),
  index("user_profile_global_ranking_idx").on(table.globalRanking),
  index("user_profile_current_chapter_idx").on(table.currentChapter),
  index("user_profile_current_layer_idx").on(table.currentLayer),
  index("user_profile_class_level_idx").on(table.characterClass, table.level),
]);

export const quest = pgTable("quest", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: questTypeEnum("type").notNull(),
  difficulty: difficultyEnum("difficulty").notNull(),
  
  questNumber: integer("quest_number").notNull().unique(),
  isAutoUnlocked: boolean("is_auto_unlocked").default(false).notNull(),
  
  requiredLevel: integer("required_level").default(1).notNull(),
  experienceReward: integer("experience_reward").default(0).notNull(),
  specialReward: text("special_reward"),
  
  storyChapter: integer("story_chapter"),
  narrativeContext: text("narrative_context"),
  
  problemData: jsonb("problem_data"), 
  
  timeLimit: integer("time_limit_minutes").default(30).notNull(), 
  
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  index("quest_number_idx").on(table.questNumber),
  index("quest_type_difficulty_idx").on(table.type, table.difficulty),
  index("quest_required_level_idx").on(table.requiredLevel),
  index("quest_story_chapter_idx").on(table.storyChapter),
  index("quest_is_active_idx").on(table.isActive),
  index("quest_auto_unlocked_idx").on(table.isAutoUnlocked),
]);

export const userQuest = pgTable("user_quest", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  questId: uuid("quest_id")
    .notNull()
    .references(() => quest.id, { onDelete: "cascade" }),
  
  status: questStatusEnum("status").default('available').notNull(),
  progress: integer("progress").default(0).notNull(),
  attemptsCount: integer("attempts_count").default(0).notNull(),
  hintsUsed: integer("hints_used").default(0).notNull(),
  
  totalTimeSpent: integer("total_time_spent_seconds").default(0).notNull(),
  
  lastSubmission: text("last_submission"),
  timeCompleted: timestamp("time_completed"),

  mpUsedDuringQuest: integer("mp_used_during_quest").default(0).notNull(),

  startedAt: timestamp("started_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("user_quest_unique").on(table.userId, table.questId),
  index("user_quest_user_id_status_idx").on(table.userId, table.status),
  index("user_quest_quest_id_idx").on(table.questId),
  index("user_quest_time_completed_idx").on(table.timeCompleted),
]);

export const achievement = pgTable("achievement", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  type: achievementTypeEnum("type").notNull(),
  icon: text("icon").notNull(),
  
  requirements: jsonb("requirements"), 
  experienceReward: integer("experience_reward").default(0).notNull(),
  specialReward: text("special_reward"),
  
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userAchievement = pgTable("user_achievement", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  achievementId: uuid("achievement_id")
    .notNull()
    .references(() => achievement.id, { onDelete: "cascade" }),
  
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
  progress: integer("progress").default(0).notNull(), 
}, (table) => [
  uniqueIndex("user_achievement_unique").on(table.userId, table.achievementId),
  index("user_achievement_user_id_idx").on(table.userId),
  index("user_achievement_unlocked_at_idx").on(table.unlockedAt),
]);

export const equipment = pgTable("equipment", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  type: equipmentTypeEnum("type").notNull(),
  icon: text("icon").notNull(),
  description: text("description"),

  statsBonus: jsonb("stats_bonus"),
  requirements: jsonb("requirements"),

  rarity: rarityEnum("rarity").default('common').notNull(),
  value: integer("value").default(0).notNull(),
  
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
}, (table) => [
  index("equipment_type_rarity_idx").on(table.type, table.rarity),
  index("equipment_is_active_idx").on(table.isActive),
]);

export const userEquipment = pgTable("user_equipment", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  equipmentId: uuid("equipment_id")
    .notNull()
    .references(() => equipment.id, { onDelete: "cascade" }),
  
  isEquipped: boolean("is_equipped").default(false).notNull(),
  acquiredAt: timestamp("acquired_at").defaultNow().notNull(),
}, (table) => [
  uniqueIndex("user_equipment_unique").on(table.userId, table.equipmentId),
  index("user_equipment_user_id_idx").on(table.userId),
  index("user_equipment_is_equipped_idx").on(table.userId, table.isEquipped),
]);

export const communityEvent = pgTable("community_event", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  status: text("status").default('upcoming').notNull(),
  
  eventType: text("event_type").notNull(), 
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  
  rewards: jsonb("rewards"),
  participantCount: integer("participant_count").default(0),
  
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const dailyChallenge = pgTable("daily_challenge", {
  id: uuid("id").defaultRandom().primaryKey(),
  date: timestamp("date").notNull().unique(),
  questId: uuid("quest_id")
    .notNull()
    .references(() => quest.id, { onDelete: "cascade" }),
  
  bonusExperience: integer("bonus_experience").default(0).notNull(),
  specialReward: text("special_reward"),
  
  completionCount: integer("completion_count").default(0).notNull(),
  
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const userStats = pgTable("user_stats", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" })
    .unique(),
  
  averageProblemTime: integer("average_problem_time").default(0).notNull(), 
  favoriteTopics: jsonb("favorite_topics"),
  
  easyProblems: integer("easy_problems").default(0).notNull(),
  mediumProblems: integer("medium_problems").default(0).notNull(),
  hardProblems: integer("hard_problems").default(0).notNull(),
  
  loginStreak: integer("login_streak").default(0).notNull(),
  lastActiveDate: timestamp("last_active_date"),
  totalLogins: integer("total_logins").default(0).notNull(),
  
  submissionCount: integer("submission_count").default(0).notNull(),
  successfulSubmissions: integer("successful_submissions").default(0).notNull(),
  
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type UserProfile = typeof userProfile.$inferSelect;
export type Quest = typeof quest.$inferSelect;
export type UserQuest = typeof userQuest.$inferSelect;
export type Achievement = typeof achievement.$inferSelect;
export type UserAchievement = typeof userAchievement.$inferSelect;
export type Equipment = typeof equipment.$inferSelect;
export type UserEquipment = typeof userEquipment.$inferSelect;
export type CommunityEvent = typeof communityEvent.$inferSelect;
export type DailyChallenge = typeof dailyChallenge.$inferSelect;
export type UserStats = typeof userStats.$inferSelect;
