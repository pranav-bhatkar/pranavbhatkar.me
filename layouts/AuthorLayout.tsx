import Image from '@/components/Image'
import type { Authors } from '@/lib/velite'
import { Github, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import { ReactNode } from 'react'

interface Props {
    children: ReactNode
    content: Omit<Authors, 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
    const { name, avatar, occupation, company, email, twitter, linkedin, github, instagram } =
        content

    const socials = [
        { href: twitter, label: 'Twitter', Icon: Twitter },
        { href: email ? `mailto:${email}` : undefined, label: 'Email', Icon: Mail },
        { href: github, label: 'Github', Icon: Github },
        { href: linkedin, label: 'Linkedin', Icon: Linkedin },
        { href: instagram, label: 'Instagram', Icon: Instagram },
    ].filter((s) => s.href)

    return (
        <div className="py-20 px-4 sm:px-6 md:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 pb-10">
                    {avatar && (
                        <Image
                            src={avatar}
                            alt="avatar"
                            width={160}
                            height={160}
                            className="h-40 w-40 rounded-full shrink-0"
                        />
                    )}
                    <div className="text-center sm:text-left">
                        <h1 className="text-3xl font-bold tracking-tight mb-1">{name}</h1>
                        {occupation && (
                            <p className="text-muted-foreground text-lg">{occupation}</p>
                        )}
                        {company && (
                            <p className="text-muted-foreground text-sm">{company}</p>
                        )}
                        <div className="flex gap-4 mt-5 justify-center sm:justify-start">
                            {socials.map(({ href, label, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={`${name}'s ${label}`}
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <Icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="border-t border-border pt-10">
                    <div className="prose prose-sm max-w-none dark:prose-invert">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
