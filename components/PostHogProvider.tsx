'use client'

import { initPostHog } from '@/lib/posthog'
import { useEffect } from 'react'

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initPostHog()
  }, [])

  return <>{children}</>
}