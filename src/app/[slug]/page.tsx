import { notFound } from "next/navigation";
import { getPageData } from "@/src/lib/markdown";
import { marked } from "marked";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { generatePageSchema } from "@/src/lib/jsonld";
import JsonLd from "@/src/components/JsonLd";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
    const resolvedParams = await params;
    const page = getPageData(resolvedParams.slug);
    if (!page) return {};

    return {
        title: page.title,
        description: page.description,
    };
}

export default async function PageLayoutPage({ params }: PageProps) {
    const resolvedParams = await params;

    const page = getPageData(resolvedParams.slug);
    if (!page) notFound();

    const htmlContent = await marked.parse(page.content);

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20">
            <header className="mb-12 border-b border-foreground/10 pb-8">
                <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-4">
                    {page.title}
                </h1>
                <p className="text-sm text-foreground/50">
                    <FontAwesomeIcon icon={faCalendarDays} /> {page.updatedAt}
                </p>
            </header>

            <main
                className="prose dark:prose-invert prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary max-w-none text-base leading-relaxed text-foreground/80"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />

            <JsonLd schema={generatePageSchema(page)} />
        </div>
    );
}