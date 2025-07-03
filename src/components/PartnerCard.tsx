type PartnerCardProps = {
  name: string;
  position: string;
  avatarUrl?: string;
};

const PartnerCard = ({ name, position, avatarUrl }: PartnerCardProps) => {
  return (
    <div className="flex flex-col items-center w-32">
      <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center mb-2">
        {avatarUrl ? (
          <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-3xl text-gray-400">👤</span>
        )}
      </div>
      <div className="text-center font-semibold text-sm">{name}</div>
      <div className="text-center text-xs text-gray-500">{position}</div>
    </div>
  );
};

export default PartnerCard; 