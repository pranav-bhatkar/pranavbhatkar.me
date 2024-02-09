'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

import { opacity, slideUp } from './anim'

const words = [
    'Namaskar', // Marathi
    'Namaste', // Hindi
    'Sat Sri Akal', // Punjabi
    'Nomoshkar', // Bengali
    'Vanakkam', // Tamil
    'Namaskaram', // Malayalam
    'Hello', // English
]

export default function Index() {
    const [index, setIndex] = useState(0)
    const [dimension, setDimension] = useState({ width: 0, height: 0 })

    useEffect(() => {
        setDimension({ width: window.innerWidth, height: window.innerHeight })
    }, [])

    useEffect(() => {
        if (index == words.length - 1) return
        setTimeout(
            () => {
                setIndex(index + 1)
            },
            index == 0 ? 1000 : 200
        )
    }, [index])

    const initialPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height + 300} 0 ${dimension.height}  L0 0`
    const targetPath = `M0 0 L${dimension.width} 0 L${dimension.width} ${dimension.height} Q${dimension.width / 2} ${dimension.height} 0 ${dimension.height}  L0 0`

    const curve = {
        initial: {
            d: initialPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
        },
        exit: {
            d: targetPath,
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 },
        },
    }

    return (
        <motion.div
            variants={slideUp}
            initial="initial"
            exit="exit"
            className="h-screen w-screen flex items-center justify-center top-0 left-0 fixed z-50"
        >
            {dimension.width > 0 && (
                <>
                    <motion.p
                        variants={opacity}
                        initial="initial"
                        animate="enter"
                        className="flex text-background text-2xl items-center absolute z-[1]"
                    >
                        <span className="block w-[10px] h-[10px] bg-background rounded-[50%] mr-3"></span>
                        {words[index]}
                    </motion.p>

                    <svg className="absolute top-0 w-full h-[calc(100%+300px)] ">
                        <motion.path
                            variants={curve}
                            initial="initial"
                            exit="exit"
                            className="fill-foreground"
                        ></motion.path>
                    </svg>
                </>
            )}
        </motion.div>
    )
}
