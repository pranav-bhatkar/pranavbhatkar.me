'use client'

import siteMetadata from '@/data/siteMetadata'
import { ThemeProvider } from 'next-themes'
import { useEffect } from 'react'

export function ThemeProviders({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        ;(async () => {
            const LocomotiveScroll = (await import('locomotive-scroll')).default
            const locomotiveScroll = new LocomotiveScroll()
        })()
    }, [])
    return (
        <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme} enableSystem>
            {children}
        </ThemeProvider>
    )
}
