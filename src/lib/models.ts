export interface PostData {
    slug: string;
    content: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    category: string;
    tags: string[];
}

export interface PageData {
    slug: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
}