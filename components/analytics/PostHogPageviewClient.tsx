'use client'

import { Suspense, useEffect } from 'react'
import { usePostHogPageview } from './usePostHogPageview'

function Inner() {
    usePostHogPageview()
    return null
}

export default function PostHogPageviewClient() {
    return (
        <Suspense>
            <Inner />
        </Suspense>
    )
}

