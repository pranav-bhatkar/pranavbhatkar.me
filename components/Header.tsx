'use client'

import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import { cn } from '@/scripts/utils/tailwind-helpers'
import { useEffect, useState } from 'react'

import Link from './Link'
import MobileNav from './MobileNav'
import SearchButton from './SearchButton'
import TransitionLink from './TransitionLink'

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    useEffect(() => {
        const changeBackground = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        document.addEventListener('scroll', changeBackground)

        return () => document.removeEventListener('scroll', changeBackground)
    }, [])
    return (
        <header
            className={cn(
                'fixed inset-x-0 top-4 left-[calc(100vw-100%)] z-40 flex h-[60px] mx-8 bento-md:mx-auto items-center justify-between rounded-md bg-secondary border-border border px-4 bento-md:px-8 shadow-sm saturate-100 backdrop-blur-[10px] transition-all duration-200 bento-md:max-w-[768px] bento-lg:max-w-[1168px]',
                isScrolled && 'bg-secondary/80 border-transparent'
            )}
        >
            <div className="w-full mx-auto flex h-[60px] items-center justify-between">
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
            </div>
        </header>
    )
}

export default Header
