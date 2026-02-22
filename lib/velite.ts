import { authors, blogs } from '#site/content'

export type Blog = (typeof blogs)[number]
export type Authors = (typeof authors)[number]

// Re-export with names matching the old contentlayer convention
export const allBlogs = blogs
export const allAuthors = authors

// CoreContent is a pass-through — velite doesn't have _raw/_id internals to strip
export type CoreContent<T> = T

export function sortPosts(posts: Blog[]): Blog[] {
    return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function allCoreContent(posts: Blog[]): Blog[] {
    const isProduction = process.env.NODE_ENV === 'production'
    return posts.filter((post) => !isProduction || !post.draft)
}

export function coreContent<T>(content: T): T {
    return content
}

export function formatDate(date: string, locale = 'en-US') {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    }
    return new Date(date).toLocaleDateString(locale, options)
}
