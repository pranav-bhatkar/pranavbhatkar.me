'use client'

import posthog from 'posthog-js'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function usePostHogPageview() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (!pathname) return
        try {
            const query = searchParams?.toString()
            const url = query ? `${pathname}?${query}` : pathname
            posthog.capture('$pageview', { $current_url: url })
        } catch {}
    }, [pathname, searchParams])
}

