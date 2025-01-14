import { Button } from '@/components/shadcn/button'
import Link from 'next/link'

export default async function Page() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center container">
            <h1 className="text-4xl font-bold">Welcome to My Portfolio!</h1>
            <p className="mt-4 text-lg max-w-6xl">
                This portfolio was inspired by{' '}
                <Link href="https://enscribe.dev/" className="text-blue-500 underline">
                    Enscribe
                </Link>
                . Or you can say a fully copied version of it. While I made some changes, I still
                feel it reflects their original work. Additionally, the preloader in this app is
                inspired by{' '}
                <Link href="https://dennissnellenberg.com/" className="text-blue-500 underline">
                    Dennis Snellenberg
                </Link>{' '}
                whose work I admire. I'm currently rebuilding the portfolio from scratch to make it
                uniquely mine, and the new version will be live soon. Meanwhile, feel free to
                explore this version using the button below. Here is what I am working on currently{' '}
                <Link href="https://shreymahashabde.com/" className="text-blue-500 underline">
                    Shrey Mahashabde
                </Link>
                , I am building a portfolio for an architect.
            </p>
            <Button className="mt-8" asChild>
                <Link href="/landing" passHref prefetch={false}>
                    Portfolio Version 0
                </Link>
            </Button>
        </div>
    )
}
