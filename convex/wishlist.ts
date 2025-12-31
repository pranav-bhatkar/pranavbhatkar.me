import { v } from 'convex/values'

import { Id } from './_generated/dataModel'
import { mutation, query } from './_generated/server'

// Helper function to check if user is admin
async function isAdmin(ctx: any): Promise<boolean> {
    const identity: {
        // Use Clerk JWT token fields for user identity typing
        email?: string
        name?: string
        givenName?: string
        familyName?: string
        pictureUrl?: string
    } = await ctx.auth.getUserIdentity()
    if (!identity) {
        return false
    }

    // Check if user has admin role in their metadata
    console.log(`User email: ${JSON.stringify(identity.email)}`)
    const emailLower = identity.email?.toLocaleLowerCase()
    console.log(
        `Comparing to: pranavbhatkar789@gmail.com ${emailLower === 'pranavbhatkar789@gmail.com'.toLocaleLowerCase()}`
    )
    return emailLower === 'pranavbhatkar789@gmail.com'
}

// Helper function to require admin access
async function requireAdmin(ctx: any): Promise<void> {
    const admin = await isAdmin(ctx)
    if (!admin) {
        throw new Error('Unauthorized: Admin access required')
    }
}

// PUBLIC QUERIES

export const list = query({
    args: {},
    returns: v.array(
        v.object({
            _id: v.id('wishlistItems'),
            _creationTime: v.number(),
            title: v.string(),
            description: v.string(),
            imageUrl: v.union(v.string(), v.null()),
            targetAmount: v.number(),
            collectedAmount: v.number(),
            deadline: v.number(),
            isCompleted: v.boolean(),
        })
    ),
    handler: async (ctx, args) => {
        // Fetch all active (non-completed) wishlist items
        const items = await ctx.db
            .query('wishlistItems')
            .withIndex('by_isCompleted', (q) => q.eq('isCompleted', false))
            .order('asc')
            .collect()

        // Get image URLs for items
        const itemsWithUrls = await Promise.all(
            items.map(async (item) => {
                let imageUrl: string | null = null
                if (item.imageStorageId) {
                    imageUrl = await ctx.storage.getUrl(item.imageStorageId)
                }
                return {
                    _id: item._id,
                    _creationTime: item._creationTime,
                    title: item.title,
                    description: item.description,
                    imageUrl,
                    targetAmount: item.targetAmount,
                    collectedAmount: item.collectedAmount,
                    deadline: item.deadline,
                    isCompleted: item.isCompleted,
                }
            })
        )

        // Sort by deadline (soonest first)
        return itemsWithUrls.sort((a, b) => a.deadline - b.deadline)
    },
})

export const get = query({
    args: { id: v.id('wishlistItems') },
    returns: v.union(
        v.object({
            _id: v.id('wishlistItems'),
            _creationTime: v.number(),
            title: v.string(),
            description: v.string(),
            imageUrl: v.union(v.string(), v.null()),
            targetAmount: v.number(),
            collectedAmount: v.number(),
            deadline: v.number(),
            isCompleted: v.boolean(),
            createdBy: v.string(),
        }),
        v.null()
    ),
    handler: async (ctx, args) => {
        const item = await ctx.db.get(args.id)
        if (!item) {
            return null
        }

        let imageUrl: string | null = null
        if (item.imageStorageId) {
            imageUrl = await ctx.storage.getUrl(item.imageStorageId)
        }

        return {
            _id: item._id,
            _creationTime: item._creationTime,
            title: item.title,
            description: item.description,
            imageUrl,
            targetAmount: item.targetAmount,
            collectedAmount: item.collectedAmount,
            deadline: item.deadline,
            isCompleted: item.isCompleted,
            createdBy: item.createdBy,
        }
    },
})

export const listForAdmin = query({
    args: {},
    returns: v.array(
        v.object({
            _id: v.id('wishlistItems'),
            _creationTime: v.number(),
            title: v.string(),
            description: v.string(),
            imageUrl: v.union(v.string(), v.null()),
            targetAmount: v.number(),
            collectedAmount: v.number(),
            deadline: v.number(),
            isCompleted: v.boolean(),
            createdBy: v.string(),
        })
    ),
    handler: async (ctx, args) => {
        await requireAdmin(ctx)

        // Fetch all wishlist items (including completed)
        const items = await ctx.db.query('wishlistItems').order('desc').collect()

        // Get image URLs for items
        const itemsWithUrls = await Promise.all(
            items.map(async (item) => {
                let imageUrl: string | null = null
                if (item.imageStorageId) {
                    imageUrl = await ctx.storage.getUrl(item.imageStorageId)
                }
                return {
                    _id: item._id,
                    _creationTime: item._creationTime,
                    title: item.title,
                    description: item.description,
                    imageUrl,
                    targetAmount: item.targetAmount,
                    collectedAmount: item.collectedAmount,
                    deadline: item.deadline,
                    isCompleted: item.isCompleted,
                    createdBy: item.createdBy,
                }
            })
        )

        return itemsWithUrls
    },
})

// ADMIN MUTATIONS

export const generateUploadUrl = mutation({
    args: {},
    returns: v.string(),
    handler: async (ctx, args) => {
        await requireAdmin(ctx)
        return await ctx.storage.generateUploadUrl()
    },
})

export const create = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        imageStorageId: v.optional(v.id('_storage')),
        targetAmount: v.number(),
        deadline: v.number(),
    },
    returns: v.id('wishlistItems'),
    handler: async (ctx, args) => {
        await requireAdmin(ctx)

        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error('Not authenticated')
        }

        const wishlistId: Id<'wishlistItems'> = await ctx.db.insert('wishlistItems', {
            title: args.title,
            description: args.description,
            imageStorageId: args.imageStorageId,
            targetAmount: args.targetAmount,
            collectedAmount: 0,
            deadline: args.deadline,
            isCompleted: false,
            createdBy: identity.subject,
        })

        return wishlistId
    },
})

export const update = mutation({
    args: {
        id: v.id('wishlistItems'),
        title: v.optional(v.string()),
        description: v.optional(v.string()),
        imageStorageId: v.optional(v.id('_storage')),
        targetAmount: v.optional(v.number()),
        deadline: v.optional(v.number()),
    },
    returns: v.null(),
    handler: async (ctx, args) => {
        await requireAdmin(ctx)

        const { id, ...updates } = args
        const existingItem = await ctx.db.get(id)

        if (!existingItem) {
            throw new Error('Wishlist item not found')
        }

        await ctx.db.patch(id, updates)
        return null
    },
})

export const updateProgress = mutation({
    args: {
        id: v.id('wishlistItems'),
        collectedAmount: v.number(),
    },
    returns: v.null(),
    handler: async (ctx, args) => {
        await requireAdmin(ctx)

        const existingItem = await ctx.db.get(args.id)

        if (!existingItem) {
            throw new Error('Wishlist item not found')
        }

        await ctx.db.patch(args.id, {
            collectedAmount: args.collectedAmount,
        })

        return null
    },
})

export const markComplete = mutation({
    args: {
        id: v.id('wishlistItems'),
        isCompleted: v.boolean(),
    },
    returns: v.null(),
    handler: async (ctx, args) => {
        await requireAdmin(ctx)

        const existingItem = await ctx.db.get(args.id)

        if (!existingItem) {
            throw new Error('Wishlist item not found')
        }

        await ctx.db.patch(args.id, {
            isCompleted: args.isCompleted,
        })

        return null
    },
})

export const deleteItem = mutation({
    args: {
        id: v.id('wishlistItems'),
    },
    returns: v.null(),
    handler: async (ctx, args) => {
        await requireAdmin(ctx)

        const existingItem = await ctx.db.get(args.id)

        if (!existingItem) {
            throw new Error('Wishlist item not found')
        }

        // Delete the image from storage if it exists
        if (existingItem.imageStorageId) {
            await ctx.storage.delete(existingItem.imageStorageId)
        }

        await ctx.db.delete(args.id)
        return null
    },
})
