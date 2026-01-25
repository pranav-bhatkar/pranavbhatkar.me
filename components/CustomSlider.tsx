'use client'

import { cn } from '@/scripts/utils/tailwind-helpers'
import { useCallback, useEffect, useRef, useState } from 'react'

interface CustomSliderProps {
    value: number
    onChange: (value: number) => void
    min: number
    max: number
    step?: number
    className?: string
}

const CustomSlider = ({ value, onChange, min, max, step = 100, className }: CustomSliderProps) => {
    const trackRef = useRef<HTMLDivElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    const percentage = ((value - min) / (max - min)) * 100

    const calculateValue = useCallback(
        (clientX: number) => {
            if (!trackRef.current) return value

            const rect = trackRef.current.getBoundingClientRect()
            const relativeX = clientX - rect.left
            const percentage = Math.max(0, Math.min(1, relativeX / rect.width))
            const rawValue = min + percentage * (max - min)
            const steppedValue = Math.round(rawValue / step) * step

            return Math.max(min, Math.min(max, steppedValue))
        },
        [min, max, step, value]
    )

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true)
        const newValue = calculateValue(e.clientX)
        onChange(newValue)
    }

    const handleTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true)
        const newValue = calculateValue(e.touches[0].clientX)
        onChange(newValue)
    }

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging) return
            const newValue = calculateValue(e.clientX)
            onChange(newValue)
        }

        const handleTouchMove = (e: TouchEvent) => {
            if (!isDragging) return
            const newValue = calculateValue(e.touches[0].clientX)
            onChange(newValue)
        }

        const handleEnd = () => {
            setIsDragging(false)
        }

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleEnd)
            document.addEventListener('touchmove', handleTouchMove)
            document.addEventListener('touchend', handleEnd)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleEnd)
            document.removeEventListener('touchmove', handleTouchMove)
            document.removeEventListener('touchend', handleEnd)
        }
    }, [isDragging, calculateValue, onChange])

    // Tick marks
    const tickCount = 5
    const ticks = Array.from({ length: tickCount + 1 }, (_, i) => {
        const tickValue = min + (i / tickCount) * (max - min)
        return Math.round(tickValue / 1000) * 1000
    })

    return (
        <div className={cn('w-full py-4', className)}>
            {/* Track container */}
            <div
                ref={trackRef}
                className="relative h-3 cursor-pointer group"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
            >
                {/* Background track */}
                <div className="absolute inset-0 bg-muted border border-border" />

                {/* Filled track */}
                <div
                    className="absolute inset-y-0 left-0 bg-foreground transition-all duration-75"
                    style={{ width: `${percentage}%` }}
                />

                {/* Thumb */}
                <div
                    className={cn(
                        'absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-background border-2 border-foreground transition-transform duration-75',
                        isDragging && 'scale-110'
                    )}
                    style={{ left: `${percentage}%` }}
                >
                    {/* Inner dot */}
                    <div className="absolute inset-2 bg-foreground" />
                </div>

                {/* Tick marks */}
                {ticks.map((tick, i) => (
                    <div
                        key={i}
                        className="absolute top-full mt-2 -translate-x-1/2"
                        style={{ left: `${(i / tickCount) * 100}%` }}
                    >
                        <div className="w-px h-2 bg-border mx-auto" />
                        <span className="text-[10px] text-muted-foreground mt-1 block whitespace-nowrap">
                            {tick >= 1000 ? `${tick / 1000}k` : tick}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CustomSlider
