"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faXmark } from "@fortawesome/free-solid-svg-icons";

interface TocItem {
    id: string;
    text: string;
    level: number;
}

interface TocListProps {
    toc: TocItem[];
    activeId: string;
    onLinkClick: (e: React.MouseEvent, id: string) => void;
}

function TocList({ toc, activeId, onLinkClick }: TocListProps) {
    return (
        <ul className="flex flex-col gap-2.5 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
            {toc.map((item) => {
                const isActive = activeId === item.id;
                return (
                    <li
                        key={item.id}
                        style={{ paddingLeft: item.level === 3 ? "12px" : "0px" }}
                        className="text-sm transition-all duration-200"
                    >
                        <a
                            href={`#${item.id}`}
                            onClick={(e) => onLinkClick(e, item.id)}
                            style={{
                                transform: isActive ? "translateX(4px)" : "translateX(0px)",
                            }}
                            className={`flex items-center gap-1.5 truncate py-0.5 transition-all duration-200 ${isActive
                                ? "text-primary font-bold"
                                : "text-foreground/50 hover:text-foreground/80"
                                }`}
                        >
                            {item.level === 3 && (
                                <span className="text-foreground/20 shrink-0">•</span>
                            )}
                            <span className="truncate">{item.text}</span>
                        </a>
                    </li>
                );
            })}
        </ul>
    );
}

export default function TableOfContents() {
    const [toc, setToc] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");
    const [mobileOpen, setMobileOpen] = useState(false);
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const articleBody = document.querySelector("main");
        if (!articleBody) return;

        const init = () => {
            const headings = Array.from(articleBody.querySelectorAll("h2, h3"));
            if (headings.length === 0) return;

            const idCount: Record<string, number> = {};
            const tocItems: TocItem[] = [];

            headings.forEach((heading) => {
                const base = heading.id
                    ? heading.id
                    : (heading.textContent || "")
                        .trim()
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w-]/g, "") || "heading";

                const count = (idCount[base] = (idCount[base] ?? 0) + 1);
                const finalId = count === 1 ? base : `${base}-${count}`;

                heading.id = finalId;

                tocItems.push({
                    id: finalId,
                    text: heading.textContent || "",
                    level: heading.tagName === "H2" ? 2 : 3,
                });
            });

            setToc(tocItems);

            observerRef.current?.disconnect();

            observerRef.current = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const el = entry.target as HTMLElement;
                        el.dataset.visible = entry.isIntersecting ? "true" : "false";
                    });

                    const firstVisible = headings.find(
                        (h) => (h as HTMLElement).dataset.visible === "true"
                    );

                    if (firstVisible) {
                        setActiveId(firstVisible.id);
                    }
                },
                {
                    root: null,
                    rootMargin: "-80px 0px -40% 0px",
                    threshold: 0,
                }
            );

            headings.forEach((h) => observerRef.current!.observe(h));
        };

        init();

        const mutationObserver = new MutationObserver((mutations) => {
            const hasStructuralChange = mutations.some(
                (m) => m.type === "childList" && m.addedNodes.length > 0
            );
            if (!hasStructuralChange) return;

            observerRef.current?.disconnect();
            init();
        });

        mutationObserver.observe(articleBody, { childList: true, subtree: true });

        return () => {
            observerRef.current?.disconnect();
            mutationObserver.disconnect();
        };
    }, []);

    const handleLinkClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
        setMobileOpen(false);
    };

    if (toc.length === 0) return null;

    return (
        <>
            {/* ── 桌面版 ── */}
            <nav className="hidden lg:block w-full bg-foreground/[0.01] border border-foreground/10 rounded-2xl p-5 backdrop-blur-sm transition-all duration-300">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-2 mb-4">
                    <FontAwesomeIcon icon={faListUl} className="text-[10px]" />導覽目錄
                </p>
                <TocList toc={toc} activeId={activeId} onLinkClick={handleLinkClick} />
            </nav>

            {/* ── 手機版 ── */}
            <div className="lg:hidden">
                {mobileOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                )}

                <div
                    className={`fixed bottom-20 right-4 z-50 w-72 bg-background border border-foreground/10 rounded-2xl shadow-xl overflow-hidden transition-all duration-300 origin-bottom-right ${mobileOpen
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-90 pointer-events-none"
                        }`}
                >
                    <div className="p-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-2 mb-4">
                            <FontAwesomeIcon icon={faListUl} className="text-[10px]" /> 導覽目錄
                        </p>
                        <TocList toc={toc} activeId={activeId} onLinkClick={handleLinkClick} />
                    </div>
                </div>

                <button
                    onClick={() => setMobileOpen((prev) => !prev)}
                    aria-label={mobileOpen ? "關閉目錄" : "開啟目錄"}
                    className="fixed bottom-6 right-4 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-300 active:scale-90"
                >
                    <FontAwesomeIcon
                        icon={mobileOpen ? faXmark : faListUl}
                        className="text-base transition-transform duration-300"
                    />
                </button>
            </div>
        </>
    );
}