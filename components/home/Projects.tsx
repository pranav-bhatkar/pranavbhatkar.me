'use client'

import projectsData from '@/data/projectsData'
import { cn } from '@/scripts/utils/tailwind-helpers'
import { motion, useInView } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React, { useRef } from 'react'
import posthog from 'posthog-js'

import Card from '../Card'
import SectionContainer from '../SectionContainer'

function Projects() {
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
    return (
        <>
            <section id="projects"></section>
            <SectionContainer>
                <div className="flex h-full flex-col justify-between font-sans">
                    <div>
                        <div className="space-y-2 pb-6 pt-4 md:space-y-4 text-center">
                            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-foreground sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                                Projects
                            </h1>
                            <p className="text-muted-foreground">
                                Stuff I've personally developed or contributed to!
                            </p>
                        </div>
                        <div className="py-4">
                            <div className="-m-4 flex flex-wrap">
                                {projectsData.map((d) => (
                                    <Card
                                        key={d.title}
                                        title={d.title}
                                        description={d.description}
                                        imgSrc={d.imgSrc}
                                        href={d.href}
                                        tags={d.tags}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <motion.div
                        ref={fadeInRef}
                        animate={fadeInInView ? 'animate' : 'initial'}
                        variants={fadeUpVariants}
                        className="flex flex-col gap-4 lg:flex-row"
                        initial={false}
                        transition={{
                            duration: 0.6,
                            delay: 0.3,
                            ease: [0.21, 0.47, 0.32, 0.98],
                            type: 'spring',
                        }}
                    >
                        <Link
                            href="/projects"
                            className={cn(
                                // colors
                                'bg-black  text-white shadow hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90',

                                // layout
                                'group relative inline-flex h-9 w-full items-center justify-center gap-2 overflow-hidden whitespace-pre rounded-md px-4 py-2 text-base font-semibold tracking-tighter focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 md:flex',

                                // animation
                                'transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2'
                            )}
                            onClick={() => posthog.capture('cta_click', { cta: 'view_all_projects' })}
                        >
                            View all projects
                            <span className="sr-only">Click to view all projects</span>
                            <ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                        </Link>
                    </motion.div>
                </div>
            </SectionContainer>
        </>
    )
}

export default Projects
