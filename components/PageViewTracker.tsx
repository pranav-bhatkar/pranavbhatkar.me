'use client'

import { useAnalytics } from '@/hooks/useAnalytics'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function PageViewTracker() {
  const pathname = usePathname()
  const { trackPageView } = useAnalytics()

  useEffect(() => {
    trackPageView(pathname, {
      timestamp: new Date().toISOString(),
      referrer: document.referrer
    })
  }, [pathname, trackPageView])

  return null
}