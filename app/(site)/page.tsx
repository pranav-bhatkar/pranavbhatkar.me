import HeroSection from '@/components/home/NewHero'
import WishlistSection from '@/components/home/WishlistSection'
import BlurFade from '@/components/magicui/blur-fade'
import { ResumeCard } from '@/components/resume-card'
import { Badge } from '@/components/shadcn/badge'
import { DATA } from '@/data/resume'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Markdown from 'react-markdown'

const BLUR_FADE_DELAY = 0.04
export default async function Page() {
    return (
        <main className="flex flex-col min-h-[100dvh]">
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
                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                    <Link
                        href="/about"
                        className="inline-flex items-center gap-1.5 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Learn more about me <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
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
                className="px-4 sm:px-6 md:px-8 border-t border-t-[var(--pattern-fg)] py-10"
            >
                <BlurFade delay={BLUR_FADE_DELAY * 11}>
                    <h2 className="text-xl font-bold mb-4">Projects</h2>
                </BlurFade>
                <div className="flex min-h-0 flex-col gap-y-4">
                    <BlurFade delay={0.04 * 12}>
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
                <BlurFade delay={0.04 * 13}>
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-1.5 mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        View all projects <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                </BlurFade>
            </section>
            <WishlistSection />
        </main>
    )
}
