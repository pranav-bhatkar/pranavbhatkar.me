'use client'

import { slideUp1 } from '@/components/home/animation'
import WordRotate from '@/components/magicui/word-rotate'
import { Button, buttonVariants } from '@/components/shadcn/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/shadcn/tooltip'
import siteMetadata from '@/data/siteMetadata'
import { cn } from '@/scripts/utils/tailwind-helpers'
import { GitHubLogoIcon } from '@radix-ui/react-icons'
import { motion, useInView } from 'framer-motion'
import { ChevronRight, MailIcon, PhoneIcon, Youtube } from 'lucide-react'
import Link from 'next/link'
import { useRef } from 'react'

export default function Hero() {
    const fadeInRef = useRef(null)
    const fadeInInView = useInView(fadeInRef, {
        once: true,
    })

    const fadeUpVariants = {
        initial: {
            opacity: 0,
            y: 24,
        },
        animate: {
            opacity: 1,
            y: 0,
        },
    }
    const contact = {
        email: 'work@pranavbhatkar.me',
        tel: '+919960935244',
        social: [
            {
                name: 'GitHub',
                url: 'https://github.com/pranav-bhatkar',
                icon: GitHubLogoIcon,
            },
            {
                name: 'LinkedIn',
                url: 'https://www.linkedin.com/in/pranavbhatkar',
                icon: (props: React.SVGProps<SVGSVGElement>) => (
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
                        <title>LinkedIn</title>
                        <path
                            fill="currentColor"
                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                        />
                    </svg>
                ),
            },
            {
                name: 'X',
                url: 'https://x.com/pranavbhatkar_',
                icon: (props: React.SVGProps<SVGSVGElement>) => (
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
                        <title>X</title>
                        <path
                            fill="currentColor"
                            d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                        />
                    </svg>
                ),
            },
            {
                name: 'Youtube',
                url: 'https://youtube.com/@pranavbhatkar',
                icon: Youtube,
            },
        ],
    }
    return (
        <motion.section id="hero" variants={slideUp1} initial="initial" animate="enter">
            <div className="relative h-screen overflow-hidden flex flex-col justify-center py-10">
                <div className="container z-10 flex flex-col">
                    <div className="mt-20 grid grid-cols-1">
                        <div className="flex flex-col items-center gap-6 pb-8 text-center">
                            <motion.h1
                                ref={fadeInRef}
                                className="text-balance  py-6 text-3xl font-bold leading-10 tracking-tighter text-foreground dark:from-white dark:to-white/40 sm:text-6xl md:text-7xl lg:text-8xl"
                                // className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none"
                                animate={fadeInInView ? 'animate' : 'initial'}
                                variants={fadeUpVariants}
                                initial={false}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.1,
                                    ease: [0.21, 0.47, 0.32, 0.98],
                                    type: 'spring',
                                }}
                            >
                                Hi, I&apos;m
                                <br />
                                Pranav Bhatkar 👋
                            </motion.h1>
                            <motion.span
                                className="text-balance text-lg tracking-tight text-gray-400 md:text-xl"
                                animate={fadeInInView ? 'animate' : 'initial'}
                                variants={fadeUpVariants}
                                initial={false}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.2,
                                    ease: [0.21, 0.47, 0.32, 0.98],
                                    type: 'spring',
                                }}
                                //  className="max-w-[600px] md:text-xl"
                            >
                                I&apos;m a passionate software engineer with an interest in{' '}
                                <WordRotate
                                    className=" w-full text-center font-bold leading-none tracking-tighter"
                                    words={[
                                        'Web Development.',
                                        'Mobile Development.',
                                        'Backend Development.',
                                        'DevOps.',
                                        'Machine Learning.',
                                        'Full Stack Development.',
                                        'Cloud Computing.',
                                    ]}
                                />
                            </motion.span>

                            <motion.div
                                animate={fadeInInView ? 'animate' : 'initial'}
                                variants={fadeUpVariants}
                                initial={false}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.3,
                                    ease: [0.21, 0.47, 0.32, 0.98],
                                    type: 'spring',
                                }}
                                className="flex flex-col gap-2 min-[400px]:flex-row"
                            >
                                <Link
                                    href="/projects"
                                    className={cn(
                                        buttonVariants({
                                            size: 'lg',
                                        }),
                                        'gap-2 whitespace-pre md:flex',
                                        'group relative gap-1 overflow-hidden rounded-full text-base font-semibold tracking-tighter',
                                        'transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2'
                                    )}
                                >
                                    View My Work
                                    <ChevronRight className="h-4 w-4 translate-x-0 transform transition-all duration-300 ease-out group-hover:translate-x-1" />
                                </Link>
                                <Link
                                    href={`mailto:${contact.email}`}
                                    target="_blank"
                                    className={cn(
                                        buttonVariants({
                                            variant: 'secondary',
                                            size: 'lg',
                                        }),
                                        'gap-2 whitespace-pre md:flex',
                                        'group relative gap-1 overflow-hidden rounded-full text-base font-semibold tracking-tighter'
                                    )}
                                >
                                    Contact Me
                                    <ChevronRight className="h-4 w-4 translate-x-0 transform transition-all duration-300 ease-out group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                            <motion.div
                                animate={fadeInInView ? 'animate' : 'initial'}
                                variants={fadeUpVariants}
                                initial={false}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.3,
                                    ease: [0.21, 0.47, 0.32, 0.98],
                                    type: 'spring',
                                }}
                                className="flex gap-x-1 pt-1 font-sans text-sm text-muted-foreground print:hidden"
                            >
                                <TooltipProvider>
                                    {contact.email ? (
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button
                                                    className="size-8"
                                                    variant="outline"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <Link
                                                        aria-label={`Email ${siteMetadata.author}`}
                                                        href={`mailto:${contact.email}`}
                                                    >
                                                        <MailIcon className="size-4" />
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <span>Email</span>
                                            </TooltipContent>
                                        </Tooltip>
                                    ) : null}
                                    {contact.tel ? (
                                        <Tooltip>
                                            <TooltipTrigger>
                                                <Button
                                                    className="size-8"
                                                    variant="outline"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <Link
                                                        aria-label={`Call ${siteMetadata.author}`}
                                                        href={`tel:${contact.tel}`}
                                                    >
                                                        <PhoneIcon className="size-4" />
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <span>Phone</span>
                                            </TooltipContent>
                                        </Tooltip>
                                    ) : null}
                                    {contact.social.map((social) => (
                                        <Tooltip key={social.name}>
                                            <TooltipTrigger>
                                                <Button
                                                    className="size-8"
                                                    variant="outline"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <Link
                                                        aria-label={`Visit ${siteMetadata.author}'s ${social.name}`}
                                                        href={social.url}
                                                    >
                                                        <social.icon className="size-4" />
                                                    </Link>
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <span>{social.name}</span>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                </TooltipProvider>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    )
}
