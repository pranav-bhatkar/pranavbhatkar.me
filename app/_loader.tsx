'use client'

import { initLoaderHome } from '@/scripts/utils/animations'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

function Loader() {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (pathname === '/') {
            initLoaderHome()
        }
        router.prefetch('/blog')
        router.prefetch('/projects')
        router.prefetch('/about')
    }, [router, pathname])

    return null
}

export default Loader
