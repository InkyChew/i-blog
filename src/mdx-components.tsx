import type { MDXComponents } from 'mdx/types'
import Image from 'next/image'

const components: MDXComponents = {
    h2: (props) => (
        <h2 className="text-primary" {...props} />
    ),
    img: (props) => (
        <Image
            className="max-w-full h-auto rounded-lg"
            width={760}
            height={570}
            sizes="(max-width: 760px) 100vw, 760px"
            {...props}
        />
    ),
} satisfies MDXComponents

export function useMDXComponents(overrides: MDXComponents): MDXComponents {
    return { ...components, ...overrides };
}