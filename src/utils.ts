import { API_URL, DEV_SERVER } from "./const/api_const";

// Функция для формирования полного URL изображения
export const getImageUrl = (imagePath?: string | null): string | null => {
  if (!imagePath) return null;
  return `${API_URL || DEV_SERVER}${imagePath}`;
};

// Функция для сокращения полного имени до "Фамилия И.О."
export const getShortName = (fullName: string) => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  if (parts.length === 1) return parts[0];
  const [surname, firstName, patronymic] = parts;
  let initials = '';
  if (firstName) initials += firstName[0] + '.';
  if (patronymic) initials += patronymic[0] + '.';
  return surname + (initials ? ' ' + initials : '');
};