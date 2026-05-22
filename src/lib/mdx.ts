export async function loadMDXPost(slug: string) {
    const mod = await import(`@/content/posts/${slug}.mdx`);

    return {
        content: mod.default,
        metadata: mod.metadata,
    };
}