'use client'

import { useEffect, useRef, useState } from 'react'

import { cn } from '@/scripts/utils/tailwind-helpers'

export interface TocItem {
    title: string
    url: string
    items: TocItem[]
}

interface TableOfContentsProps {
    toc: TocItem[]
    className?: string
}

function flattenToc(items: TocItem[], depth = 0): { title: string; url: string; depth: number }[] {
    return items.flatMap((item) => [
        { title: item.title, url: item.url, depth },
        ...flattenToc(item.items, depth + 1),
    ])
}

export function TableOfContents({ toc, className }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('')
    const observerRef = useRef<IntersectionObserver | null>(null)
    const flat = flattenToc(toc)

    useEffect(() => {
        const headingIds = flat.map((item) => item.url.slice(1))
        const elements = headingIds
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[]

        if (!elements.length) return

        observerRef.current = new IntersectionObserver(
            (entries) => {
                // Find the first entry that is intersecting (topmost visible heading)
                const visible = entries.filter((e) => e.isIntersecting)
                if (visible.length > 0) {
                    // Pick the one closest to the top of the viewport
                    const top = visible.reduce((prev, curr) =>
                        prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
                    )
                    setActiveId(top.target.id)
                }
            },
            { rootMargin: '-80px 0px -75% 0px', threshold: 0 }
        )

        elements.forEach((el) => observerRef.current!.observe(el))

        return () => observerRef.current?.disconnect()
    }, [flat.length])

    if (flat.length < 2) return null

    return (
        <nav className={className} aria-label="Table of contents">
            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                On this page
            </p>
            <ul className="space-y-1 border-l border-border">
                {flat.map((item) => {
                    const id = item.url.slice(1)
                    const isActive = activeId === id
                    return (
                        <li key={item.url}>
                            <a
                                href={item.url}
                                className={cn(
                                    '-ml-px block border-l-2 py-1 text-[13px] leading-snug transition-all duration-200',
                                    item.depth === 0 && 'pl-4',
                                    item.depth === 1 && 'pl-7',
                                    item.depth >= 2 && 'pl-10',
                                    isActive
                                        ? 'border-primary font-medium text-foreground'
                                        : 'border-transparent text-muted-foreground hover:border-muted-foreground/50 hover:text-foreground/80'
                                )}
                            >
                                {item.title}
                            </a>
                        </li>
                    )
                })}
            </ul>
        </nav>
    )
}
