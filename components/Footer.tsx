'use client'

import siteMetadata from '@/data/siteMetadata'
import { Github, Instagram, Mail, Twitter } from 'lucide-react'

import Link from './Link'

export default function Footer() {
    return (
        <div className="relative">
            <footer>
                <div className="mt-16 flex flex-col items-center px-4">
                    <div className="mb-4 flex space-x-6">
                        {siteMetadata.email && (
                            <a
                                href={`mailto:${siteMetadata.email}`}
                                aria-label="Pranav Bhatkar Email"
                                className="text-muted-foreground hover:brightness-125 dark:hover:brightness-125 transition-all"
                            >
                                <Mail size={28} className="sm:w-6 sm:h-6" />
                            </a>
                        )}
                        {siteMetadata.github && (
                            <a
                                href={siteMetadata.github}
                                aria-label="Pranav Bhatkar Github"
                                className="text-muted-foreground hover:brightness-125 dark:hover:brightness-125 transition-all"
                            >
                                <Github size={28} className="sm:w-6 sm:h-6" />
                            </a>
                        )}
                        {siteMetadata.instagram && (
                            <a
                                href={siteMetadata.instagram}
                                aria-label="Pranav Bhatkar Instagram"
                                className="text-muted-foreground hover:brightness-125 dark:hover:brightness-125 transition-all"
                            >
                                <Instagram size={28} className="sm:w-6 sm:h-6" />
                            </a>
                        )}
                    </div>
                    {/* {pathName == '/' && (
                    <div className="mb-2 text-xs text-muted-foreground/50">
                        Homepage assets by{' '}
                        <Link
                            href="https://freepik.com"
                            className="underline text-muted-foreground/75"
                        >
                            Freepik
                        </Link>
                    </div>
                )} */}
                    <div className="mb-10 flex flex-col items-center gap-1 text-sm text-muted-foreground sm:flex-row sm:space-x-2 sm:gap-0">
                        <div className="text-center">{siteMetadata.author}</div>
                        <div className="hidden sm:block">{` • `}</div>
                        <div>{`© ${new Date().getFullYear()}`}</div>
                        <div className="hidden sm:block">{` • `}</div>
                        <Link href="/" className="hover:text-foreground transition-colors">
                            {siteMetadata.title}
                        </Link>
                    </div>
                </div>
            </footer>
            <div className="relative mx-auto w-[calc(100%-2rem)] h-6 border-y border-y-[var(--pattern-fg)] bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-[length:10px_10px] bg-fixed sm:h-8" />
        </div>
    )
}
