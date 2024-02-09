'use client'

import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'

export default function Magnetic({ children }) {
    const magnetic = useRef<HTMLElement>()

    useEffect(() => {
        if (!magnetic.current) return
        const xTo = gsap.quickTo(magnetic.current, 'x', {
            duration: 1,
            ease: 'elastic.out(1, 0.3)',
        })
        const yTo = gsap.quickTo(magnetic.current, 'y', {
            duration: 1,
            ease: 'elastic.out(1, 0.3)',
        })

        magnetic.current.addEventListener('mousemove', (e) => {
            if (!magnetic.current) return
            const { clientX, clientY } = e
            const { height, width, left, top } = magnetic.current.getBoundingClientRect()
            const x = clientX - (left + width / 2)
            const y = clientY - (top + height / 2)
            xTo(x * 0.35)
            yTo(y * 0.35)
        })
        magnetic.current.addEventListener('mouseleave', (e) => {
            xTo(0)
            yTo(0)
        })
    }, [])

    return React.cloneElement(children, { ref: magnetic })
}
