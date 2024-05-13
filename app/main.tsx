'use client'

import Preloader from '@/components/Preloader'
import Projects from '@/components/home/Projects'
import { cn } from '@/scripts/utils/tailwind-helpers'
import { AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

// import Hero from '@/components/home/Hero'
import Hero from '../components/home/Hero'
import Introduction from '../components/home/Introduction'

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
            <main className={cn(isLoading ? 'cursor-wait' : 'cursor-default')}>
                <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence>
                <Hero />
                <Introduction />
                <Projects />
            </main>
        </>
    )
}
