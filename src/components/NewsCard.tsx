import Card from './Card';

interface NewsCardProps {
  image?: string;
  title: string;
  date: string;
  description: string;
  onClick?: () => void;
}

const NewsCard = ({ image, title, date, description, onClick }: NewsCardProps) => {


  return (
    <Card
      className="w-full max-w-[480px] h-[350px] p-0 rounded-2xl overflow-hidden cursor-pointer transition-transform hover:-translate-y-1 truncate"
      onClick={onClick}
      ariaLabel={`Открыть новость: ${title}`}
      tabIndex={0}
    >
      {image ? (
        <img
          src={image}
          alt={title}
          className="w-full h-40 md:h-44 object-cover"
          loading="lazy"
        />
      ) : (
        <div className="bg-primary h-40 md:h-44 w-full" />
      )}
      <div
        className={`p-6 flex flex-col overflow-hidden transition-[max-height] duration-700`}
        style={{ minHeight: 0 }}
      >
        <div className="text-gray-400 text-sm mb-2">{date}</div>
        <div className={`font-bold text-primary text-lg mb-1 line-clamp-2'`}>{title}</div>
        <div className={`text-gray-700 text-base flex-1 line-clamp-3 whitespace-pre-line`}>{description}</div>
      </div>
    </Card>
  );
};

export default NewsCard; 