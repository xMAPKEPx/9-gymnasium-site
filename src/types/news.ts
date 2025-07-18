export type ImgFormat = {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
}

export type ContentImage = {
    id: number;
    documentId: string;
    name: string
    alternativeText: string;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        thumbnail: ImgFormat;
        medium: ImgFormat;
        small: ImgFormat;
        large: ImgFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: string | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface NewsItem {
    id: number;
    documentId: string;
    Title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string;
    Content: string;
    Publish_date?: string;
    Date?: string; // дата публикации из API
    Content_img?: ContentImage[];
} 