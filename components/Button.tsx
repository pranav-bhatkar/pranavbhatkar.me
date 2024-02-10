import { cn } from '@/scripts/utils/tailwind-helpers'
import gsap from 'gsap'
import React from 'react'
import { useEffect, useRef } from 'react'

import Magnetic from './Magnetic'

export default function Button({
    children,
    backgroundColor,
    ...attributes
}: {
    children: React.ReactNode
    backgroundColor?: string
} & React.HTMLAttributes<HTMLDivElement>) {
    const circle = useRef(null)
    const text = useRef(null)
    const timeline = useRef<gsap.core.Timeline>()
    let timeoutId: null | NodeJS.Timeout = null
    useEffect(() => {
        timeline.current = gsap.timeline({ paused: true })
        timeline.current
            .to(
                circle.current,
                { top: '-25%', width: '150%', duration: 0.4, ease: 'power3.in' },
                'enter'
            )
            .to(circle.current, { top: '-150%', width: '125%', duration: 0.25 }, 'exit')
            .to(text.current, { duration: 0.4, ease: 'power3.in', color: '#000' }, 'enter')
            .to(text.current, { duration: 0.25, color: '#fff' }, 'exit')
    }, [])

    const manageMouseEnter = () => {
        if (timeoutId) clearTimeout(timeoutId)
        timeline.current && timeline.current.tweenFromTo('enter', 'exit')
    }

    const manageMouseLeave = () => {
        timeoutId = setTimeout(() => {
            timeline.current && timeline.current.play()
        }, 300)
    }

    return (
        <Magnetic>
            <div
                className="w-max rounded-lg border border-accent-foreground dark:border-accent-foreground cursor-pointer relative flex items-center justify-center text-sm px-4 py-2"
                style={{ overflow: 'hidden' }}
                onMouseEnter={() => {
                    manageMouseEnter()
                }}
                onMouseLeave={() => {
                    manageMouseLeave()
                }}
                {...attributes}
            >
                <p className="z-10" ref={text}>
                    {children}
                </p>
                <div
                    ref={circle}
                    className={cn(
                        'absolute top-[100%] w-[100%] h-[150%] rounded-[50%]',
                        backgroundColor ? 'bg-foreground' : `bg-${backgroundColor}`
                    )}
                ></div>
            </div>
        </Magnetic>
    )
}
