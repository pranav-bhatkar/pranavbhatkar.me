'use client'

import { Button } from '@/components/shadcn/button'
import DualProgressBar from '@/components/wishlist/DualProgressBar'
import { api } from '@/convex/_generated/api'
import { formatINR } from '@/data/wishlistData'
import { useQuery } from 'convex/react'
import { ArrowLeft, MessageSquare } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

export default function WishlistItemPage() {
    const params = useParams()
    const id = params.id as string

    const item = useQuery(api.wishlist.getById, { id })

    if (item === undefined) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center py-20">
                <div className="text-center">
                    <div className="mb-4 text-lg text-muted-foreground">Loading...</div>
                </div>
            </main>
        )
    }

    if (!item) {
        return (
            <main className="min-h-screen bg-background flex items-center justify-center py-20">
                <div className="text-center">
                    <h1 className="text-2xl font-medium mb-4">Item not found</h1>
                    <Link href="/wishlist">
                        <Button variant="heroOutline">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to wishlist
                        </Button>
                    </Link>
                </div>
            </main>
        )
    }

    const totalAmount = item.selfContribution + item.collectedAmount
    const progressPercentage = Math.min(Math.round((totalAmount / item.targetAmount) * 100), 100)
    const isFullyFunded = totalAmount >= item.targetAmount || item.status === 'COMPLETED'

    return (
        <main className="min-h-screen bg-background py-20">
            {/* Header */}
            <header className="border-b border-border">
                <div className="container px-6 md:px-8 py-6">
                    <Link
                        href="/wishlist"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to wishlist
                    </Link>
                </div>
            </header>

            <article className="container px-6 md:px-8 py-16">
                <div className="max-w-4xl mx-auto">
                    {/* Hero section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                        {/* Image */}
                        <div className="relative">
                            <div className="relative aspect-square">
                                {/* Border frame */}
                                <div className="absolute -inset-3 border border-border" />

                                {/* Corner brackets */}
                                <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-foreground z-10" />
                                <div className="absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-foreground z-10" />
                                <div className="absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-foreground z-10" />
                                <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-foreground z-10" />

                                {item.imageUrl ? (
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        className="w-full h-full object-cover grayscale"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center">
                                        <span className="text-6xl text-muted-foreground font-light">
                                            {item.title.charAt(0)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="flex flex-col justify-center">
                            <p className="text-sm tracking-widest uppercase text-muted-foreground mb-4">
                                Wishlist Item
                            </p>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight mb-4">
                                {item.title}
                            </h1>
                            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                                {item.description}
                            </p>

                            {/* Progress */}
                            <div className="mb-8 p-6 border border-border">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-2xl font-medium">
                                        {formatINR(totalAmount)}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        of {formatINR(item.targetAmount)} ({progressPercentage}%)
                                    </span>
                                </div>
                                <DualProgressBar
                                    selfAmount={item.selfContribution}
                                    communityAmount={item.collectedAmount}
                                    targetAmount={item.targetAmount}
                                    size="md"
                                />
                            </div>

                            {/* CTA */}
                            {isFullyFunded ? (
                                <div className="p-4 border border-green-500/30 bg-green-500/10 text-center">
                                    <p className="text-green-400 font-medium">
                                        This goal has been fully funded!
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Thank you to everyone who contributed.
                                    </p>
                                </div>
                            ) : (
                                <Link href={`/wishlist/${id}/contribute`}>
                                    <Button variant="hero" size="xl" className="w-full">
                                        Contribute to this goal
                                    </Button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Markdown content */}
                    <div className="prose prose-invert max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:text-muted-foreground prose-p:leading-relaxed prose-li:text-muted-foreground prose-strong:text-foreground prose-ol:my-4 prose-ul:my-4">
                        <ReactMarkdown>{item.markdown}</ReactMarkdown>
                    </div>

                    {/* Contributors section */}
                    {item.contributors.length > 0 && (
                        <div className="mt-16 pt-16 border-t border-border">
                            <h3 className="text-xl font-medium mb-2">Community Support</h3>
                            <p className="text-muted-foreground mb-8">
                                {item.contributors.length}{' '}
                                {item.contributors.length === 1 ? 'person has' : 'people have'}{' '}
                                contributed {formatINR(item.collectedAmount)} so far.
                            </p>

                            <div className="space-y-4">
                                {item.contributors.map((contributor) => (
                                    <div
                                        key={contributor._id}
                                        className="p-4 border border-border hover:border-muted-foreground/50 transition-colors"
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <span className="font-medium">
                                                    {contributor.name}
                                                </span>
                                                <span className="text-muted-foreground text-sm ml-2">
                                                    {new Date(contributor.date).toLocaleDateString(
                                                        'en-US',
                                                        {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric',
                                                        }
                                                    )}
                                                </span>
                                            </div>
                                            <span className="text-sm font-medium bg-muted px-2 py-1">
                                                {formatINR(contributor.amount)}
                                            </span>
                                        </div>
                                        {contributor.message && (
                                            <div className="flex items-start gap-2 text-sm text-muted-foreground">
                                                <MessageSquare className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                                <p>{contributor.message}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Bottom CTA */}
                    {!isFullyFunded && (
                        <div className="mt-16 pt-16 border-t border-border text-center">
                            <h3 className="text-xl font-medium mb-4">Ready to help?</h3>
                            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                                Every contribution, no matter how small, brings me closer to this
                                goal.
                            </p>
                            <Link href={`/wishlist/${id}/contribute`}>
                                <Button variant="hero" size="lg">
                                    Contribute now
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </article>
        </main>
    )
}
