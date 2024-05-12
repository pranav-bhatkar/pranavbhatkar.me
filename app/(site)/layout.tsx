import SectionContainer from '@/components/SectionContainer'
import DotPattern from '@/components/magicui/dot-pattern'
import { cn } from '@/scripts/utils/tailwind-helpers'
import React from 'react'

function layout({ children }) {
    return (
        <main className="relative ">
            <SectionContainer>
                <div className="flex h-full flex-col justify-between font-sans">{children}</div>
            </SectionContainer>
            <DotPattern
                className={cn(
                    'fixed  -z-10 [mask-image:radial-gradient(400px_circle_at_center,white,transparent)]'
                )}
            />
        </main>
    )
}

export default layout
