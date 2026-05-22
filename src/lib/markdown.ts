import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { PostData } from "./models";

const postsDirectory = path.join(process.cwd(), "content/posts");

// export async function getSortedPostsData(): Promise<PostData[]> {
//     if (!fs.existsSync(postsDirectory)) return [];

//     const fileNames = fs.readdirSync(postsDirectory);

//     const allPostsData = await Promise.all(
//         fileNames.map(async (fileName) => {
//             const slug = fileName.replace(/\.mdx$/, "");
//             const fullPath = path.join(postsDirectory, fileName);
//             const { default: content, metadata: post } = await import(fullPath);

//             return {
//                 slug,
//                 content,
//                 title: post.title,
//                 description: post.description,
//                 createdAt: post.createdAt,
//                 updatedAt: post.updatedAt || post.createdAt,
//                 category: post.category,
//                 tags: post.tags || []
//             };
//         })
//     );

//     return allPostsData.sort(
//         (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//     );
// }

export function getSortedPostsData(): PostData[] {
    if (!fs.existsSync(postsDirectory)) return [];

    const fileNames = fs.readdirSync(postsDirectory);
    const allPostsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "");
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(fileContents);

        return {
            slug,
            content,
            title: data.title,
            description: data.description,
            createdAt: data.createAt,
            updatedAt: data.updateAt || data.createAt,
            category: data.category,
            tags: data.tags || []
        };
    });

    // 按日期排序
    return allPostsData.sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function getPostData(slug: string): PostData | null {
    const fullPath = path.join(postsDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        content,
        title: data.title,
        createdAt: data.createAt,
        updatedAt: data.updateAt || data.createAt,
        category: data.category,
        description: data.description,
        tags: data.tags || []
    };
}

const pageDirectory = path.join(process.cwd(), "content");

export function getPageData(slug: string) {
    const fullPath = path.join(pageDirectory, `${slug}.md`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
        slug,
        content,
        title: data.title,
        description: data.description,
        createdAt: data.createAt,
        updatedAt: data.updateAt || data.createAt,
    };
}