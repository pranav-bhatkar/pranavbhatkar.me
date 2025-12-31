import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    wishlistItems: defineTable({
        title: v.string(),
        description: v.string(),
        imageStorageId: v.optional(v.id('_storage')),
        targetAmount: v.number(),
        collectedAmount: v.number(),
        deadline: v.number(), // Unix timestamp
        isCompleted: v.boolean(),
        createdBy: v.string(), // Clerk user ID
    })
        .index('by_createdBy', ['createdBy'])
        .index('by_isCompleted', ['isCompleted']),
})
