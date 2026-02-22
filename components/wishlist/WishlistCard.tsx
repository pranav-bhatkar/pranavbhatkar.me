'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/shadcn/button'
import DualProgressBar from './DualProgressBar'
import { formatINR } from '@/data/wishlistData'

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
        <div className="group border border-border bg-background transition-all duration-300 hover:border-foreground">
            {/* Image container with corner brackets style */}
            <div className="relative aspect-[4/3] overflow-hidden">
                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-4 h-4 border-l border-t border-muted-foreground/50 z-10" />
                <div className="absolute top-3 right-3 w-4 h-4 border-r border-t border-muted-foreground/50 z-10" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-l border-b border-muted-foreground/50 z-10" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-r border-b border-muted-foreground/50 z-10" />

                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                ) : (
                    <div className="w-full h-full bg-muted flex items-center justify-center">
                        <span className="text-2xl text-muted-foreground font-light">
                            {title.charAt(0)}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="text-lg font-medium mb-2 tracking-tight">{title}</h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                    {description}
                </p>

                {/* Progress section */}
                <div className="mb-4">
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
                    <Link href={`/wishlist/${id}`} className={isFullyFunded ? 'flex-1' : 'flex-1'}>
                        <Button variant="heroOutline" size="sm" className="w-full group/btn">
                            Read more
                            <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                        </Button>
                    </Link>
                    {!isFullyFunded && (
                        <Link href={`/wishlist/${id}/contribute`} className="flex-1">
                            <Button variant="hero" size="sm" className="w-full">
                                Contribute
                            </Button>
                        </Link>
                    )}
                    {isFullyFunded && (
                        <div className="flex-1">
                            <Button
                                variant="hero"
                                size="sm"
                                className="w-full opacity-50 cursor-not-allowed"
                                disabled
                            >
                                Funded
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
