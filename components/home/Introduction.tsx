import React from 'react'

import TextReveal from '../magicui/text-reveal'

function Introduction() {
    return (
        <section className="w-full py-12 md:py-24 lg:py-32" id="projects">
            <TextReveal
                textClassName="lg:text-3xl xl:text-4xl lg:px-0"
                text="Hi there! I'm Pranav Bhatkar, your tech pal. I'm your all-in-one solution – building sites with JavaScript, TypeScript, Next.js, Nest.js. Issues? I've got you covered!"
            />
        </section>
    )
}

export default Introduction
