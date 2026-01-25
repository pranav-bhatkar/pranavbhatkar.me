'use client'

import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useState } from 'react'
import { Pencil, Trash2, Plus, Upload, Check, X } from 'lucide-react'
import { Id } from '@/convex/_generated/dataModel'
import { formatINR } from '@/data/wishlistData'

interface WishlistFormData {
    id: string
    title: string
    description: string
    targetAmount: string
    selfContribution: string
    markdown: string
    imageFile: File | null
}

export default function AdminWishlistPage() {
    const wishlistItems = useQuery(api.wishlist.listForAdmin)
    const createItem = useMutation(api.wishlist.create)
    const updateItem = useMutation(api.wishlist.update)
    const deleteItem = useMutation(api.wishlist.deleteItem)
    const generateUploadUrl = useMutation(api.wishlist.generateUploadUrl)

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<Id<'wishlistItems'> | null>(null)
    const [formData, setFormData] = useState<WishlistFormData>({
        id: '',
        title: '',
        description: '',
        targetAmount: '',
        selfContribution: '',
        markdown: '',
        imageFile: null,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [deleteConfirmId, setDeleteConfirmId] = useState<Id<'wishlistItems'> | null>(null)

    const resetForm = () => {
        setFormData({
            id: '',
            title: '',
            description: '',
            targetAmount: '',
            selfContribution: '',
            markdown: '',
            imageFile: null,
        })
        setEditingId(null)
        setIsFormOpen(false)
    }

    const handleEdit = (item: any) => {
        setEditingId(item._id)
        setFormData({
            id: item.id,
            title: item.title,
            description: item.description,
            targetAmount: item.targetAmount.toString(),
            selfContribution: item.selfContribution.toString(),
            markdown: item.markdown || '',
            imageFile: null,
        })
        setIsFormOpen(true)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            let imageStorageId: Id<'_storage'> | undefined = undefined

            // Upload image if provided
            if (formData.imageFile) {
                const uploadUrl = await generateUploadUrl()
                const result = await fetch(uploadUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': formData.imageFile.type },
                    body: formData.imageFile,
                })
                const { storageId } = await result.json()
                imageStorageId = storageId
            }

            const targetAmount = parseFloat(formData.targetAmount)
            const selfContribution = parseFloat(formData.selfContribution)

            if (editingId) {
                // Update existing item
                await updateItem({
                    id: editingId,
                    title: formData.title,
                    description: formData.description,
                    targetAmount,
                    selfContribution,
                    markdown: formData.markdown,
                    ...(imageStorageId && { imageStorageId }),
                })
            } else {
                // Create new item
                if (!formData.id.trim()) {
                    alert('Please enter a unique ID (slug) for this item')
                    setIsSubmitting(false)
                    return
                }
                await createItem({
                    id: formData.id.trim(),
                    title: formData.title,
                    description: formData.description,
                    targetAmount,
                    selfContribution,
                    markdown: formData.markdown,
                    imageStorageId,
                })
            }

            resetForm()
        } catch (error: any) {
            console.error('Error saving wishlist item:', error)
            alert(error.message || 'Failed to save wishlist item')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async (id: Id<'wishlistItems'>) => {
        try {
            await deleteItem({ id })
            setDeleteConfirmId(null)
        } catch (error) {
            console.error('Error deleting wishlist item:', error)
            alert('Failed to delete wishlist item')
        }
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">Wishlist Management</h1>
                <button
                    onClick={() => setIsFormOpen(true)}
                    className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:opacity-90"
                >
                    <Plus className="h-5 w-5" />
                    Add Item
                </button>
            </div>

            {/* Form Modal */}
            {isFormOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-y-auto">
                    <div className="w-full max-w-4xl rounded-lg bg-card border border-border p-6 my-8">
                        <h2 className="mb-4 text-2xl font-bold text-card-foreground">
                            {editingId ? 'Edit Wishlist Item' : 'New Wishlist Item'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {!editingId && (
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-foreground">
                                        ID (Slug) *
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.id}
                                        onChange={(e) =>
                                            setFormData({ ...formData, id: e.target.value })
                                        }
                                        placeholder="e.g., macbook-pro-m3"
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
                                    />
                                    <p className="mt-1 text-xs text-muted-foreground">
                                        Unique identifier used in URLs (lowercase, hyphens only)
                                    </p>
                                </div>
                            )}

                            <div>
                                <label className="mb-1 block text-sm font-medium text-foreground">
                                    Title *
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
                                />
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-foreground">
                                    Description *
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
                                    placeholder="Short description shown in cards"
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-foreground">
                                        Target Amount (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        step="1"
                                        min="0"
                                        value={formData.targetAmount}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                targetAmount: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
                                    />
                                </div>

                                <div>
                                    <label className="mb-1 block text-sm font-medium text-foreground">
                                        Self Contribution (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        step="1"
                                        min="0"
                                        value={formData.selfContribution}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                selfContribution: e.target.value,
                                            })
                                        }
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-foreground">
                                    Markdown Content *
                                </label>
                                <textarea
                                    required
                                    rows={12}
                                    value={formData.markdown}
                                    onChange={(e) =>
                                        setFormData({ ...formData, markdown: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground font-mono text-sm"
                                    placeholder="## Why I Need This&#10;&#10;Write your detailed markdown content here..."
                                />
                                <p className="mt-1 text-xs text-muted-foreground">
                                    Full markdown content shown on the item detail page
                                </p>
                            </div>

                            <div>
                                <label className="mb-1 block text-sm font-medium text-foreground">
                                    Image
                                </label>
                                <div className="flex items-center gap-3">
                                    <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-input bg-background px-4 py-2 text-foreground transition-colors hover:bg-muted">
                                        <Upload className="h-4 w-4" />
                                        <span>Choose File</span>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    imageFile: e.target.files?.[0] || null,
                                                })
                                            }
                                            className="hidden"
                                        />
                                    </label>
                                    {formData.imageFile && (
                                        <span className="text-sm text-muted-foreground">
                                            {formData.imageFile.name}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    disabled={isSubmitting}
                                    className="rounded-lg border border-border px-4 py-2 text-foreground transition-colors hover:bg-muted"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-colors hover:opacity-90 disabled:opacity-50"
                                >
                                    {isSubmitting ? 'Saving...' : editingId ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteConfirmId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-md rounded-lg bg-card border border-border p-6">
                        <h3 className="mb-4 text-xl font-bold text-card-foreground">
                            Confirm Delete
                        </h3>
                        <p className="mb-6 text-muted-foreground">
                            Are you sure you want to delete this wishlist item? This action cannot
                            be undone.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="rounded-lg border border-border px-4 py-2 text-foreground transition-colors hover:bg-muted"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(deleteConfirmId)}
                                className="rounded-lg bg-destructive px-4 py-2 text-destructive-foreground transition-colors hover:opacity-90"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Wishlist Items Table */}
            <div className="rounded-lg border border-border bg-card">
                {!wishlistItems ? (
                    <div className="p-8 text-center text-muted-foreground">Loading...</div>
                ) : wishlistItems.length === 0 ? (
                    <div className="p-8 text-center text-muted-foreground">
                        No wishlist items yet. Create your first one!
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="border-b border-border bg-muted">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                        Item
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                        Progress
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                        ID
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {wishlistItems.map((item) => {
                                    const totalAmount = item.selfContribution + item.collectedAmount
                                    const progress = Math.min(
                                        (totalAmount / item.targetAmount) * 100,
                                        100
                                    )
                                    return (
                                        <tr key={item._id}>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    {item.imageUrl && (
                                                        <img
                                                            src={item.imageUrl}
                                                            alt={item.title}
                                                            className="h-12 w-12 rounded-lg object-cover"
                                                        />
                                                    )}
                                                    <div>
                                                        <div className="font-medium text-foreground">
                                                            {item.title}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {item.description.length > 50
                                                                ? item.description.substring(0, 50) +
                                                                  '...'
                                                                : item.description}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div>
                                                    <div className="text-sm font-medium text-foreground">
                                                        {formatINR(totalAmount)} /{' '}
                                                        {formatINR(item.targetAmount)} ({Math.round(progress)}%)
                                                    </div>
                                                    <div className="mt-1 h-2 w-48 rounded-full bg-muted">
                                                        <div
                                                            className="h-2 rounded-full bg-primary"
                                                            style={{
                                                                width: `${progress}%`,
                                                            }}
                                                        />
                                                    </div>
                                                    <div className="mt-1 text-xs text-muted-foreground">
                                                        Self: {formatINR(item.selfContribution)} | Community:{' '}
                                                        {formatINR(item.collectedAmount)}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <code className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
                                                    {item.id}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => handleEdit(item)}
                                                        className="rounded p-1 text-primary hover:bg-primary/10"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteConfirmId(item._id)}
                                                        className="rounded p-1 text-destructive hover:bg-destructive/10"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}
