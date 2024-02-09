'use client'

import Preloader from '@/components/Preloader'
import Hero from '@/components/home/Hero'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Home({ posts }) {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        ;(async () => {
            const LocomotiveScroll = (await import('locomotive-scroll')).default

            const locomotiveScroll = new LocomotiveScroll()

            setTimeout(() => {
                setIsLoading(false)

                document.body.style.cursor = 'default'

                window.scrollTo(0, 0)
            }, 2000)
        })()
    }, [])
    return (
        <>
            <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
            <main className="divide-y divide-accent-foreground dark:divide-accent">
                <Hero />
            </main>
        </>
    )
}
