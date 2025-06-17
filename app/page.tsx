import Card from '@/components/Card'
import { Button } from '@/components/shadcn/button'
import Link from 'next/link'

export default async function Page() {
    return (
        <main className="flex items-center justify-center min-h-screen px-4 bg-background">
            <section className="w-full max-w-2xl p-6 border border-border rounded-2xl shadow-md bg-card">
                <h1 className="text-2xl font-bold text-center text-foreground mb-4">
                    Welcome to My Portfolio
                </h1>

                <p className="text-sm text-justify leading-relaxed text-muted-foreground space-y-4">
                    <span>
                        This site was inspired by{' '}
                        <Link
                            href="https://enscribe.dev/"
                            className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Enscribe
                        </Link>
                        — well, kind of a full-on copy. I did tweak a few things, though.
                    </span>
                    <span>
                        The preloader? Yeah, it’s influenced by{' '}
                        <Link
                            href="https://dennissnellenberg.com/"
                            className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Dennis Snellenberg
                        </Link>
                        . His work is 🔥.
                    </span>
                    <span>
                        I'm currently rebuilding the whole portfolio from scratch to make it truly
                        mine. The new version will be live soon.
                    </span>
                    I recently completed a portfolio for an architect —
                    <Link
                        href="https://shreymahashabde.com/"
                        className="text-blue-600 underline underline-offset-2 hover:text-blue-800"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Shrey Mahashabde
                    </Link>
                    . I’m now actively working with
                    <Link
                        href="https://www.innovexmedia.in/"
                        className="text-blue-600 underline underline-offset-2 hover:text-blue-800 ml-1"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Innovex Media
                    </Link>
                    , a creative corporate communication company that helps brands grow through
                    storytelling, design, PR, and media.
                </p>

                <div className="mt-8 flex justify-center">
                    <Button size="sm" asChild>
                        <Link href="/landing" prefetch={false}>
                            View Portfolio v0
                        </Link>
                    </Button>
                </div>
            </section>
        </main>
    )
}
