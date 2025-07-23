import { eq, and, desc } from "drizzle-orm";
import z from "zod";
import { db } from "../db";
import { equipment, userEquipment, userProfile } from "../db/schema";
import { protectedProcedure } from "../lib/orpc";

export const equipmentRouter = {
  // Get all available equipment
  getAllEquipment: protectedProcedure
    .input(z.object({
      type: z.string().optional(), // weapon, armor, accessory, etc.
      limit: z.number().default(50),
      offset: z.number().default(0),
    }))
    .handler(async ({ input }) => {
      const { type, limit, offset } = input;
      
      let whereConditions = [eq(equipment.isActive, true)];
      
      if (type) {
        whereConditions.push(eq(equipment.type, type));
      }
      
      const allEquipment = await db
        .select()
        .from(equipment)
        .where(and(...whereConditions))
        .orderBy(equipment.rarity, equipment.name)
        .limit(limit)
        .offset(offset);
      
      return allEquipment;
    }),

  // Get user's inventory
  getUserInventory: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session!.user.id;
    
    const inventory = await db
      .select({
        userEquipment: userEquipment,
        equipment: equipment,
      })
      .from(userEquipment)
      .innerJoin(equipment, eq(userEquipment.equipmentId, equipment.id))
      .where(eq(userEquipment.userId, userId))
      .orderBy(desc(userEquipment.acquiredAt));
    
    return inventory.map(item => ({
      ...item.equipment,
      userEquipmentId: item.userEquipment.id,
      isEquipped: item.userEquipment.isEquipped,
      acquiredAt: item.userEquipment.acquiredAt,
    }));
  }),

  // Get user's equipped items
  getEquippedItems: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session!.user.id;
    
    const equippedItems = await db
      .select({
        userEquipment: userEquipment,
        equipment: equipment,
      })
      .from(userEquipment)
      .innerJoin(equipment, eq(userEquipment.equipmentId, equipment.id))
      .where(
        and(
          eq(userEquipment.userId, userId),
          eq(userEquipment.isEquipped, true)
        )
      )
      .orderBy(equipment.type);
    
    return equippedItems.map(item => ({
      ...item.equipment,
      userEquipmentId: item.userEquipment.id,
      acquiredAt: item.userEquipment.acquiredAt,
    }));
  }),

  // Equip an item
  equipItem: protectedProcedure
    .input(z.object({
      userEquipmentId: z.string().uuid(),
    }))
    .handler(async ({ input, context }) => {
      const userId = context.session!.user.id;
      const { userEquipmentId } = input;
      
      // Get the item details
      const itemDetails = await db
        .select({
          userEquipment: userEquipment,
          equipment: equipment,
        })
        .from(userEquipment)
        .innerJoin(equipment, eq(userEquipment.equipmentId, equipment.id))
        .where(
          and(
            eq(userEquipment.id, userEquipmentId),
            eq(userEquipment.userId, userId)
          )
        )
        .limit(1);
      
      if (itemDetails.length === 0) {
        throw new Error('Item not found in user inventory');
      }
      
      const item = itemDetails[0];
      
      // Unequip other items of the same type
      await db
        .update(userEquipment)
        .set({ isEquipped: false })
        .where(
          and(
            eq(userEquipment.userId, userId),
            eq(userEquipment.isEquipped, true),
            eq(equipment.type, item.equipment.type)
          )
        );
      
      // Equip the selected item
      const equipped = await db
        .update(userEquipment)
        .set({ isEquipped: true })
        .where(eq(userEquipment.id, userEquipmentId))
        .returning();
      
      return equipped[0];
    }),

  // Unequip an item
  unequipItem: protectedProcedure
    .input(z.object({
      userEquipmentId: z.string().uuid(),
    }))
    .handler(async ({ input, context }) => {
      const userId = context.session!.user.id;
      const { userEquipmentId } = input;
      
      const unequipped = await db
        .update(userEquipment)
        .set({ isEquipped: false })
        .where(
          and(
            eq(userEquipment.id, userEquipmentId),
            eq(userEquipment.userId, userId)
          )
        )
        .returning();
      
      if (unequipped.length === 0) {
        throw new Error('Item not found or not owned by user');
      }
      
      return unequipped[0];
    }),

  // Grant equipment to user (for quest rewards, achievements, etc.)
  grantEquipment: protectedProcedure
    .input(z.object({
      equipmentId: z.string().uuid(),
      autoEquip: z.boolean().default(false),
    }))
    .handler(async ({ input, context }) => {
      const userId = context.session!.user.id;
      const { equipmentId, autoEquip } = input;
      
      // Check if user already has this equipment
      const existing = await db
        .select()
        .from(userEquipment)
        .where(
          and(
            eq(userEquipment.userId, userId),
            eq(userEquipment.equipmentId, equipmentId)
          )
        )
        .limit(1);
      
      if (existing.length > 0) {
        throw new Error('User already has this equipment');
      }
      
      // Grant the equipment
      const granted = await db
        .insert(userEquipment)
        .values({
          userId,
          equipmentId,
          isEquipped: autoEquip,
        })
        .returning();
      
      // If auto-equip, unequip other items of the same type
      if (autoEquip) {
        const equipmentDetails = await db
          .select()
          .from(equipment)
          .where(eq(equipment.id, equipmentId))
          .limit(1);
        
        if (equipmentDetails.length > 0) {
          await db
            .update(userEquipment)
            .set({ isEquipped: false })
            .where(
              and(
                eq(userEquipment.userId, userId),
                eq(userEquipment.isEquipped, true),
                eq(equipment.type, equipmentDetails[0].type),
                eq(userEquipment.id, granted[0].id) // Don't unequip the newly granted item
              )
            );
        }
      }
      
      return granted[0];
    }),

  // Get equipment by ID
  getEquipmentById: protectedProcedure
    .input(z.object({
      equipmentId: z.string().uuid(),
    }))
    .handler(async ({ input }) => {
      const { equipmentId } = input;
      
      const equipmentItem = await db
        .select()
        .from(equipment)
        .where(eq(equipment.id, equipmentId))
        .limit(1);
      
      if (equipmentItem.length === 0) {
        throw new Error('Equipment not found');
      }
      
      return equipmentItem[0];
    }),

  // Get equipment stats summary for user
  getEquipmentStats: protectedProcedure.handler(async ({ context }) => {
    const userId = context.session!.user.id;
    
    const equippedItems = await db
      .select({
        equipment: equipment,
      })
      .from(userEquipment)
      .innerJoin(equipment, eq(userEquipment.equipmentId, equipment.id))
      .where(
        and(
          eq(userEquipment.userId, userId),
          eq(userEquipment.isEquipped, true)
        )
      );
    
    // Aggregate stats from all equipped items
    const totalStats = equippedItems.reduce((stats, item) => {
      const itemStats = item.equipment.statsBonus as Record<string, number> || {};
      
      for (const [stat, value] of Object.entries(itemStats)) {
        stats[stat] = (stats[stat] || 0) + (typeof value === 'number' ? value : 0);
      }
      
      return stats;
    }, {} as Record<string, number>);
    
    return {
      equippedItems: equippedItems.map(item => item.equipment),
      totalStats,
      itemCount: equippedItems.length,
    };
  }),
};
