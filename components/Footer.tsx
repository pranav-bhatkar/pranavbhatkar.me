'use client'

import siteMetadata from '@/data/siteMetadata'
import { Github, Instagram, Mail, Twitter } from 'lucide-react'

import Link from './Link'

export default function Footer() {
    return (
        <footer>
            <div className="mt-16 flex flex-col items-center">
                <div className="mb-3 flex space-x-4">
                    {siteMetadata.twitter && (
                        <a
                            href={siteMetadata.twitter}
                            aria-label="Pranav Bhatkar Twitter"
                            className="text-muted-foreground hover:brightness-125 dark:hover:brightness-125"
                        >
                            <Twitter size={24} />
                        </a>
                    )}
                    {siteMetadata.email && (
                        <a
                            href={`mailto:${siteMetadata.email}`}
                            aria-label="Pranav Bhatkar Email"
                            className="text-muted-foreground hover:brightness-125 dark:hover:brightness-125"
                        >
                            <Mail size={24} />
                        </a>
                    )}
                    {siteMetadata.github && (
                        <a
                            href={siteMetadata.github}
                            aria-label="Pranav Bhatkar Github"
                            className="text-muted-foreground hover:brightness-125 dark:hover:brightness-125"
                        >
                            <Github size={24} />
                        </a>
                    )}
                    {siteMetadata.instagram && (
                        <a
                            href={siteMetadata.instagram}
                            aria-label="Pranav Bhatkar Instagram"
                            className="text-muted-foreground hover:brightness-125 dark:hover:brightness-125"
                        >
                            <Instagram size={24} />
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
                <div className="mb-10 flex space-x-2 text-sm text-muted-foreground">
                    <div>{siteMetadata.author}</div>
                    <div>{` • `}</div>
                    <div>{`© ${new Date().getFullYear()}`}</div>
                    <div>{` • `}</div>
                    <Link href="/">{siteMetadata.title}</Link>
                </div>
            </div>
        </footer>
    )
}
