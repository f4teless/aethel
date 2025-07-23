CREATE TYPE "public"."achievement_type" AS ENUM('progress', 'streak', 'class-mastery', 'special', 'community');--> statement-breakpoint
CREATE TYPE "public"."character_class" AS ENUM('array-knight', 'dynamic-mage', 'graph-assassin', 'greedy-ronin', 'bit-sage', 'branch-walker', 'stack-sentinel', 'priority-keeper');--> statement-breakpoint
CREATE TYPE "public"."difficulty" AS ENUM('easy', 'medium', 'hard', 'expert', 'legendary', 'mythic');--> statement-breakpoint
CREATE TYPE "public"."equipment_type" AS ENUM('weapon', 'armor', 'accessory', 'consumable', 'artifact');--> statement-breakpoint
CREATE TYPE "public"."quest_status" AS ENUM('locked', 'available', 'in-progress', 'completed');--> statement-breakpoint
CREATE TYPE "public"."quest_type" AS ENUM('story-quest', 'side-quest', 'daily-challenge', 'dungeon');--> statement-breakpoint
CREATE TYPE "public"."rarity" AS ENUM('common', 'uncommon', 'rare', 'epic', 'legendary');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "achievement" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"type" "achievement_type" NOT NULL,
	"icon" text NOT NULL,
	"requirements" jsonb,
	"experience_reward" integer DEFAULT 0 NOT NULL,
	"special_reward" text,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "community_event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" text DEFAULT 'upcoming' NOT NULL,
	"event_type" text NOT NULL,
	"start_date" timestamp,
	"end_date" timestamp,
	"rewards" jsonb,
	"participant_count" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "daily_challenge" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"date" timestamp NOT NULL,
	"quest_id" uuid NOT NULL,
	"bonus_experience" integer DEFAULT 0 NOT NULL,
	"special_reward" text,
	"completion_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "daily_challenge_date_unique" UNIQUE("date")
);
--> statement-breakpoint
CREATE TABLE "equipment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"type" "equipment_type" NOT NULL,
	"icon" text NOT NULL,
	"description" text,
	"stats_bonus" jsonb,
	"requirements" jsonb,
	"rarity" "rarity" DEFAULT 'common' NOT NULL,
	"value" integer DEFAULT 0 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quest" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"type" "quest_type" NOT NULL,
	"difficulty" "difficulty" NOT NULL,
	"quest_number" integer NOT NULL,
	"is_auto_unlocked" boolean DEFAULT false NOT NULL,
	"required_level" integer DEFAULT 1 NOT NULL,
	"experience_reward" integer DEFAULT 0 NOT NULL,
	"special_reward" text,
	"story_chapter" integer,
	"narrative_context" text,
	"problem_data" jsonb,
	"time_limit_minutes" integer DEFAULT 30 NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "quest_quest_number_unique" UNIQUE("quest_number")
);
--> statement-breakpoint
CREATE TABLE "user_achievement" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"achievement_id" uuid NOT NULL,
	"unlocked_at" timestamp DEFAULT now() NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_equipment" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"equipment_id" uuid NOT NULL,
	"is_equipped" boolean DEFAULT false NOT NULL,
	"acquired_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_profile" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"character_class" character_class,
	"level" integer DEFAULT 1 NOT NULL,
	"experience" integer DEFAULT 0 NOT NULL,
	"current_hp" integer DEFAULT 100 NOT NULL,
	"current_mp" integer DEFAULT 60 NOT NULL,
	"last_mp_regen" timestamp DEFAULT now() NOT NULL,
	"last_hp_update" timestamp DEFAULT now() NOT NULL,
	"current_chapter" integer DEFAULT 1 NOT NULL,
	"current_layer" integer DEFAULT 1 NOT NULL,
	"story_progress" jsonb,
	"quests_completed" integer DEFAULT 0 NOT NULL,
	"problems_solved" integer DEFAULT 0 NOT NULL,
	"current_streak" integer DEFAULT 0 NOT NULL,
	"longest_streak" integer DEFAULT 0 NOT NULL,
	"pvp_rating" integer DEFAULT 0 NOT NULL,
	"class_ranking" integer DEFAULT 9999 NOT NULL,
	"global_ranking" integer DEFAULT 9999 NOT NULL,
	"title" text DEFAULT 'Novice Architect',
	"backstory" text DEFAULT 'A budding architect with a passion for problem-solving.',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_profile_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "user_quest" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"quest_id" uuid NOT NULL,
	"status" "quest_status" DEFAULT 'available' NOT NULL,
	"progress" integer DEFAULT 0 NOT NULL,
	"attempts_count" integer DEFAULT 0 NOT NULL,
	"hints_used" integer DEFAULT 0 NOT NULL,
	"total_time_spent_seconds" integer DEFAULT 0 NOT NULL,
	"last_submission" text,
	"time_completed" timestamp,
	"mp_used_during_quest" integer DEFAULT 0 NOT NULL,
	"started_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_stats" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"average_problem_time" integer DEFAULT 0 NOT NULL,
	"favorite_topics" jsonb,
	"easy_problems" integer DEFAULT 0 NOT NULL,
	"medium_problems" integer DEFAULT 0 NOT NULL,
	"hard_problems" integer DEFAULT 0 NOT NULL,
	"login_streak" integer DEFAULT 0 NOT NULL,
	"last_active_date" timestamp,
	"total_logins" integer DEFAULT 0 NOT NULL,
	"submission_count" integer DEFAULT 0 NOT NULL,
	"successful_submissions" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_stats_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "daily_challenge" ADD CONSTRAINT "daily_challenge_quest_id_quest_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."quest"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievement" ADD CONSTRAINT "user_achievement_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_achievement" ADD CONSTRAINT "user_achievement_achievement_id_achievement_id_fk" FOREIGN KEY ("achievement_id") REFERENCES "public"."achievement"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_equipment" ADD CONSTRAINT "user_equipment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_equipment" ADD CONSTRAINT "user_equipment_equipment_id_equipment_id_fk" FOREIGN KEY ("equipment_id") REFERENCES "public"."equipment"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_profile" ADD CONSTRAINT "user_profile_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_quest" ADD CONSTRAINT "user_quest_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_quest" ADD CONSTRAINT "user_quest_quest_id_quest_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."quest"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_stats" ADD CONSTRAINT "user_stats_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "equipment_type_rarity_idx" ON "equipment" USING btree ("type","rarity");--> statement-breakpoint
CREATE INDEX "equipment_is_active_idx" ON "equipment" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "quest_number_idx" ON "quest" USING btree ("quest_number");--> statement-breakpoint
CREATE INDEX "quest_type_difficulty_idx" ON "quest" USING btree ("type","difficulty");--> statement-breakpoint
CREATE INDEX "quest_required_level_idx" ON "quest" USING btree ("required_level");--> statement-breakpoint
CREATE INDEX "quest_story_chapter_idx" ON "quest" USING btree ("story_chapter");--> statement-breakpoint
CREATE INDEX "quest_is_active_idx" ON "quest" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "quest_auto_unlocked_idx" ON "quest" USING btree ("is_auto_unlocked");--> statement-breakpoint
CREATE UNIQUE INDEX "user_achievement_unique" ON "user_achievement" USING btree ("user_id","achievement_id");--> statement-breakpoint
CREATE INDEX "user_achievement_user_id_idx" ON "user_achievement" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_achievement_unlocked_at_idx" ON "user_achievement" USING btree ("unlocked_at");--> statement-breakpoint
CREATE UNIQUE INDEX "user_equipment_unique" ON "user_equipment" USING btree ("user_id","equipment_id");--> statement-breakpoint
CREATE INDEX "user_equipment_user_id_idx" ON "user_equipment" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_equipment_is_equipped_idx" ON "user_equipment" USING btree ("user_id","is_equipped");--> statement-breakpoint
CREATE INDEX "user_profile_user_id_idx" ON "user_profile" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "user_profile_level_idx" ON "user_profile" USING btree ("level");--> statement-breakpoint
CREATE INDEX "user_profile_class_ranking_idx" ON "user_profile" USING btree ("character_class","class_ranking");--> statement-breakpoint
CREATE INDEX "user_profile_global_ranking_idx" ON "user_profile" USING btree ("global_ranking");--> statement-breakpoint
CREATE INDEX "user_profile_current_chapter_idx" ON "user_profile" USING btree ("current_chapter");--> statement-breakpoint
CREATE INDEX "user_profile_current_layer_idx" ON "user_profile" USING btree ("current_layer");--> statement-breakpoint
CREATE INDEX "user_profile_class_level_idx" ON "user_profile" USING btree ("character_class","level");--> statement-breakpoint
CREATE UNIQUE INDEX "user_quest_unique" ON "user_quest" USING btree ("user_id","quest_id");--> statement-breakpoint
CREATE INDEX "user_quest_user_id_status_idx" ON "user_quest" USING btree ("user_id","status");--> statement-breakpoint
CREATE INDEX "user_quest_quest_id_idx" ON "user_quest" USING btree ("quest_id");--> statement-breakpoint
CREATE INDEX "user_quest_time_completed_idx" ON "user_quest" USING btree ("time_completed");