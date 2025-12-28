import SectionContainer from '@/components/SectionContainer'
import DotPattern from '@/components/magicui/dot-pattern'
import { cn } from '@/scripts/utils/tailwind-helpers'
import React from 'react'

function layout({ children }) {
    return (
        <main className="relative">
            <div className="flex flex-col min-h-[100dvh]">{children}</div>
        </main>
    )
}

export default layout
