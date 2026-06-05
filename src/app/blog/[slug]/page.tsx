import { getAllPostSlugs, getPostData, generatePostSchema } from "@/src/lib/posts";
import { notFound } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faHashtag, faTag } from "@fortawesome/free-solid-svg-icons";
import { faTwitter, faFacebook, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { site } from "@/src/lib/constants";
import TableOfContents from "@/src/components/TableOfContents";
import JsonLd from "@/src/components/JsonLd";
import { Metadata } from "next";
import Link from "next/link";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllPostSlugs().map(slug => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostData(slug);

    return {
        title: post.title,
        description: post.description,
        keywords: post.tags,
        openGraph: {
            title: post.title,
            description: post.description,
            type: "article",
            publishedTime: post.createdAt,
            modifiedTime: post.updatedAt,
            tags: post.tags,
        },
        alternates: {
            canonical: `${site.url}/post/${slug}`,
        },
    };
}

export default async function BlogPostDetailPage({ params }: PageProps) {
    const { slug } = await params;

    const post = await getPostData(slug);
    if (!post) notFound();

    const Content = post.content;
    const siteUrl = `${site.url}/posts/${slug}`;
    const shareLinks = [
        { icon: <FontAwesomeIcon icon={faTwitter} />, href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(siteUrl)}&text=${encodeURIComponent(post.title)}`, label: "Twitter", hoverColor: "hover:text-[#1DA1F2]" },
        { icon: <FontAwesomeIcon icon={faFacebook} />, href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}`, label: "Facebook", hoverColor: "hover:text-[#1877F2]" },
        { icon: <FontAwesomeIcon icon={faLinkedin} />, href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(siteUrl)}`, label: "LinkedIn", hoverColor: "hover:text-[#0A66C2]" }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-8 max-w-3xl">
                    <header className="mb-12 border-b border-foreground/10 pb-8">
                        <div className="flex items-center gap-4 text-xs md:text-sm font-medium text-foreground/50 mb-4">
                            <span className="flex items-center gap-1.5 text-secondary font-bold uppercase">
                                <FontAwesomeIcon icon={faTag} /> <Link key={post.category} href={`/blog/category/${post.category}`}>{post.category}</Link>
                            </span>
                            <span className="flex items-center gap-1.5">
                                <FontAwesomeIcon icon={faCalendarDays} /> {new Date(post.createdAt).toLocaleDateString()}
                            </span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6">
                            {post.title}
                        </h1>
                        <p className="text-lg text-foreground/60 leading-relaxed italic border-l-4 border-primary/30 pl-4">
                            {post.description}
                        </p>
                    </header>

                    <main
                        className="prose dark:prose-invert prose-headings:scroll-mt-24 prose-headings:text-foreground prose-a:text-primary max-w-none text-base md:text-lg leading-relaxed text-foreground/90">
                        <Content />
                    </main>

                    {post.tags && post.tags.length > 0 && (
                        <div className="mt-12 pt-6 border-t border-foreground/5 flex flex-wrap items-center gap-2.5">
                            <span className="text-xs font-bold uppercase tracking-wider text-foreground/40 mr-1.5 flex items-center gap-1">
                                相關文章標籤
                            </span>
                            {post.tags.map((tag: string) => (
                                <Link
                                    key={tag}
                                    href={`/blog/tag/${tag}`}
                                    className="inline-flex items-center text-xs font-semibold text-secondary bg-secondary/5 border border-secondary/10 px-3 py-1 rounded-full hover:bg-secondary/10 hover:border-secondary/30 transition-all duration-200"
                                >
                                    #{tag}
                                </Link>
                            ))}
                        </div>
                    )}

                    <footer className="mt-16 pt-8 border-t border-foreground/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                        <div className="text-sm font-bold text-foreground/70">覺得這篇文章有幫助嗎？分享給身邊的朋友吧！</div>
                        <div className="flex items-center gap-4 text-xl text-foreground/50">
                            {shareLinks.map((share) => (
                                <a key={share.label} href={share.href} target="_blank" rel="noopener noreferrer" className={`hover:scale-110 transition-all duration-200 ${share.hoverColor}`} aria-label={share.label} title={share.label}>
                                    {share.icon}
                                </a>
                            ))}
                        </div>
                    </footer>
                </div>
                <aside className="lg:col-span-4 lg:sticky lg:top-28">
                    <TableOfContents />
                </aside>
            </div>

            <JsonLd schema={generatePostSchema(post)} />
        </div>
    );
}