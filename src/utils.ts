import { API_URL, DEV_SERVER } from "./const/api_const";

// Функция для формирования полного URL изображения
export const getImageUrl = (imagePath: string | null | undefined): string | null => {
    if (!imagePath) return null;
    const baseUrl = API_URL ? API_URL : DEV_SERVER;
    return `${baseUrl}${imagePath}`;
  };

// Функция для сокращения полного имени до "Фамилия И.О."
export const getShortName = (fullName: string) => {
  const parts = fullName.trim().split(' ');
  if (parts.length === 1) return parts[0];
  const [surname, firstName, patronymic] = parts;
  let initials = '';
  if (firstName) initials += firstName[0] + '.';
  if (patronymic) initials += patronymic[0] + '.';
  return surname + (initials ? ' ' + initials : '');
};