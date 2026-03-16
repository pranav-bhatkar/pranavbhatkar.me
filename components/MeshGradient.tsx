'use client'

import { useEffect, useRef } from 'react'

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

// Color uniforms
uniform vec3 u_color1;
uniform vec3 u_color2;
uniform vec3 u_color3;
uniform vec3 u_color4;

// Control uniforms
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
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 105.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    uv.x *= aspect;

    float t = u_time * u_speed;

    // Layered noise for organic distortion
    float n1 = snoise(vec3(uv * u_scale, t));
    float n2 = snoise(vec3(uv * u_scale * 1.6 + 5.0, t * 1.3));
    float n3 = snoise(vec3(uv * u_scale * 2.5 + 10.0, t * 0.7));

    vec2 distort = vec2(n1, n2) * u_distortion;
    vec2 p = uv + distort;

    // Mix colors using noise
    float mix1 = smoothstep(-0.3, 0.6, snoise(vec3(p * 1.8, t * 0.9)));
    float mix2 = smoothstep(-0.2, 0.7, snoise(vec3(p * 2.2 + 3.0, t * 1.1)));
    float mix3 = smoothstep(-0.4, 0.5, snoise(vec3(p * 1.4 + 7.0, t * 0.6)));
    float dark = smoothstep(0.0, 0.8, snoise(vec3(p * 1.6 + 12.0, t * 0.5)));

    vec3 color = mix(u_color1, u_color2, mix1);
    color = mix(color, u_color3, mix2 * 0.7);
    color = mix(color, u_color4, mix3 * 0.5);
    color = mix(color, vec3(0.0), dark * u_darkness);

    // Brightness
    color *= u_brightness;

    // Grain
    float grain = snoise(vec3(gl_FragCoord.xy * 0.8, t * 10.0)) * u_grain;
    color += grain;

    // Subtle vignette
    vec2 vuv = gl_FragCoord.xy / u_resolution.xy;
    float vignette = 1.0 - smoothstep(0.4, 1.4, length(vuv - 0.5) * 1.5);
    color *= mix(0.5, 1.0, vignette);

    gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
}
`

interface ShaderParams {
    color1: string
    color2: string
    color3: string
    color4: string
    speed: number
    scale: number
    distortion: number
    darkness: number
    grain: number
    brightness: number
}

const DEFAULT_PARAMS: ShaderParams = {
    color1: '#ffffff',
    color2: '#000000',
    color3: '#ffffff',
    color4: '#1a1a1a',
    speed: 0.015,
    scale: 0.5,
    distortion: 0.5,
    darkness: 0.6,
    grain: 0.12,
    brightness: 0.5,
}

function hexToRgb(hex: string): [number, number, number] {
    const r = parseInt(hex.slice(1, 3), 16) / 255
    const g = parseInt(hex.slice(3, 5), 16) / 255
    const b = parseInt(hex.slice(5, 7), 16) / 255
    return [r, g, b]
}

interface MeshGradientProps {
    animated?: boolean
    dimmed?: boolean
}

export default function MeshGradient({ animated = true, dimmed = false }: MeshGradientProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const rafRef = useRef<number>(0)
    const paramsRef = useRef<ShaderParams>({ ...DEFAULT_PARAMS })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const gl = canvas.getContext('webgl', { alpha: false, antialias: false })
        if (!gl) return

        // Compile shaders
        const vs = gl.createShader(gl.VERTEX_SHADER)!
        gl.shaderSource(vs, VERTEX_SHADER)
        gl.compileShader(vs)
        if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
            console.error('Vertex shader error:', gl.getShaderInfoLog(vs))
            return
        }

        const fs = gl.createShader(gl.FRAGMENT_SHADER)!
        gl.shaderSource(fs, FRAGMENT_SHADER)
        gl.compileShader(fs)
        if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
            console.error('Fragment shader error:', gl.getShaderInfoLog(fs))
            return
        }

        const program = gl.createProgram()!
        gl.attachShader(program, vs)
        gl.attachShader(program, fs)
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program))
            return
        }

        gl.useProgram(program)

        // Full-screen quad
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

        // Uniform locations
        const uTime = gl.getUniformLocation(program, 'u_time')
        const uResolution = gl.getUniformLocation(program, 'u_resolution')
        const uColor1 = gl.getUniformLocation(program, 'u_color1')
        const uColor2 = gl.getUniformLocation(program, 'u_color2')
        const uColor3 = gl.getUniformLocation(program, 'u_color3')
        const uColor4 = gl.getUniformLocation(program, 'u_color4')
        const uSpeed = gl.getUniformLocation(program, 'u_speed')
        const uScale = gl.getUniformLocation(program, 'u_scale')
        const uDistortion = gl.getUniformLocation(program, 'u_distortion')
        const uDarkness = gl.getUniformLocation(program, 'u_darkness')
        const uGrain = gl.getUniformLocation(program, 'u_grain')
        const uBrightness = gl.getUniformLocation(program, 'u_brightness')

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 1.5)
            canvas.width = window.innerWidth * dpr
            canvas.height = window.innerHeight * dpr
            gl.viewport(0, 0, canvas.width, canvas.height)
        }
        resize()
        window.addEventListener('resize', resize)

        const startTime = performance.now()

        const setUniforms = (time: number) => {
            const p = paramsRef.current

            gl.uniform1f(uTime, time)
            gl.uniform2f(uResolution, canvas.width, canvas.height)

            const [r1, g1, b1] = hexToRgb(p.color1)
            const [r2, g2, b2] = hexToRgb(p.color2)
            const [r3, g3, b3] = hexToRgb(p.color3)
            const [r4, g4, b4] = hexToRgb(p.color4)

            gl.uniform3f(uColor1, r1, g1, b1)
            gl.uniform3f(uColor2, r2, g2, b2)
            gl.uniform3f(uColor3, r3, g3, b3)
            gl.uniform3f(uColor4, r4, g4, b4)
            gl.uniform1f(uSpeed, p.speed)
            gl.uniform1f(uScale, p.scale)
            gl.uniform1f(uDistortion, p.distortion)
            gl.uniform1f(uDarkness, p.darkness)
            gl.uniform1f(uGrain, p.grain)
            gl.uniform1f(uBrightness, p.brightness)

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        }

        if (animated) {
            const render = () => {
                const elapsed = (performance.now() - startTime) / 1000
                setUniforms(elapsed)
                rafRef.current = requestAnimationFrame(render)
            }
            rafRef.current = requestAnimationFrame(render)
        } else {
            // Render a single frozen frame at a fixed time
            setUniforms(42.0)
        }

        return () => {
            cancelAnimationFrame(rafRef.current)
            window.removeEventListener('resize', resize)
            gl.deleteProgram(program)
            gl.deleteShader(vs)
            gl.deleteShader(fs)
            gl.deleteBuffer(buffer)
        }
    }, [])

    if (dimmed) {
        return (
            <div
                className="fixed inset-0 z-0 pointer-events-none hidden dark:block"
                aria-hidden="true"
            >
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundColor: 'hsl(0 0% 5%)',
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        backgroundSize: '128px 128px',
                    }}
                />
                <div className="absolute inset-0 bg-black/65" />
            </div>
        )
    }

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 pointer-events-none hidden dark:block"
            style={{ width: '100vw', height: '100vh' }}
            aria-hidden="true"
        />
    )
}
