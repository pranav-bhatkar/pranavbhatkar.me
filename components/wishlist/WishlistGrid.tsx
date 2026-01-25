'use client'

import WishlistCard from './WishlistCard'

interface WishlistItem {
    _id: string
    id: string
    title: string
    description: string
    imageUrl: string | null
    targetAmount: number
    selfContribution: number
    collectedAmount: number
}

interface WishlistGridProps {
    items: WishlistItem[]
}

export default function WishlistGrid({ items }: WishlistGridProps) {
    if (items.length === 0) {
        return (
            <div className="rounded-lg border border-border bg-background p-12 text-center">
                <p className="text-muted-foreground">No wishlist items yet.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
                <WishlistCard
                    key={item._id}
                    id={item.id}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    targetAmount={item.targetAmount}
                    selfContribution={item.selfContribution}
                    communityAmount={item.collectedAmount}
                />
            ))}
        </div>
    )
}
