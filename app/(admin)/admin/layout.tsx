'use client'

import MeshGradient from '@/components/MeshGradient'
import { UserButton, useUser } from '@clerk/nextjs'
import {
    ChevronRight,
    Heart,
    Home,
    LayoutDashboard,
    Settings,
    Sparkles,
} from 'lucide-react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

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
            <div className="flex min-h-screen items-center justify-center">
                <MeshGradient dimmed />
                <div className="text-center z-10">
                    <div className="h-8 w-8 mx-auto rounded-full border-2 border-foreground/20 border-t-foreground animate-spin" />
                    <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    const isActiveRoute = (href: string) => {
        if (href === '/admin') return pathname === '/admin'
        return pathname.startsWith(href)
    }

    return (
        <div className="flex min-h-screen">
            <MeshGradient dimmed />

            {/* Sidebar */}
            <aside className="w-64 border-r border-border bg-background/80 backdrop-blur-sm flex flex-col z-10 relative">
                {/* Brand */}
                <div className="p-5 border-b border-border">
                    <h1 className="font-bold text-foreground text-sm">Command Center</h1>
                    <p className="text-xs text-muted-foreground">Admin</p>
                </div>

                {/* Nav */}
                <nav className="flex-1 p-3 space-y-1">
                    <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider px-3 mb-3">
                        Navigation
                    </p>
                    {navItems.map((item) => {
                        const isActive = isActiveRoute(item.href)
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                                    isActive
                                        ? 'bg-foreground/10 text-foreground'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                                }`}
                            >
                                <item.icon className="h-4 w-4" />
                                <div className="flex-1">
                                    <span className="font-medium">{item.label}</span>
                                    <p className="text-[11px] text-muted-foreground">
                                        {item.description}
                                    </p>
                                </div>
                                {isActive && <ChevronRight className="h-3.5 w-3.5" />}
                            </Link>
                        )
                    })}
                </nav>

                {/* User */}
                <div className="p-3 border-t border-border space-y-2">
                    <div className="flex items-center gap-3 px-3 py-2">
                        <UserButton
                            appearance={{
                                elements: {
                                    avatarBox: 'h-8 w-8',
                                },
                            }}
                        />
                        <div className="flex-1 overflow-hidden">
                            <p className="truncate text-sm font-medium text-foreground">
                                {user.firstName} {user.lastName}
                            </p>
                            <p className="truncate text-[11px] text-muted-foreground">
                                {user.primaryEmailAddress?.emailAddress}
                            </p>
                        </div>
                    </div>

                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground border border-border hover:border-foreground/20"
                    >
                        <Home className="h-3.5 w-3.5" />
                        <span>Back to Site</span>
                    </Link>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 overflow-auto z-10 relative">
                <div className="p-8">{children}</div>
            </main>
        </div>
    )
}
