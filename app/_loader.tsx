'use client'

import { initLoaderHome } from '@/scripts/utils/animations'
import { useEffect } from 'react'

function Loader() {
    useEffect(() => {
        initLoaderHome()
    }, [])
    return null
}

export default Loader
