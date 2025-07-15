import Header from '../components/Header';
import Banner from '../components/Banner';
import SectionTitle from '../components/SectionTitle';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Button from '../components/Button';
import SocialIcons from '../components/SocialIcons';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const benefits = [
  { icon: '🎓', title: 'Поддержка выпускников', description: 'Ассоциация помогает выпускникам в профессиональном развитии и поддерживает связь между поколениями.' },
  { icon: '🤝', title: 'Сильное сообщество', description: 'Объединяем людей, которые хотят делать школу и мир лучше.' },
  { icon: '💡', title: 'Проекты и инициативы', description: 'Запускаем образовательные, культурные и благотворительные проекты.' },
  { icon: '💰', title: 'Эндаумент-фонд', description: 'Финансовая поддержка талантливых учеников и развитие инфраструктуры.' },
];

const AssociationPage = () => (
  <div className="min-h-screen flex flex-col bg-bg text-gray-900">
    <Header />
    <main className="flex-1 w-full px-[13rem] py-8">
      <Banner
        title="Ассоциация выпускников и эндаумент-фонд"
        subtitle="Вместе мы создаём возможности для будущих поколений, поддерживаем традиции и развиваем школу."
        buttonText="Вступить в ассоциацию"
        onButtonClick={() => {}}
      />
      <SectionTitle className="mt-16 mb-8">Зачем вступать?</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-8 mb-12">
        {benefits.map((b, i) => (
          <Card key={i} className="flex flex-col items-start gap-3">
            <Badge size="md" color="accent" icon={<span className="text-xl">{b.icon}</span>}>{b.title}</Badge>
            <div className="prose prose-sm text-gray-700">{b.description}</div>
          </Card>
        ))}
      </div>
      <SectionTitle className="mb-8">Контакты и соцсети</SectionTitle>
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="flex-1 flex flex-col gap-4 items-start">
          <SocialIcons telegram="#" vk="#" email="info@gymnasium.ru" size={32} />
          <Button variant="primary" size="lg" ariaLabel="Вступить">Вступить в ассоциацию</Button>
        </div>
        <div className="flex-1">
          <ContactForm />
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default AssociationPage; 