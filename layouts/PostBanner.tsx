import Comments from '@/components/Comments'
import Image from '@/components/Image'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import BlurFade from '@/components/magicui/blur-fade'
import siteMetadata from '@/data/siteMetadata'
import type { Blog, CoreContent } from '@/lib/velite'
import { ReactNode } from 'react'

const BLUR_FADE_DELAY = 0.04

interface LayoutProps {
    content: CoreContent<Blog>
    children: ReactNode
    next?: { path: string; title: string }
    prev?: { path: string; title: string }
}

export default function PostMinimal({ content, next, prev, children }: LayoutProps) {
    const { slug, title, images } = content
    const displayImage =
        images && images.length > 0 ? images[0] : 'https://picsum.photos/seed/picsum/800/400'

    return (
        <>
            <ScrollTopAndComment />
            <article className="px-4 sm:px-6 md:px-8">
                <section className="border-t border-t-[var(--pattern-fg)] py-20">
                    <div>
                        <div className="space-y-1 pb-10 text-center">
                            <BlurFade delay={BLUR_FADE_DELAY * 1}>
                                <div className="w-full">
                                    <div className="relative -mx-6 md:-mx-8">
                                        <div className="relative aspect-[1.91/1] w-full">
                                            <Image
                                                src={displayImage}
                                                alt={title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </BlurFade>
                            <BlurFade delay={BLUR_FADE_DELAY * 2}>
                                <div className="relative pt-10">
                                    <PageTitle>{title}</PageTitle>
                                </div>
                            </BlurFade>
                        </div>
                        <BlurFade delay={BLUR_FADE_DELAY * 3}>
                            <div className="prose prose-sm max-w-none py-4 dark:prose-invert">
                                {children}
                            </div>
                        </BlurFade>
                        {siteMetadata.comments && (
                            <BlurFade delay={BLUR_FADE_DELAY * 4}>
                                <div
                                    className="pb-6 pt-6 text-center text-muted-foreground"
                                    id="comment"
                                >
                                    <Comments slug={slug} />
                                </div>
                            </BlurFade>
                        )}
                        <footer>
                            <BlurFade delay={BLUR_FADE_DELAY * 5}>
                                <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
                                    {prev && prev.path && (
                                        <div className="pt-4 xl:pt-8">
                                            <Link
                                                href={`/${prev.path}`}
                                                className="text-primary hover:brightness-125 dark:hover:brightness-125"
                                                aria-label={`Previous post: ${prev.title}`}
                                            >
                                                &larr; {prev.title}
                                            </Link>
                                        </div>
                                    )}
                                    {next && next.path && (
                                        <div className="pt-4 xl:pt-8">
                                            <Link
                                                href={`/${next.path}`}
                                                className="text-primary hover:brightness-125 dark:hover:brightness-125"
                                                aria-label={`Next post: ${next.title}`}
                                            >
                                                {next.title} &rarr;
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </BlurFade>
                        </footer>
                    </div>
                </section>
            </article>
        </>
    )
}
