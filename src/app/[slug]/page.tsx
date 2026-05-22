import { notFound } from "next/navigation";
import { getPageData } from "@/src/lib/page";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generatePageSchema } from "@/src/lib/jsonld";
import JsonLd from "@/src/components/JsonLd";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const { slug } = await params;
    const page = await getPageData(slug);

    return {
        title: page.title,
        description: page.description,
    };
}

export default async function PageLayoutPage({ params }: PageProps) {
    const { slug } = await params;

    const page = await getPageData(slug);
    if (!page) notFound();

    const Content = page.content;

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
            <header className="mb-12 border-b border-foreground/10 pb-8">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                    {page.title}
                </h1>
                <p className="text-sm text-foreground/50">
                    <FontAwesomeIcon icon={faCalendarDays} /> {new Date(page.updatedAt).toLocaleDateString()}
                </p>
            </header>

            <main
                className="prose dark:prose-invert prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary max-w-none text-base leading-relaxed text-foreground/80"
            >
                <Content />
            </main>

            <JsonLd schema={generatePageSchema(page)} />
        </div>
    );
}