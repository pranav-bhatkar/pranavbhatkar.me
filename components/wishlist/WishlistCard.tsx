import { Calendar, Target } from 'lucide-react'
import { ProgressBar } from './ProgressBar'
import { ContributeButton } from './ContributeButton'

interface WishlistCardProps {
    title: string
    description: string
    imageUrl: string | null
    targetAmount: number
    collectedAmount: number
    deadline: number
    isCompleted?: boolean
    showContributeButton?: boolean
}

export function WishlistCard({
    title,
    description,
    imageUrl,
    targetAmount,
    collectedAmount,
    deadline,
    isCompleted = false,
    showContributeButton = true,
}: WishlistCardProps) {
    const daysRemaining = Math.ceil((deadline - Date.now()) / (1000 * 60 * 60 * 24))
    const isPastDeadline = daysRemaining < 0

    return (
        <div className="group relative overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all hover:shadow-lg">
            {/* Image */}
            <div className="relative h-48 w-full overflow-hidden bg-muted">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <Target className="h-16 w-16 text-muted-foreground" />
                    </div>
                )}
                {isCompleted && (
                    <div className="absolute right-2 top-2 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                        Completed
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6">
                <h3 className="mb-2 text-xl font-bold text-card-foreground">
                    {title}
                </h3>
                <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                    {description}
                </p>

                {/* Progress */}
                <ProgressBar current={collectedAmount} target={targetAmount} className="mb-4" />

                {/* Deadline */}
                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    {isPastDeadline ? (
                        <span className="text-destructive">
                            Deadline passed {Math.abs(daysRemaining)} days ago
                        </span>
                    ) : (
                        <span>
                            {daysRemaining === 0
                                ? 'Ends today'
                                : daysRemaining === 1
                                  ? '1 day remaining'
                                  : `${daysRemaining} days remaining`}
                        </span>
                    )}
                </div>

                {/* Contribute Button */}
                {showContributeButton && !isCompleted && (
                    <ContributeButton title={title} amount={targetAmount - collectedAmount} />
                )}
            </div>
        </div>
    )
}

