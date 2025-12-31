'use client'

import { SignIn } from '@clerk/nextjs'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function SignInPage() {
    const { user, isLoaded } = useUser()
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && user) {
            // Check if user has admin role
            const role = user.publicMetadata?.role
            if (role === 'admin') {
                router.push('/admin')
            } else {
                router.push('/admin/unauthorized')
            }
        }
    }, [isLoaded, user, router])

    if (!isLoaded) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <div className="mb-4 text-lg text-gray-600 dark:text-gray-400">Loading...</div>
                </div>
            </div>
        )
    }

    if (user) {
        return null // Will redirect via useEffect
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="w-full max-w-md">
                <div className="mb-8 text-center">
                    <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                        Admin Sign In
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Sign in to access the admin panel
                    </p>
                </div>
                <div className="flex justify-center">
                    <SignIn
                        appearance={{
                            elements: {
                                rootBox: 'mx-auto',
                                card: 'bg-white dark:bg-gray-950 shadow-lg border border-gray-200 dark:border-gray-800',
                                headerTitle: 'text-gray-900 dark:text-gray-100',
                                headerSubtitle: 'text-gray-600 dark:text-gray-400',
                                socialButtonsBlockButton:
                                    'bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800',
                                formButtonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
                                formFieldLabel: 'text-gray-700 dark:text-gray-300',
                                formFieldInput:
                                    'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100',
                                footerActionLink:
                                    'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500',
                            },
                        }}
                        routing="path"
                        path="/sign-in"
                        signUpUrl="/sign-up"
                        afterSignInUrl="/admin"
                    />
                </div>
            </div>
        </div>
    )
}
