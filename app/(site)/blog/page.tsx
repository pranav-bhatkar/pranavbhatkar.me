import ListLayout from '@/layouts/ListLayout'
import { genPageMetadata } from 'app/seo'
import { allBlogs } from 'contentlayer/generated'
import { allCoreContent, sortPosts } from 'pliny/utils/contentlayer'

const POSTS_PER_PAGE = 5

export const metadata = genPageMetadata({ title: 'Blog' })

export default function BlogPage() {
    const posts = allCoreContent(sortPosts(allBlogs))
    // filter out drafts in production
    const filteredPosts = posts.filter((post) => !post.draft)
    const pageNumber = 1
    const initialDisplayPosts = posts.slice(
        POSTS_PER_PAGE * (pageNumber - 1),
        POSTS_PER_PAGE * pageNumber
    )
    const pagination = {
        currentPage: pageNumber,
        totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
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
