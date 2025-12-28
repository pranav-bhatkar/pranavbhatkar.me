'use client'

import Comments from '@/components/Comments'
import Image from '@/components/Image'
import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import Tag from '@/components/Tag'
import BlurFade from '@/components/magicui/blur-fade'
import { Skeleton } from '@/components/shadcn/skeleton'
import siteMetadata from '@/data/siteMetadata'
import type { Authors, Blog } from 'contentlayer/generated'
import NextImage from 'next/image'
import { CoreContent } from 'pliny/utils/contentlayer'
import { formatDate } from 'pliny/utils/formatDate'
import { ReactNode, useEffect, useState } from 'react'

const BLUR_FADE_DELAY = 0.04

interface LayoutProps {
    content: CoreContent<Blog>
    authorDetails: CoreContent<Authors>[]
    children: ReactNode
    next?: { path: string; title: string }
    prev?: { path: string; title: string }
}

export default function PostLayout({ content, authorDetails, next, prev, children }: LayoutProps) {
    const { path, slug, tags, date, title, thumbnail } = content
    const displayThumbnail = thumbnail ? thumbnail : '/static/images/twitter-card.png'
    const [isLoading, setIsLoading] = useState(true)
    const [pageViews, setPageViews] = useState({
        isLoading: true,
        count: null,
    })

    useEffect(() => {
        setPageViews((prev) => ({ ...prev, isLoading: true }))
        if (slug) {
            fetch(`/api/pageviews?slug=${encodeURIComponent(slug)}`)
                .then((response) => response.json())
                .then((data) => {
                    setPageViews({
                        isLoading: false,
                        count: data.pageViewCount.toLocaleString(),
                    })
                })
                .catch((error) => {
                    console.error('Error fetching page views:', error)
                    setPageViews({
                        isLoading: false,
                        count: null,
                    })
                })
        }
    }, [slug])

    return (
        <>
            <ScrollTopAndComment />
            <article className="px-4 sm:px-6 md:px-8">
                <section className="border-t border-t-[var(--pattern-fg)] py-20">
                    <div>
                        <header>
                            <div className="space-y-1 border-b border-muted-foreground pb-10 text-center dark:border-muted">
                                <BlurFade delay={BLUR_FADE_DELAY * 1}>
                                    <div className="w-full">
                                        <div className="relative -mx-6 mt-6 md:-mx-8">
                                            <div className="relative aspect-[1.91/1] w-full rounded-md">
                                                <NextImage
                                                    src={displayThumbnail}
                                                    alt={title}
                                                    fill
                                                    className={`rounded-md object-contain ${
                                                        isLoading ? 'hidden' : ''
                                                    }`}
                                                    priority
                                                    unoptimized
                                                    onLoad={() => setIsLoading(false)}
                                                />
                                                {isLoading && (
                                                    <Skeleton className="absolute left-0 top-0 h-full w-full rounded-md object-contain" />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </BlurFade>
                                <BlurFade delay={BLUR_FADE_DELAY * 2}>
                                    <dl className="relative pt-10">
                                        <div>
                                            <dt className="sr-only">Published on</dt>
                                            <dd className="flex items-center justify-center text-base font-medium leading-6 text-muted-foreground">
                                                {pageViews !== null && (
                                                    <span className="text-muted-foreground">
                                                        {pageViews.isLoading ? (
                                                            <span className="flex items-center justify-center gap-2">
                                                                <Skeleton className="w-12 h-6" />
                                                                <span> views</span>
                                                            </span>
                                                        ) : (
                                                            `${pageViews.count} views`
                                                        )}
                                                    </span>
                                                )}
                                                <span className="mx-2">・</span>
                                                <time dateTime={date}>
                                                    {formatDate(date, siteMetadata.locale)}
                                                </time>
                                            </dd>
                                        </div>
                                    </dl>
                                </BlurFade>
                                <BlurFade delay={BLUR_FADE_DELAY * 3}>
                                    <div>
                                        <PageTitle>{title}</PageTitle>
                                    </div>
                                </BlurFade>
                                {tags && (
                                    <BlurFade delay={BLUR_FADE_DELAY * 4}>
                                        <div className="py-2">
                                            <div className="align-center flex flex-wrap justify-center space-x-3">
                                                {tags.map((tag) => (
                                                    <Tag key={tag} text={tag} />
                                                ))}
                                            </div>
                                        </div>
                                    </BlurFade>
                                )}
                                <BlurFade delay={BLUR_FADE_DELAY * 5}>
                                    <dl className="pt-6">
                                        <dt className="sr-only">Authors</dt>
                                        <dd>
                                            <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12">
                                                {authorDetails.map((author) => (
                                                    <li
                                                        className="flex items-center space-x-2"
                                                        key={author.name}
                                                    >
                                                        {author.avatar && (
                                                            <Image
                                                                src={author.avatar}
                                                                width={38}
                                                                height={38}
                                                                alt="avatar"
                                                                className="h-10 w-10 rounded-full"
                                                                skeletonClassName="rounded-full"
                                                            />
                                                        )}
                                                        <dl className="whitespace-nowrap text-sm font-medium leading-5">
                                                            <dt className="sr-only">Name</dt>
                                                            <dd className="text-foreground">
                                                                {author.name}
                                                            </dd>
                                                            <dt className="sr-only">Twitter</dt>
                                                            <dd>
                                                                {author.twitter && (
                                                                    <Link
                                                                        href={author.twitter}
                                                                        className="text-primary hover:brightness-125 dark:hover:brightness-125"
                                                                    >
                                                                        {author.twitter.replace(
                                                                            'https://twitter.com/',
                                                                            '@'
                                                                        )}
                                                                    </Link>
                                                                )}
                                                            </dd>
                                                        </dl>
                                                    </li>
                                                ))}
                                            </ul>
                                        </dd>
                                    </dl>
                                </BlurFade>
                            </div>
                        </header>
                        <div className="grid-rows-[auto_1fr] divide-y divide-muted-foreground pb-8 dark:divide-muted xl:divide-y-0">
                            <div className="divide-y divide-accent-foreground dark:divide-accent xl:col-span-3 xl:row-span-2 xl:pb-0">
                                <BlurFade delay={BLUR_FADE_DELAY * 6}>
                                    <div className="prose prose-sm max-w-none pb-8 pt-10 dark:prose-invert">
                                        {children}
                                    </div>
                                </BlurFade>
                            </div>
                            {siteMetadata.comments && (
                                <BlurFade delay={BLUR_FADE_DELAY * 7}>
                                    <div
                                        className="pb-6 pt-6 text-center text-muted-foreground"
                                        id="comment"
                                    >
                                        <Comments slug={slug} />
                                    </div>
                                </BlurFade>
                            )}
                            <footer>
                                <BlurFade delay={BLUR_FADE_DELAY * 8}>
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
                    </div>
                </section>
            </article>
        </>
    )
}
