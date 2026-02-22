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

    // Calculate stats
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
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-muted-foreground">Live Dashboard</span>
                    </div>
                    <h1 className="text-3xl font-bold text-foreground">
                        Welcome back, Admin
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Here's what's happening with your wishlist today.
                    </p>
                </div>
                <Link
                    href="/admin/wishlist/new"
                    className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 shadow-lg shadow-primary/20"
                >
                    <Plus className="h-4 w-4" />
                    New Item
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Items */}
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
                    <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-primary/10 transition-transform group-hover:scale-150" />
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-primary/10">
                                <Heart className="h-5 w-5 text-primary" />
                            </div>
                            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-3xl font-bold text-foreground">
                            {stats?.total ?? '--'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">Total Items</p>
                    </div>
                </div>

                {/* Community Contributions */}
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-green-500/50 hover:shadow-lg">
                    <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-green-500/10 transition-transform group-hover:scale-150" />
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-green-500/10">
                                <Users className="h-5 w-5 text-green-500" />
                            </div>
                            <TrendingUp className="h-4 w-4 text-green-500" />
                        </div>
                        <p className="text-3xl font-bold text-foreground">
                            {stats ? formatINR(stats.communityContributions) : '--'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">Community Raised</p>
                    </div>
                </div>

                {/* Total Target */}
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-blue-500/50 hover:shadow-lg">
                    <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-blue-500/10 transition-transform group-hover:scale-150" />
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-blue-500/10">
                                <Target className="h-5 w-5 text-blue-500" />
                            </div>
                            <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <p className="text-3xl font-bold text-foreground">
                            {stats ? formatINR(stats.totalTarget) : '--'}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">Total Goals</p>
                    </div>
                </div>

                {/* Completion Rate */}
                <div className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all hover:border-purple-500/50 hover:shadow-lg">
                    <div className="absolute top-0 right-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-purple-500/10 transition-transform group-hover:scale-150" />
                    <div className="relative">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-purple-500/10">
                                <Zap className="h-5 w-5 text-purple-500" />
                            </div>
                            <CheckCircle2 className="h-4 w-4 text-purple-500" />
                        </div>
                        <p className="text-3xl font-bold text-foreground">
                            {stats && stats.total > 0
                                ? Math.round((stats.completed / stats.total) * 100)
                                : 0}
                            %
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">Completion Rate</p>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Recent Items */}
                <div className="lg:col-span-2 rounded-2xl border border-border bg-card overflow-hidden">
                    <div className="p-6 border-b border-border flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-primary/10">
                                <Clock className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-foreground">Recent Items</h2>
                                <p className="text-xs text-muted-foreground">
                                    Your latest wishlist items
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/admin/wishlist"
                            className="text-sm text-primary hover:underline"
                        >
                            View all
                        </Link>
                    </div>
                    <div className="divide-y divide-border">
                        {!wishlistItems ? (
                            <div className="p-8 text-center text-muted-foreground">
                                <div className="h-8 w-8 mx-auto rounded-full border-2 border-primary/30 border-t-primary animate-spin mb-3" />
                                Loading...
                            </div>
                        ) : recentItems.length === 0 ? (
                            <div className="p-8 text-center">
                                <Sparkles className="h-12 w-12 mx-auto text-muted-foreground/30 mb-3" />
                                <p className="text-muted-foreground">No items yet</p>
                                <Link
                                    href="/admin/wishlist/new"
                                    className="inline-flex items-center gap-1 mt-2 text-sm text-primary hover:underline"
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
                                        className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                                    >
                                        {item.imageUrl ? (
                                            <img
                                                src={item.imageUrl}
                                                alt={item.title}
                                                className="h-12 w-12 rounded-xl object-cover"
                                            />
                                        ) : (
                                            <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center">
                                                <Heart className="h-5 w-5 text-muted-foreground" />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-2">
                                                <p className="font-medium text-foreground truncate">
                                                    {item.title}
                                                </p>
                                                {item.status === 'DRAFT' && (
                                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-yellow-500/20 text-yellow-500">
                                                        DRAFT
                                                    </span>
                                                )}
                                                {item.status === 'COMPLETED' && (
                                                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-green-500/20 text-green-500">
                                                        FUNDED
                                                    </span>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-3 mt-1">
                                                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden max-w-[150px]">
                                                    <div
                                                        className={`h-full rounded-full ${progress >= 100 ? 'bg-green-500' : 'bg-primary'}`}
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

                {/* Status Overview */}
                <div className="space-y-4">
                    {/* Status Cards */}
                    <div className="rounded-2xl border border-border bg-card p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 rounded-xl bg-primary/10">
                                <Eye className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-foreground">Status Overview</h2>
                                <p className="text-xs text-muted-foreground">
                                    Items by visibility
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/10">
                                <div className="flex items-center gap-3">
                                    <Eye className="h-4 w-4 text-green-500" />
                                    <span className="text-sm font-medium text-foreground">
                                        Published
                                    </span>
                                </div>
                                <span className="text-lg font-bold text-green-500">
                                    {stats?.published ?? '--'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-xl bg-yellow-500/10">
                                <div className="flex items-center gap-3">
                                    <EyeOff className="h-4 w-4 text-yellow-500" />
                                    <span className="text-sm font-medium text-foreground">
                                        Drafts
                                    </span>
                                </div>
                                <span className="text-lg font-bold text-yellow-500">
                                    {stats?.draft ?? '--'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-xl bg-blue-500/10">
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 className="h-4 w-4 text-blue-500" />
                                    <span className="text-sm font-medium text-foreground">
                                        Completed
                                    </span>
                                </div>
                                <span className="text-lg font-bold text-blue-500">
                                    {stats?.completed ?? '--'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="rounded-2xl border border-border bg-card p-6">
                        <h2 className="font-semibold text-foreground mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <Link
                                href="/admin/wishlist/new"
                                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                            >
                                <Plus className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">Add New Item</span>
                            </Link>
                            <Link
                                href="/admin/wishlist"
                                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                            >
                                <Heart className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">Manage Wishlist</span>
                            </Link>
                            <Link
                                href="/wishlist"
                                target="_blank"
                                className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                            >
                                <ArrowUpRight className="h-4 w-4 text-primary" />
                                <span className="text-sm font-medium">View Public Page</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
