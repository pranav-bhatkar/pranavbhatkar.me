import Hero from '@/components/home/Hero'

export default function Home({ posts }) {
    return (
        <div className="divide-y divide-accent-foreground dark:divide-accent">
            <Hero />
        </div>
    )
}
