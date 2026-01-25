'use client'

import { useMemo } from 'react'

interface ContributionMascotProps {
    amount: number
    maxAmount: number
}

export default function ContributionMascot({
    amount,
    maxAmount,
}: ContributionMascotProps) {
    const percentage = Math.min((amount / maxAmount) * 100, 100)

    const mascotState = useMemo(() => {
        if (percentage === 0) return 'sleeping'
        if (percentage < 10) return 'waking'
        if (percentage < 30) return 'content'
        if (percentage < 60) return 'happy'
        if (percentage < 90) return 'excited'
        return 'overjoyed'
    }, [percentage])

    // Simple text-based faces
    const getFace = () => {
        switch (mascotState) {
            case 'sleeping':
                return { eyes: '—  —', mouth: '·' }
            case 'waking':
                return { eyes: '·  ·', mouth: 'o' }
            case 'content':
                return { eyes: '·  ·', mouth: '‿' }
            case 'happy':
                return { eyes: '^  ^', mouth: '◡' }
            case 'excited':
                return { eyes: '◦  ◦', mouth: '◡' }
            case 'overjoyed':
                return { eyes: '◦  ◦', mouth: '□' }
        }
    }

    const getMessage = () => {
        switch (mascotState) {
            case 'sleeping':
                return 'waiting...'
            case 'waking':
                return 'oh?'
            case 'content':
                return 'nice'
            case 'happy':
                return 'thank you'
            case 'excited':
                return 'wow!'
            case 'overjoyed':
                return 'amazing!'
        }
    }

    const face = getFace()

    return (
        <div className="flex flex-col items-center justify-center text-center select-none">
            {/* Minimal ASCII face */}
            <div className="font-mono text-foreground transition-all duration-300">
                <div className="border border-foreground/20 rounded-lg p-6 bg-background">
                    {/* Eyes */}
                    <div className="text-xl tracking-widest mb-1">{face.eyes}</div>
                    {/* Mouth */}
                    <div className="text-lg">{face.mouth}</div>
                </div>
            </div>

            {/* Message */}
            <p className="mt-4 text-sm text-muted-foreground font-mono">{getMessage()}</p>

            {/* Percentage */}
            <p className="mt-1 text-xs text-muted-foreground/60 font-mono">
                {Math.round(percentage)}%
            </p>
        </div>
    )
}

