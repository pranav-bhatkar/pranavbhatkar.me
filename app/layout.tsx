import Footer from '@/components/Footer'
import Header from '@/components/Header'
import siteMetadata from '@/data/siteMetadata'
import { cn } from '@/scripts/utils/tailwind-helpers'
import 'css/tailwind.css'
import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { GA } from 'pliny/analytics/GoogleAnalytics'
import { SearchProvider } from 'pliny/search'
import 'pliny/search/algolia.css'
import { Suspense } from 'react'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import './globals.css'
import { ThemeProviders } from './theme-providers'

const font = JetBrains_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-space-jetbrains-mono',
})
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-space-inter' })
export const metadata: Metadata = {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
        default: siteMetadata.title,
        template: `%s | ${siteMetadata.title}`,
    },
    description: siteMetadata.description,
    openGraph: {
        title: siteMetadata.title,
        description: siteMetadata.description,
        url: './',
        siteName: siteMetadata.title,
        images: [
            {
                url: siteMetadata.socialBanner,
                width: 1200,
                height: 630,
                alt: 'Pranav Bhatkar - Full Stack Developer',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    alternates: {
        canonical: './',
        types: {
            'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
        },
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    twitter: {
        title: siteMetadata.title,
        card: 'summary_large_image',
        creator: siteMetadata.twitter || '',
        images: [siteMetadata.socialBanner],
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html
            lang={siteMetadata.language}
            className={cn(font.variable, inter.variable, 'scroll-smooth dark')}
            suppressHydrationWarning
        >
            <link
                rel="apple-touch-icon"
                sizes="76x76"
                href="/static/favicons/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/static/favicons/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/static/favicons/favicon-16x16.png"
            />
            <link rel="manifest" href="/static/favicons/site.webmanifest" />
            <link rel="mask-icon" href="/static/favicons/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="google-adsense-account" content="ca-pub-3540924714240551" />
            <meta name="msapplication-TileColor" content="#000000" />
            <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
            <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
            <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
            <body className="bg-background text-black antialiased dark:text-white">
                <ThemeProviders>
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
                        {children}
                    </SearchProvider>
                </ThemeProviders>
                <GA
                    googleAnalyticsId={
                        siteMetadata.analytics?.googleAnalytics?.googleAnalyticsId ?? ''
                    }
                />
            </body>
        </html>
    )
}
