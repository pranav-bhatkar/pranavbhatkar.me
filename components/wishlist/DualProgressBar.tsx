import { formatINR } from '@/data/wishlistData'

interface DualProgressBarProps {
    selfAmount: number
    communityAmount: number
    targetAmount: number
    showLabels?: boolean
    size?: 'sm' | 'md'
}

export default function DualProgressBar({
    selfAmount,
    communityAmount,
    targetAmount,
    showLabels = true,
    size = 'sm',
}: DualProgressBarProps) {
    const selfPercentage = Math.min((selfAmount / targetAmount) * 100, 100)
    const communityPercentage = Math.min(
        (communityAmount / targetAmount) * 100,
        100 - selfPercentage
    )
    const totalPercentage = Math.min(
        Math.round(((selfAmount + communityAmount) / targetAmount) * 100),
        100
    )

    const heightClass = size === 'sm' ? 'h-1.5' : 'h-2.5'

    return (
        <div>
            {/* Progress bar */}
            <div className={`relative w-full ${heightClass} bg-muted overflow-hidden`}>
                {/* Self contribution - foreground color */}
                <div
                    className="absolute left-0 top-0 h-full bg-foreground transition-all duration-500"
                    style={{ width: `${selfPercentage}%` }}
                />
                {/* Community contribution - muted foreground */}
                <div
                    className="absolute top-0 h-full bg-muted-foreground/60 transition-all duration-500"
                    style={{
                        left: `${selfPercentage}%`,
                        width: `${communityPercentage}%`,
                    }}
                />
            </div>

            {showLabels && (
                <div className="flex justify-between items-center mt-2 text-xs">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-foreground" />
                            <span className="text-muted-foreground">
                                Me: <span className="text-foreground">{formatINR(selfAmount)}</span>
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-muted-foreground/60" />
                            <span className="text-muted-foreground">
                                Community:{' '}
                                <span className="text-foreground">{formatINR(communityAmount)}</span>
                            </span>
                        </div>
                    </div>
                    <span className="text-foreground font-medium">{totalPercentage}%</span>
                </div>
            )}
        </div>
    )
}

