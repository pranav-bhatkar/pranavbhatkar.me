'use client'

import Image from '@/components/Image'
import type { Authors } from 'contentlayer/generated'
import { motion, useInView } from 'framer-motion'
import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import { ReactNode, useRef } from 'react'

import { slideRight, slideUp } from './animation'

interface Props {
    children: ReactNode
    content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
    const { name, avatar, occupation, company, email, twitter, linkedin, github, instagram } =
        content
    const about = useRef(null)
    const isInView = useInView(about)
    return (
        <>
            <div ref={about} className="divide-y divide-accent-foreground dark:divide-accent">
                <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                    <motion.h1
                    variants={slideRight}
                    initial="initial"
                    animate={isInView ? 'open' : 'closed'}
                    className="text-3xl font-extrabold leading-9 tracking-tight text-foreground sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                        About
                    </motion.h1>
                </div>
                <motion.div
                    variants={slideUp}
                    initial="initial"
                    animate={isInView ? 'open' : 'closed'}
                    className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0"
                >
                    <div className="flex flex-col items-center space-x-2 pt-8">
                        {avatar && (
                            <Image
                                src={avatar}
                                alt="avatar"
                                width={192}
                                height={192}
                                className="h-48 w-48 rounded-full"
                            />
                        )}
                        <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">
                            {name}
                        </h3>
                        <div className="text-muted-foreground">{occupation}</div>
                        <div className="text-muted-foreground">{company}</div>
                        <div className="flex space-x-3 pt-6">
                            {twitter && (
                                <a
                                    href={twitter}
                                    className="hover:brightness-125 dark:hover:brightness-125"
                                >
                                    <Twitter size={24} />
                                </a>
                            )}
                            {email && (
                                <a
                                    href={`mailto:${email}`}
                                    className="hover:brightness-125 dark:hover:brightness-125"
                                >
                                    <Mail size={24} />
                                </a>
                            )}
                            {github && (
                                <a
                                    href={github}
                                    className="hover:brightness-125 dark:hover:brightness-125"
                                >
                                    <Github size={24} />
                                </a>
                            )}
                            {linkedin && (
                                <a
                                    href={linkedin}
                                    className="hover:brightness-125 dark:hover:brightness-125"
                                >
                                    <Linkedin size={24} />
                                </a>
                            )}
                            {instagram && (
                                <a
                                    href={instagram}
                                    className="hover:brightness-125 dark:hover:brightness-125"
                                >
                                    <Instagram size={24} />
                                </a>
                            )}
                        </div>
                    </div>
                    <div className="prose prose-sm max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
                        {children}
                    </div>
                </motion.div>
            </div>
        </>
    )
}
