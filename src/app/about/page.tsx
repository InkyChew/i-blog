import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faGraduationCap, faAward, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export const metadata = {
    title: "關於我",
    description: "了解我的品牌故事、專業背景、核心價值與過往成就。",
};

export default function AboutPage() {
    // 專業經歷資料
    const experiences = [
        {
            type: "work",
            date: "2024 - 現在",
            title: "資深全端工程師兼獨立開發者",
            company: "自由職業 / 數位遊牧",
            description: "專注於使用 Next.js、Tailwind CSS 與雲端原生架構為全球客戶打造高效能的 Web 應用與品牌自動化系統。",
        },
        {
            type: "work",
            date: "2021 - 2024",
            title: "前端技術團隊長 (Frontend Lead)",
            company: "美商科技公司",
            description: "帶領 5 人前端團隊完成企業級 SaaS 產品重構，將網站載入速度提升 40%，並導入微前端架構。",
        },
        {
            type: "education",
            date: "2017 - 2021",
            title: "資訊工程學系 學士",
            company: "國立臺灣大學",
            description: "主修軟體工程與使用者經驗設計，曾獲大專院校開源軟體競賽首獎。",
        },
    ];

    // 核心價值觀
    const coreValues = [
        {
            title: "極致效能與體驗",
            desc: "程式碼不只要能跑，更要追求載入速度與流暢的動態細節，因為使用者體驗就是品牌的門面。",
            color: "border-t-primary",
        },
        {
            title: "持續跨界學習",
            desc: "在 AI 時代，技術只是工具。結合商業邏輯、產品設計與行銷思維，才能創造出真正有價值的數位產品。",
            color: "border-t-secondary",
        },
        {
            title: "開源與知識共享",
            desc: "堅持透過部落格與開源專案回饋社群，相信「教是最好的學」，與同行讀者一同成長。",
            color: "border-t-accent",
        },
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 md:py-24">

            {/* 1. 英雄區塊：個人故事 */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center mb-24">
                {/* 頭像區域 */}
                <div className="flex flex-col items-center md:items-start gap-4">
                    <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 bg-gray-100 dark:bg-gray-800">
                        {/* 提示：請在 public 檔案夾放一張 avatar.jpg，或先用 placeholder */}
                        <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                            <Image
                                src="/avatar.jpg"
                                alt="Alex 的個人頭像"
                                fill
                                sizes="(max-width: 768px) 192px, 192px"
                                priority
                                className="object-cover"
                            />
                        </div>
                    </div>
                    <h1 className="text-2xl font-black mt-2">你的名字 / Alex</h1>
                    <p className="text-sm font-medium text-primary">Creator & Engineer</p>

                    {/* 社群連結 */}
                    <div className="flex gap-4 text-xl text-foreground/60 mt-1">
                        <a href="#" className="hover:text-primary transition-colors"><FontAwesomeIcon icon={faGithub} /></a>
                        <a href="#" className="hover:text-primary transition-colors"><FontAwesomeIcon icon={faLinkedin} /></a>
                    </div>
                </div>

                {/* 故事內文 */}
                <div className="md:col-span-2 flex flex-col gap-6 text-foreground/80 leading-relaxed">
                    <h2 className="text-3xl font-bold text-foreground">
                        你好，我是 Alex。<br />
                        一個在代碼與商業之間尋找最佳解的<span className="text-primary">數位創作者</span>。
                    </h2>
                    <p>
                        我擁有超過 5 年的網頁開發經驗。這些年來，我發現許多強大的技術往往因為缺乏良好的產品思維而無法落地，而許多精彩的創意也因為缺乏技術支持而胎死腹中。
                    </p>
                    <p>
                        因此，我創立了 <span className="font-bold text-foreground border-b-2 border-secondary">BRAND.IO</span>。在這裡，我除了提供高效、高質感的軟體開發服務外，也會不定期分享我將技術轉化為數位產品的實戰心得。
                    </p>
                    <p>
                        無論你是尋求技術合作的企業、想獨立開發產品的創作者，還是單純喜歡看技術文章的讀者，都歡迎與我交流！
                    </p>
                </div>
            </section>

            {/* 2. 核心價值觀區塊 */}
            <section className="mb-24">
                <h3 className="text-2xl font-bold mb-8 text-center md:text-left">核心價值觀</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {coreValues.map((value, idx) => (
                        <div
                            key={idx}
                            className={`p-6 rounded-xl border border-foreground/10 bg-foreground/[0.02] border-t-4 ${value.color} shadow-sm flex flex-col gap-3 hover:-translate-y-1 transition-transform duration-300`}
                        >
                            <h4 className="font-bold text-lg text-foreground">{value.title}</h4>
                            <p className="text-sm text-foreground/70 leading-relaxed">{value.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. 專業經歷時間軸 (Timeline) */}
            <section className="mb-24">
                <h3 className="text-2xl font-bold mb-10 text-center md:text-left">專業經歷與成就</h3>
                <div className="relative border-l border-foreground/10 ml-4 md:ml-6 flex flex-col gap-10">
                    {experiences.map((exp, idx) => (
                        <div key={idx} className="relative pl-8 group">
                            {/* 時間軸節點 */}
                            <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-background border-2 border-foreground/20 flex items-center justify-center text-sm text-foreground/60 group-hover:border-primary group-hover:text-primary transition-colors duration-300">
                                {exp.type === "work" ? (
                                    <FontAwesomeIcon icon={faBriefcase} className="text-xs" />
                                ) : (
                                    <FontAwesomeIcon icon={faGraduationCap} className="text-xs" />
                                )}
                            </div>

                            {/* 內容區 */}
                            <div className="flex flex-col gap-1">
                                <span className="text-xs font-bold tracking-wider text-secondary uppercase">
                                    {exp.date}
                                </span>
                                <h4 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                                    {exp.title}
                                </h4>
                                <span className="text-sm font-medium text-foreground/60 mb-2 block">
                                    {exp.company}
                                </span>
                                <p className="text-sm text-foreground/70 max-w-2xl leading-relaxed">
                                    {exp.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. 行動呼籲 (CTA) */}
            <section className="text-center p-8 md:p-12 rounded-2xl bg-foreground/[0.03] border border-foreground/10">
                <h3 className="text-2xl font-bold mb-3">準備好開始你的新專案了嗎？</h3>
                <p className="text-sm text-foreground/60 max-w-md mx-auto mb-6">
                    不論是技術諮詢、企業合作，或是數位產品開發需求，我都非常樂意與你聊聊。
                </p>
                <Link
                    href="contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/20 hover:opacity-90 hover:scale-105 transition-all"
                >
                    聯絡我
                </Link>
            </section>

        </div>
    );
}