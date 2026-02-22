'use client'

import * as runtime from 'react/jsx-runtime'

import { components as defaultComponents } from './MDXComponents'

interface MDXContentProps {
    code: string
    components?: Record<string, React.ComponentType<any>>
    [key: string]: unknown
}

function getMDXComponent(
    code: string
): React.ComponentType<{ components?: Record<string, React.ComponentType<any>> }> {
    const fn = new Function(code)
    return fn({ ...runtime }).default
}

export function MDXContent({ code, components = {}, ...rest }: MDXContentProps) {
    const Component = getMDXComponent(code)
    return <Component components={{ ...defaultComponents, ...components } as Record<string, React.ComponentType<any>>} {...rest} />
}
