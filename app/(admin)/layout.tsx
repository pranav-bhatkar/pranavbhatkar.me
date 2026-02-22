import { ClerkProvider } from '@clerk/nextjs'

export const dynamic = 'force-dynamic'

export default function AdminGroupLayout({ children }: { children: React.ReactNode }) {
    return <ClerkProvider>{children}</ClerkProvider>
}
