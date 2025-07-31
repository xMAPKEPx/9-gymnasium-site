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

export function formatNumberWithSpaces(num: number | string): string {
  return num
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

export function countUniqueDonors(donors: { name: string }[]): number {
  const unique = new Set(donors.map(d => d.name.trim()));
  return unique.size;
}

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
  ];
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
};
