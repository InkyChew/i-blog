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
                        className="text-sm transition-all duration-200"
                        style={{
                            paddingLeft: item.level === 3 ? 12 : 0,
                        }}
                    >
                        <a
                            href={`#${item.id}`}
                            onClick={(e) => onLinkClick(e, item.id)}
                            className={`
                flex items-center gap-1.5 truncate py-0.5 transition-all duration-200
                ${isActive
                                    ? "text-primary font-bold translate-x-1"
                                    : "text-foreground/50 hover:text-foreground/80"
                                }
              `}
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
    const [activeId, setActiveId] = useState("");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [toc, setToc] = useState<TocItem[]>([]);

    const headingsRef = useRef<HTMLElement[]>([]);

    useEffect(() => {
        const article = document.querySelector("main");
        if (!article) return;

        const headings = Array.from(
            article.querySelectorAll<HTMLElement>("h2, h3")
        );

        headingsRef.current = headings;

        const idMap: Record<string, number> = {};

        const items = headings.map((heading) => {
            const raw =
                heading.id ||
                heading.textContent
                    ?.trim()
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\p{L}\p{N}-]/gu, "") ||
                "heading";

            idMap[raw] = (idMap[raw] || 0) + 1;

            const id =
                idMap[raw] === 1
                    ? raw
                    : `${raw}-${idMap[raw]}`;

            heading.id = id;

            return {
                id,
                text: heading.textContent || "",
                level: heading.tagName === "H2" ? 2 : 3,
            };
        });

        setToc(items);

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top -
                            b.boundingClientRect.top
                    );

                if (visible.length > 0) {
                    setActiveId(
                        (visible[0].target as HTMLElement).id
                    );
                }
            },
            {
                rootMargin: "-96px 0px -60% 0px",
                threshold: 0.1,
            }
        );

        headings.forEach((h) => observer.observe(h));

        return () => observer.disconnect();
    }, []);

    const handleLinkClick = (
        e: React.MouseEvent,
        id: string
    ) => {
        e.preventDefault();

        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });

        setMobileOpen(false);
    };

    if (toc.length === 0) return null;

    return (
        <>
            {/* Desktop */}
            <nav className="hidden lg:block w-full bg-foreground/[0.01] border border-foreground/10 rounded-2xl p-5 backdrop-blur-sm">
                <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-2 mb-4">
                    <FontAwesomeIcon icon={faListUl} className="text-[10px]" />
                    導覽目錄
                </p>

                <TocList
                    toc={toc}
                    activeId={activeId}
                    onLinkClick={handleLinkClick}
                />
            </nav>

            {/* Mobile */}
            <div className="lg:hidden">
                {mobileOpen && (
                    <div
                        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
                        onClick={() => setMobileOpen(false)}
                    />
                )}

                <aside
                    className={`
            fixed bottom-20 right-4 z-50 w-72
            bg-background border border-foreground/10
            rounded-2xl shadow-xl overflow-hidden
            transition-all duration-300 origin-bottom-right
            ${mobileOpen
                            ? "opacity-100 scale-100"
                            : "opacity-0 scale-95 pointer-events-none"
                        }
          `}
                >
                    <div className="p-4">
                        <p className="text-xs font-bold uppercase tracking-widest text-foreground/40 flex items-center gap-2 mb-4">
                            <FontAwesomeIcon icon={faListUl} className="text-[10px]" />
                            導覽目錄
                        </p>

                        <TocList
                            toc={toc}
                            activeId={activeId}
                            onLinkClick={handleLinkClick}
                        />
                    </div>
                </aside>

                <button
                    onClick={() => setMobileOpen((p) => !p)}
                    aria-label={mobileOpen ? "關閉目錄" : "開啟目錄"}
                    className="fixed bottom-6 right-4 z-50 w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center active:scale-90"
                >
                    <FontAwesomeIcon
                        icon={mobileOpen ? faXmark : faListUl}
                    />
                </button>
            </div>
        </>
    );
}