import { getSortedPostsData } from "@/src/lib/markdown";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faTag, faArrowRight } from "@fortawesome/free-solid-svg-icons";

export const metadata = {
    title: "文章觀點",
    description: "探索關於網頁技術、獨立開發與數位品牌自動化经营的實戰心得與技術觀點。",
};

export default function BlogListPage() {
    const posts = getSortedPostsData();

    return (
        <div className="max-w-5xl mx-auto px-4 py-16 md:py-24">
            {/* 頁面標題區塊 */}
            <div className="max-w-2xl mb-16">
                <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                    💡 知識庫
                </span>
                <h1 className="text-3xl md:text-5xl font-black mt-4 mb-4 tracking-tight">
                    文章與觀點
                </h1>
                <p className="text-base text-foreground/70 leading-relaxed">
                    這裡記錄了我關於 Next.js、Tailwind CSS、獨立開發，以及如何將程式碼轉化為持續收益的實戰筆記。
                </p>
            </div>

            {/* 文章響應式網格 */}
            {posts.length === 0 ? (
                <div className="text-center py-20 border border-dashed border-foreground/20 rounded-2xl">
                    <p className="text-foreground/50">目前尚未發布任何文章，敬請期待！</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {posts.map((post) => (
                        <article
                            key={post.slug}
                            className="group relative flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-foreground/10 bg-foreground/[0.01] hover:bg-foreground/[0.02] hover:border-primary/30 hover:shadow-xl hover:shadow-primary/[0.02] -translate-y-0 hover:-translate-y-1 transition-all duration-300"
                        >
                            <div>
                                {/* 分類與日期 */}
                                <div className="flex items-center gap-4 text-xs font-medium text-foreground/50 mb-4">
                                    <span className="flex items-center gap-1.5 text-secondary font-bold uppercase">
                                        <FontAwesomeIcon icon={faTag} className="text-[10px]" /> {post.category}
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <FontAwesomeIcon icon={faCalendarDays} /> {new Date(post.createdAt).toLocaleDateString()}
                                    </span>
                                </div>

                                {/* 文章標題 */}
                                <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3 text-foreground group-hover:text-primary transition-colors duration-200">
                                    <Link href={`/posts/${post.slug}`}>
                                        {/* 鋪滿整張卡片的隱形連結，提升使用者的點擊體驗 */}
                                        <span className="absolute inset-0 z-10 rounded-2xl" />
                                        {post.title}
                                    </Link>
                                </h2>

                                {/* 文章摘要描述 */}
                                <p className="text-sm md:text-base text-foreground/70 mb-6 line-clamp-2 leading-relaxed">
                                    {post.description}
                                </p>
                            </div>

                            {/* 閱讀更多按鈕效果 */}
                            <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all duration-200 mt-auto">
                                閱讀全文 <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
                            </div>
                        </article>
                    ))}
                </div>
            )}
        </div>
    );
}