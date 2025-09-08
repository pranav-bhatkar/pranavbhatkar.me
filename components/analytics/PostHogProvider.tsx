'use client'

import posthog from 'posthog-js'
import { ReactNode, useEffect } from 'react'

type PostHogProviderProps = {
    children: ReactNode
}

export function PostHogProvider({ children }: PostHogProviderProps) {
    useEffect(() => {
        const apiKey = process.env.NEXT_PUBLIC_POSTHOG_KEY
        const apiHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com'

        if (!apiKey) {
            return
        }

        // Prevent double-init during Fast Refresh
        if (!(posthog as any)._initialized) {
            posthog.init(apiKey, {
                api_host: apiHost,
                autocapture: true,
                capture_pageview: false,
                capture_pageleave: true,
                person_profiles: 'identified_only',
                loaded: () => {
                    ;(posthog as any)._initialized = true
                },
                disable_session_recording: false,
                enable_recording_console_log: false,
            })
        }

        const handleDocumentClick = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null
            if (!target) return
            const anchor = target.closest('a') as HTMLAnchorElement | null
            if (!anchor) return
            try {
                posthog.capture('link_click', {
                    href: anchor.href,
                    text: anchor.textContent?.trim() || '',
                    id: anchor.id || '',
                    rel: anchor.rel || '',
                    target: anchor.target || '',
                    classes: anchor.className || '',
                })
            } catch {}
        }

        document.addEventListener('click', handleDocumentClick, { capture: true })

        return () => {
            document.removeEventListener('click', handleDocumentClick, { capture: true } as any)
        }
    }, [])

    return <>{children}</>
}

