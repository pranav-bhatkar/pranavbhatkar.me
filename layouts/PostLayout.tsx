import Comments from '@/components/Comments'
import Image from '@/components/Image'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import { TableOfContents, type TocItem } from '@/components/TableOfContents'
import Tag from '@/components/Tag'
import BlurFade from '@/components/magicui/blur-fade'
import siteMetadata from '@/data/siteMetadata'
import type { Authors, Blog, CoreContent } from '@/lib/velite'
import { ReactNode } from 'react'

const BLUR_FADE_DELAY = 0.04

const editUrl = (path) => `${siteMetadata.siteRepo}/blob/main/data/${path}`

const postDateTemplate: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
}

interface LayoutProps {
    content: CoreContent<Blog>
    authorDetails: CoreContent<Authors>[]
    next?: { path: string; title: string }
    prev?: { path: string; title: string }
    toc?: TocItem[]
    children: ReactNode
}

export default function PostLayout({
    content,
    authorDetails,
    next,
    prev,
    toc = [],
    children,
}: LayoutProps) {
    const { filePath, path, slug, date, title, tags, readingTime } = content
    const basePath = path.split('/')[0]

    return (
        <>
            <ScrollTopAndComment />
            <article className="relative px-4 sm:px-6 md:px-8">
                <section className="border-t border-t-[var(--pattern-fg)] py-12 xl:py-16">
                    {/* Header */}
                    <header className="mx-auto max-w-3xl pb-8 text-center xl:pb-10">
                        <BlurFade delay={BLUR_FADE_DELAY * 1}>
                            <dl>
                                <dt className="sr-only">Published on</dt>
                                <dd className="text-sm font-medium text-muted-foreground">
                                    <time dateTime={date}>
                                        {new Date(date).toLocaleDateString(
                                            siteMetadata.locale,
                                            postDateTemplate
                                        )}
                                    </time>
                                    {readingTime && (
                                        <span className="ml-2">
                                            &middot; {readingTime.readingTime} min read
                                        </span>
                                    )}
                                </dd>
                            </dl>
                        </BlurFade>
                        <BlurFade delay={BLUR_FADE_DELAY * 2}>
                            <PageTitle>{title}</PageTitle>
                        </BlurFade>
                        <BlurFade delay={BLUR_FADE_DELAY * 3}>
                            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                                {authorDetails.map((author) => (
                                    <div
                                        key={author.name}
                                        className="flex items-center gap-2 text-sm text-muted-foreground"
                                    >
                                        {author.avatar && (
                                            <Image
                                                src={author.avatar}
                                                width={28}
                                                height={28}
                                                alt="avatar"
                                                className="h-7 w-7 rounded-full"
                                            />
                                        )}
                                        <span className="font-medium text-foreground">
                                            {author.name}
                                        </span>
                                    </div>
                                ))}
                                {tags && tags.length > 0 && (
                                    <>
                                        <span className="text-muted-foreground/40">|</span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {tags.map((tag) => (
                                                <Tag key={tag} text={tag} />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                        </BlurFade>
                    </header>

                    {/* Content + TOC grid */}
                    <div className="mx-auto max-w-3xl xl:max-w-none xl:grid xl:grid-cols-[1fr_200px] xl:gap-x-10">
                        {/* Main content */}
                        <div className="min-w-0">
                            <BlurFade delay={BLUR_FADE_DELAY * 4}>
                                <div className="prose prose-sm max-w-none pb-8 dark:prose-invert">
                                    {children}
                                </div>
                            </BlurFade>

                            <BlurFade delay={BLUR_FADE_DELAY * 5}>
                                <div className="pb-6 pt-6 text-sm text-muted-foreground">
                                    <Link href={editUrl(filePath)}>View on GitHub</Link>
                                </div>
                            </BlurFade>

                            {siteMetadata.comments && (
                                <BlurFade delay={BLUR_FADE_DELAY * 6}>
                                    <div
                                        className="pb-6 pt-6 text-center text-muted-foreground"
                                        id="comment"
                                    >
                                        <Comments slug={slug} />
                                    </div>
                                </BlurFade>
                            )}

                            {/* Prev / Next navigation */}
                            {(next || prev) && (
                                <BlurFade delay={BLUR_FADE_DELAY * 7}>
                                    <div className="flex justify-between gap-4 border-t border-border py-8 text-sm font-medium">
                                        {prev && prev.path ? (
                                            <div className="min-w-0">
                                                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                                                    Previous Article
                                                </p>
                                                <Link
                                                    href={`/${prev.path}`}
                                                    className="text-primary hover:brightness-125 dark:hover:brightness-125"
                                                >
                                                    {prev.title}
                                                </Link>
                                            </div>
                                        ) : (
                                            <div />
                                        )}
                                        {next && next.path ? (
                                            <div className="min-w-0 text-right">
                                                <p className="mb-1 text-xs uppercase tracking-wide text-muted-foreground">
                                                    Next Article
                                                </p>
                                                <Link
                                                    href={`/${next.path}`}
                                                    className="text-primary hover:brightness-125 dark:hover:brightness-125"
                                                >
                                                    {next.title}
                                                </Link>
                                            </div>
                                        ) : (
                                            <div />
                                        )}
                                    </div>
                                </BlurFade>
                            )}

                            <BlurFade delay={BLUR_FADE_DELAY * 8}>
                                <div className="pt-4">
                                    <Link
                                        href={`/${basePath}`}
                                        className="text-sm text-primary hover:brightness-125 dark:hover:brightness-125"
                                        aria-label="Back to the blog"
                                    >
                                        &larr; Back to the blog
                                    </Link>
                                </div>
                            </BlurFade>
                        </div>

                        {/* Right sidebar: TOC */}
                        <aside className="hidden xl:block">
                            <div className="sticky top-28">
                                <TableOfContents toc={toc} />
                            </div>
                        </aside>
                    </div>
                </section>
            </article>
        </>
    )
}
