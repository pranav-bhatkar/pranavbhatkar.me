'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { LayoutDashboard, List, Home } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoaded } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && !user) {
            router.push('/sign-in')
        } else if (isLoaded && user) {
            const role = user.publicMetadata?.role
            if (role !== 'admin') {
                router.push('/admin/unauthorized')
            }
        }
    }, [isLoaded, user, router])

    if (!isLoaded || !user || user.publicMetadata?.role !== 'admin') {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="mb-4 text-lg">Loading...</div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
                <div className="flex h-full flex-col">
                    {/* Header */}
                    <div className="border-b border-gray-200 p-6 dark:border-gray-800">
                        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                            Admin Panel
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-1 p-4">
                        <Link
                            href="/admin"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            <LayoutDashboard className="h-5 w-5" />
                            <span>Dashboard</span>
                        </Link>
                        <Link
                            href="/admin/wishlist"
                            className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        >
                            <List className="h-5 w-5" />
                            <span>Wishlist</span>
                        </Link>
                    </nav>

                    {/* User Card & Actions */}
                    <div className="border-t border-gray-200 dark:border-gray-800">
                        {/* User Profile Card */}
                        <div className="border-b border-gray-200 p-4 dark:border-gray-800">
                            <div className="flex items-center gap-3">
                                <UserButton
                                    appearance={{
                                        elements: {
                                            avatarBox: 'h-10 w-10',
                                        },
                                    }}
                                />
                                <div className="flex-1 overflow-hidden">
                                    <p className="truncate text-sm font-medium text-gray-900 dark:text-gray-100">
                                        {user.firstName} {user.lastName}
                                    </p>
                                    <p className="truncate text-xs text-gray-500 dark:text-gray-400">
                                        {user.primaryEmailAddress?.emailAddress}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Back to Site */}
                        <div className="p-4">
                            <Link
                                href="/"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-700 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            >
                                <Home className="h-5 w-5" />
                                <span>Back to Site</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                <div className="container mx-auto p-8">{children}</div>
            </main>
        </div>
    )
}

