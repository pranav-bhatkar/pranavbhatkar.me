'use client'

import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useState } from 'react'
import {
    Pencil,
    Trash2,
    Plus,
    Eye,
    EyeOff,
    Home,
    Search,
    Filter,
    MoreVertical,
    ExternalLink,
    Heart,
    TrendingUp,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react'
import { Id } from '@/convex/_generated/dataModel'
import { formatINR } from '@/data/wishlistData'
import Link from 'next/link'

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: typeof Eye }> = {
    DRAFT: { color: 'text-yellow-500', bg: 'bg-yellow-500/10', icon: EyeOff },
    PUBLISHED: { color: 'text-green-500', bg: 'bg-green-500/10', icon: Eye },
    COMPLETED: { color: 'text-blue-500', bg: 'bg-blue-500/10', icon: CheckCircle2 },
    BOUGHT: { color: 'text-purple-500', bg: 'bg-purple-500/10', icon: CheckCircle2 },
    HIDE: { color: 'text-gray-500', bg: 'bg-gray-500/10', icon: EyeOff },
}

export default function AdminWishlistPage() {
    const wishlistItems = useQuery(api.wishlist.listForAdmin)
    const deleteItem = useMutation(api.wishlist.deleteItem)

    const [deleteConfirmId, setDeleteConfirmId] = useState<Id<'wishlistItems'> | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')

    const handleDelete = async (id: Id<'wishlistItems'>) => {
        try {
            await deleteItem({ id })
            setDeleteConfirmId(null)
        } catch (error) {
            console.error('Error deleting wishlist item:', error)
            alert('Failed to delete wishlist item')
        }
    }

    const filteredItems = wishlistItems?.filter((item) => {
        const matchesSearch =
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesStatus = statusFilter === 'all' || item.status === statusFilter
        return matchesSearch && matchesStatus
    })

    const stats = wishlistItems
        ? {
              total: wishlistItems.length,
              published: wishlistItems.filter((i) => i.status === 'PUBLISHED').length,
              totalRaised: wishlistItems.reduce(
                  (sum, i) => sum + i.selfContribution + i.collectedAmount,
                  0
              ),
          }
        : null

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Wishlist Items</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your wishlist items and track their progress
                    </p>
                </div>
                <Link
                    href="/admin/wishlist/new"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 shadow-lg shadow-primary/20"
                >
                    <Plus className="h-4 w-4" />
                    Add New Item
                </Link>
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 grid-cols-3">
                <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-primary/10">
                        <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">{stats?.total ?? '--'}</p>
                        <p className="text-xs text-muted-foreground">Total Items</p>
                    </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-green-500/10">
                        <Eye className="h-5 w-5 text-green-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">
                            {stats?.published ?? '--'}
                        </p>
                        <p className="text-xs text-muted-foreground">Published</p>
                    </div>
                </div>
                <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-500/10">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-foreground">
                            {stats ? formatINR(stats.totalRaised) : '--'}
                        </p>
                        <p className="text-xs text-muted-foreground">Total Raised</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search items..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-xl border border-border bg-card px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                        <option value="all">All Status</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="DRAFT">Draft</option>
                        <option value="COMPLETED">Completed</option>
                        <option value="BOUGHT">Bought</option>
                        <option value="HIDE">Hidden</option>
                    </select>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {deleteConfirmId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md rounded-2xl bg-card border border-border p-6 shadow-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-full bg-destructive/10">
                                <AlertCircle className="h-6 w-6 text-destructive" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground">Delete Item</h3>
                                <p className="text-sm text-muted-foreground">
                                    This action cannot be undone
                                </p>
                            </div>
                        </div>
                        <p className="mb-6 text-muted-foreground">
                            Are you sure you want to delete this wishlist item? All associated data
                            including contributions will be permanently removed.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirmId)}
                                className="rounded-xl bg-destructive px-4 py-2.5 text-sm font-medium text-destructive-foreground transition-colors hover:opacity-90"
                            >
                                Delete Item
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Items Grid */}
            {!wishlistItems ? (
                <div className="rounded-2xl border border-border bg-card p-12 text-center">
                    <div className="h-10 w-10 mx-auto rounded-full border-2 border-primary/30 border-t-primary animate-spin mb-4" />
                    <p className="text-muted-foreground">Loading wishlist items...</p>
                </div>
            ) : filteredItems?.length === 0 ? (
                <div className="rounded-2xl border border-border bg-card p-12 text-center">
                    <Heart className="h-12 w-12 mx-auto text-muted-foreground/30 mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No items found</h3>
                    <p className="text-muted-foreground mb-4">
                        {searchQuery || statusFilter !== 'all'
                            ? 'Try adjusting your search or filters'
                            : 'Create your first wishlist item to get started'}
                    </p>
                    {!searchQuery && statusFilter === 'all' && (
                        <Link
                            href="/admin/wishlist/new"
                            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
                        >
                            <Plus className="h-4 w-4" />
                            Add Item
                        </Link>
                    )}
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredItems?.map((item) => {
                        const totalAmount = item.selfContribution + item.collectedAmount
                        const progress = Math.min((totalAmount / item.targetAmount) * 100, 100)
                        const statusConfig = STATUS_CONFIG[item.status] || STATUS_CONFIG.DRAFT
                        const StatusIcon = statusConfig.icon

                        return (
                            <div
                                key={item._id}
                                className="group rounded-2xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg"
                            >
                                {/* Image */}
                                <div className="relative aspect-video bg-muted">
                                    {item.imageUrl ? (
                                        <img
                                            src={item.imageUrl}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center">
                                            <Heart className="h-12 w-12 text-muted-foreground/30" />
                                        </div>
                                    )}

                                    {/* Status Badge */}
                                    <div
                                        className={`absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}
                                    >
                                        <StatusIcon className="h-3 w-3" />
                                        {item.status}
                                    </div>

                                    {/* Landing Page Badge */}
                                    {item.showOnLandingPage && (
                                        <div className="absolute top-3 right-3 p-1.5 rounded-full bg-primary/90 text-primary-foreground">
                                            <Home className="h-3 w-3" />
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-5">
                                    <div className="flex items-start justify-between gap-2 mb-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-semibold text-foreground truncate">
                                                {item.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress */}
                                    <div className="mb-4">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="font-medium text-foreground">
                                                {formatINR(totalAmount)}
                                            </span>
                                            <span className="text-muted-foreground">
                                                {Math.round(progress)}%
                                            </span>
                                        </div>
                                        <div className="h-2 rounded-full bg-muted overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all ${progress >= 100 ? 'bg-green-500' : 'bg-primary'}`}
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                        <div className="flex justify-between text-xs text-muted-foreground mt-2">
                                            <span>Self: {formatINR(item.selfContribution)}</span>
                                            <span>Goal: {formatINR(item.targetAmount)}</span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex items-center gap-2 pt-3 border-t border-border">
                                        <Link
                                            href={`/admin/wishlist/${item._id}/edit`}
                                            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-muted px-3 py-2 text-sm font-medium text-foreground hover:bg-muted/80 transition-colors"
                                        >
                                            <Pencil className="h-4 w-4" />
                                            Edit
                                        </Link>
                                        <Link
                                            href={`/wishlist/${item.id}`}
                                            target="_blank"
                                            className="p-2 rounded-xl bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                                        >
                                            <ExternalLink className="h-4 w-4" />
                                        </Link>
                                        <button
                                            onClick={() => setDeleteConfirmId(item._id)}
                                            className="p-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
