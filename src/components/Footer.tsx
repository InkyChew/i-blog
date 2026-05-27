import Link from "next/link";
import { site } from "../lib/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faYoutube, faInstagram } from "@fortawesome/free-brands-svg-icons";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const linksCompany = [
        { name: "關於", href: "/about" },
        { name: "文章", href: "/posts" },
        { name: "聯絡", href: "/contact" },
    ];

    const linksLegal = [
        { name: "隱私政策", href: "/privacy" },
        { name: "服務條款", href: "/terms" },
    ];

    const socialLinks = [
        { icon: <FontAwesomeIcon icon={faInstagram} />, href: "https://instagram.com", label: "Instagram" },
        { icon: <FontAwesomeIcon icon={faYoutube} />, href: "https://youtube.com", label: "YouTube" },
    ];

    return (
        // bg-foreground/[0.02] 會在淺色模式生成極淺灰，深色模式生成極淺藍黑，完美融入全域背景
        <footer className="w-full bg-foreground/[0.02] border-t border-foreground/10 transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">

                {/* 上半部：品牌與連結網格 */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12 mb-12">

                    {/* 區塊 1：品牌簡介與社群 */}
                    <div className="md:col-span-2 flex flex-col gap-4">
                        <Link href="/" className="text-xl font-bold text-primary tracking-wider">
                            {site.name}
                        </Link>
                        <p className="text-sm text-foreground/70 max-w-sm leading-relaxed">
                            專注於現代網頁技術、數位產品獨立開發與個人品牌自動化經營。每週分享實戰觀點，與你一同在數位時代成長。
                        </p>

                        {/* 社群媒體整合 - 使用 foreground/60 確保雙模式高可讀性 */}
                        <div className="flex items-center gap-5 mt-2 text-foreground/60 text-xl">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-primary hover:scale-110 transition-all duration-200"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* 區塊 2：快速連結 */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/40">
                            探索資源
                        </h3>
                        <ul className="flex flex-col gap-2.5 text-sm">
                            {linksCompany.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-foreground/70 hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 區塊 3：法律規範 */}
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground/40">
                            法律合規
                        </h3>
                        <ul className="flex flex-col gap-2.5 text-sm">
                            {linksLegal.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-foreground/70 hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>

                {/* 下半部：版權宣告 */}
                <div className="pt-8 border-t border-foreground/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-foreground/50">
                    <div>
                        © {currentYear} {site.name}. All rights reserved.
                    </div>
                </div>

            </div>
        </footer>
    );
}