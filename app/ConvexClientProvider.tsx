'use client'

import { useAuth } from '@clerk/nextjs'
import { ConvexReactClient } from 'convex/react'
import { ConvexProvider } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ReactNode } from 'react'

const convex = new ConvexReactClient(
    process.env.NEXT_PUBLIC_CONVEX_URL || 'https://placeholder.convex.cloud'
)

const hasClerk = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function ConvexClientProvider({ children }: { children: ReactNode }) {
    if (!hasClerk) {
        return <ConvexProvider client={convex}>{children}</ConvexProvider>
    }

    return (
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
            {children}
        </ConvexProviderWithClerk>
    )
}
