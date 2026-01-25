import { action } from './_generated/server'
import { v } from 'convex/values'
import { internal } from './_generated/api'

// Mock payment integration - replace with real Razorpay later

export const createPaymentOrder = action({
    args: {
        wishlistItemId: v.id('wishlistItems'),
        amount: v.number(), // Amount in INR
        name: v.string(),
        email: v.string(),
        phone: v.string(),
        message: v.string(),
        showPublicly: v.boolean(),
    },
    returns: v.object({
        orderId: v.string(),
        amount: v.number(),
        currency: v.string(),
        success: v.boolean(),
    }),
    handler: async (ctx, args) => {
        // Verify wishlist item exists
        const item = await ctx.runQuery(internal.wishlist.getByIdInternal, {
            wishlistItemId: args.wishlistItemId,
        })

        if (!item) {
            throw new Error('Wishlist item not found')
        }

        // Generate mock order ID
        const orderId = `mock_order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

        // Create contributor record (verified immediately for mock)
        await ctx.runMutation(internal.contributors.createContributor, {
            wishlistItemId: args.wishlistItemId,
            name: args.name,
            email: args.email,
            phone: args.phone,
            amount: args.amount,
            message: args.message,
            showPublicly: args.showPublicly,
            razorpayOrderId: orderId,
            isVerified: true, // Mock: immediately verified
        })

        return {
            orderId,
            amount: args.amount,
            currency: 'INR',
            success: true,
        }
    },
})

