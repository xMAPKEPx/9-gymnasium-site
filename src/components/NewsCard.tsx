type NewsCardProps = {
  title: string;
  children?: React.ReactNode;
};

const NewsCard = ({ title, children }: NewsCardProps) => {
  return (
    <div className="w-48 h-48 border rounded-lg flex flex-col items-center justify-center transition-transform shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      <div className="font-semibold mb-1">{title}</div>
      {children}
    </div>
  );
};

export default NewsCard; 