import Navbar from "./Navbar";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-foreground/10 transition-colors duration-300">
            <Navbar />
        </header>
    );
}