"use client";

import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme: resolvedTheme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return <div className="w-9 h-9" />;

    return (
        <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="w-9 h-9 flex items-center justify-center rounded-xl bg-foreground/[0.04] text-foreground/80 hover:bg-foreground/[0.08] hover:text-foreground transition-all duration-200 cursor-pointer"
            aria-label="Toggle Theme"
        >
            {resolvedTheme === "dark" ? (
                <FontAwesomeIcon icon={faSun} className="text-accent text-base" />
            ) : (
                <FontAwesomeIcon icon={faMoon} className="text-primary text-base" />
            )}
        </button>
    );
}