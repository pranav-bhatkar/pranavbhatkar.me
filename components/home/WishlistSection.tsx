'use client'

import WishlistCard from '@/components/wishlist/WishlistCard'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { ArrowRight, Heart } from 'lucide-react'
import Link from 'next/link'

import BlurFade from '../magicui/blur-fade'

const BLUR_FADE_DELAY = 0.04

export default function WishlistSection() {
    const wishlistItems = useQuery(api.wishlist.list)

    // Show only first 3 items
    const featuredItems = wishlistItems?.slice(0, 3) || []

    // Don't show section if no items (after loading completes)
    if (wishlistItems !== undefined && wishlistItems.length === 0) {
        return null
    }

    // Show loading state or nothing while loading
    if (wishlistItems === undefined) {
        return null
    }

    return (
        <section
            id="wishlist"
            className="container border-t border-t-[var(--pattern-fg)] py-10 px-6 md:px-8"
        >
            <div className="">
                {/* Section header */}

                <BlurFade delay={BLUR_FADE_DELAY * 13}>
                    <p className="text-sm tracking-widest uppercase text-muted-foreground mb-2">
                        Support My Journey
                    </p>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 14}>
                    <h2 className="text-xl font-bold mb-2">Wishlist</h2>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 15}>
                    <p className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert leading-relaxed mb-4">
                        The stuff that I want to buy or will help me build better. Every
                        contribution moves the needle.
                    </p>
                </BlurFade>

                {/* Wishlist grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featuredItems.map((item) => (
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
            </div>
        </section>
    )
}
