/// <reference types="react" />
/// <reference types="react-dom" />
// React 19 compatibility: re-export JSX namespace globally for older libraries
import React from 'react'

declare global {
    namespace JSX {
        interface Element extends React.JSX.Element {}
        interface ElementClass extends React.JSX.ElementClass {}
        interface ElementAttributesProperty extends React.JSX.ElementAttributesProperty {}
        interface ElementChildrenAttribute extends React.JSX.ElementChildrenAttribute {}
        interface IntrinsicAttributes extends React.JSX.IntrinsicAttributes {}
        interface IntrinsicClassAttributes<T> extends React.JSX.IntrinsicClassAttributes<T> {}
        interface IntrinsicElements extends React.JSX.IntrinsicElements {}
    }
}
