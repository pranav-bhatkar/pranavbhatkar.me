import { WishlistCard } from './WishlistCard'

interface WishlistItem {
    _id: string
    title: string
    description: string
    imageUrl: string | null
    targetAmount: number
    collectedAmount: number
    deadline: number
    isCompleted: boolean
}

interface WishlistGridProps {
    items: WishlistItem[]
    showContributeButton?: boolean
}

export function WishlistGrid({ items, showContributeButton = true }: WishlistGridProps) {
    if (items.length === 0) {
        return (
            <div className="rounded-lg border border-gray-200 bg-white p-12 text-center dark:border-gray-800 dark:bg-gray-950">
                <p className="text-gray-500 dark:text-gray-400">No wishlist items yet.</p>
            </div>
        )
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
                <WishlistCard
                    key={item._id}
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    targetAmount={item.targetAmount}
                    collectedAmount={item.collectedAmount}
                    deadline={item.deadline}
                    isCompleted={item.isCompleted}
                    showContributeButton={showContributeButton}
                />
            ))}
        </div>
    )
}

