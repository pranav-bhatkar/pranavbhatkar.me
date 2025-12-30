'use client'

import { cn } from '@/scripts/utils/tailwind-helpers'
import { ChevronRightIcon } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import React from 'react'

import Image from './Image'
import { Badge } from './shadcn/badge'

interface ResumeCardProps {
    logoUrl: string
    altText: string
    title: string
    subtitle?: string
    href?: string
    badges?: readonly string[]
    period: string
    description?: string
}
export const ResumeCard = ({
    logoUrl,
    altText,
    title,
    subtitle,
    href,
    badges,
    period,
    description,
}: ResumeCardProps) => {
    const [isExpanded, setIsExpanded] = React.useState(false)

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (description) {
            e.preventDefault()
            setIsExpanded(!isExpanded)
        }
    }

    return (
        <Link
            href={href || '#'}
            className="block cursor-pointer group border-b border-border pb-4 last:border-b-0 last:pb-0"
            onClick={handleClick}
        >
            <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 border border-border flex items-center justify-center bg-muted/30">
                    <Image
                        src={logoUrl}
                        alt={altText}
                        width={48}
                        height={48}
                        className="w-full h-full object-contain p-1"
                    />
                </div>
                <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold leading-none mb-1">{title}</h3>
                            {subtitle && (
                                <p className="text-xs text-muted-foreground font-sans">
                                    {subtitle}
                                </p>
                            )}
                            {badges && badges.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                    {badges.map((badge, index) => (
                                        <Badge variant="outline" className="text-xs" key={index}>
                                            {badge}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="text-xs tabular-nums text-muted-foreground whitespace-nowrap">
                                {period}
                            </span>
                            {description && (
                                <ChevronRightIcon
                                    className={cn(
                                        'size-4 text-muted-foreground transition-all duration-300 ease-out',
                                        isExpanded ? 'rotate-90' : 'rotate-0'
                                    )}
                                />
                            )}
                        </div>
                    </div>
                    {description && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{
                                opacity: isExpanded ? 1 : 0,
                                height: isExpanded ? 'auto' : 0,
                            }}
                            transition={{
                                duration: 0.7,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="mt-2 overflow-hidden"
                        >
                            <p className="text-xs sm:text-sm text-muted-foreground font-sans text-pretty">
                                {description}
                            </p>
                        </motion.div>
                    )}
                </div>
            </div>
        </Link>
    )
}
