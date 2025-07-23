/**
 * Game formulas for dynamic stat calculations
 * These replace stored derived values with computed formulas
 */
/**
 * Calculate experience required to reach next level
 * Formula: floor(100 * level^1.5)
 */
export declare function calculateXpToNext(level: number): number;
/**
 * Calculate total experience required to reach a specific level
 */
export declare function calculateTotalXpForLevel(level: number): number;
/**
 * Calculate level from total experience
 */
export declare function calculateLevelFromXp(experience: number): number;
/**
 * Calculate maximum HP at a given level
 * Formula: 100 + floor(10 * sqrt(level))
 */
export declare function calculateMaxHp(level: number): number;
/**
 * Calculate maximum Mp at a given level
 * Formula: 60 + floor(6 * sqrt(level))
 */
export declare function calculateMaxMp(level: number): number;
/**
 * Calculate grace time before HP drain starts
 * Formula: clamp(20 - floor(level / 10), 10, 20)
 */
export declare function calculateGraceTime(level: number): number;
/**
 * Calculate HP drain per minute after grace period
 * Formula: ceil(maxHp / graceTime)
 */
export declare function calculateHpDrainPerMinute(level: number): number;
/**
 * Calculate HP damage from wrong submission
 * Formula: ceil(maxHp / 20) (5% of max HP)
 */
export declare function calculateWrongSubmissionDamage(level: number): number;
/**
 * Calculate MP cost for starting a story quest
 * Formula: 10 + floor(level / 5)
 */
export declare function calculateStoryQuestMpCost(level: number): number;
/**
 * MP costs for various actions
 */
export declare const MP_COSTS: {
    readonly RETRY_CHAPTER: 2;
    readonly HINT: 8;
    readonly FULL_EXPLANATION: 10;
};
/**
 * Calculate MP regeneration since last update
 * Formula: 1 MP per 5 minutes
 */
export declare function calculateMpRegen(lastRegenTime: Date, currentTime?: Date): number;
/**
 * Calculate if user can afford an MP cost
 */
export declare function canAffordMpCost(currentMp: number, cost: number): boolean;
/**
 * Calculate user's current derived stats
 */
export declare function calculateUserStats(profile: {
    level: number;
    experience: number;
    currentHp: number;
    currentMp: number;
    lastMpRegen: Date;
}): {
    level: number;
    experience: number;
    xpToNext: number;
    xpInCurrentLevel: number;
    currentHp: number;
    maxHp: number;
    currentMp: number;
    maxMp: number;
    graceTime: number;
    hpDrainPerMinute: number;
};
/**
 * Apply HP damage and return new HP value
 */
export declare function applyHpDamage(currentHp: number, damage: number): number;
/**
 * Apply MP cost and return new MP value
 */
export declare function applyMpCost(currentMp: number, cost: number): number;
