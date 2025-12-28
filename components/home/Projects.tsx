'use client'

import projectsData from '@/data/projectsData'
import { cn } from '@/scripts/utils/tailwind-helpers'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import Card from '../Card'
import BlurFade from '../magicui/blur-fade'

const BLUR_FADE_DELAY = 0.04

function Projects() {
    return (
        <section id="projects" className="px-0 sm:px-6 md:px-8">
            <BlurFade delay={BLUR_FADE_DELAY * 11}>
                <h2 className="text-xl font-bold mb-4">Projects</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 12}>
                <p className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert mb-6">
                    Stuff I've personally developed or contributed to!
                </p>
            </BlurFade>
            <div className="py-6">
                <div className="-m-4 flex flex-wrap">
                    {projectsData.slice(0, 4).map((d, id) => (
                        <div key={d.title} className="w-full p-4 md:w-1/2">
                            <BlurFade delay={BLUR_FADE_DELAY * 13 + id * 0.05}>
                                <Card
                                    title={d.title}
                                    description={d.description}
                                    imgSrc={d.imgSrc}
                                    href={d.href}
                                    tags={d.tags}
                                />
                            </BlurFade>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center items-center mt-6">
                <BlurFade delay={BLUR_FADE_DELAY * 14}>
                    <Link
                        href="/projects"
                        className={cn(
                            // colors
                            'bg-black text-white shadow hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90',

                            // layout
                            'group relative inline-flex h-9 items-center justify-center gap-2 overflow-hidden whitespace-pre rounded-md px-4 py-2 text-sm font-semibold tracking-tighter focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',

                            // animation
                            'transform-gpu ring-offset-current transition-all duration-300 ease-out hover:ring-2 hover:ring-primary hover:ring-offset-2'
                        )}
                    >
                        View all projects
                        <span className="sr-only">Click to view all projects</span>
                        <ChevronRight className="size-4 translate-x-0 transition-all duration-300 ease-out group-hover:translate-x-1" />
                    </Link>
                </BlurFade>
            </div>
        </section>
    )
}

export default Projects
