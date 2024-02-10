import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'

import Button from '../Button'
import { slideUp, slideUp1 } from './animation'

function Hero() {
    const phrase =
        "I'm a full-stack developer and a tech enthusiast. I love to build things and share my knowledge with the community. want to work with me?"
    const description = useRef(null)
    const isInView = useInView(description)
    return (
        <motion.main variants={slideUp1} initial="initial" animate="enter" 
            id="hero"
            ref={description}
            className="my-8 md:my-28 2xl:my-36 w-full  flex flex-col md:flex-row gap-4 justify-center md:justify-between items-start md:items-center pt-4 space-y-8 md:space-y-0"
        >
            <div className="max-w-[350px] md:max-w-[500px] space-y-4">
                <motion.h1
                    className="text-3xl font-extrabold leading-9 tracking-tight text-foreground sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
                    variants={slideUp}
                    animate={isInView ? 'open' : 'closed'}
                >
                    I'm Pranav <br /> Bhatkar
                </motion.h1>
                <p className="text-sm md:text-base text-secondary-foreground">
                    {phrase.split(' ').map((word, index) => {
                        return (
                            <span
                                key={index}
                                className="relative overflow-hidden inline-flex mr-1 gap-[8px]"
                            >
                                <motion.span
                                    variants={slideUp}
                                    custom={index}
                                    animate={isInView ? 'open' : 'closed'}
                                    key={index}
                                >
                                    {word}
                                </motion.span>
                            </span>
                        )
                    })}
                </p>
                <div>
                    <Link href="https://instagram.com/pranavbhatkar_" target="_blank">
                        <Button backgroundColor={'#334BD3'}>Contact Me</Button>
                    </Link>
                </div>
            </div>
            <div className="hidden dark:block self-center">
                <Image
                    src={'/static/images/Pranav-Bhatkar-Avatar-dark.svg'}
                    alt="avatar"
                    width={192}
                    height={192}
                    className="h-72 w-72 rounded-full"
                />
            </div>
            <div className="block dark:hidden self-center">
                <Image
                    src={'/static/images/Pranav-Bhatkar-Avatar-light.svg'}
                    alt="avatar"
                    width={192}
                    height={192}
                    className="h-72 w-72 rounded-full"
                />
            </div>
        </motion.main>
    )
}

export default Hero
