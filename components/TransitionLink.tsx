'use client'

import { pageTransitionIn } from '@/scripts/utils/animations'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
    href: string
    label: string
    className?: string
    onClick?: () => void
}

const TransitionLink = ({ href, label, className, onClick }: Props) => {
    const router = useRouter()
    const pathname = usePathname()

    const handleClick = () => {
        if (pathname !== href) {
            pageTransitionIn(href, router)
            onClick && onClick()
        }
    }

    return (
        <button className={className} onClick={handleClick}>
            {label}
        </button>
    )
}

export default TransitionLink
