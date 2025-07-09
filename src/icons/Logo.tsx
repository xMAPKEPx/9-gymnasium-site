import { FC } from 'react';

const Logo: FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    className={className}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Логотип 9-й гимназии"
  >
    <circle cx="24" cy="24" r="24" fill="#1A56DB" />
    <text x="50%" y="55%" textAnchor="middle" fill="#fff" fontSize="24" fontFamily="Montserrat, Arial, sans-serif" fontWeight="bold" dy=".3em">9Г</text>
  </svg>
);

export default Logo; 