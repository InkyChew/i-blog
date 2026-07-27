import { WithContext, WebPage } from "schema-dts";

export interface PageData {
    slug: string;
    content: React.ComponentType;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}

export async function getPageData(slug: string): Promise<PageData> {
    const { default: content, frontmatter } = await import(`@/content/${slug}.mdx`);

    return {
        slug,
        content,
        title: frontmatter.title,
        description: frontmatter.description,
        createdAt: frontmatter.createdAt,
        updatedAt: frontmatter.updatedAt ?? frontmatter.createdAt,
    };
}

export function generatePageSchema(page: PageData): WithContext<WebPage> {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        headline: page.title,
        description: page.description,
        datePublished: page.createdAt,
        dateModified: page.updatedAt,
    };
}