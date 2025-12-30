'use client'

import { cn } from '@/scripts/utils/tailwind-helpers'
import { AnimatePresence, motion } from 'motion/react'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import Button from '../Button'
import { curve, text, translate } from './anim'

const anim = (variants) => {
    return {
        variants,
        initial: 'initial',
        animate: 'enter',
        exit: 'exit',
    }
}
const routes = {
    '/': 'Home',
    '/about': 'About',
    '/blog': 'Blog',
    '/projects': 'Projects',
}
export default function Curve({ children, backgroundColor }) {
    // const router = useRouter()
    const pathname = usePathname()
    const [dimensions, setDimensions] = useState<{
        width: number | null
        height: number | null
    }>({
        width: null,
        height: null,
    })
    const [exit, setExit] = useState(false)
    function handleExit() {
        setExit(true)
    }
    useEffect(() => {
        function resize() {
            setDimensions({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        resize()

        return () => {
            window.removeEventListener('resize', resize)
        }
    }, [])

    return (
        <div className={cn(dimensions.width == null ? 'bg-black' : null, '')}>
            <div
                className="z-50 fixed h-[calc(100vh+600px)] w-screen pointer-events-none left-0 top-0 bg-white dark:bg-black"
                style={{ opacity: dimensions.width == null ? 1 : 0 }}
            />
            <AnimatePresence>
                {!exit && (
                    <>
                        <motion.p
                            className="absolute left-[50%] top-[40%] text-white text-6xl font-bold z-[60] "
                            {...anim(text)}
                        >
                            Pranav
                            {/* {routes[pathname]} */}
                        </motion.p>
                        {dimensions.width != null && <SVG {...dimensions} />}
                    </>
                )}
            </AnimatePresence>
            {children}
        </div>
    )
}

const SVG = ({ height, width }) => {
    const initialPath = `
        M0 300 
        Q${width / 2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width / 2} ${height + 600} 0 ${height + 300}
        L0 0
    `

    const targetPath = `
        M0 300
        Q${width / 2} 0 ${width} 300
        L${width} ${height}
        Q${width / 2} ${height} 0 ${height}
        L0 0
    `

    return (
        <motion.svg
            className="z-50 fixed h-[calc(100vh+600px)] w-screen pointer-events-none left-0 top-0 "
            {...anim(translate)}
        >
            <motion.path className="text-white" {...anim(curve(initialPath, targetPath))} />
        </motion.svg>
    )
}
