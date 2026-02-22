import { writeFileSync } from 'fs'
import GithubSlugger from 'github-slugger'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { defineCollection, defineConfig, s } from 'velite'

import siteMetadata from './data/siteMetadata'

const blogs = defineCollection({
    name: 'Blog',
    pattern: 'blog/**/*.mdx',
    schema: s
        .object({
            title: s.string(),
            date: s.isodate(),
            tags: s.array(s.string()).default([]),
            lastmod: s.isodate().optional(),
            draft: s.boolean().default(false),
            summary: s.string().optional(),
            images: s.array(s.string()).optional(),
            thumbnail: s.string().optional(),
            authors: s.array(s.string()).optional(),
            layout: s.string().optional(),
            bibliography: s.string().optional(),
            canonicalUrl: s.string().optional(),
            slug: s.path(),
            body: s.mdx(),
            toc: s.toc(),
            metadata: s.metadata(),
        })
        .transform((data) => ({
            ...data,
            slug: data.slug.replace(/^blog\//, ''),
            path: data.slug,
            filePath: 'blog/' + data.slug.replace(/^blog\//, '') + '.mdx',
            readingTime: data.metadata,
            structuredData: {
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: data.title,
                datePublished: data.date,
                dateModified: data.lastmod || data.date,
                description: data.summary,
                image: data.images ? data.images[0] : siteMetadata.socialBanner,
                url: `${siteMetadata.siteUrl}/${data.slug}`,
                author: data.authors as any,
            } as Record<string, unknown>,
        })),
})

const authors = defineCollection({
    name: 'Authors',
    pattern: 'authors/**/*.mdx',
    schema: s
        .object({
            name: s.string(),
            avatar: s.string().optional(),
            occupation: s.string().optional(),
            company: s.string().optional(),
            email: s.string().optional(),
            twitter: s.string().optional(),
            linkedin: s.string().optional(),
            instagram: s.string().optional(),
            github: s.string().optional(),
            layout: s.string().optional(),
            slug: s.path(),
            body: s.mdx(),
            toc: s.toc(),
            metadata: s.metadata(),
        })
        .transform((data) => ({
            ...data,
            slug: data.slug.replace(/^authors\//, ''),
            path: data.slug,
            filePath: 'authors/' + data.slug.replace(/^authors\//, '') + '.mdx',
            readingTime: data.metadata,
        })),
})

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
    root: 'data',
    output: {
        data: '.velite',
        assets: 'public/static',
        base: '/static/',
        name: '[name]-[hash:6].[ext]',
        clean: true,
    },
    collections: { blogs, authors },
    mdx: {
        remarkPlugins: [remarkGfm, remarkMath] as any,
        rehypePlugins: [
            rehypeSlug,
            rehypeAutolinkHeadings,
            rehypeKatex,
            [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
        ] as any,
    },
    prepare: ({ blogs }) => {
        // Generate tag counts
        const tagCount: Record<string, number> = {}
        blogs.forEach((post) => {
            if (post.tags && (!isProduction || post.draft !== true)) {
                post.tags.forEach((tag) => {
                    const formattedTag = GithubSlugger.slug(tag)
                    if (formattedTag in tagCount) {
                        tagCount[formattedTag] += 1
                    } else {
                        tagCount[formattedTag] = 1
                    }
                })
            }
        })
        writeFileSync('./app/tag-data.json', JSON.stringify(tagCount))

        // Generate search index
        if (
            siteMetadata?.search?.provider === 'kbar' &&
            siteMetadata.search.kbarConfig.searchDocumentsPath
        ) {
            const searchData = blogs
                .filter((post) => !isProduction || !post.draft)
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .map(({ body, metadata, toc, ...rest }) => rest)
            writeFileSync(
                `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
                JSON.stringify(searchData)
            )
            console.log('Local search index generated...')
        }
    },
})
