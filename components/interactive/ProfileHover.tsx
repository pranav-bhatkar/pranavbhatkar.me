'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type Platform = 'x' | 'instagram'

type ProfileHoverProps = {
    name: string
    platform: Platform
    username: string
    className?: string
}

type ProfileData = {
    name?: string
    avatarUrl?: string
    bio?: string
    url?: string
}

async function fetchProfile(platform: Platform, username: string): Promise<ProfileData> {
    try {
        if (platform === 'instagram') {
            const res = await fetch(`https://r.jina.ai/http://www.instagram.com/${username}/`, {
                cache: 'no-store',
            })
            const html = await res.text()
            const match = html.match(/"profile_pic_url_hd":"(.*?)"/)
            const avatarUrl = match ? decodeURIComponent(match[1].replace(/\\u0026/g, '&')) : undefined
            return {
                name: username,
                avatarUrl,
                bio: undefined,
                url: `https://instagram.com/${username}`,
            }
        }
        // X/Twitter basic oEmbed for avatar is unreliable; fallback to unavatar
        const avatarUrl = `https://unavatar.io/x/${username}`
        return { name: username, avatarUrl, url: `https://x.com/${username}` }
    } catch {
        return { name: username }
    }
}

export function ProfileHover({ name, platform, username, className }: ProfileHoverProps) {
    const [open, setOpen] = useState(false)
    const [profile, setProfile] = useState<ProfileData | null>(null)

    useEffect(() => {
        if (!open || profile) return
        let mounted = true
        fetchProfile(platform, username).then((data) => {
            if (mounted) setProfile(data)
        })
        return () => {
            mounted = false
        }
    }, [open, platform, username, profile])

    const href = useMemo(() => {
        return profile?.url || (platform === 'instagram'
            ? `https://instagram.com/${username}`
            : `https://x.com/${username}`)
    }, [platform, username, profile?.url])

    return (
        <span
            className={className}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <a href={href} target="_blank" rel="noreferrer" className="underline underline-offset-4">
                {name}
            </a>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                        className="absolute z-50 mt-2 w-64 rounded-xl border border-border bg-card p-4 shadow-xl"
                    >
                        <div className="flex items-center gap-3">
                            <div className="relative h-12 w-12 overflow-hidden rounded-full bg-muted">
                                {profile?.avatarUrl ? (
                                    <Image
                                        src={profile.avatarUrl}
                                        alt={`${name} avatar`}
                                        fill
                                        sizes="48px"
                                        className="object-cover"
                                    />
                                ) : null}
                            </div>
                            <div className="min-w-0">
                                <p className="truncate font-semibold text-foreground">{name}</p>
                                <p className="truncate text-sm text-muted-foreground">
                                    @{username} · {platform}
                                </p>
                            </div>
                        </div>
                        {profile?.bio ? (
                            <p className="mt-3 line-clamp-3 text-sm text-muted-foreground">
                                {profile.bio}
                            </p>
                        ) : null}
                    </motion.div>
                )}
            </AnimatePresence>
        </span>
    )
}

export default ProfileHover

