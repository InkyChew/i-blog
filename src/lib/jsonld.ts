import { WithContext, WebSite, BlogPosting, WebPage } from 'schema-dts';
import { site } from './constants';
import { PageData, PostData } from './models';

export function generateWebSiteSchema(): WithContext<WebSite> {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: site.name,
        url: site.url,
        description: site.description,
        publisher: {
            '@type': 'Organization',
            name: site.name,
            logo: {
                '@type': 'ImageObject',
                url: site.logo
            }
        }
    };
}

export function generatePostSchema(post: PostData): WithContext<BlogPosting> {

    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${site.url}/blog/${post.slug}`
        },
        headline: post.title,
        description: post.description,
        datePublished: post.createdAt,
        dateModified: post.updatedAt,
        author: [{
            '@type': 'Person',
            name: site.name,
            url: `${site.url}/about`
        }],
        articleSection: post.category,
        keywords: post.tags
    };
}

export function generatePageSchema(page: PageData): WithContext<WebPage> {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        "@id": `${site.url}/${page.slug}`,
        url: `${site.url}/${page.slug}`,
        name: page.title,
        description: page.description,
        dateModified: page.updatedAt,
        breadcrumb: {
            '@type': 'BreadcrumbList',
            itemListElement: [
                {
                    '@type': 'ListItem',
                    position: 1,
                    name: '首頁',
                    item: site.url
                },
                {
                    '@type': 'ListItem',
                    position: 2,
                    name: page.title,
                    item: `${site.url}/${page.slug}`
                }
            ]
        }
    };
}