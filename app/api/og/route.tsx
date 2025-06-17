// app/api/og/route.ts
import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET() {
    const name = 'PRANAV BHATKAR' // Capitalized for impact
    const mainTitle = 'FULL STACK DEVELOPER'
    const skillsTagline = 'React | Next.js | TypeScript | AI | Nest.js' // More comprehensive skills
    const avatar = 'https://github.com/pranav-bhatkar.png'

    // Dark mode colors (using your provided hex approximations for direct use)
    const bgColor = '#0a0a0c' // --background: 0 0% 3.9%
    const accentColor = '#d89b6c' // --primary: 34 54% 81%
    const foregroundColor = '#fcfcfc' // --foreground: 0 0% 98%
    const mutedColor = '#a3a3a6' // --muted-foreground: 0 0% 63.9%
    const borderColor = '#26262a' // --border: 0 0% 14.9%

    // Define radial gradient for background
    // This creates a glowing effect from the center
    // --- CHANGE: Increased transparent percentage to make gradients larger ---
    const radialGradient = `radial-gradient(at 15% 85%, ${borderColor}22 0%, transparent 65%), radial-gradient(at 85% 15%, ${borderColor}22 0%, transparent 65%)`

    // A subtle grid pattern for the background for a techy feel
    const gridPatternSvg = `
        <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="smallGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="${borderColor}" stroke-width="0.11" />
                </pattern>
                <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
                    <rect width="100" height="100" fill="url(#smallGrid)" />
                    <path d="M 100 0 L 0 0 0 100" fill="none" stroke="${borderColor}" stroke-width="0.11" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    `
    const encodedGridPatternSvg = encodeURIComponent(gridPatternSvg)

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center', // Center content horizontally
                    width: '100%',
                    height: '100%',
                    padding: '48px', // Slightly less padding to allow elements more space
                    backgroundColor: bgColor,
                    backgroundImage: `url('data:image/svg+xml;utf8,${encodedGridPatternSvg}'), ${radialGradient}`,
                    backgroundSize: '100% 100%',
                    backgroundRepeat: 'no-repeat, no-repeat', // Apply both grid and gradient
                    color: foregroundColor,
                    fontFamily: 'Inter, sans-serif',
                    position: 'relative', // For absolute positioning of decorative elements
                    overflow: 'hidden', // Ensures elements don't spill outside
                }}
            >
                {/* Abstract shape in top-left (more dynamic) */}
                <div
                    style={{
                        position: 'absolute',
                        top: '-70px', // Pushed further out
                        left: '-70px', // Pushed further out
                        width: '250px', // --- CHANGE: Increased size ---
                        height: '250px', // --- CHANGE: Increased size ---
                        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', // Organic blob shape
                        backgroundColor: accentColor,
                        opacity: 0.12, // --- CHANGE: Slightly increased opacity ---
                        filter: 'blur(70px)', // --- CHANGE: Increased blur for more diffusion ---
                    }}
                />
                {/* Abstract shape in bottom-right */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '-70px', // Pushed further out
                        right: '-70px', // Pushed further out
                        width: '300px', // --- CHANGE: Increased size ---
                        height: '300px', // --- CHANGE: Increased size ---
                        borderRadius: '70% 30% 30% 70% / 70% 70% 30% 30%', // Another blob shape
                        backgroundColor: mutedColor,
                        opacity: 0.08, // --- CHANGE: Slightly increased opacity ---
                        filter: 'blur(80px)', // --- CHANGE: Increased blur for more diffusion ---
                    }}
                />

                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center', // Center content vertically
                        justifyContent: 'center',
                        width: '100%',
                        maxWidth: '80%', // Constrain width
                        textAlign: 'center', // Center text
                    }}
                >
                    <img
                        src={avatar}
                        width="200"
                        height="200"
                        style={{
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginBottom: '40px',
                            border: `8px solid ${accentColor}`,
                            boxShadow: `0 0 30px ${accentColor}33`,
                        }}
                    />
                    <span
                        style={{
                            fontSize: 72,
                            fontWeight: 900,
                            lineHeight: '1.1',
                            letterSpacing: '-2px',
                            textShadow: `2px 2px 8px ${accentColor}44`,
                            marginBottom: '16px',
                        }}
                    >
                        {name}
                    </span>
                    <span
                        style={{
                            fontSize: 48,
                            fontWeight: 700,
                            color: accentColor,
                            letterSpacing: '1px',
                            marginBottom: '24px',
                        }}
                    >
                        {mainTitle}
                    </span>
                    <span
                        style={{
                            fontSize: 32,
                            fontWeight: 500,
                            color: mutedColor,
                            lineHeight: '1.4',
                            padding: '0 40px',
                        }}
                    >
                        {skillsTagline}
                    </span>
                </div>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    )
}
