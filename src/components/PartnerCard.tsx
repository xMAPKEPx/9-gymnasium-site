import { type FC } from 'react';
import { PartnerIcon } from '../icons/AllIcons';

interface PartnerCardProps {
  logo: string | React.ReactNode;
  name: string;
  description: string;
  link?: string;
}

const CardContent: FC<Omit<PartnerCardProps, 'link'>> = ({ logo, name, description }) => (
  <>
    {(!logo || (typeof logo === 'string' && logo.trim() === '')) ? (
      <div className="w-20 h-20 flex items-center justify-center mb-4 rounded-xl bg-[#F3F6FA]">
        <PartnerIcon className="w-12 h-12" />
      </div>
    ) : typeof logo === 'string' ? (
      <img src={logo} alt={name} className="w-20 h-20 object-contain mb-4 rounded-xl bg-[#F3F6FA] p-4" />
    ) : (
      <div className="w-20 h-20 flex items-center justify-center mb-4 rounded-xl bg-[#F3F6FA]">{logo}</div>
    )}
    <div className="font-bold text-lg text-[#1A3E8A] mb-2 text-center">{name}</div>
    <div className="text-gray-500 text-base text-center">{description}</div>
  </>
);

const PartnerCard: FC<PartnerCardProps> = ({ logo, name, description, link }) => {
  const content = <CardContent logo={logo} name={name} description={description} />;
  return link ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#F6F8FB] rounded-2xl shadow p-8 flex flex-col items-center w-full max-w-xs mx-auto transition-transform hover:scale-105 focus:scale-105 outline-none cursor-pointer"
      tabIndex={0}
    >
      {content}
    </a>
  ) : (
    <div className="bg-[#F6F8FB] rounded-2xl shadow p-8 flex flex-col items-center w-full max-w-xs mx-auto">
      {content}
    </div>
  );
};

export default PartnerCard; 