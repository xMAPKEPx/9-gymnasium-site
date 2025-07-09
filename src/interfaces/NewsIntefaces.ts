import type { ContentImage } from "../types/NewsTypes";

export interface NewsItem {
    id: number;
    documentId: string;
    Title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    Content: string;
    Publish_date: string;
    Content_img?: ContentImage[];
}