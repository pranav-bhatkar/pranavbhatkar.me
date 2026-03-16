'use client'

import { api } from '@/convex/_generated/api'
import { formatINR } from '@/data/wishlistData'
import { useQuery } from 'convex/react'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import BlurFade from '../magicui/blur-fade'

const BLUR_FADE_DELAY = 0.04

export default function WishlistSection() {
    const wishlistItems = useQuery(api.wishlist.listForLandingPage)

    const featuredItems = wishlistItems?.slice(0, 3) || []

    if (wishlistItems !== undefined && wishlistItems.length === 0) {
        return null
    }

    if (wishlistItems === undefined) {
        return null
    }

    return (
        <section
            id="wishlist"
            className="border-t border-t-[var(--pattern-fg)] py-10 px-4 sm:px-6 md:px-8"
        >
            <BlurFade delay={BLUR_FADE_DELAY * 13}>
                <h2 className="text-xl font-bold mb-4">Wishlist</h2>
            </BlurFade>

            <div className="space-y-4">
                {featuredItems.map((item, i) => {
                    const total = item.selfContribution + item.collectedAmount
                    const progress = Math.min(Math.round((total / item.targetAmount) * 100), 100)
                    return (
                        <BlurFade key={item._id} delay={BLUR_FADE_DELAY * 14 + i * 0.05}>
                            <Link
                                href={`/wishlist/${item.id}`}
                                className="group block border-b border-border last:border-b-0 py-4"
                            >
                                <div className="flex items-start gap-4">
                                    {item.imageUrl && (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-28 h-20 rounded-md object-cover shrink-0"
                                        />
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium group-hover:text-primary transition-colors">
                                            {item.title}
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                                            {item.description}
                                        </p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-sm font-medium">
                                            {formatINR(total)}
                                            <span className="text-muted-foreground font-normal">
                                                {' '}
                                                / {formatINR(item.targetAmount)}
                                            </span>
                                        </p>
                                        <p className="text-xs text-muted-foreground">{progress}%</p>
                                    </div>
                                </div>
                            </Link>
                        </BlurFade>
                    )
                })}
            </div>

            <BlurFade delay={BLUR_FADE_DELAY * 16}>
                <Link
                    href="/wishlist"
                    className="inline-flex items-center gap-1.5 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                    View wishlist <ArrowRight className="h-3.5 w-3.5" />
                </Link>
            </BlurFade>
        </section>
    )
}
