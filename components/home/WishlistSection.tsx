'use client'

import { WishlistCard } from '@/components/wishlist/WishlistCard'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { ArrowRight, Heart } from 'lucide-react'
import Link from 'next/link'

export default function WishlistSection() {
    const wishlistItems = useQuery(api.wishlist.list)

    // Show only first 3 items, sorted by deadline
    const featuredItems = wishlistItems?.slice(0, 3) || []

    // Don't show section if no items
    if (!wishlistItems || wishlistItems.length === 0) {
        return null
    }

    return (
        <section
            id="wishlist"
            className="border-t border-t-[var(--pattern-fg)] px-4 py-10 sm:px-6 md:px-8"
        >
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="mb-2 flex items-center gap-2 text-xl font-bold">
                        <Heart className="h-5 w-5 text-red-500" />
                        My Wishlist
                    </h2>
                    <p className="text-sm text-muted-foreground">
                        Things I'm working towards. Your support would mean a lot!
                    </p>
                </div>
                <Link
                    href="/wishlist"
                    className="group flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
                >
                    View All
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {featuredItems.map((item) => (
                    <WishlistCard
                        key={item._id}
                        title={item.title}
                        description={item.description}
                        imageUrl={item.imageUrl}
                        targetAmount={item.targetAmount}
                        collectedAmount={item.collectedAmount}
                        deadline={item.deadline}
                        isCompleted={item.isCompleted}
                        showContributeButton={true}
                    />
                ))}
            </div>
        </section>
    )
}
