import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTag, faCalendarDays, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { PostData } from "../lib/posts";

interface PostCardProps {
    post: PostData;
    titleAs?: 'h2' | 'h3';
}

export default function PostCard({ post, titleAs: TitleTag = 'h2' }: PostCardProps) {
    return (
        <article className="group relative flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-foreground/10 bg-foreground/[0.01] hover:bg-foreground/[0.02] hover:border-primary/30 hover:shadow-xl hover:shadow-primary/[0.02] -translate-y-0 hover:-translate-y-1 transition-all duration-300">
            {/* 分類與日期 */}
            <div className="flex items-center gap-2 text-xs font-medium text-foreground/50 mb-3">
                <span className="text-secondary">
                    {post.category}
                </span>
                <span className="text-foreground/20">•</span>
                <span>
                    {new Date(post.createdAt).toLocaleDateString()}
                </span>
            </div>

            {/* 文章標題 */}
            <TitleTag className="text-xl md:text-2xl font-bold tracking-tight mb-2 text-foreground group-hover:text-primary transition-colors duration-200">
                <Link href={`/blog/${post.slug}`}>
                    {/* 鋪滿整張卡片的隱形連結，提升使用者的點擊體驗 */}
                    <span className="absolute inset-0 z-10 rounded-2xl" />
                    {post.title}
                </Link>
            </TitleTag>

            {/* 文章摘要描述 */}
            <p className="text-sm md:text-base text-foreground/70 mb-4 line-clamp-2 leading-relaxed">
                {post.description}
            </p>

            {/* 閱讀更多按鈕效果 */}
            <div className="flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all duration-200 mt-auto">
                閱讀全文 <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
            </div>
        </article>
    );
}