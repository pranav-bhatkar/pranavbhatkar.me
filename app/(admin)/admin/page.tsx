'use client'

import Link from 'next/link'
import { List } from 'lucide-react'

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="mb-8 text-3xl font-bold text-foreground">
                Dashboard
            </h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Link
                    href="/admin/wishlist"
                    className="group rounded-lg border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                    <div className="mb-4 flex items-center gap-3">
                        <div className="rounded-lg bg-primary/20 p-3">
                            <List className="h-6 w-6 text-primary" />
                        </div>
                        <h2 className="text-xl font-semibold text-card-foreground">
                            Wishlist
                        </h2>
                    </div>
                    <p className="text-muted-foreground">
                        Manage your wishlist items, track progress, and update goals.
                    </p>
                </Link>
            </div>
        </div>
    )
}

