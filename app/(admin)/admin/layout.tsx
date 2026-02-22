'use client'

import { UserButton, useUser } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import {
    LayoutDashboard,
    Heart,
    Home,
    Sparkles,
    TrendingUp,
    Settings,
    ChevronRight,
} from 'lucide-react'

const navItems = [
    {
        href: '/admin',
        label: 'Dashboard',
        icon: LayoutDashboard,
        description: 'Overview & stats',
    },
    {
        href: '/admin/wishlist',
        label: 'Wishlist',
        icon: Heart,
        description: 'Manage items',
    },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const { user, isLoaded } = useUser()
    const router = useRouter()
    const pathname = usePathname()

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
            <div className="flex min-h-screen items-center justify-center bg-background">
                <div className="text-center">
                    <div className="relative">
                        <div className="h-12 w-12 mx-auto rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                        <Sparkles className="h-5 w-5 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground">Loading admin panel...</p>
                </div>
            </div>
        )
    }

    const isActiveRoute = (href: string) => {
        if (href === '/admin') {
            return pathname === '/admin'
        }
        return pathname.startsWith(href)
    }

    return (
        <div className="flex min-h-screen bg-background">
            {/* Sidebar */}
            <aside className="w-72 border-r border-border bg-card/50 backdrop-blur-sm flex flex-col">
                {/* Logo & Brand */}
                <div className="p-6 border-b border-border">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg shadow-primary/20">
                                <Sparkles className="h-5 w-5 text-primary-foreground" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
                        </div>
                        <div>
                            <h1 className="font-bold text-foreground">Command Center</h1>
                            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-4 space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider px-3 mb-3">
                        Navigation
                    </p>
                    {navItems.map((item) => {
                        const isActive = isActiveRoute(item.href)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-all duration-200 ${
                                    isActive
                                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/20'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                }`}
                            >
                                <div
                                    className={`p-2 rounded-lg transition-colors ${
                                        isActive
                                            ? 'bg-primary-foreground/20'
                                            : 'bg-muted group-hover:bg-background'
                                    }`}
                                >
                                    <item.icon className="h-4 w-4" />
                                </div>
                                <div className="flex-1">
                                    <span className="font-medium text-sm">{item.label}</span>
                                    <p
                                        className={`text-xs ${isActive ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}
                                    >
                                        {item.description}
                                    </p>
                                </div>
                                <ChevronRight
                                    className={`h-4 w-4 transition-transform ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}
                                />
                            </Link>
                        )
                    })}
                </nav>

                {/* Quick Stats */}
                <div className="p-4 border-t border-border">
                    <div className="rounded-xl bg-gradient-to-br from-muted/50 to-muted p-4">
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-xs font-medium text-foreground">Quick Stats</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div className="text-center p-2 rounded-lg bg-background/50">
                                <p className="text-lg font-bold text-foreground">--</p>
                                <p className="text-[10px] text-muted-foreground">Items</p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-background/50">
                                <p className="text-lg font-bold text-green-500">--</p>
                                <p className="text-[10px] text-muted-foreground">Funded</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* User Section */}
                <div className="p-4 border-t border-border">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 mb-3">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: 'h-10 w-10 ring-2 ring-primary/20',
                                },
                            }}
                        />
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-medium text-foreground">
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="truncate text-xs text-muted-foreground">
                                {user.primaryEmailAddress?.emailAddress}
                            </p>
                        </div>
                        <Settings className="h-4 w-4 text-muted-foreground" />
                    </div>

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:text-foreground hover:bg-muted border border-border hover:border-foreground/20"
                    >
                        <Home className="h-4 w-4" />
                        <span>Back to Site</span>
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">{children}</div>
            </main>
        </div>
    )
}
