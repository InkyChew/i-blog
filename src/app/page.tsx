import Link from "next/link";
import { getSortedPostsData } from "@/src/lib/posts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCode, faCompass, faBolt, faEnvelope, faCalendarDays, faTag } from "@fortawesome/free-solid-svg-icons";
import PostCard from "../components/PostCard";

export const metadata = {
  title: "獨立開發與網頁技術隨筆",
  description: "專注於現代網頁技術、數位產品獨立開發與個人品牌自動化經營。與你一同在數位時代成長。",
};

export default async function HomePage() {
  // 取得最新發布的文章，並只取前兩篇展示在首頁
  const posts = await getSortedPostsData();
  const latestPosts = posts.slice(0, 2);

  const features = [
    {
      icon: <FontAwesomeIcon icon={faCode} />,
      title: "現代前端技術",
      desc: "深入 React、Next.js App Router 與 Tailwind CSS 的實戰架構，追求極致的效能與乾淨的程式碼。"
    },
    {
      icon: <FontAwesomeIcon icon={faCompass} />,
      title: "獨立產品開發",
      desc: "分享如何從零到一構思商業創意、打造最小可行性產品（MVP），並獲取第一批付費用戶。"
    },
    {
      icon: <FontAwesomeIcon icon={faBolt} />,
      title: "品牌自動化",
      desc: "利用數位工具與內容鎖定建構自動化獲利漏斗，將技術與知識轉化為持續的被動資產。"
    }
  ];

  return (
    <div className="w-full">

      {/* 1. Hero 英雄區塊 */}
      <section className="max-w-6xl mx-auto px-4 pt-20 pb-16 md:pt-32 md:pb-24 flex flex-col items-center text-center">
        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full mb-6 animate-fade-in">
          🚀 ✨ 歡迎來到我的數位實驗室
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight max-w-4xl leading-[1.15] mb-6">
          打造觸手可及的 <span className="text-primary">數位產品</span>，<br className="hidden sm:inline" />
          實現技術的商業價值。
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl leading-relaxed mb-10">
          我是 BRAND.IO 的主理人。這裡記錄了我關於全端網頁開發、軟體獨立開發（Indie Hacking）以及個人品牌經營的實戰筆記。
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/posts"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary text-background font-bold hover:opacity-90 active:scale-98 transition-all text-center shadow-lg shadow-primary/20 cursor-pointer"
          >
            探索文章觀點
          </Link>
          <Link
            href="/about"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-foreground/[0.04] text-foreground font-bold hover:bg-foreground/[0.08] active:scale-98 transition-all text-center border border-foreground/10 cursor-pointer"
          >
            關於我
          </Link>
        </div>
      </section>

      {/* 2. 特色亮點區塊 (Features) */}
      <section className="w-full bg-foreground/[0.02] border-t border-b border-foreground/10 py-16 md:py-24 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((item, idx) => (
              <div key={idx} className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl font-bold">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. 精選文章區塊 (Latest Blog Posts) */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-2">精選觀點</h2>
            <p className="text-sm sm:text-base text-foreground/60">每週更新，帶給你最扎實的實戰硬核內容。</p>
          </div>
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all group"
          >
            瀏覽所有文章 <FontAwesomeIcon icon={faArrowRight} className="text-xs" />
          </Link>
        </div>

        {/* 文章卡片網格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} titleAs="h3" />
          ))}
        </div>
      </section>

      {/* 4. 電子報訂閱區塊 (Newsletter / CTA) */}
      <section className="max-w-6xl mx-auto px-4 pb-16 md:pb-24">
        <div className="w-full bg-foreground/[0.02] border border-foreground/10 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 transition-colors duration-300">
          <div className="max-w-xl">
            <div className="w-10 h-10 rounded-lg bg-accent/10 text-accent flex items-center justify-center text-lg mb-4">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-3">
              訂閱獨立開發週報
            </h2>
            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
              每週五發送。內容包含最新的前端技術乾貨、獨立專案的變現觀察，以及只有訂閱者才能獲得的獨家數位副業檢查清單。絕不發送垃圾信。
            </p>
          </div>

          {/* 模擬表單群組 */}
          <form
            // onSubmit={(e) => e.preventDefault()}
            className="w-full md:w-auto flex flex-col sm:flex-row gap-3 min-w-[100%] md:min-w-[400px]"
          >
            <input
              type="email"
              placeholder="請輸入您的 Email 地址..."
              required
              className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 text-foreground text-sm placeholder:text-foreground/40 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-foreground text-background font-bold text-sm hover:opacity-90 active:scale-98 transition-all whitespace-nowrap cursor-pointer"
            >
              免費訂閱
            </button>
          </form>
        </div>
      </section>

    </div>
  );
}