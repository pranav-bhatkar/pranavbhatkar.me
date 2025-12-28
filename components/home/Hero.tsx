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
import { cn } from '@/scripts/utils/tailwind-helpers'
import { motion, useInView } from 'framer-motion'
import { ChevronRight, MailIcon, PhoneIcon } from 'lucide-react'
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
        email: 'hello@example.com',
        tel: '+1 (555) 123-4567',
        social: [
            {
                name: 'GitHub',
                url: 'https://github.com',
                icon: ({ className }: { className: string }) => (
                    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                ),
            },
        ],
    }

    return (
        <motion.section id="hero" variants={slideUp1} initial="initial" animate="enter">
            <div className="relative min-h-screen overflow-hidden flex flex-col justify-center py-10">
                <div className="container z-10 flex flex-col">
                    <div className="mt-20 grid grid-cols-1">
                        <div className="flex flex-col items-center gap-6 pb-8 text-center">
                            <motion.h1
                                ref={fadeInRef}
                                className="text-balance py-6 text-3xl font-bold leading-10 tracking-tighter text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
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
                                Full-stack engineer
                                <br />
                                shipping production software
                            </motion.h1>
                            <motion.span
                                className="text-balance text-lg tracking-tight text-muted-foreground md:text-xl"
                                animate={fadeInInView ? 'animate' : 'initial'}
                                variants={fadeUpVariants}
                                initial={false}
                                transition={{
                                    duration: 0.6,
                                    delay: 0.2,
                                    ease: [0.21, 0.47, 0.32, 0.98],
                                    type: 'spring',
                                }}
                            >
                                I build scalable systems that solve real problems.{' '}
                                <WordRotate
                                    className=" w-full text-center font-bold leading-none tracking-tighter"
                                    words={[
                                        'Next.js',
                                        'React',
                                        'NestJS',
                                        'TypeScript',
                                        'System Design',
                                        'AI Integrations',
                                        'Scalable Architectures',
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
                                    Explore My Work
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
                                    Let&apos;s Talk
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
                                                    className="size-8 bg-transparent"
                                                    variant="outline"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <Link
                                                        aria-label={`Email contact`}
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
                                                    className="size-8 bg-transparent"
                                                    variant="outline"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <Link
                                                        aria-label={`Call`}
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
                                                    className="size-8 bg-transparent"
                                                    variant="outline"
                                                    size="icon"
                                                    asChild
                                                >
                                                    <Link
                                                        aria-label={`Visit ${social.name}`}
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
