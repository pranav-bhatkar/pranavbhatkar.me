'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const VERTEX_SHADER = `
attribute vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `
precision highp float;

uniform float u_time;
uniform vec2 u_resolution;

uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;

uniform float u_speed;
uniform float u_scale;
uniform float u_distortion;
uniform float u_darkness;
uniform float u_grain;
uniform float u_brightness;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
      + i.y + vec4(0.0, i1.y, i2.y, 1.0))
      + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;
    float t = u_time * u_speed;
    float n1 = snoise(vec3(uv * u_scale, t));
    float n2 = snoise(vec3(uv * u_scale * 1.6 + 5.0, t * 1.3));
    float n3 = snoise(vec3(uv * u_scale * 2.5 + 10.0, t * 0.7));
    vec2 distort = vec2(n1, n2) * u_distortion;
    vec2 p = uv + distort;
    float mix1 = smoothstep(-0.3, 0.6, snoise(vec3(p * 1.8, t * 0.9)));
    float mix2 = smoothstep(-0.2, 0.7, snoise(vec3(p * 2.2 + 3.0, t * 1.1)));
    float mix3 = smoothstep(-0.4, 0.5, snoise(vec3(p * 1.4 + 7.0, t * 0.6)));
    float dark = smoothstep(0.0, 0.8, snoise(vec3(p * 1.6 + 12.0, t * 0.5)));
    vec3 color = mix(u_color1, u_color2, mix1);
    color = mix(color, u_color3, mix2 * 0.7);
    color = mix(color, u_color4, mix3 * 0.5);
    color = mix(color, vec3(0.0), dark * u_darkness);
    color *= u_brightness;
    float grain = snoise(vec3(gl_FragCoord.xy * 0.8, t * 10.0)) * u_grain;
    color += grain;
    vec2 vuv = gl_FragCoord.xy / u_resolution.xy;
    float vignette = 1.0 - smoothstep(0.4, 1.4, length(vuv - 0.5) * 1.5);
    color *= mix(0.5, 1.0, vignette);
    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`

function hexToRgb(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    return [r, g, b]
}

export default function OGGenerator() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [title, setTitle] = useState('Pranav Bhatkar')
    const [subtitle, setSubtitle] = useState('Full Stack Developer')
    const [timeOffset, setTimeOffset] = useState(42)

    const renderShader = useCallback(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        canvas.width = 2400
        canvas.height = 1260

        const gl = canvas.getContext('webgl', { alpha: false, preserveDrawingBuffer: true })
        if (!gl) return

        const vs = gl.createShader(gl.VERTEX_SHADER)!
        gl.shaderSource(vs, VERTEX_SHADER)
        gl.compileShader(vs)

        const fs = gl.createShader(gl.FRAGMENT_SHADER)!
        gl.shaderSource(fs, FRAGMENT_SHADER)
        gl.compileShader(fs)

        const program = gl.createProgram()!
        gl.attachShader(program, vs)
        gl.attachShader(program, fs)
        gl.linkProgram(program)
        gl.useProgram(program)

        const buffer = gl.createBuffer()
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
        gl.bufferData(
            gl.ARRAY_BUFFER,
            new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
            gl.STATIC_DRAW
        )

        const posAttr = gl.getAttribLocation(program, 'position')
        gl.enableVertexAttribArray(posAttr)
        gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0)

        gl.viewport(0, 0, 2400, 1260)

        // Set uniforms — High Contrast preset
        gl.uniform1f(gl.getUniformLocation(program, 'u_time'), timeOffset)
        gl.uniform2f(gl.getUniformLocation(program, 'u_resolution'), 2400, 1260)

        const [r1, g1, b1] = hexToRgb('#ffffff')
        const [r2, g2, b2] = hexToRgb('#000000')
        const [r3, g3, b3] = hexToRgb('#ffffff')
        const [r4, g4, b4] = hexToRgb('#1a1a1a')

        gl.uniform3f(gl.getUniformLocation(program, 'u_color1'), r1, g1, b1)
        gl.uniform3f(gl.getUniformLocation(program, 'u_color2'), r2, g2, b2)
        gl.uniform3f(gl.getUniformLocation(program, 'u_color3'), r3, g3, b3)
        gl.uniform3f(gl.getUniformLocation(program, 'u_color4'), r4, g4, b4)
        gl.uniform1f(gl.getUniformLocation(program, 'u_speed'), 0.015)
        gl.uniform1f(gl.getUniformLocation(program, 'u_scale'), 0.5)
        gl.uniform1f(gl.getUniformLocation(program, 'u_distortion'), 0.5)
        gl.uniform1f(gl.getUniformLocation(program, 'u_darkness'), 0.6)
        gl.uniform1f(gl.getUniformLocation(program, 'u_grain'), 0.12)
        gl.uniform1f(gl.getUniformLocation(program, 'u_brightness'), 0.5)

        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

        gl.deleteProgram(program)
        gl.deleteShader(vs)
        gl.deleteShader(fs)
        gl.deleteBuffer(buffer)
    }, [timeOffset])

    useEffect(() => {
        renderShader()
    }, [renderShader])

    const download = () => {
        const canvas = canvasRef.current
        if (!canvas) return

        // Create a 2x composite canvas with shader + text
        const composite = document.createElement('canvas')
        composite.width = 2400
        composite.height = 1260
        const ctx = composite.getContext('2d')
        if (!ctx) return

        // Draw shader at full 2x resolution
        ctx.drawImage(canvas, 0, 0, 2400, 1260)

        // Darken center for text readability
        const gradient = ctx.createRadialGradient(1200, 630, 0, 1200, 630, 1000)
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0.4)')
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, 2400, 1260)

        // Title
        ctx.textAlign = 'center'
        ctx.fillStyle = '#fcfcfc'
        ctx.font = 'bold 112px system-ui, -apple-system, sans-serif'
        ctx.fillText(title, 1200, 600)

        // Subtitle
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
        ctx.font = '400 52px system-ui, -apple-system, sans-serif'
        ctx.fillText(subtitle, 1200, 700)

        // Domain
        // ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
        // ctx.font = '400 36px system-ui, -apple-system, sans-serif'
        // ctx.fillText('pranavbhatkar.me', 1200, 1180)

        // Download
        const link = document.createElement('a')
        link.download = 'og-image.png'
        link.href = composite.toDataURL('image/png')
        link.click()
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 pt-24">
            <h1 className="text-2xl font-bold">OG Image Generator</h1>

            <div className="flex gap-4 w-full max-w-[600px]">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
                />
                <input
                    type="text"
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="Subtitle"
                    className="flex-1 rounded-md border border-border bg-background px-3 py-2 text-sm"
                />
            </div>

            <div className="flex items-center gap-4">
                <label className="text-sm text-muted-foreground">Time seed: {timeOffset}</label>
                <input
                    type="range"
                    min={0}
                    max={200}
                    value={timeOffset}
                    onChange={(e) => setTimeOffset(Number(e.target.value))}
                    className="w-48"
                />
                <button
                    onClick={download}
                    className="rounded-md border border-border px-4 py-2 text-sm hover:bg-secondary transition-colors"
                >
                    Download PNG
                </button>
            </div>

            {/* Preview */}
            <div
                className="relative border border-border rounded-lg overflow-hidden"
                style={{ width: 1200, height: 630 }}
            >
                <canvas
                    ref={canvasRef}
                    width={1200}
                    height={630}
                    style={{ width: 1200, height: 630 }}
                />
                {/* Text overlay preview */}
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center"
                    style={{
                        background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, transparent 70%)',
                    }}
                >
                    <span className="text-white text-[56px] font-bold tracking-tight">{title}</span>
                    <span className="text-white/50 text-[26px] mt-1">{subtitle}</span>
                </div>
                {/* <span className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-lg">
                    pranavbhatkar.me
                </span> */}
            </div>

            <p className="text-xs text-muted-foreground">
                Drag the time seed slider to find a shader frame you like, edit the text, then hit
                Download.
            </p>
        </div>
    )
}
