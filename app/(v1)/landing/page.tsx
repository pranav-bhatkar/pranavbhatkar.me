import Projects from '@/components/home/Projects'

import Hero from '../../../components/home/Hero'
import Introduction from '../../../components/home/Introduction'

export default async function Page() {
    return (
        <main>
            {/* <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence> */}
            <Hero />
            <Introduction />
            <Projects />
        </main>
    )
}
