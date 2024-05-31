'use client'

import { initLoaderHome } from '@/scripts/utils/animations'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

function Loader() {
    const router = useRouter()
    useEffect(() => {
        initLoaderHome()
        router.prefetch('/blog')
        router.prefetch('/projects')
        router.prefetch('/about')
    }, [router])
    return null
}

export default Loader
