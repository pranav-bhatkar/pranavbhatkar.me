'use client'

import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function GsapReveal() {
    useEffect(() => {
        const elements = document.querySelectorAll<HTMLElement>('[data-reveal]')
        const animations: Array<gsap.core.Tween | gsap.core.Timeline> = []
        elements.forEach((el) => {
            const y = parseFloat(el.dataset.revealY || '24')
            const duration = parseFloat(el.dataset.revealDuration || '0.8')
            const delay = parseFloat(el.dataset.revealDelay || '0')
            const opacity = parseFloat(el.dataset.revealOpacity || '0')
            const scrub = el.dataset.revealScrub === 'true'

            const tween = gsap.fromTo(
                el,
                { y, opacity },
                {
                    y: 0,
                    opacity: 1,
                    duration,
                    delay,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        end: 'top 60%',
                        scrub,
                        once: !scrub,
                    },
                }
            )
            animations.push(tween)
        })
        return () => {
            animations.forEach((a) => a.kill())
            ScrollTrigger.getAll().forEach((st) => st.kill())
        }
    }, [])
    return null
}

