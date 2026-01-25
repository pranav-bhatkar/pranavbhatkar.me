import { v } from 'convex/values'

import { Id } from './_generated/dataModel'
import { internalMutation, internalQuery, mutation, query } from './_generated/server'

// Helper function to check if user is admin
async function isAdmin(ctx: any): Promise<boolean> {
    const identity: {
        email?: string
        name?: string
        givenName?: string
        familyName?: string
        pictureUrl?: string
    } = await ctx.auth.getUserIdentity()
    if (!identity) {
        return false
    }

    const emailLower = identity.email?.toLocaleLowerCase()
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
            id: v.string(),
            title: v.string(),
            description: v.string(),
            imageUrl: v.union(v.string(), v.null()),
            targetAmount: v.number(),
            selfContribution: v.number(),
            collectedAmount: v.number(),
        })
    ),
    handler: async (ctx, args) => {
        const items = await ctx.db.query('wishlistItems').order('desc').collect()

        // Get image URLs and calculate collected amounts
        const itemsWithData = await Promise.all(
            items.map(async (item) => {
                let imageUrl: string | null = null
                if (item.imageStorageId) {
                    imageUrl = await ctx.storage.getUrl(item.imageStorageId)
                }

                // Calculate collected amount from verified contributors
                const contributors = await ctx.db
                    .query('contributors')
                    .withIndex('by_wishlistItemId', (q) => q.eq('wishlistItemId', item._id))
                    .filter((q) => q.eq(q.field('isVerified'), true))
                    .collect()

                const collectedAmount = contributors.reduce((sum, c) => sum + c.amount, 0)

                return {
                    _id: item._id,
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    imageUrl,
                    targetAmount: item.targetAmount,
                    selfContribution: item.selfContribution,
                    collectedAmount,
                }
            })
        )

        return itemsWithData
    },
})

export const getById = query({
    args: { id: v.string() },
    returns: v.union(
        v.object({
            _id: v.id('wishlistItems'),
            id: v.string(),
            title: v.string(),
            description: v.string(),
            imageUrl: v.union(v.string(), v.null()),
            targetAmount: v.number(),
            selfContribution: v.number(),
            markdown: v.string(),
            collectedAmount: v.number(),
            contributors: v.array(
                v.object({
                    _id: v.id('contributors'),
                    name: v.string(),
                    amount: v.number(),
                    message: v.optional(v.string()),
                    date: v.string(),
                })
            ),
        }),
        v.null()
    ),
    handler: async (ctx, args) => {
        const item = await ctx.db
            .query('wishlistItems')
            .withIndex('by_slug', (q) => q.eq('id', args.id))
            .unique()

        if (!item) {
            return null
        }

        let imageUrl: string | null = null
        if (item.imageStorageId) {
            imageUrl = await ctx.storage.getUrl(item.imageStorageId)
        }

        // Get verified contributors
        const contributors = await ctx.db
            .query('contributors')
            .withIndex('by_wishlistItemId', (q) => q.eq('wishlistItemId', item._id))
            .filter((q) => q.eq(q.field('isVerified'), true))
            .order('desc')
            .collect()

        const collectedAmount = contributors.reduce((sum, c) => sum + c.amount, 0)

        return {
            _id: item._id,
            id: item.id,
            title: item.title,
            description: item.description,
            imageUrl,
            targetAmount: item.targetAmount,
            selfContribution: item.selfContribution,
            markdown: item.markdown,
            collectedAmount,
            contributors: contributors.map((c) => ({
                _id: c._id,
                name: c.name,
                amount: c.amount,
                message: c.message,
                date: c.date,
            })),
        }
    },
})

export const getContributors = query({
    args: { wishlistItemId: v.id('wishlistItems') },
    returns: v.array(
        v.object({
            _id: v.id('contributors'),
            name: v.string(),
            amount: v.number(),
            message: v.optional(v.string()),
            date: v.string(),
        })
    ),
    handler: async (ctx, args) => {
        const contributors = await ctx.db
            .query('contributors')
            .withIndex('by_wishlistItemId', (q) => q.eq('wishlistItemId', args.wishlistItemId))
            .filter((q) => q.eq(q.field('isVerified'), true))
            .order('desc')
            .collect()

        return contributors.map((c) => ({
            _id: c._id,
            name: c.name,
            amount: c.amount,
            message: c.message,
            date: c.date,
        }))
    },
})

// ADMIN QUERIES

export const listForAdmin = query({
    args: {},
    returns: v.array(
        v.object({
            _id: v.id('wishlistItems'),
            id: v.string(),
            title: v.string(),
            description: v.string(),
            imageUrl: v.union(v.string(), v.null()),
            targetAmount: v.number(),
            selfContribution: v.number(),
            markdown: v.string(),
            collectedAmount: v.number(),
            createdBy: v.string(),
        })
    ),
    handler: async (ctx, args) => {
        await requireAdmin(ctx)

        const items = await ctx.db.query('wishlistItems').order('desc').collect()

        const itemsWithData = await Promise.all(
            items.map(async (item) => {
                let imageUrl: string | null = null
                if (item.imageStorageId) {
                    imageUrl = await ctx.storage.getUrl(item.imageStorageId)
                }

                const contributors = await ctx.db
                    .query('contributors')
                    .withIndex('by_wishlistItemId', (q) => q.eq('wishlistItemId', item._id))
                    .filter((q) => q.eq(q.field('isVerified'), true))
                    .collect()

                const collectedAmount = contributors.reduce((sum, c) => sum + c.amount, 0)

                return {
                    _id: item._id,
                    id: item.id,
                    title: item.title,
                    description: item.description,
                    imageUrl,
                    targetAmount: item.targetAmount,
                    selfContribution: item.selfContribution,
                    markdown: item.markdown,
                    collectedAmount,
                    createdBy: item.createdBy,
                }
            })
        )

        return itemsWithData
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
        id: v.string(),
        title: v.string(),
        description: v.string(),
        imageStorageId: v.optional(v.id('_storage')),
        targetAmount: v.number(),
        selfContribution: v.number(),
        markdown: v.string(),
    },
    returns: v.id('wishlistItems'),
    handler: async (ctx, args) => {
        await requireAdmin(ctx)

        const identity = await ctx.auth.getUserIdentity()
        if (!identity) {
            throw new Error('Not authenticated')
        }

        // Check if id already exists
        const existing = await ctx.db
            .query('wishlistItems')
            .withIndex('by_slug', (q) => q.eq('id', args.id))
            .unique()

        if (existing) {
            throw new Error('Wishlist item with this id already exists')
        }

        const wishlistId: Id<'wishlistItems'> = await ctx.db.insert('wishlistItems', {
            id: args.id,
            title: args.title,
            description: args.description,
            imageStorageId: args.imageStorageId,
            targetAmount: args.targetAmount,
            selfContribution: args.selfContribution,
            markdown: args.markdown,
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
        selfContribution: v.optional(v.number()),
        markdown: v.optional(v.string()),
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

        // Delete all contributors
        const contributors = await ctx.db
            .query('contributors')
            .withIndex('by_wishlistItemId', (q) => q.eq('wishlistItemId', args.id))
            .collect()

        for (const contributor of contributors) {
            await ctx.db.delete(contributor._id)
        }

        // Delete the image from storage if it exists
        if (existingItem.imageStorageId) {
            await ctx.storage.delete(existingItem.imageStorageId)
        }

        await ctx.db.delete(args.id)
        return null
    },
})

// Internal query to get wishlist item by _id
export const getByIdInternal = internalQuery({
    args: { wishlistItemId: v.id('wishlistItems') },
    returns: v.union(
        v.object({
            _id: v.id('wishlistItems'),
            id: v.string(),
            title: v.string(),
        }),
        v.null()
    ),
    handler: async (ctx, args) => {
        const item = await ctx.db.get(args.wishlistItemId)
        if (!item) {
            return null
        }
        return {
            _id: item._id,
            id: item.id,
            title: item.title,
        }
    },
})
