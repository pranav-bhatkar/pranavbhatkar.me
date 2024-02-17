'use client'

import Preloader from '@/components/Preloader'
import Hero from '@/components/home/Hero'
import { cn } from '@/scripts/utils/tailwind-helpers'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Home() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            const LocomotiveScroll = (await import('locomotive-scroll')).default
            const locomotiveScroll = new LocomotiveScroll()
            setTimeout(() => {
                setIsLoading(false)

                window.scrollTo(0, 0)
            }, 2000)
        })()
    }, [])
    return (
        <>
            <main
                className={cn(
                    isLoading ? 'cursor-wait' : 'cursor-default',
                    'divide-y divide-accent-foreground dark:divide-accent'
                )}
            >
                <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
                <Hero />
            </main>
        </>
    )
}
