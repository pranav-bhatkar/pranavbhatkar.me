import Link from '@/components/Link'
import PageTitle from '@/components/PageTitle'

// import BentoBox from '@/components/bento/BentoBox'

export default function Home({ posts }) {
    return (
        <div className="divide-y divide-accent-foreground dark:divide-accent">
            <div className="mx-auto bento-md:-mx-[5vw] bento-lg:-mx-[20vw]">
                {/* <BentoBox posts={posts} /> */}
                <div className="my-32 text-center space-y-4">
                    <PageTitle>
                        Under Construction{' '}
                        <span role="img" aria-label="roadwork sign">
                            🚧
                        </span>
                    </PageTitle>
                    <div className="mt-14 flex flex-col md:flex-row gap-4 justify-center items-center pt-4">
                        <Link
                            href="/blog"
                            className="w-max focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500 "
                        >
                            Check Out My Blog
                        </Link>
                        <Link
                            href="/projects"
                            className="w-max focus:shadow-outline-blue inline rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium leading-5 text-white shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none dark:hover:bg-blue-500 "
                        >
                            Check Out My Projects
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
