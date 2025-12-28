import Card from '@/components/Card'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import BlurFade from '@/components/magicui/blur-fade'
import projectsData from '@/data/projectsData'
import { genPageMetadata } from 'app/seo'
import Markdown from 'react-markdown'

export const metadata = genPageMetadata({ title: 'Projects' })

export default function Projects() {
    return (
        <main className="flex py-20 flex-col min-h-[100dvh]">
            <section
                id="projects"
                className="px-4 sm:px-6 md:px-8 border-b border-b-[var(--pattern-fg)] py-10"
            >
                <BlurFade delay={0.04 * 11}>
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
        </main>
    )
    // return (
    //     <>
    //         <div
    //             className={
    //                 projectsData.length > 0
    //                     ? 'divide-y divide-accent-foreground dark:divide-accent'
    //                     : ''
    //             }
    //         >
    //             <div className="space-y-2 pb-8 pt-6 md:space-y-5">
    //                 <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-foreground sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
    //                     Projects
    //                 </h1>
    //                 <p className="text-muted-foreground">
    //                     Stuff I've personally developed or contributed to!
    //                 </p>
    //             </div>
    //             {projectsData.length > 0 ? (
    //                 <div className="py-12">
    //                     <div className="-m-4 flex flex-wrap">
    //                         {projectsData.map((d) => (
    //                             <Card
    //                                 key={d.title}
    //                                 title={d.title}
    //                                 description={d.description}
    //                                 imgSrc={d.imgSrc}
    //                                 href={d.href}
    //                                 tags={d.tags}
    //                             />
    //                         ))}
    //                     </div>
    //                 </div>
    //             ) : (
    //                 <div className="my-32 text-center">
    //                     <PageTitle>
    //                         Under Construction{' '}
    //                         <span role="img" aria-label="roadwork sign">
    //                             🚧
    //                         </span>
    //                     </PageTitle>
    //                     <Link
    //                         href="/blog"
    //                         className="focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500 mt-4"
    //                     >
    //                         Check Out My Blog
    //                     </Link>
    //                 </div>
    //             )}
    //         </div>
    //     </>
    // )
}
