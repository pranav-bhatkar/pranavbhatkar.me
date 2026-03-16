import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const title = searchParams.get('title') || 'Pranav Bhatkar'
    const subtitle = searchParams.get('subtitle') || 'Full Stack Developer'

    const ogBg = `${req.nextUrl.origin}/static/og-image.png`

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                }}
            >
                {/* Shader background image */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={ogBg}
                    alt=""
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                    }}
                />

                {/* Dark overlay for text readability */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        background: 'radial-gradient(circle at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 70%)',
                    }}
                />

                {/* Content */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        padding: '60px',
                        zIndex: 10,
                    }}
                >
                    <span
                        style={{
                            fontSize: 64,
                            fontWeight: 800,
                            color: '#fcfcfc',
                            lineHeight: 1.15,
                            letterSpacing: '-2px',
                            textAlign: 'center',
                            maxWidth: '90%',
                        }}
                    >
                        {title}
                    </span>
                    <span
                        style={{
                            fontSize: 28,
                            fontWeight: 400,
                            color: 'rgba(255, 255, 255, 0.55)',
                            marginTop: '16px',
                            textAlign: 'center',
                            maxWidth: '80%',
                        }}
                    >
                        {subtitle}
                    </span>
                </div>

                {/* Domain */}
                <span
                    style={{
                        position: 'absolute',
                        bottom: '36px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: 18,
                        color: 'rgba(255, 255, 255, 0.3)',
                    }}
                >
                    pranavbhatkar.me
                </span>
            </div>
        ),
        {
            width: 1200,
            height: 630,
        }
    )
}
