import HeroSection from '@/components/home/NewHero'
import Projects from '@/components/home/Projects'
import BlurFade from '@/components/magicui/blur-fade'
import { ResumeCard } from '@/components/resume-card'
import { Badge } from '@/components/shadcn/badge'
import { DATA } from '@/data/resume'
import Markdown from 'react-markdown'

const BLUR_FADE_DELAY = 0.04
export default async function Page() {
    return (
        <main className="flex flex-col min-h-[100dvh]">
            {/* <AnimatePresence mode="wait">{isLoading && <Preloader />}</AnimatePresence> */}
            <HeroSection profileImage="https://github.com/pranav-bhatkar.png" />
            <section
                id="about"
                className="px-4 sm:px-6 md:px-8 border-t border-t-[var(--pattern-fg)] py-10"
            >
                <BlurFade delay={BLUR_FADE_DELAY * 3}>
                    <h2 className="text-xl font-bold">About</h2>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 4}>
                    <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                        I’m a Full Stack Developer focused on building scalable, high-performance
                        web applications. I work with modern technologies like Next.js, NestJS, and
                        React to create clean, efficient systems that solve real problems. I enjoy
                        turning ideas into production-ready products and constantly pushing myself
                        to build better, faster, and smarter software.
                    </Markdown>
                </BlurFade>
            </section>
            <section
                id="work"
                className="px-4 sm:px-6 md:px-8 border-t border-t-[var(--pattern-fg)] py-10"
            >
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                    <h2 className="text-xl font-bold mb-4">Work Experience</h2>
                </BlurFade>
                <div className="flex min-h-0 flex-col gap-y-4">
                    {DATA.work.map((work, id) => (
                        <BlurFade key={work.company} delay={BLUR_FADE_DELAY * 6 + id * 0.05}>
                            <ResumeCard
                                key={work.company}
                                logoUrl={work.logoUrl}
                                altText={work.company}
                                title={work.company}
                                subtitle={work.title}
                                href={work.href}
                                badges={work.badges}
                                period={`${work.start} - ${work.end ?? 'Present'}`}
                                description={work.description}
                            />
                        </BlurFade>
                    ))}
                </div>
            </section>
            <section
                id="education"
                className="px-4 sm:px-6 md:px-8 border-t border-t-[var(--pattern-fg)] py-10"
            >
                <BlurFade delay={BLUR_FADE_DELAY * 7}>
                    <h2 className="text-xl font-bold mb-4">Education</h2>
                </BlurFade>
                <div className="flex min-h-0 flex-col gap-y-4">
                    {DATA.education.map((education, id) => (
                        <BlurFade key={education.school} delay={BLUR_FADE_DELAY * 8 + id * 0.05}>
                            <ResumeCard
                                key={education.school}
                                href={education.href}
                                logoUrl={education.logoUrl}
                                altText={education.school}
                                title={education.school}
                                subtitle={education.degree}
                                period={`${education.start} - ${education.end}`}
                            />
                        </BlurFade>
                    ))}
                </div>
            </section>
            <section
                id="skills"
                className="px-4 sm:px-6 md:px-8 border-t border-t-[var(--pattern-fg)] py-10"
            >
                <BlurFade delay={BLUR_FADE_DELAY * 9}>
                    <h2 className="text-xl font-bold mb-4">Skills</h2>
                </BlurFade>
                <BlurFade delay={BLUR_FADE_DELAY * 10}>
                    <div className="flex flex-wrap gap-1">
                        {DATA.skills.map((skill, id) => (
                            <Badge key={skill} variant="outline">
                                {skill}
                            </Badge>
                        ))}
                    </div>
                </BlurFade>
            </section>
            <section
                id="projects"
                className="px-4 sm:px-6 md:px-8 border-t border-t-[var(--pattern-fg)] border-b border-b-[var(--pattern-fg)] py-10"
            >
                <BlurFade delay={BLUR_FADE_DELAY * 11}>
                    <h2 className="text-xl font-bold mb-4">Projects</h2>
                </BlurFade>
                <BlurFade delay={0.04 * 12}>
                    <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
                        I'm currently developing new projects that better reflect my current skill
                        set as a professional developer. My previous portfolio work no longer
                        represents the quality and complexity of what I build today, so I've taken
                        them down while I create fresh showcases. I'm dedicating my weekends to
                        building these new projects, and I'll be adding them here as they're
                        completed. Check back soon!
                    </Markdown>
                </BlurFade>
            </section>
            {/* <Projects /> */}
        </main>
    )
}
