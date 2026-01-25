import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
    wishlistItems: defineTable({
        id: v.string(), // Slug identifier (e.g., "macbook-pro-m3")
        title: v.string(),
        description: v.string(),
        imageStorageId: v.optional(v.id('_storage')),
        targetAmount: v.number(), // In INR
        selfContribution: v.number(), // In INR
        markdown: v.string(), // Long markdown description
        createdBy: v.string(), // Clerk user ID
    })
        .index('by_slug', ['id'])
        .index('by_createdBy', ['createdBy']),

    contributors: defineTable({
        wishlistItemId: v.id('wishlistItems'),
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        amount: v.number(), // In INR
        message: v.string(),
        showPublicly: v.boolean(),
        date: v.string(), // ISO date string
        razorpayOrderId: v.optional(v.string()),
        razorpayPaymentId: v.optional(v.string()),
        razorpaySignature: v.optional(v.string()),
        isVerified: v.boolean(), // Payment verification status
    })
        .index('by_wishlistItemId', ['wishlistItemId'])
        .index('by_razorpayOrderId', ['razorpayOrderId']),
})
