import ListLayout from '@/layouts/ListLayout'
import { allBlogs, allCoreContent, sortPosts } from '@/lib/velite'
import { genPageMetadata } from 'app/seo'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
    const posts = allCoreContent(sortPosts(allBlogs))
    // filter out drafts in production
    const isProduction = process.env.NODE_ENV === 'production'

    const filteredPosts = isProduction ? posts.filter((post) => !post.draft) : posts
    const pageNumber = 1
    const initialDisplayPosts = filteredPosts.slice(
        POSTS_PER_PAGE * (pageNumber - 1),
        POSTS_PER_PAGE * pageNumber
    )
    const pagination = {
        currentPage: pageNumber,
        totalPages: Math.ceil(filteredPosts.length / POSTS_PER_PAGE),
    }

    return (
        <ListLayout
            posts={filteredPosts}
            initialDisplayPosts={initialDisplayPosts}
            pagination={pagination}
            title="All Posts"
        />
    )
}
