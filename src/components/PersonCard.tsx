import { FC, ReactNode } from 'react';

interface PersonCardProps {
  avatarUrl: string;
  name: string;
  role: string;
  description?: string;
  social?: ReactNode;
}

const PersonCard: FC<PersonCardProps> = ({ avatarUrl, name, role, description, social }) => (
  <div className="bg-white rounded-xl shadow-card p-6 flex flex-col items-center text-center transition-all duration-300 hover:shadow-card-lg">
    <img
      src={avatarUrl}
      alt={name}
      className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-primary shadow-card"
      loading="lazy"
    />
    <div className="font-heading text-lg text-gray-900 mb-1">{name}</div>
    <div className="text-gray-400 text-sm mb-2">{role}</div>
    {description && <div className="prose prose-sm text-gray-700 mb-2">{description}</div>}
    {social && <div className="flex gap-2 justify-center mt-2">{social}</div>}
  </div>
);

export default PersonCard; 