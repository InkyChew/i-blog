"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPaperPlane, faEnvelope, faCircleCheck, faComments } from "@fortawesome/free-solid-svg-icons";

export default function ContactPage() {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const faqs = [
        {
            q: "通常多久會收到回覆？",
            a: "收到訊息後，我通常會在 24-48 小時內親自透過 Email 回覆您（例假日除外）。"
        },
        {
            q: "可以進行商業專案合作或技術諮詢嗎？",
            a: "非常歡迎！不論是 Next.js 全端開發、Tailwind CSS 設計系統架構，或是獨立產品 MVP 諮詢，都歡迎寫信討論。"
        },
        {
            q: "文章內容可以授權轉載嗎？",
            a: "只要註明出處並附上原始文章的超連結，非商業用途的轉載我都非常歡迎。"
        }
    ];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // 💡 這裡可串接你的後端 API、Formspree、Netlify Forms 或 Formbold
        // 這裡先以 setTimeout 模擬 1.5 秒的異步發送請求
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
    };

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-24">

            {/* 上方返回導覽 */}
            <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground/60 hover:text-primary transition-colors mb-12 group"
            >
                <FontAwesomeIcon icon={faChevronLeft} className="text-xs group-hover:-translate-x-1 transition-transform" /> 返回首頁
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                {/* 左側：頁面標頭與常見問題 (FAQ) */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                    <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
                            ✉️ CONNECT
                        </span>
                        <h1 className="text-3xl md:text-5xl font-black tracking-tight mt-4 mb-4">
                            與我聯絡
                        </h1>
                        <p className="text-base text-foreground/70 leading-relaxed">
                            有任何技術合作、產品諮詢、文章內容回饋，或者只是單純想打個招呼？歡迎填寫右側表單，或是直接寫信至
                            <a href="mailto:hello@yourdomain.com" className="text-primary font-semibold ml-1 hover:underline">
                                hello@yourdomain.com
                            </a>
                        </p>
                    </div>

                    {/* 小 FAQ 區塊 */}
                    <div className="mt-4 border-t border-foreground/10 pt-8 flex flex-col gap-6">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-foreground">
                            <FontAwesomeIcon icon={faComments} className="text-primary text-base" /> 常見問題快速解答
                        </h2>
                        <div className="flex flex-col gap-5">
                            {faqs.map((faq, idx) => (
                                <div key={idx} className="flex flex-col gap-1.5">
                                    <h3 className="text-sm font-bold text-foreground/90">{faq.q}</h3>
                                    <p className="text-sm text-foreground/60 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 右側：動態聯絡表單 */}
                <div className="lg:col-span-7">
                    <div className="w-full bg-foreground/[0.01] border border-foreground/10 rounded-2xl p-6 md:p-10 transition-colors duration-300 shadow-xl shadow-foreground/[0.005]">

                        {isSubmitted ? (
                            /* 發送成功狀態 */
                            <div className="py-12 flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-300">
                                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center text-3xl">
                                    <FontAwesomeIcon icon={faCircleCheck} />
                                </div>
                                <h2 className="text-2xl font-bold text-foreground">訊息已成功送出！</h2>
                                <p className="text-sm text-foreground/60 max-w-sm leading-relaxed">
                                    感謝您的來信。我已收到您的訊息，並會盡快透過您留下的 Email 地址與您聯繫。
                                </p>
                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="mt-4 text-xs font-bold text-primary hover:underline cursor-pointer"
                                >
                                    再發送一則訊息
                                </button>
                            </div>
                        ) : (
                            /* 表單輸入狀態 */
                            <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                                {/* 姓名輸入 */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="name" className="text-xs font-bold text-foreground/70 uppercase tracking-wider">
                                        您的姓名 / 稱呼
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                        placeholder="例如：王小明"
                                        className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>

                                {/* 信箱輸入 */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-xs font-bold text-foreground/70 uppercase tracking-wider">
                                        電子郵件地址
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                        placeholder="name@example.com"
                                        className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                                    />
                                </div>

                                {/* 訊息輸入 */}
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="message" className="text-xs font-bold text-foreground/70 uppercase tracking-wider">
                                        訊息內容
                                    </label>
                                    <textarea
                                        id="message"
                                        required
                                        rows={5}
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                        placeholder="請輸入您想詢問或商談的具體內容..."
                                        className="w-full px-4 py-3 rounded-xl bg-background border border-foreground/10 text-foreground text-sm placeholder:text-foreground/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all resize-none leading-relaxed"
                                    />
                                </div>

                                {/* 提交按鈕 */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full mt-2 py-3.5 rounded-xl bg-primary text-background font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 active:scale-98 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg shadow-primary/10 cursor-pointer"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                                            正在傳送訊息...
                                        </>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faPaperPlane} className="text-xs" /> 送出訊息
                                        </>
                                    )}
                                </button>
                            </form>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
}