'use client'

import { ShieldAlert } from 'lucide-react'
import Link from 'next/link'

export default function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
                <div className="mb-4 flex justify-center">
                    <ShieldAlert className="h-16 w-16 text-red-500" />
                </div>
                <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
                    Unauthorized Access
                </h1>
                <p className="mb-6 text-gray-600 dark:text-gray-400">
                    You don't have permission to access the admin panel.
                </p>
                <Link
                    href="/"
                    className="inline-block rounded-lg bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    )
}
