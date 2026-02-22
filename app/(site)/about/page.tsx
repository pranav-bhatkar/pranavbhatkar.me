import AuthorLayout from '@/layouts/AuthorLayout'
import { genPageMetadata } from 'app/seo'
import { MDXContent } from '@/components/MDXContent'
import { type Authors, allAuthors, coreContent } from '@/lib/velite'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
    const author = allAuthors.find((p) => p.slug === 'default') as Authors
    const mainContent = coreContent(author)

    return (
        <>
            <AuthorLayout content={mainContent}>
                <MDXContent code={author.body} />
            </AuthorLayout>
        </>
    )
}
