import PageTitle from '@/components/PageTitle'
import siteMetadata from '@/data/siteMetadata'
import PostBanner from '@/layouts/PostBanner'
import PostLayout from '@/layouts/PostLayout'
import PostSimple from '@/layouts/PostSimple'
import { MDXContent } from '@/components/MDXContent'
import {
    type Authors,
    type Blog,
    allAuthors,
    allBlogs,
    allCoreContent,
    coreContent,
    sortPosts,
} from '@/lib/velite'
import 'css/prism.css'
import 'katex/dist/katex.css'
import { Metadata } from 'next'

import { ReportView } from './view'

const defaultLayout = 'PostLayout'
const layouts = {
    PostSimple,
    PostLayout,
    PostBanner,
}
const isProduction = process.env.NODE_ENV === 'production'
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
    const { slug: slugArray } = await params
    const slug = decodeURI(slugArray.join('/'))
    const post = allBlogs.find((p) => p.slug === slug)
    const authorList = post?.authors || ['default']
    const authorDetails = authorList.map((author) => {
        const authorResults = allAuthors.find((p) => p.slug === author)
        return coreContent(authorResults as Authors)
    })
    if (!post) {
        return
    }

    const publishedAt = new Date(post.date).toISOString()
    const modifiedAt = new Date(post.lastmod || post.date).toISOString()
    const authors = authorDetails.map((author) => author.name)
    let imageList = [siteMetadata.socialBanner]
    if (post.images) {
        imageList = typeof post.images === 'string' ? [post.images] : post.images
    }
    const ogImages = imageList.map((img) => {
        return {
            url: img.includes('http') ? img : siteMetadata.siteUrl + img,
        }
    })

    return {
        title: post.title,
        description: post.summary,
        openGraph: {
            title: post.title,
            description: post.summary,
            siteName: siteMetadata.title,
            locale: 'en_US',
            type: 'article',
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
            url: './',
            images: ogImages,
            authors: authors.length > 0 ? authors : [siteMetadata.author],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.summary,
            images: imageList,
        },
    }
}

export const generateStaticParams = async () => {
    const paths = allBlogs.map((p) => ({ slug: p.slug.split('/') }))

    return paths
}

export default async function Page({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug: slugArray } = await params
    const slug = decodeURI(slugArray.join('/'))
    // Filter out drafts in production
    const sortedCoreContents = allCoreContent(sortPosts(allBlogs))

    const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
    if (postIndex === -1) {
        return (
            <div className="mt-24 text-center">
                <PageTitle>
                    Under Construction{' '}
                    <span role="img" aria-label="roadwork sign">
                        🚧
                    </span>
                </PageTitle>
            </div>
        )
    }
    const draftFilter = sortedCoreContents.filter((p) => !p.draft)
    const draftIndex = draftFilter.findIndex((p) => p.slug === slug)
    if (draftIndex === -1 && isProduction) {
        return (
            <div className="mt-24 text-center">
                <PageTitle>
                    Coming Soon{' '}
                    <span role="img" aria-label="roadwork sign">
                        🕐
                    </span>
                </PageTitle>
            </div>
        )
    }
    const prev = sortedCoreContents[postIndex + 1]
    const next = sortedCoreContents[postIndex - 1]
    const post = allBlogs.find((p) => p.slug === slug) as Blog
    const authorList = post?.authors || ['default']
    const authorDetails = authorList.map((author) => {
        const authorResults = allAuthors.find((p) => p.slug === author)
        return coreContent(authorResults as Authors)
    })
    const mainContent = coreContent(post)
    const jsonLd = post.structuredData
    jsonLd['author'] = authorDetails.map((author) => {
        return {
            '@type': 'Person',
            name: author.name,
        }
    })

    const Layout = layouts[post.layout || defaultLayout]

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <ReportView slug={slug} />
            <Layout content={mainContent} authorDetails={authorDetails} next={next} prev={prev}>
                <MDXContent code={post.body} toc={post.toc} />
            </Layout>
            {post.draft && (
                <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 absolute top-10 left-5">
                    <p className="text-sm text-gray-500">This post is still a draft</p>
                </div>
            )}
        </>
    )
}
