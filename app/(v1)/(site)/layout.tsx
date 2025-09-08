import SectionContainer from '@/components/SectionContainer'
import DotPattern from '@/components/magicui/dot-pattern'
import { cn } from '@/scripts/utils/tailwind-helpers'
import React from 'react'
import { PostHogProvider } from '@/components/analytics/PostHogProvider'

function layout({ children }) {
    return (
        <PostHogProvider>
            <main className="relative mt-16">
                <SectionContainer>
                    <div className="flex h-full flex-col justify-between font-sans">{children}</div>
                </SectionContainer>
                <DotPattern
                    className={cn(
                        'fixed  -z-10 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]'
                    )}
                />
            </main>
        </PostHogProvider>
    )
}

export default layout
