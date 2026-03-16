import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

export async function GET(req: NextRequest) {
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
                {/* Shader background */}
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

                {/* Subtle darkening */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        display: 'flex',
                        background: 'linear-gradient(135deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 100%)',
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
                        zIndex: 10,
                        gap: '16px',
                    }}
                >
                    {/* Monogram */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            border: '2px solid rgba(255, 255, 255, 0.2)',
                            fontSize: 42,
                            fontWeight: 800,
                            color: '#fcfcfc',
                            letterSpacing: '-1px',
                        }}
                    >
                        PB
                    </div>

                    <span
                        style={{
                            fontSize: 48,
                            fontWeight: 700,
                            color: '#fcfcfc',
                            letterSpacing: '-1px',
                        }}
                    >
                        Pranav Bhatkar
                    </span>

                    <span
                        style={{
                            fontSize: 22,
                            fontWeight: 400,
                            color: 'rgba(255, 255, 255, 0.45)',
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                        }}
                    >
                        Full Stack Developer
                    </span>
                </div>

                {/* Domain bottom */}
                <span
                    style={{
                        position: 'absolute',
                        bottom: '28px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        fontSize: 16,
                        color: 'rgba(255, 255, 255, 0.25)',
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
