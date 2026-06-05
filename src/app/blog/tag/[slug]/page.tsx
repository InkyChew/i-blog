import PostCard from "@/src/components/PostCard";
import { getPostsByTag } from "@/src/lib/posts";
import { faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TagPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TagPageProps) {
    const { slug } = await params;
    const tagName = decodeURIComponent(slug);

    return {
        title: tagName,
        description: `探索關於 ${tagName} 的所有前端開發、 Next.js 實戰與獨立產品開發相關文章。`,
    };
}

export default async function TagPage({ params }: TagPageProps) {
    const { slug } = await params;
    const tagName = decodeURIComponent(slug);
    const posts = await getPostsByTag(tagName);

    return (
        <div className="w-full">
            <section className="w-full bg-foreground/[0.02] border-b border-foreground/10 py-16 md:py-24 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-4 flex flex-col items-center text-center">

                    <div className={`w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center mb-6`}>
                        <FontAwesomeIcon icon={faTag} className="text-primary text-4xl" />
                    </div>

                    <span className='text-xs font-bold uppercase tracking-widest text-primary mb-3'>
                        Tag
                    </span>

                    <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-5 text-foreground">
                        {tagName}
                    </h1>

                    <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed">
                        在這裡你可以找到所有關於「{tagName}」的文章，從前端技術到獨立開發的實戰經驗，幫助你在這個領域持續成長。
                    </p>

                    <div className="mt-8 px-4 py-1.5 rounded-full bg-foreground/5 text-foreground/50 text-sm font-medium border border-foreground/10">
                        目前共有 <span className='font-bold text-primary'>{posts.length}</span> 篇相關文章
                    </div>
                </div>
            </section>

            <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                        {posts.map((post) => (
                            <PostCard
                                key={post.slug}
                                post={post}
                                titleAs="h3"
                            />
                        ))}
                    </div>
                ) : (
                    <div className="w-full text-center py-20 border-2 border-dashed border-foreground/10 rounded-2xl bg-foreground/[0.01]">
                        <p className="text-lg text-foreground/40 font-medium">
                            目前這個標籤下還沒有任何文章喔！
                        </p>
                    </div>
                )}
            </section>

        </div>
    );
}