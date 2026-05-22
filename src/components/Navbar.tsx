"use client";

import { useState } from "react";
import { site } from "../lib/constants";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { name: "首頁", href: "/" },
        { name: "關於", href: "/about" },
        { name: "文章", href: "/posts" },
    ];

    return (
        <nav className="w-full bg-background/80 backdrop-blur-md transition-colors duration-300">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

                {/* 品牌標誌 */}
                <Link href="/" className="text-xl font-bold text-primary tracking-wider hover:opacity-90 transition-opacity">
                    {site.name}
                </Link>

                {/* 桌面端選單 */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-foreground/80">
                    {navLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="hover:text-primary transition-colors py-1">
                            {link.name}
                        </Link>
                    ))}
                    {/* 線條與主題切換器 */}
                    <div className="h-4 w-px bg-foreground/10" />
                    <ThemeToggle />
                </div>

                {/* 行動端按鈕區塊 */}
                <div className="md:hidden flex items-center gap-4">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="w-9 h-9 flex items-center justify-center rounded-lg text-foreground/80 hover:bg-foreground/5 transition-colors"
                        aria-label="Toggle Menu"
                    >
                        {isOpen ? (
                            <FontAwesomeIcon icon={faXmark} className="text-xl" />
                        ) : (
                            <FontAwesomeIcon icon={faBars} className="text-lg" />
                        )}
                    </button>
                </div>
            </div>

            {/* 行動端展開選單 */}
            {isOpen && (
                <div className="md:hidden absolute top-16 left-0 w-full bg-background/95 backdrop-blur-lg border-b border-foreground/10 shadow-lg shadow-foreground/[0.03] px-6 py-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200 z-50 text-base font-medium text-foreground/80">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="py-2 hover:text-primary transition-colors border-b border-foreground/[0.03] last:border-none"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    );
}