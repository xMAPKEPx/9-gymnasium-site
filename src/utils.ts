import { API_URL, DEV_SERVER } from "./const/api_const";

// Функция для формирования полного URL изображения
export const getImageUrl = (imagePath: string | null | undefined): string | null => {
    if (!imagePath) return null;
    const baseUrl = API_URL ? API_URL : DEV_SERVER;
    return `${baseUrl}${imagePath}`;
  };