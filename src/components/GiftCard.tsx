import Card from './Card';

interface GiftCardProps {
  image: string;
  title: string;
  description: string;
  onClick?: () => void;
}

const GiftCard = ({ image, title, description, onClick }: GiftCardProps) => (
  <Card className="bg-[#F6F8FB] rounded-2xl shadow p-8 flex flex-col items-center w-full max-w-xs mx-auto" onClick={onClick} ariaLabel={`Подарок: ${title}`}> 
    <img
      src={image}
      alt={title}
      className="w-32 h-32 object-contain mb-4"
      loading="lazy"
    />
    <div className="font-bold text-lg text-[#1A3E8A] mb-2 text-center">{title}</div>
    <div className="text-gray-500 text-base text-center">{description}</div>
  </Card>
);

export default GiftCard; 