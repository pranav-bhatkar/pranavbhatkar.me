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
            <button className="md:hidden" aria-label="Toggle Menu" onClick={onToggleNav}>
                <Menu />
            </button>
            {/* Overlay */}
            {navShow && (
                <div
                    className="fixed inset-0 z-40 bg-black  transition-opacity duration-300 sm:hidden"
                    onClick={onToggleNav}
                    aria-hidden="true"
                />
            )}
            {/* Mobile Menu */}
            <div
                className={`fixed md:hidden  right-0 -top-4 z-50 h-screen w-screen max-w-xs transform bg-background opacity-100 shadow-lg transition-transform duration-300 ease-in-out ${
                    navShow ? 'translate-x-10' : 'translate-x-[110%]'
                }`}
            >
                <div className="flex justify-end">
                    <button
                        className="m-6 flex h-8 w-8 items-center justify-center"
                        aria-label="Toggle Menu"
                        onClick={onToggleNav}
                    >
                        <X />
                    </button>
                </div>
                <nav className="mt-8 w-full ">
                    {headerNavLinks.map((link) => (
                        <div key={link.title} className="px-8 py-4">
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
