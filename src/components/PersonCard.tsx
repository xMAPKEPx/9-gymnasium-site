import type { FC } from 'react';

interface PersonCardProps {
  avatarUrl?: string | null;
  name: string;
  role: string;
}

const PersonCard: FC<PersonCardProps> = ({ avatarUrl, name, role }) => {
  let badgeBg = '';
  let badgeText = '';
  if (role?.toLowerCase().includes('учител')) {
    badgeBg = 'bg-[#F0E7D2]';
    badgeText = 'text-[#854D0E]';
  } else {
    badgeBg = 'bg-[#E6F6F1]';
    badgeText = 'text-[#455A54]';
  }
  return (
    <div className="flex flex-col items-center bg-transparent">
      {/* Аватар */}
      <div className="w-[96px] h-[96px] rounded-full bg-[var(--color-muted)] flex items-center justify-center mb-3 shadow-lg border-4 border-[var(--color-border)] overflow-hidden">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          <span className="text-2xl text-white font-bold">?</span>
        )}
      </div>
      {/* Имя */}
      <div className="font-extrabold text-[16px] leading-[24px] text-[var(--color-text)] text-center mb-1">
        {name}
      </div>
      {/* Подпись */}
      {role && (
        <div className={`mt-1 px-2 py-1 rounded-[4px] text-[12px] leading-[17px] font-normal ${badgeBg} ${badgeText}`}
          style={{display:'inline-block'}}>
          {role}
        </div>
      )}
    </div>
  );
};

export default PersonCard; 