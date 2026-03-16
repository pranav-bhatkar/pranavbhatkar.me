'use client'

import { formatINR } from '@/data/wishlistData'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import DualProgressBar from './DualProgressBar'

interface WishlistCardProps {
    id: string
    title: string
    description: string
    imageUrl: string | null
    targetAmount: number
    selfContribution: number
    communityAmount: number
    status: string
}

export default function WishlistCard({
    id,
    title,
    description,
    imageUrl,
    targetAmount,
    selfContribution,
    communityAmount,
    status,
}: WishlistCardProps) {
    const totalAmount = selfContribution + communityAmount
    const isFullyFunded = totalAmount >= targetAmount || status === 'COMPLETED'

    return (
        <div className="group border border-border rounded-md overflow-hidden transition-colors hover:border-foreground/20 bg-background/60 backdrop-blur-sm">
            {/* Image */}
            {imageUrl && (
                <div className="relative aspect-[16/9] overflow-hidden">
                    <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
                </div>
            )}

            {/* Content */}
            <div className="p-5 space-y-4">
                <div>
                    <h3 className="text-base font-semibold mb-1">{title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {description}
                    </p>
                </div>

                {/* Progress */}
                <div>
                    <DualProgressBar
                        selfAmount={selfContribution}
                        communityAmount={communityAmount}
                        targetAmount={targetAmount}
                    />
                    <p className="text-xs text-muted-foreground mt-2">
                        Goal: {formatINR(targetAmount)}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <Link
                        href={`/wishlist/${id}`}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-md border border-border px-3 py-2 text-sm text-foreground transition-colors hover:bg-foreground/5"
                    >
                        Read more
                        <ArrowRight className="w-3 h-3" />
                    </Link>
                    {!isFullyFunded && (
                        <Link
                            href={`/wishlist/${id}/contribute`}
                            className="flex-1 inline-flex items-center justify-center rounded-md bg-foreground text-background px-3 py-2 text-sm font-medium transition-colors hover:bg-foreground/80"
                        >
                            Contribute
                        </Link>
                    )}
                    {isFullyFunded && (
                        <span className="flex-1 inline-flex items-center justify-center rounded-md border border-border px-3 py-2 text-sm text-muted-foreground">
                            Funded
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}
