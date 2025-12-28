import { Badge } from '@/components/shadcn/badge'

import Image from './Image'
import Link from './Link'

type CardProps = {
    title: string
    description: string
    imgSrc: string
    href: string
    tags?: {
        name: string
        color?: string
        link?: string
    }[]
}

const Card = ({ title, description, imgSrc, href, tags = [] }: CardProps) => (
    <div className={`${imgSrc && 'h-full'} overflow-hidden rounded-md border border-border`}>
        {imgSrc &&
            (href ? (
                <Link href={href} aria-label={`Link to ${title}`}>
                    <Image
                        alt={title}
                        src={imgSrc}
                        className="object-fit object-center"
                        width={544}
                        height={286}
                    />
                </Link>
            ) : (
                <Image
                    alt={title}
                    src={imgSrc}
                    className="object-fit object-center"
                    width={544}
                    height={286}
                />
            ))}
        <div className="p-6">
            <h2 className="mb-2 text-base font-semibold leading-tight">
                {href ? (
                    <Link href={href} aria-label={`Link to ${title}`}>
                        {title}
                    </Link>
                ) : (
                    title
                )}
            </h2>
            <div className="mb-3 flex flex-wrap">
                {tags.map((tag, index) => (
                    <Link href={tag.link ?? '#'} key={tag.name}>
                        <Badge
                            aria-label={`Link to ${tag.name}`}
                            className="mr-2 mb-2"
                            variant="outline"
                        >
                            {tag.name}
                        </Badge>
                    </Link>
                ))}
            </div>
            <p className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert mb-3">
                {description}
            </p>
            {href && (
                <Link
                    href={href}
                    className="text-sm font-medium leading-6 text-primary hover:brightness-125 dark:hover:brightness-125"
                    aria-label={`Link to ${title}`}
                >
                    Learn more &rarr;
                </Link>
            )}
        </div>
    </div>
)

export default Card
