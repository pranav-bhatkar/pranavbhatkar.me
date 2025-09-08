'use client'

import { posthog } from '@/lib/posthog'
import { useCallback } from 'react'

export const useAnalytics = () => {
  const trackEvent = useCallback((eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.capture(eventName, properties)
    }
  }, [])

  const trackPageView = useCallback((pageName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.capture('$pageview', {
        page: pageName,
        ...properties
      })
    }
  }, [])

  const identifyUser = useCallback((userId: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.identify(userId, properties)
    }
  }, [])

  const setUserProperties = useCallback((properties: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      posthog.people.set(properties)
    }
  }, [])

  return {
    trackEvent,
    trackPageView,
    identifyUser,
    setUserProperties
  }
}