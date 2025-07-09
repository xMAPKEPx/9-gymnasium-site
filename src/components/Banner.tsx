import type { FC, ReactNode } from 'react';
import Button from './Button';

interface BannerProps {
  title: string;
  subtitle?: string;
  image?: ReactNode;
  buttonText?: string;
  onButtonClick?: () => void;
  className?: string;
}

const Banner: FC<BannerProps> = ({ title, subtitle, image, buttonText, onButtonClick, className = '' }) => (
  <section className={`w-full bg-hero-gradient rounded-xl flex flex-col md:flex-row items-center justify-between p-8 md:p-12 shadow-card-lg text-white ${className}`}>
    <div className="flex-1 flex flex-col items-start">
      <h1 className="font-heading text-h1 mb-4 drop-shadow-lg">{title}</h1>
      {subtitle && <div className="prose prose-lg text-white/90 mb-6 max-w-xl">{subtitle}</div>}
      {buttonText && <Button variant="accent" size="lg" onClick={onButtonClick}>{buttonText}</Button>}
    </div>
    {image && <div className="flex-1 flex justify-end items-center mt-8 md:mt-0 md:ml-8">{image}</div>}
  </section>
);

export default Banner; 