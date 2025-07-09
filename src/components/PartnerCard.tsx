import Card from './Card';

interface PartnerCardProps {
  avatarUrl: string;
  name: string;
  position: string;
  onClick?: () => void;
}

const PartnerCard = ({ avatarUrl, name, position, onClick }: PartnerCardProps) => (
  <Card className="w-full max-w-xs flex flex-col items-center p-6" onClick={onClick} ariaLabel={`Партнёр: ${name}`}>
    <img
      src={avatarUrl}
      alt={name}
      className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-primary shadow-card"
      loading="lazy"
    />
    <div className="font-heading text-lg text-gray-900 mb-1 text-center">{name}</div>
    <div className="text-gray-400 text-sm text-center">{position}</div>
  </Card>
);

export default PartnerCard; 