'use client'

import headerNavLinks from '@/data/headerNavLinks'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import Link from './Link'
import TransitionLink from './TransitionLink'

const MobileNav = () => {
    const [navShow, setNavShow] = useState(false)

    const onToggleNav = () => {
        setNavShow((status) => {
            if (status) {
                document.body.style.overflow = 'auto'
            } else {
                // Prevent scrolling
                document.body.style.overflow = 'hidden'
            }
            return !status
        })
    }

    return (
        <>
            <button className="sm:hidden" aria-label="Toggle Menu" onClick={onToggleNav}>
                <Menu />
            </button>
            <div
                className={`fixed sm:hidden left-10  top-[3.75rem] z-50 !ml-0 h-screen w-screen transform bg-background opacity-95 duration-300 ease-in-out ${
                    navShow ? '-translate-x-20' : 'translate-x-full'
                }`}
            >
                <div className="flex justify-end">
                    <button
                        className="mr-8 mt-11 flex h-8 w-8 items-center justify-end"
                        aria-label="Toggle Menu"
                        onClick={onToggleNav}
                    >
                        <X />
                    </button>
                </div>
                <nav className="fixed mt-8 w-full">
                    {headerNavLinks.map((link) => (
                        <div key={link.title} className="px-12 py-4">
                            <TransitionLink
                                label={link.title}
                                href={link.href}
                                className="text-2xl font-bold tracking-widest text-foreground"
                                onClick={onToggleNav}
                            />
                        </div>
                    ))}
                </nav>
            </div>
        </>
    )
}

export default MobileNav
