import { internal } from './_generated/api'
import { internalMutation } from './_generated/server'
import { v } from 'convex/values'

// Internal mutation to create contributor
export const createContributor = internalMutation({
    args: {
        wishlistItemId: v.id('wishlistItems'),
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        amount: v.number(),
        message: v.string(),
        showPublicly: v.boolean(),
        razorpayOrderId: v.optional(v.string()),
        isVerified: v.boolean(),
    },
    returns: v.id('contributors'),
    handler: async (ctx, args) => {
        const contributorId = await ctx.db.insert('contributors', {
            wishlistItemId: args.wishlistItemId,
            name: args.name,
            email: args.email,
            phone: args.phone,
            amount: args.amount,
            message: args.message,
            showPublicly: args.showPublicly,
            date: new Date().toISOString(),
            razorpayOrderId: args.razorpayOrderId,
            razorpayPaymentId: undefined,
            razorpaySignature: undefined,
            isVerified: args.isVerified,
        })

        return contributorId
    },
})

// Internal mutation to verify and update payment (for future Razorpay integration)
export const verifyPayment = internalMutation({
    args: {
        razorpayOrderId: v.string(),
        razorpayPaymentId: v.string(),
        razorpaySignature: v.string(),
    },
    returns: v.union(v.id('contributors'), v.null()),
    handler: async (ctx, args) => {
        // Find contributor by order ID
        const contributor = await ctx.db
            .query('contributors')
            .withIndex('by_razorpayOrderId', (q) => q.eq('razorpayOrderId', args.razorpayOrderId))
            .unique()

        if (!contributor) {
            return null
        }

        // Update contributor with payment details and mark as verified
        await ctx.db.patch(contributor._id, {
            razorpayPaymentId: args.razorpayPaymentId,
            razorpaySignature: args.razorpaySignature,
            isVerified: true,
        })

        // Check if wishlist item should be auto-completed
        await ctx.scheduler.runAfter(0, internal.wishlist.checkAndAutoComplete, {
            wishlistItemId: contributor.wishlistItemId,
        })

        return contributor._id
    },
})

