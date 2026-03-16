'use client'

import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import { cn } from '@/scripts/utils/tailwind-helpers'
import { useScroll } from 'motion/react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import MobileNav from './MobileNav'
import SearchButton from './SearchButton'

const NewHeader = () => {
    const { scrollY } = useScroll()
    const [hasScrolled, setHasScrolled] = useState(false)

    useEffect(() => {
        const unsubscribe = scrollY.on('change', (latest) => {
            setHasScrolled(latest > 10)
        })
        return unsubscribe
    }, [scrollY])

    return (
        <div className="fixed inset-x-0 top-0 z-50 container px-4 md:px-[2rem] max-w-7xl w-full">
            <motion.nav
                animate={{
                    width: hasScrolled ? '90%' : '100%',
                    y: hasScrolled ? 10 : 0,
                }}
                transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                className={cn(
                    'mx-auto flex items-center justify-between px-3 py-4 md:py-2 transition-all duration-500 ease-out',
                    hasScrolled
                        ? 'glass-header rounded-md'
                        : 'bg-white/50 dark:bg-transparent border border-transparent border-b border-b-[var(--pattern-fg)]'
                )}
            >
                <Link
                    href={siteMetadata.siteUrl}
                    aria-label={siteMetadata.headerTitle}
                    className="logo font-medium font-inter"
                >
                    <p className="copyright">©</p>
                    <div className="name">
                        <p className="codeBy">Code by</p>
                        <p className="pranav">Pranav</p>
                        <p className="bhatkar">Bhatkar</p>
                    </div>
                </Link>
                <div className="flex items-center space-x-3">
                    <ul className="hidden space-x-2 py-1.5 md:flex">
                        {headerNavLinks.map((link, i) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            <li key={i}>
                                <Link
                                    className="rounded px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-secondary hover:brightness-125"
                                    href={link.href}
                                >
                                    {link.title}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <SearchButton />
                    {/* <ThemeSwitch /> */}
                    <MobileNav />
                </div>
            </motion.nav>
        </div>
    )
}

export default NewHeader
