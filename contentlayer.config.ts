import { ComputedFields, defineDocumentType, makeSource } from 'contentlayer2/source-files'
import { readFileSync, readdirSync, writeFileSync } from 'fs'
import GithubSlugger from 'github-slugger'
import path from 'path'
import {
    extractTocHeadings,
    remarkCodeTitles,
    remarkExtractFrontmatter,
    remarkImgToJsx,
} from 'pliny/mdx-plugins/index.js'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer.js'
import readingTime from 'reading-time'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypePrismPlus from 'rehype-prism-plus'
// Rehype packages
import rehypeSlug from 'rehype-slug'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'

import siteMetadata from './data/siteMetadata'

const root = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

const computedFields: ComputedFields = {
    readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
    slug: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
    },
    path: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath,
    },
    filePath: {
        type: 'string',
        resolve: (doc) => doc._raw.sourceFilePath,
    },
    toc: { type: 'string', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

/**
 * Count the occurrences of all tags across blog posts and write to json file
 */
function createTagCount(allBlogs) {
    const tagCount: Record<string, number> = {}
    allBlogs.forEach((file) => {
        if (file.tags && (!isProduction || file.draft !== true)) {
            file.tags.forEach((tag) => {
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
}

function createSearchIndex(allBlogs) {
    if (
        siteMetadata?.search?.provider === 'kbar' &&
        siteMetadata.search.kbarConfig.searchDocumentsPath
    ) {
        writeFileSync(
            `public/${siteMetadata.search.kbarConfig.searchDocumentsPath}`,
            JSON.stringify(allCoreContent(sortPosts(allBlogs)))
        )
        console.log('Local search index generated...')
    }
}

/**
 * Patch generated .mjs files to replace 'assert' with 'with' for Node.js v24 compatibility
 */
function patchGeneratedFiles() {
    const generatedDir = path.join(root, '.contentlayer/generated')

    function patchFile(filePath: string) {
        const content = readFileSync(filePath, 'utf-8')
        // Replace 'assert { type: 'json' }' with 'with { type: 'json' }' for Node.js v24 compatibility
        const patched = content.replace(
            /\bassert\s*{\s*type:\s*['"]json['"]\s*}/g,
            "with { type: 'json' }"
        )
        if (content !== patched) {
            writeFileSync(filePath, patched, 'utf-8')
        }
    }

    function walkDir(dir: string) {
        const entries = readdirSync(dir, { withFileTypes: true })
        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name)
            if (entry.isDirectory()) {
                walkDir(fullPath)
            } else if (entry.isFile() && entry.name.endsWith('.mjs')) {
                patchFile(fullPath)
            }
        }
    }

    try {
        walkDir(generatedDir)
    } catch (error) {
        // Directory might not exist yet, that's okay
    }
}

export const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: 'blog/**/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'date', required: true },
        tags: { type: 'list', of: { type: 'string' }, default: [] },
        lastmod: { type: 'date' },
        draft: { type: 'boolean' },
        summary: { type: 'string' },
        images: { type: 'list', of: { type: 'string' } },
        thumbnail: { type: 'string' },
        authors: { type: 'list', of: { type: 'string' } },
        layout: { type: 'string' },
        bibliography: { type: 'string' },
        canonicalUrl: { type: 'string' },
    },
    computedFields: {
        ...computedFields,
        structuredData: {
            type: 'json',
            resolve: (doc) => ({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                headline: doc.title,
                datePublished: doc.date,
                dateModified: doc.lastmod || doc.date,
                description: doc.summary,
                image: doc.images ? doc.images[0] : siteMetadata.socialBanner,
                url: `${siteMetadata.siteUrl}/${doc._raw.flattenedPath}`,
                author: doc.authors,
            }),
        },
    },
}))

export const Authors = defineDocumentType(() => ({
    name: 'Authors',
    filePathPattern: 'authors/**/*.mdx',
    contentType: 'mdx',
    fields: {
        name: { type: 'string', required: true },
        avatar: { type: 'string' },
        occupation: { type: 'string' },
        company: { type: 'string' },
        email: { type: 'string' },
        twitter: { type: 'string' },
        linkedin: { type: 'string' },
        instagram: { type: 'string' },
        github: { type: 'string' },
        layout: { type: 'string' },
    },
    computedFields,
}))

export default makeSource({
    contentDirPath: 'data',
    documentTypes: [Blog, Authors],
    mdx: {
        cwd: process.cwd(),
        remarkPlugins: [
            remarkExtractFrontmatter,
            remarkGfm,
            remarkCodeTitles,
            remarkMath,
            remarkImgToJsx,
        ],
        rehypePlugins: [
            rehypeSlug,
            rehypeAutolinkHeadings,
            rehypeKatex,
            [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
        ],
    },
    onSuccess: async () => {
        // Patch generated files to use 'with' instead of 'assert' for Node.js v24 compatibility
        patchGeneratedFiles()

        const allBlogs = JSON.parse(
            readFileSync(path.join(root, '.contentlayer/generated/Blog/_index.json'), 'utf-8')
        )
        createTagCount(allBlogs)
        createSearchIndex(allBlogs)
    },
})
