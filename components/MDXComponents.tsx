import type { MDXComponents } from 'mdx/types'
import Pre from 'pliny/ui/Pre'
import TOCInline from 'pliny/ui/TOCInline'

import Box from './Box'
import Challenge from './Challenge'
import CodeBlock from './CodeBlock'
import Comments from './Comments'
import CountryFlag from './CountryFlag'
import Image from './Image'
import CustomLink from './Link'
import StaticTweet from './StaticTweet'
import YouTube from './YouTube'

const NoSnippetPre = (props: React.ComponentProps<typeof Pre>) => (
    <div data-nosnippet>
        <Pre {...props} />
    </div>
)

export const components: MDXComponents = {
    Image,
    TOCInline,
    a: CustomLink,
    pre: NoSnippetPre,
    CodeBlock,
    CountryFlag,
    Challenge,
    StaticTweet,
    Box,
    YouTube,
    Comments,
}
