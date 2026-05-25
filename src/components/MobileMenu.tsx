"use client";

import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";

type NavLink = {
    name: string;
    href: string;
};

export default function MobileMenu({
    navLinks,
}: {
    navLinks: NavLink[];
}) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-lg text-foreground/80 hover:bg-foreground/5 transition-colors"
                aria-label="Toggle Menu"
            >
                {isOpen ? (
                    <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                ) : (
                    <FontAwesomeIcon icon={faBars} className="w-5 h-5" />
                )}
            </button>

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
        </>
    );
}