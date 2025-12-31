import Footer from '@/components/Footer'
import NewHeader from '@/components/newHeader'
import siteMetadata from '@/data/siteMetadata'
import { GA } from 'pliny/analytics/GoogleAnalytics'
import { SearchProvider } from 'pliny/search'
import React from 'react'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="container relative mx-auto max-w-7xl px-4 md:px-[2rem] [--pattern-fg:rgb(20,20,20)] dark:[--pattern-fg:rgb(20,20,20)]">
            <SearchProvider
                searchConfig={
                    siteMetadata.search
                        ? siteMetadata.search
                        : {
                              provider: 'kbar',
                              kbarConfig: {
                                  searchDocumentsPath: '/search.json',
                              },
                          }
                }
            >
                <NewHeader />
                <main className="relative">
                    <div className="flex min-h-[100dvh] flex-col">{children}</div>
                </main>
                <div className="absolute top-0 right-0 h-full w-4 border-x border-x-[var(--pattern-fg)] bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-[length:10px_10px] bg-fixed md:w-8" />
                <div className="absolute top-0 left-0 h-full w-4 border-x border-x-[var(--pattern-fg)] bg-[repeating-linear-gradient(315deg,var(--pattern-fg)_0,var(--pattern-fg)_1px,transparent_0,transparent_50%)] bg-[length:10px_10px] bg-fixed md:w-8" />
            </SearchProvider>
            <Footer />
        </div>
    )
}
