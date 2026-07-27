import fs from "fs";
import path from "path";
import { WithContext, BlogPosting } from "schema-dts";

const postsDirectory = path.join(process.cwd(), "content/posts");

export interface PostData {
    slug: string;
    content: React.ComponentType;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    category: string;
    tags: string[];
}

// let postsCache: PostData[] | null = null;

export async function getSortedPostsData(): Promise<PostData[]> {
    // if (postsCache) return postsCache;

    if (!fs.existsSync(postsDirectory)) return [];

    const fileNames = fs.readdirSync(postsDirectory)
        .filter(name => name.endsWith(".mdx"));

    const allPostsData = await Promise.all(
        fileNames.map(async (fileName) => {
            const slug = fileName.replace(/\.mdx$/, "");
            const { default: content, frontmatter } = await import(
                `@/content/posts/${slug}.mdx`
            );

            return {
                slug,
                content,
                title: frontmatter.title,
                description: frontmatter.description,
                createdAt: frontmatter.createdAt,
                updatedAt: frontmatter.updatedAt ?? frontmatter.createdAt,
                category: frontmatter.category,
                tags: frontmatter.tags ?? []
            } satisfies PostData;
        })
    );

    return allPostsData.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    // postsCache = allPostsData.sort(
    //     (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    // );

    // return postsCache;
}

export async function getPostData(slug: string): Promise<PostData> {
    // const cached = postsCache?.find(p => p.slug === slug);
    // if (cached) return cached;

    const { default: content, frontmatter } = await import(`@/content/posts/${slug}.mdx`);

    return {
        slug,
        content,
        title: frontmatter.title,
        description: frontmatter.description,
        createdAt: frontmatter.createdAt,
        updatedAt: frontmatter.updatedAt ?? frontmatter.createdAt,
        category: frontmatter.category,
        tags: frontmatter.tags ?? []
    };
}

export function generatePostSchema(post: PostData): WithContext<BlogPosting> {

    return {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.createdAt,
        dateModified: post.updatedAt,
        keywords: post.tags
    };
}

export function getAllPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs.readdirSync(postsDirectory)
        .filter(name => name.endsWith(".mdx"))
        .map(name => name.replace(/\.mdx$/, ""));
}

export async function getPostsByCategory(category: string) {
    const allPosts = await getSortedPostsData();
    return allPosts.filter(
        (post) => post.category.toLowerCase() === category.toLowerCase()
    );
}

export async function getPostsByTag(tag: string) {
    const allPosts = await getSortedPostsData();
    return allPosts.filter((post) =>
        post.tags.some((t: string) => t === tag)
    );
}