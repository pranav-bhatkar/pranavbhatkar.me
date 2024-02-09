import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function Hero() {
    return (
        <section
            id="hero"
            className="my-16 md:my-36 w-full  flex flex-col md:flex-row gap-4 justify-center md:justify-between items-start md:items-center pt-4 space-y-8 md:space-y-0"
        >
            <div className="max-w-[350px] md:max-w-[500px] space-y-4">
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-foreground sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
                    I'm Pranav <br /> Bhatkar
                </h1>
                <p className="text-sm md:text-base text-secondary-foreground">
                    I'm a full-stack developer and a tech enthusiast. I love to build things and
                    share my knowledge with the community. want to know more about me?{' '}
                    <Link
                        className="text-accent-foreground dark:text-muted-foreground underline"
                        href="/about"
                    >
                        Read more
                    </Link>
                    <br />
                    or want to work with me?{' '}
                </p>
                <div>
                    <a
                        href="mailto:mail@pranavbhatkar.me"
                        className="w-max focus:shadow-outline-blue inline rounded-lg border border-transparent bg-foreground dark:bg-white px-4 py-2 text-sm font-bold leading-5 text-background shadow transition-colors duration-150 hover:bg-black/90 focus:outline-none dark:hover:bg-gray-300"
                    >
                        Contact Me
                    </a>
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
        </section>
    )
}

export default Hero
