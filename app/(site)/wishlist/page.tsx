'use client'

import PageTitle from '@/components/PageTitle'
import WishlistGrid from '@/components/wishlist/WishlistGrid'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { ArrowUpDown, DollarSign } from 'lucide-react'
import { useState } from 'react'

type SortOption = 'progress' | 'amount'
type SortOrder = 'asc' | 'desc'

export default function WishlistPage() {
    const wishlistItems = useQuery(api.wishlist.list)
    const [sortBy, setSortBy] = useState<SortOption>('progress')
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

    const sortedItems = wishlistItems
        ? [...wishlistItems].sort((a, b) => {
              let comparison = 0

              switch (sortBy) {
                  case 'progress':
                      const progressA = (a.collectedAmount / a.targetAmount) * 100
                      const progressB = (b.collectedAmount / b.targetAmount) * 100
                      comparison = progressA - progressB
                      break
                  case 'amount':
                      comparison = a.targetAmount - b.targetAmount
                      break
              }

              return sortOrder === 'asc' ? comparison : -comparison
          })
        : []

    const toggleSort = (option: SortOption) => {
        if (sortBy === option) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(option)
            setSortOrder('desc')
        }
    }

    return (
        <div className="mx-auto max-w-7xl container py-20">
            <PageTitle>My Wishlist</PageTitle>

            <div className="mb-8">
                <p className="text-lg text-muted-foreground">
                    Here are some things I'm working towards. Your support would be greatly
                    appreciated!
                </p>
            </div>

            {/* Sort Controls */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="text-sm font-medium text-foreground">Sort by:</span>
                <button
                    onClick={() => toggleSort('progress')}
                    className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                        sortBy === 'progress'
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-card text-foreground hover:bg-muted'
                    }`}
                >
                    <ArrowUpDown className="h-4 w-4" />
                    Progress
                    {sortBy === 'progress' && (
                        <span className="text-xs opacity-75">
                            {sortOrder === 'desc' ? '↓' : '↑'}
                        </span>
                    )}
                </button>
                <button
                    onClick={() => toggleSort('amount')}
                    className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-medium transition-colors ${
                        sortBy === 'amount'
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-card text-foreground hover:bg-muted'
                    }`}
                >
                    <DollarSign className="h-4 w-4" />
                    Amount
                    {sortBy === 'amount' && (
                        <span className="text-xs opacity-75">
                            {sortOrder === 'desc' ? '↓' : '↑'}
                        </span>
                    )}
                </button>
            </div>

            {/* Wishlist Grid */}
            {!wishlistItems ? (
                <div className="flex min-h-[400px] items-center justify-center">
                    <div className="text-center">
                        <div className="mb-4 text-lg text-muted-foreground">
                            Loading wishlist...
                        </div>
                    </div>
                </div>
            ) : (
                <WishlistGrid items={sortedItems} />
            )}
        </div>
    )
}
