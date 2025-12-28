'use client'

import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import { cn } from '@/scripts/utils/tailwind-helpers'
import { useScroll } from 'framer-motion'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import MobileNav from './MobileNav'
import SearchButton from './SearchButton'
import TransitionLink from './TransitionLink'

// import SearchButton from './SearchButton'

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
        <div className="container max-w-7xl w-full mx-auto px-0 sm:px-6 md:px-8">
            <motion.nav
                animate={{
                    boxShadow: hasScrolled ? 'var(--shadow-aceternity)' : 'none',
                    width: hasScrolled ? '90%' : '100%',
                    y: hasScrolled ? 10 : 0,
                }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className={cn(
                    'mx-auto flex items-center justify-between rounded-md px-3 py-2 backdrop-blur-sm transition-colors duration-300 ease-in-out',
                    hasScrolled
                        ? 'bg-white dark:bg-[#141414]/50 border border-[var(--pattern-fg)]'
                        : 'bg-white/50 dark:bg-background border-b border-b-[var(--pattern-fg)]'
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
                    <ul className="hidden space-x-2 md:flex">
                        {headerNavLinks.map((link, i) => (
                            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                            <li key={i}>
                                <TransitionLink
                                    className="rounded px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-300 hover:bg-secondary hover:brightness-125"
                                    href={link.href}
                                    label={link.title}
                                />
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
