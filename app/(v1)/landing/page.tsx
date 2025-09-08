import Projects from '@/components/home/Projects'
import Hero from '../../../components/home/Hero'
import Introduction from '../../../components/home/Introduction'
import { Suspense } from 'react'
import GsapReveal from '@/components/animations/GsapReveal'

export default async function Page() {
    return (
        <main>
            <GsapReveal />
            <section className="relative" data-reveal data-reveal-y="60" data-reveal-duration="0.9">
                <Hero />
            </section>
            <section className="relative" data-reveal data-reveal-y="40" data-reveal-duration="0.9">
                <Introduction />
            </section>
            <section className="relative" data-reveal data-reveal-y="30" data-reveal-duration="0.9">
                <Projects />
            </section>
        </main>
    )
}
