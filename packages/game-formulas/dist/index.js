/**
 * Game formulas for dynamic stat calculations
 * These replace stored derived values with computed formulas
 */
/**
 * Calculate experience required to reach next level
 * Formula: floor(100 * level^1.5)
 */
export function calculateXpToNext(level) {
    return Math.floor(100 * Math.pow(level, 1.5));
}
/**
 * Calculate total experience required to reach a specific level
 */
export function calculateTotalXpForLevel(level) {
    let totalXp = 0;
    for (let i = 1; i < level; i++) {
        totalXp += calculateXpToNext(i);
    }
    return totalXp;
}
/**
 * Calculate level from total experience
 */
export function calculateLevelFromXp(experience) {
    let level = 1;
    let requiredXp = 0;
    while (requiredXp <= experience) {
        level++;
        requiredXp += calculateXpToNext(level - 1);
    }
    return level - 1;
}
/**
 * Calculate maximum HP at a given level
 * Formula: 100 + floor(10 * sqrt(level))
 */
export function calculateMaxHp(level) {
    return 100 + Math.floor(10 * Math.sqrt(level));
}
/**
 * Calculate maximum Mp at a given level
 * Formula: 60 + floor(6 * sqrt(level))
 */
export function calculateMaxMp(level) {
    return 60 + Math.floor(6 * Math.sqrt(level));
}
/**
 * Calculate grace time before HP drain starts
 * Formula: clamp(20 - floor(level / 10), 10, 20)
 */
export function calculateGraceTime(level) {
    const graceTime = 20 - Math.floor(level / 10);
    return Math.max(10, Math.min(20, graceTime));
}
/**
 * Calculate HP drain per minute after grace period
 * Formula: ceil(maxHp / graceTime)
 */
export function calculateHpDrainPerMinute(level) {
    const maxHp = calculateMaxHp(level);
    const graceTime = calculateGraceTime(level);
    return Math.ceil(maxHp / graceTime);
}
/**
 * Calculate HP damage from wrong submission
 * Formula: ceil(maxHp / 20) (5% of max HP)
 */
export function calculateWrongSubmissionDamage(level) {
    const maxHp = calculateMaxHp(level);
    return Math.ceil(maxHp / 20);
}
/**
 * Calculate MP cost for starting a story quest
 * Formula: 10 + floor(level / 5)
 */
export function calculateStoryQuestMpCost(level) {
    return 10 + Math.floor(level / 5);
}
/**
 * MP costs for various actions
 */
export const MP_COSTS = {
    RETRY_CHAPTER: 2,
    HINT: 8,
    FULL_EXPLANATION: 10,
    // Story quest cost is dynamic based on level
};
/**
 * Calculate MP regeneration since last update
 * Formula: 1 MP per 5 minutes
 */
export function calculateMpRegen(lastRegenTime, currentTime = new Date()) {
    const timeDiffMs = currentTime.getTime() - lastRegenTime.getTime();
    const timeDiffMinutes = timeDiffMs / (1000 * 60);
    const mpRegenRate = 1 / 5; // 1 MP per 5 minutes
    return Math.floor(timeDiffMinutes * mpRegenRate);
}
/**
 * Calculate if user can afford an MP cost
 */
export function canAffordMpCost(currentMp, cost) {
    return currentMp >= cost;
}
/**
 * Calculate user's current derived stats
 */
export function calculateUserStats(profile) {
    const maxHp = calculateMaxHp(profile.level);
    const maxMp = calculateMaxMp(profile.level);
    const xpToNext = calculateXpToNext(profile.level);
    const xpInCurrentLevel = profile.experience - calculateTotalXpForLevel(profile.level);
    // Calculate MP regen
    const mpRegen = calculateMpRegen(profile.lastMpRegen);
    const actualCurrentMp = Math.min(maxMp, profile.currentMp + mpRegen);
    return {
        level: profile.level,
        experience: profile.experience,
        xpToNext,
        xpInCurrentLevel,
        currentHp: Math.min(maxHp, profile.currentHp), // Cap current HP at max
        maxHp,
        currentMp: actualCurrentMp,
        maxMp,
        graceTime: calculateGraceTime(profile.level),
        hpDrainPerMinute: calculateHpDrainPerMinute(profile.level),
    };
}
/**
 * Apply HP damage and return new HP value
 */
export function applyHpDamage(currentHp, damage) {
    return Math.max(0, currentHp - damage);
}
/**
 * Apply MP cost and return new MP value
 */
export function applyMpCost(currentMp, cost) {
    return Math.max(0, currentMp - cost);
}
