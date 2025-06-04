import AnimatedSection from './AnimatedSection';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const navigationLinks = [
    { name: 'Главная', href: '#' },
    { name: 'Портфолио', href: '#portfolio' },
    { name: 'Услуги', href: '#services' },
    { name: 'О нас', href: '#about' },
    { name: 'Контакты', href: '#contacts' }
  ];

  // Синхронизировано с реальными услугами из Services компонента
  const services = [
    { name: 'Проектирование интерьера «под ключ»', href: '#services' },
    { name: 'Интеграция умной мебели и техники', href: '#services' },
    { name: 'Реализация с авторским надзором', href: '#services' },
    { name: 'Коммерческие интерьеры и офисы', href: '#services' }
  ];

  // Синхронизировано с категориями портфолио
  const portfolioCategories = [
    { name: 'Кухни', href: '#portfolio' },
    { name: 'Шкафы и гардеробные', href: '#portfolio' },
    { name: 'Тумбы и столы', href: '#portfolio' },
    { name: 'Мебель для ванных', href: '#portfolio' },
    { name: 'Детская мебель', href: '#portfolio' },
    { name: 'Элементы хранения', href: '#portfolio' }
  ];

  const contactInfo = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      text: 'г.Балашиха ул.Текстильщиков 16',
      href: 'https://maps.google.com/?q=г.Балашиха+ул.Текстильщиков+16',
      external: true
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      text: '+7 (926) 546-45-45',
      href: 'tel:+79265464545',
      external: false
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
      text: 'Telegram: @DecorFusion',
      href: 'https://t.me/DecorFusion',
      external: true
    }
  ];

  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#8DB892] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#8DB892] rounded-full blur-3xl"></div>
      </div>

      <div className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Информация о компании */}
            <AnimatedSection animation="slideUp" className="lg:col-span-1">
              <div className="mb-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 mr-3 rounded-lg flex items-center justify-center bg-[#8DB892] text-white shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                      <path d="M17 11l0 8a1 1 0 0 1 -1 1l-12 0a1 1 0 0 1 -1 -1l0 -8" />
                      <path d="M14 11v-7a1 1 0 0 0 -1 -1h-6a1 1 0 0 0 -1 1v7" />
                      <path d="M5 11l14 0" />
                      <path d="M9 11l0 4" />
                      <path d="M15 11l0 4" />
                    </svg>
                  </div>
                  <span className="text-xl font-semibold text-gray-800">МебельЭко</span>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Изготовление корпусной мебели и предметов декора на заказ с использованием натуральных материалов.
                </p>
                <div className="space-y-3">
                  {contactInfo.map((contact, index) => (
                    <a
                      key={index}
                      href={contact.href}
                      target={contact.external ? '_blank' : undefined}
                      rel={contact.external ? 'noopener noreferrer' : undefined}
                      className="flex items-center text-gray-600 hover:text-[#8DB892] transition-colors group"
                    >
                      <div className="text-[#8DB892] mr-3 group-hover:scale-110 transition-transform">
                        {contact.icon}
                      </div>
                      <span className="text-sm">{contact.text}</span>
                    </a>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Навигация */}
            <AnimatedSection animation="slideUp" delay={100}>
              <div>
                <h3 className="text-gray-800 font-semibold mb-6 flex items-center">
                  <div className="w-2 h-2 bg-[#8DB892] rounded-full mr-3"></div>
                  Навигация
                </h3>
                <ul className="space-y-3">
                  {navigationLinks.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-600 hover:text-[#8DB892] transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Услуги */}
            <AnimatedSection animation="slideUp" delay={200}>
              <div>
                <h3 className="text-gray-800 font-semibold mb-6 flex items-center">
                  <div className="w-2 h-2 bg-[#8DB892] rounded-full mr-3"></div>
                  Услуги
                </h3>
                <ul className="space-y-3">
                  {services.map((service, index) => (
                    <li key={index}>
                      <a
                        href={service.href}
                        className="text-gray-600 hover:text-[#8DB892] transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block"
                      >
                        {service.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            {/* Категории портфолио */}
            <AnimatedSection animation="slideUp" delay={300}>
              <div>
                <h3 className="text-gray-800 font-semibold mb-6 flex items-center">
                  <div className="w-2 h-2 bg-[#8DB892] rounded-full mr-3"></div>
                  Портфолио
                </h3>
                <ul className="space-y-3">
                  {portfolioCategories.map((category, index) => (
                    <li key={index}>
                      <a
                        href={category.href}
                        className="text-gray-600 hover:text-[#8DB892] transition-colors text-sm hover:translate-x-1 transform duration-200 inline-block"
                      >
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>

          {/* Нижняя часть */}
          <AnimatedSection animation="slideUp" delay={400}>
            <div className="border-t border-gray-300 mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                <div className="text-center md:text-left">
                  <p className="text-gray-600 text-sm">
                    © {currentYear} МебельЭко. Все права защищены.
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <span>Разработано с любовью к дереву</span>
                  <span className="ml-2 text-red-500 animate-pulse">♥</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
