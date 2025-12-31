'use client'

import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useState } from 'react'
import { Pencil, Trash2, Plus, Upload, Check, X } from 'lucide-react'
import { Id } from '@/convex/_generated/dataModel'

interface WishlistFormData {
    title: string
    description: string
    targetAmount: string
    deadline: string
    imageFile: File | null
}

export default function AdminWishlistPage() {
    const wishlistItems = useQuery(api.wishlist.listForAdmin)
    const createItem = useMutation(api.wishlist.create)
    const updateItem = useMutation(api.wishlist.update)
    const updateProgress = useMutation(api.wishlist.updateProgress)
    const markComplete = useMutation(api.wishlist.markComplete)
    const deleteItem = useMutation(api.wishlist.deleteItem)
    const generateUploadUrl = useMutation(api.wishlist.generateUploadUrl)

    const [isFormOpen, setIsFormOpen] = useState(false)
    const [editingId, setEditingId] = useState<Id<'wishlistItems'> | null>(null)
    const [formData, setFormData] = useState<WishlistFormData>({
        title: '',
        description: '',
        targetAmount: '',
        deadline: '',
        imageFile: null,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [deleteConfirmId, setDeleteConfirmId] = useState<Id<'wishlistItems'> | null>(null)

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            targetAmount: '',
            deadline: '',
            imageFile: null,
        })
        setEditingId(null)
        setIsFormOpen(false)
    }

    const handleEdit = (item: any) => {
        setEditingId(item._id)
        setFormData({
            title: item.title,
            description: item.description,
            targetAmount: item.targetAmount.toString(),
            deadline: new Date(item.deadline).toISOString().split('T')[0],
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

            const deadlineTimestamp = new Date(formData.deadline).getTime()
            const targetAmount = parseFloat(formData.targetAmount)

            if (editingId) {
                // Update existing item
                await updateItem({
                    id: editingId,
                    title: formData.title,
                    description: formData.description,
                    targetAmount,
                    deadline: deadlineTimestamp,
                    ...(imageStorageId && { imageStorageId }),
                })
            } else {
                // Create new item
                await createItem({
                    title: formData.title,
                    description: formData.description,
                    targetAmount,
                    deadline: deadlineTimestamp,
                    imageStorageId,
                })
            }

            resetForm()
        } catch (error) {
            console.error('Error saving wishlist item:', error)
            alert('Failed to save wishlist item')
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

    const handleToggleComplete = async (id: Id<'wishlistItems'>, currentStatus: boolean) => {
        try {
            await markComplete({ id, isCompleted: !currentStatus })
        } catch (error) {
            console.error('Error updating completion status:', error)
            alert('Failed to update completion status')
        }
    }

    const [editingProgress, setEditingProgress] = useState<{
        id: Id<'wishlistItems'>
        amount: string
    } | null>(null)

    const handleUpdateProgress = async () => {
        if (!editingProgress) return

        try {
            await updateProgress({
                id: editingProgress.id,
                collectedAmount: parseFloat(editingProgress.amount),
            })
            setEditingProgress(null)
        } catch (error) {
            console.error('Error updating progress:', error)
            alert('Failed to update progress')
        }
    }

    return (
        <div>
            <div className="mb-8 flex items-center justify-between">
                <h1 className="text-3xl font-bold text-foreground">
                    Wishlist Management
                </h1>
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
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
                    <div className="w-full max-w-2xl rounded-lg bg-card border border-border p-6">
                        <h2 className="mb-4 text-2xl font-bold text-card-foreground">
                            {editingId ? 'Edit Wishlist Item' : 'New Wishlist Item'}
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-foreground">
                                    Title
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
                                    Description
                                </label>
                                <textarea
                                    required
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                    className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
                                />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1 block text-sm font-medium text-foreground">
                                        Target Amount ($)
                                    </label>
                                    <input
                                        type="number"
                                        required
                                        step="0.01"
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
                                        Deadline
                                    </label>
                                    <input
                                        type="date"
                                        required
                                        value={formData.deadline}
                                        onChange={(e) =>
                                            setFormData({ ...formData, deadline: e.target.value })
                                        }
                                        className="w-full rounded-lg border border-input bg-background px-3 py-2 text-foreground"
                                    />
                                </div>
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
                                        Deadline
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-foreground">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {wishlistItems.map((item) => (
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
                                            {editingProgress?.id === item._id ? (
                                                <div className="flex items-center gap-2">
                                                    <input
                                                        type="number"
                                                        step="0.01"
                                                        value={editingProgress.amount}
                                                        onChange={(e) =>
                                                            setEditingProgress({
                                                                ...editingProgress,
                                                                amount: e.target.value,
                                                            })
                                                        }
                                                        className="w-24 rounded border border-input bg-background px-2 py-1 text-sm text-foreground"
                                                    />
                                                    <button
                                                        onClick={handleUpdateProgress}
                                                        className="text-green-600 hover:text-green-700"
                                                    >
                                                        <Check className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingProgress(null)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            ) : (
                                                <div
                                                    className="cursor-pointer"
                                                    onClick={() =>
                                                        setEditingProgress({
                                                            id: item._id,
                                                            amount: item.collectedAmount.toString(),
                                                        })
                                                    }
                                                >
                                                    <div className="text-sm font-medium text-foreground">
                                                        ${item.collectedAmount.toLocaleString()} / $
                                                        {item.targetAmount.toLocaleString()}
                                                    </div>
                                                    <div className="mt-1 h-2 w-32 rounded-full bg-muted">
                                                        <div
                                                            className="h-2 rounded-full bg-primary"
                                                            style={{
                                                                width: `${Math.min((item.collectedAmount / item.targetAmount) * 100, 100)}%`,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-muted-foreground">
                                            {new Date(item.deadline).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() =>
                                                    handleToggleComplete(item._id, item.isCompleted)
                                                }
                                                className={`rounded-full px-3 py-1 text-xs font-medium ${
                                                    item.isCompleted
                                                        ? 'bg-primary/20 text-primary'
                                                        : 'bg-muted text-muted-foreground'
                                                }`}
                                            >
                                                {item.isCompleted ? 'Completed' : 'Active'}
                                            </button>
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
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

