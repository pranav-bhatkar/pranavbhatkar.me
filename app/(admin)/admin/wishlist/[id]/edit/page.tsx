'use client'

import { useMutation, useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useState, useEffect } from 'react'
import {
    Upload,
    ArrowLeft,
    Save,
    Image as ImageIcon,
    FileText,
    Settings2,
    Home,
    Pencil,
} from 'lucide-react'
import { Id } from '@/convex/_generated/dataModel'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'

const STATUS_OPTIONS = [
    { value: 'DRAFT', label: 'Draft', description: 'Hidden from public, work in progress' },
    { value: 'PUBLISHED', label: 'Published', description: 'Visible to everyone' },
    { value: 'COMPLETED', label: 'Completed', description: 'Goal reached, no more contributions' },
    { value: 'BOUGHT', label: 'Bought', description: 'Item has been purchased' },
    { value: 'HIDE', label: 'Hidden', description: 'Hidden from everywhere' },
] as const

interface WishlistFormData {
    title: string
    description: string
    targetAmount: string
    selfContribution: string
    markdown: string
    imageFile: File | null
    status: string
    showOnLandingPage: boolean
}

export default function EditWishlistPage() {
    const router = useRouter()
    const params = useParams()
    const itemId = params.id as Id<'wishlistItems'>

    const item = useQuery(api.wishlist.getByIdForAdmin, { id: itemId })
    const updateItem = useMutation(api.wishlist.update)
    const generateUploadUrl = useMutation(api.wishlist.generateUploadUrl)

    const [formData, setFormData] = useState<WishlistFormData>({
        title: '',
        description: '',
        targetAmount: '',
        selfContribution: '',
        markdown: '',
        imageFile: null,
        status: 'DRAFT',
        showOnLandingPage: false,
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [imagePreview, setImagePreview] = useState<string | null>(null)

    // Load item data when available
    useEffect(() => {
        if (item && !isLoaded) {
            setFormData({
                title: item.title,
                description: item.description,
                targetAmount: item.targetAmount.toString(),
                selfContribution: item.selfContribution.toString(),
                markdown: item.markdown,
                imageFile: null,
                status: item.status,
                showOnLandingPage: item.showOnLandingPage,
            })
            if (item.imageUrl) {
                setImagePreview(item.imageUrl)
            }
            setIsLoaded(true)
        }
    }, [item, isLoaded])

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData({ ...formData, imageFile: file })
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            let imageStorageId: Id<'_storage'> | undefined = undefined

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
            const selfContribution = parseFloat(formData.selfContribution) || 0

            await updateItem({
                id: itemId,
                title: formData.title,
                description: formData.description,
                targetAmount,
                selfContribution,
                markdown: formData.markdown,
                status: formData.status,
                showOnLandingPage: formData.showOnLandingPage,
                ...(imageStorageId && { imageStorageId }),
            })

            router.push('/admin/wishlist')
        } catch (error: any) {
            console.error('Error updating wishlist item:', error)
            alert(error.message || 'Failed to update wishlist item')
        } finally {
            setIsSubmitting(false)
        }
    }

    if (!item) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="text-center">
                    <div className="h-10 w-10 mx-auto rounded-full border-2 border-primary/30 border-t-primary animate-spin mb-4" />
                    <p className="text-muted-foreground">Loading item...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <Link
                    href="/admin/wishlist"
                    className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Wishlist
                </Link>
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10">
                        <Pencil className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">Edit Item</h1>
                        <p className="text-sm text-muted-foreground">
                            Editing:{' '}
                            <code className="bg-muted px-1.5 py-0.5 rounded text-xs">
                                {item.id}
                            </code>
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Info Card */}
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">Basic Information</span>
                    </div>
                    <div className="p-6 space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.title}
                                onChange={(e) =>
                                    setFormData({ ...formData, title: e.target.value })
                                }
                                placeholder="Item name"
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                                Short Description *
                            </label>
                            <textarea
                                required
                                rows={2}
                                value={formData.description}
                                onChange={(e) =>
                                    setFormData({ ...formData, description: e.target.value })
                                }
                                placeholder="Brief description for card display"
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Target Amount (INR) *
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        ₹
                                    </span>
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
                                        placeholder="0"
                                        className="w-full rounded-xl border border-border bg-background pl-8 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Your Contribution (INR)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
                                        ₹
                                    </span>
                                    <input
                                        type="number"
                                        step="1"
                                        min="0"
                                        value={formData.selfContribution}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                selfContribution: e.target.value,
                                            })
                                        }
                                        placeholder="0"
                                        className="w-full rounded-xl border border-border bg-background pl-8 pr-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Card */}
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-2">
                        <ImageIcon className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">Cover Image</span>
                    </div>
                    <div className="p-6">
                        <div className="flex items-start gap-6">
                            <div className="flex-shrink-0">
                                {imagePreview ? (
                                    <img
                                        src={imagePreview}
                                        alt="Preview"
                                        className="h-32 w-32 rounded-xl object-cover border border-border"
                                    />
                                ) : (
                                    <div className="h-32 w-32 rounded-xl bg-muted flex items-center justify-center border border-dashed border-border">
                                        <ImageIcon className="h-8 w-8 text-muted-foreground/50" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/50 hover:bg-muted/30 transition-colors">
                                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                                    <span className="text-sm font-medium text-foreground">
                                        {imagePreview ? 'Replace image' : 'Click to upload'}
                                    </span>
                                    <span className="text-xs text-muted-foreground mt-1">
                                        PNG, JPG up to 10MB
                                    </span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content Card */}
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">Detailed Content</span>
                    </div>
                    <div className="p-6">
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Markdown Content *
                        </label>
                        <textarea
                            required
                            rows={12}
                            value={formData.markdown}
                            onChange={(e) => setFormData({ ...formData, markdown: e.target.value })}
                            placeholder="## Why I Need This&#10;&#10;Write your detailed description using markdown..."
                            className="w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 font-mono text-sm resize-none"
                        />
                        <p className="mt-1.5 text-xs text-muted-foreground">
                            Supports markdown formatting. This content appears on the detail page.
                        </p>
                    </div>
                </div>

                {/* Settings Card */}
                <div className="rounded-2xl border border-border bg-card overflow-hidden">
                    <div className="p-4 border-b border-border bg-muted/30 flex items-center gap-2">
                        <Settings2 className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">Visibility Settings</span>
                    </div>
                    <div className="p-6 space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-foreground mb-3">
                                Status
                            </label>
                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                {STATUS_OPTIONS.map((option) => (
                                    <label
                                        key={option.value}
                                        className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                                            formData.status === option.value
                                                ? 'border-primary bg-primary/5'
                                                : 'border-border hover:border-primary/50'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="status"
                                            value={option.value}
                                            checked={formData.status === option.value}
                                            onChange={(e) =>
                                                setFormData({ ...formData, status: e.target.value })
                                            }
                                            className="mt-1 text-primary focus:ring-primary"
                                        />
                                        <div>
                                            <span className="font-medium text-sm text-foreground">
                                                {option.label}
                                            </span>
                                            <p className="text-xs text-muted-foreground mt-0.5">
                                                {option.description}
                                            </p>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border">
                            <label
                                className={`flex items-start gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
                                    formData.showOnLandingPage
                                        ? 'border-primary bg-primary/5'
                                        : 'border-border hover:border-primary/50'
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    checked={formData.showOnLandingPage}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            showOnLandingPage: e.target.checked,
                                        })
                                    }
                                    className="mt-1 rounded text-primary focus:ring-primary"
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <Home className="h-4 w-4 text-primary" />
                                        <span className="font-medium text-sm text-foreground">
                                            Show on Landing Page
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        Display this item in the wishlist section on your homepage
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4">
                    <Link
                        href="/admin/wishlist"
                        className="rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 disabled:opacity-50 shadow-lg shadow-primary/20"
                    >
                        <Save className="h-4 w-4" />
                        {isSubmitting ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    )
}
