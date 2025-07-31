export type StrapiImageFormat = { url: string };
export type StrapiImage = {
  url: string;
  formats?: { thumbnail?: StrapiImageFormat };
};
export type Partner = { id: number; Name: string; Description: string; Logo?: StrapiImage; Link?: string };
export type Gift = { id: number; Name: string; Photo?: StrapiImage };
export type Resource = { Title: string; Link: string };
export type Contact = { Logo?: StrapiImage; Title: string; Phone: string; Email: string };
export type HomePageData = {
  Partners?: Partner[];
  Gifts?: Gift[];
  Resources?: Resource[];
  Contacts?: Contact[];
};
export type NewsItem = { title: string; date: string; description: string; image?: string }; 