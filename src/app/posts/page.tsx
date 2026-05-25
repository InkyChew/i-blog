import { getSortedPostsData } from "@/src/lib/posts";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faTag, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PostCard from "@/src/components/PostCard";

export const metadata = {
    title: "文章觀點",
    description: "探索關於網頁技術、獨立開發與數位品牌自動化经营的實戰心得與技術觀點。",
};

export default async function BlogListPage() {
    const posts = await getSortedPostsData();

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
                        <PostCard key={post.slug} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}