type ProductCardProps = {
  title: string;
  children?: React.ReactNode;
};

const ProductCard = ({ title, children }: ProductCardProps) => {
  return (
    <div className="w-20 h-20 border rounded-lg flex flex-col items-center justify-center transition-transform shadow-sm hover:shadow-lg hover:-translate-y-1 cursor-pointer">
      <div className="font-semibold mb-1">{title}</div>
      {children}
    </div>
  );
};

export default ProductCard; 