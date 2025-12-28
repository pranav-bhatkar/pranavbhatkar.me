'use client'

import siteMetadata from '@/data/siteMetadata'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react'
import Link from 'next/link'

import Image from '../Image'
import RotatingText from '../RotatingText'
import { Icons } from '../icons'
import { Button } from '../shadcn/button'
import { slideUp1 } from './animation'

interface HeroSectionProps {
    profileImage?: string
}

const HeroSection = ({ profileImage }: HeroSectionProps) => {
    const rotatingWords = [
        'scalable system',
        'production apps',
        'clean backends',
        'stunning ui',
        'robust APIs',
        'modern web apps',
        'responsive designs',
        'secure systems',
        'fast experiences',
    ]

    return (
        <motion.section
            id="hero"
            variants={slideUp1}
            initial="initial"
            className=""
            animate="enter"
        >
            {/* <section className="relative min-h-screen flex items-center justify-center bg-background"> */}

            <div className=" relative z-20 px-0 sm:px-6 md:px-8 py-20">
                <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-18">
                    {/* Text content */}
                    <div className="flex-1  text-center lg:text-left">
                        {/* Name */}
                        <p className="opacity-0 animate-fade-up text-sm tracking-widest uppercase text-muted-foreground mb-6">
                            Pranav Bhatkar
                        </p>

                        {/* Main headline */}
                        <h1 className="opacity-0 animate-fade-up animation-delay-100 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[0.9] mb-8">
                            Full-stack engineer.
                            <span className="block lg:inline text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                                <br className="hidden lg:block" />
                                I build <RotatingText words={rotatingWords} />
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="opacity-0 animate-fade-up animation-delay-200 text-base md:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-10 leading-relaxed">
                            Full-stack engineer. Clean architecture, scalable systems,
                            production-ready code.
                        </p>

                        {/* CTA buttons */}
                        <div className="opacity-0 animate-fade-up animation-delay-300 flex flex-col sm:flex-row gap-3 justify-center lg:justify-start mb-12">
                            <Button asChild variant="hero" size="lg" className="group">
                                <Link href="#projects">
                                    View work
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                            <Button asChild variant="heroOutline" size="lg" className="group">
                                <Link href="mailto:work@pranavbhatkar.me">
                                    Contact
                                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </div>

                        {/* Social links */}
                        <div className="opacity-0 animate-fade-up animation-delay-400 flex items-center gap-5 justify-center lg:justify-start">
                            {siteMetadata.github && (
                                <Link
                                    href={siteMetadata.github || ''}
                                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                                    aria-label="GitHub"
                                >
                                    <Github className="w-5 h-5" />
                                </Link>
                            )}
                            {siteMetadata.twitter && (
                                <Link
                                    href={siteMetadata.twitter || ''}
                                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                                    aria-label="Twitter"
                                >
                                    <Icons.x className="w-5 h-5" />
                                </Link>
                            )}
                            {siteMetadata.linkedin && (
                                <Link
                                    href={siteMetadata.linkedin || ''}
                                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                                    aria-label="LinkedIn"
                                >
                                    <Linkedin className="w-5 h-5" />
                                </Link>
                            )}
                            {siteMetadata.email && (
                                <Link
                                    href={`mailto:${siteMetadata.email}`}
                                    className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                                    aria-label="Email"
                                >
                                    <Mail className="w-5 h-5" />
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Profile Image */}
                    <div className="opacity-0 animate-fade-up animation-delay-200 flex-shrink-0 order-first lg:order-last">
                        <div className="relative">
                            {/* Image container */}
                            <div className="relative w-56 h-56 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                                {/* Simple border frame */}
                                <div className="absolute -inset-3 border border-border" />

                                {/* Image */}
                                {profileImage ? (
                                    <Image
                                        src={profileImage}
                                        alt="Pranav Bhatkar"
                                        width={320}
                                        height={320}
                                        className="w-full h-full object-cover grayscale"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-muted flex items-center justify-center">
                                        <span className="text-4xl text-muted-foreground font-light">
                                            PB
                                        </span>
                                    </div>
                                )}

                                {/* Code annotation */}
                                <div className="absolute -bottom-6 -right-6 px-3 py-1.5 bg-background border border-border text-xs text-muted-foreground">
                                    <span className="text-foreground">const</span> builder{' '}
                                    <span className="text-foreground">=</span> true
                                    <span className="text-foreground">;</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* </section> */}
        </motion.section>
    )
}

export default HeroSection
