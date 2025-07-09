import Card from './Card';

interface GiftCardProps {
  image: string;
  title: string;
  price?: string;
  onClick?: () => void;
}

const GiftCard = ({ image, title, price, onClick }: GiftCardProps) => (
  <Card className="w-full max-w-xs p-0 min-h-[23rem]" onClick={onClick} ariaLabel={`Подарок: ${title}`}> 
    <img
      src={image}
      alt={title}
      className="w-full max-h-80 object-cover rounded-t-xl mb-4"
      loading="lazy"
    />
    <div className="p-4 flex flex-col items-center">
      <div className="font-heading text-base text-gray-900 mb-1 text-center line-clamp-2">{title}</div>
      {price && <div className="text-accent text-lg font-bold mt-1">{price}</div>}
    </div>
  </Card>
);

export default GiftCard; 