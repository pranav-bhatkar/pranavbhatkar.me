'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import Link from 'next/link'
import {
    Heart,
    TrendingUp,
    Users,
    IndianRupee,
    ArrowUpRight,
    Plus,
    Eye,
    EyeOff,
    CheckCircle2,
    Clock,
    Sparkles,
    Target,
    Zap,
} from 'lucide-react'
import { formatINR } from '@/data/wishlistData'

export default function AdminDashboard() {
    const wishlistItems = useQuery(api.wishlist.listForAdmin)

    const stats = wishlistItems
        ? {
              total: wishlistItems.length,
              published: wishlistItems.filter(
                  (i) => i.status === 'PUBLISHED' || !i.status
              ).length,
              completed: wishlistItems.filter((i) => i.status === 'COMPLETED').length,
              draft: wishlistItems.filter((i) => i.status === 'DRAFT').length,
              totalTarget: wishlistItems.reduce((sum, i) => sum + i.targetAmount, 0),
              totalCollected: wishlistItems.reduce(
                  (sum, i) => sum + i.selfContribution + i.collectedAmount,
                  0
              ),
              communityContributions: wishlistItems.reduce(
                  (sum, i) => sum + i.collectedAmount,
                  0
              ),
          }
        : null

    const recentItems = wishlistItems?.slice(0, 5) || []

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
                    <p className="text-sm text-muted-foreground mt-1">
                        Overview of your wishlist.
                    </p>
                </div>
                <Link
                    href="/admin/wishlist/new"
                    className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
                >
                    <Plus className="h-4 w-4" />
                    New Item
                </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { icon: Heart, label: 'Total Items', value: stats?.total ?? '--' },
                    { icon: Users, label: 'Community Raised', value: stats ? formatINR(stats.communityContributions) : '--' },
                    { icon: Target, label: 'Total Goals', value: stats ? formatINR(stats.totalTarget) : '--' },
                    { icon: Zap, label: 'Completion', value: stats && stats.total > 0 ? `${Math.round((stats.completed / stats.total) * 100)}%` : '0%' },
                ].map((stat) => (
                    <div key={stat.label} className="rounded-md border border-border p-5">
                        <div className="flex items-center gap-2 mb-3">
                            <stat.icon className="h-4 w-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{stat.label}</span>
                        </div>
                        <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* Content */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Items */}
                <div className="lg:col-span-2 rounded-md border border-border">
                    <div className="p-5 border-b border-border flex items-center justify-between">
                        <div>
                            <h2 className="font-semibold text-foreground text-sm">Recent Items</h2>
                            <p className="text-xs text-muted-foreground">Latest wishlist items</p>
                        </div>
                        <Link
                            href="/admin/wishlist"
                            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="divide-y divide-border">
                        {!wishlistItems ? (
                            <div className="p-8 text-center text-muted-foreground text-sm">
                                Loading...
                            </div>
                        ) : recentItems.length === 0 ? (
                            <div className="p-8 text-center">
                                <p className="text-sm text-muted-foreground">No items yet</p>
                                <Link
                                    href="/admin/wishlist/new"
                                    className="inline-flex items-center gap-1 mt-2 text-sm text-muted-foreground hover:text-foreground"
                                >
                                    Create your first item
                                    <ArrowUpRight className="h-3 w-3" />
                                </Link>
                            </div>
                        ) : (
                            recentItems.map((item) => {
                                const total = item.selfContribution + item.collectedAmount
                                const progress = Math.min(
                                    (total / item.targetAmount) * 100,
                                    100
                                )
                                return (
                                    <Link
                                        key={item._id}
                                        href={`/admin/wishlist/${item._id}/edit`}
                                        className="flex items-center gap-4 p-4 hover:bg-foreground/5 transition-colors"
                                    >
                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="h-10 w-10 rounded-md object-cover"
                                            />
                                        ) : (
                                            <div className="h-10 w-10 rounded-md bg-foreground/5 flex items-center justify-center">
                                                <Heart className="h-4 w-4 text-muted-foreground" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="text-sm font-medium text-foreground truncate">
                                                    {item.title}
                                                </p>
                                                {item.status === 'DRAFT' && (
                                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium border border-border text-muted-foreground">
                                                        DRAFT
                                                    </span>
                                                )}
                                                {item.status === 'COMPLETED' && (
                                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium border border-border text-foreground">
                                                        FUNDED
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 mt-1">
                                                <div className="flex-1 h-1 rounded-full bg-foreground/10 overflow-hidden max-w-[150px]">
                                                    <div
                                                        className="h-full rounded-full bg-foreground/40"
                                                        style={{ width: `${progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-muted-foreground">
                                                    {Math.round(progress)}%
                                                </span>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-medium text-foreground">
                                                {formatINR(total)}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                of {formatINR(item.targetAmount)}
                                            </p>
                                        </div>
                                    </Link>
                                )
                            })
                        )}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Status */}
                    <div className="rounded-md border border-border p-5">
                        <h2 className="font-semibold text-foreground text-sm mb-4">Status</h2>
                        <div className="space-y-3">
                            {[
                                { icon: Eye, label: 'Published', value: stats?.published ?? '--' },
                                { icon: EyeOff, label: 'Drafts', value: stats?.draft ?? '--' },
                                { icon: CheckCircle2, label: 'Completed', value: stats?.completed ?? '--' },
                            ].map((s) => (
                                <div key={s.label} className="flex items-center justify-between py-2">
                                    <div className="flex items-center gap-2">
                                        <s.icon className="h-3.5 w-3.5 text-muted-foreground" />
                                        <span className="text-sm text-foreground">{s.label}</span>
                                    </div>
                                    <span className="text-sm font-medium text-foreground">{s.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-md border border-border p-5">
                        <h2 className="font-semibold text-foreground text-sm mb-4">Quick Actions</h2>
                        <div className="space-y-1">
                            {[
                                { href: '/admin/wishlist/new', icon: Plus, label: 'Add New Item' },
                                { href: '/admin/wishlist', icon: Heart, label: 'Manage Wishlist' },
                                { href: '/wishlist', icon: ArrowUpRight, label: 'View Public Page' },
                            ].map((action) => (
                                <Link
                                    key={action.label}
                                    href={action.href}
                                    target={action.href === '/wishlist' ? '_blank' : undefined}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                                >
                                    <action.icon className="h-3.5 w-3.5" />
                                    <span>{action.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
