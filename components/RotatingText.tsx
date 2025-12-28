import { TypingAnimation } from './magicui/typing-animation'

interface RotatingTextProps {
    words: string[]
    className?: string
    typeSpeed?: number
    deleteSpeed?: number
    pauseDelay?: number
    loop?: boolean
    showCursor?: boolean
    blinkCursor?: boolean
    cursorStyle?: 'line' | 'block' | 'underscore'
}

const RotatingText = ({
    words,
    className,
    typeSpeed = 80,
    deleteSpeed = 40,
    pauseDelay = 1500,
    loop = true,
    showCursor = true,
    blinkCursor = true,
    cursorStyle = 'underscore',
}: RotatingTextProps) => {
    return (
        <TypingAnimation
            words={words}
            className={className}
            typeSpeed={typeSpeed}
            deleteSpeed={deleteSpeed}
            pauseDelay={pauseDelay}
            loop={loop}
            showCursor={showCursor}
            blinkCursor={blinkCursor}
            cursorStyle={cursorStyle}
        />
    )
}

export default RotatingText
