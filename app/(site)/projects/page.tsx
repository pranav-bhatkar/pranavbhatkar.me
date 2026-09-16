import ProjectsPlaceholder from '@/components/ProjectsPlaceholder'
import BlurFade from '@/components/magicui/blur-fade'
import { ResumeCard } from '@/components/resume-card'
import projectsData from '@/data/projectsData'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
    // `data/projectsData.ts` is the single switch for both project surfaces:
    // while it is empty the portfolio shows the placeholder instead.
    const hasProjects = projectsData.length > 0

    return (
        <main className="flex pt-20 flex-col min-h-[100dvh]">
            <section id="projects" className="px-4 sm:px-6 md:px-8 py-10">
                <BlurFade delay={0.04 * 1}>
                    <h2 className="text-xl font-bold mb-4">Projects</h2>
                </BlurFade>
                {!hasProjects && (
                    <BlurFade delay={0.04 * 2}>
                        <ProjectsPlaceholder />
                    </BlurFade>
                )}
                {hasProjects && (
                    <div className="flex min-h-0 flex-col gap-y-4">
                        <BlurFade delay={0.04 * 2}>
                            <ResumeCard
                                logoUrl="https://github.com/pranav-bhatkar.png"
                                altText="Lyrix"
                                title="Lyrix"
                                subtitle="A native macOS app that displays real-time synchronized lyrics from Spotify and Apple Music in a customizable floating overlay."
                                href="https://github.com/pranav-bhatkar/lyrix"
                                badges={['Swift', 'macOS', 'Spotify', 'Apple Music']}
                                period="Weekend project"
                            />
                        </BlurFade>
                    </div>
                )}
            </section>
        </main>
    )
}
