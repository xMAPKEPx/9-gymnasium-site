import type { FC } from 'react';
import { getShortName } from '../utils';

interface PersonCardProps {
  avatarUrl?: string | null;
  name: string;
  role: string;
  description?: string;
}

const PersonCard: FC<PersonCardProps> = ({ avatarUrl, name, role, description }) => (
  <div className="bg-white rounded-xl shadow p-0 flex flex-col items-center text-center w-[12.5rem] h-[14.5rem]">
    <div className="w-24 h-24 rounded-full bg-[#1E3A8A] flex items-center justify-center mt-6 mb-5 overflow-hidden">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt={name}
          className="w-full h-full object-cover rounded-full"
        />
      ) : (
        <span className="text-white text-2xl font-bold select-none">
          {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </span>
      )}
    </div>
    <div className="font-bold text-[20px] text-[#1E3A8A] mb-0 leading-tight">{getShortName(name)}</div>
    {role && (
      <div className="bg-[#FFF7CC] text-[#B89A00] font-bold text-[16px] rounded-[8px] px-4 h-8 flex items-center justify-center mt-3">
        {role}
      </div>
    )}
    {description && <div className="text-xs text-gray-500 mt-1 line-clamp-2">{description}</div>}
  </div>
);

export default PersonCard; 