interface ProgressBarProps {
    current: number
    target: number
    className?: string
}

export function ProgressBar({ current, target, className = '' }: ProgressBarProps) {
    const percentage = Math.min((current / target) * 100, 100)

    return (
        <div className={className}>
            <div className="mb-2 flex justify-between text-sm">
                <span className="font-medium text-foreground">
                    ${current.toLocaleString()}
                </span>
                <span className="text-muted-foreground">
                    ${target.toLocaleString()}
                </span>
            </div>
            <div className="h-3 w-full overflow-hidden rounded-full bg-muted">
                <div
                    className="h-full rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>
            <div className="mt-1 text-right text-xs text-muted-foreground">
                {percentage.toFixed(1)}% funded
            </div>
        </div>
    )
}

