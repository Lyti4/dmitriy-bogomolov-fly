import React from 'react';
import AnimatedSection from './AnimatedSection';

const Services: React.FC = () => {
  const services = [
    {
      title: "Проектирование интерьера «под ключ»",
      description:
        "Создайте идеальное пространство с дизайном интерьера «под ключ». Мы разрабатываем индивидуальные решения, учитывая стиль, функциональность и особенности вашего помещения.",
      image:
        "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      id: "interior-design"
    },
    {
      title: "Интеграция умной мебели и техники",
      description:
        "Современная жизнь требует технологий. Мы внедряем беспроводную зарядку, встроенные порты питания и трансформируемые механизмы прямо в мебель. Также поможем подобрать встроенную бытовую технику.",
      image:
        "https://images.unsplash.com/photo-1600180758890-7fdc4f2b23ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      id: "smart-furniture"
    },
    {
      title: "Реализация проекта с авторским надзором",
      description:
        "Идеальный дизайн теряет смысл без точного исполнения. Мы предлагаем авторский надзор за проектом — контроль реализации на всех этапах, начиная с замеров и заканчивая финальной расстановкой мебели.",
      image:
        "https://images.unsplash.com/photo-1586105251261-72a756497c4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      id: "author-supervision"
    },
    {
      title: "Коммерческие интерьеры и офисы",
      description:
        "Привлекательный интерьер — важный фактор успеха бизнеса. Мы создаём дизайн ресторанов, кафе, офисов и отелей, который повышает эффективность работы, привлекает клиентов и формирует узнаваемость бренда.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      id: "commercial-design"
    }
  ];

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactsElement = document.getElementById('contacts');
    if (contactsElement) {
      contactsElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section id="services" className="py-16 md:py-20 relative bg-gradient-to-b from-[#FEFDF7] to-white">
      {/* Лёгкий фон с текстурой */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/graph-paper.png")',
          opacity: 0.05,
        }}
      ></div>

      <div className="relative container mx-auto px-4">
        <AnimatedSection animation="fadeIn" className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            <span className="font-medium text-[#8DB892]">Услуги</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Мы предлагаем полный цикл проектирования и реализации мебельных решений — от дизайна до установки.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8 mb-16">
          {services.map((service, index) => (
            <AnimatedSection
              key={index}
              animation="slideUp"
              delay={index * 150}
              className="group"
            >
              <div
                id={service.id}
                className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full transform group-hover:-translate-y-2"
              >
                <div className="h-48 md:h-56 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YxZjVmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2NDc0OGIiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                    }}
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col h-full">
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-3 group-hover:text-[#8DB892] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base mb-6 flex-grow leading-relaxed">
                    {service.description}
                  </p>
                  <button
                    onClick={handleContactClick}
                    className="inline-flex items-center text-[#8DB892] hover:text-[#7BA583] font-medium transition-all duration-300 text-sm md:text-base group/button"
                  >
                    Заказать услугу
                    <svg
                      className="ml-2 w-4 h-4 transform group-hover/button:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection animation="slideUp" delay={600}>
          <div className="bg-white p-6 md:p-8 lg:p-12 rounded-xl shadow-lg border border-[#E6E2D9]">
            <h3 className="text-2xl md:text-3xl font-medium text-gray-800 mb-8 text-center">
              Как мы работаем
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  number: 1,
                  title: "Знакомство",
                  description: "Обсуждаем ваши идеи и особенности пространства"
                },
                {
                  number: 2,
                  title: "Проект",
                  description: "Создаем чертежи и визуализацию будущей мебели"
                },
                {
                  number: 3,
                  title: "Создание",
                  description: "Вручную изготавливаем мебель с любовью к деталям"
                },
                {
                  number: 4,
                  title: "Установка",
                  description: "Привозим и собираем мебель у вас дома"
                }
              ].map((step, index) => (
                <AnimatedSection
                  key={index}
                  animation="slideUp"
                  delay={700 + index * 100}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="relative mb-4">
                    <div className="bg-gradient-to-br from-[#8DB892] to-[#7BA583] text-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-3 transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="font-bold text-lg md:text-xl">{step.number}</span>
                    </div>
                    {index < 3 && (
                      <div className="hidden lg:block absolute top-6 left-full w-full h-0.5 bg-gradient-to-r from-[#8DB892] to-[#E6E2D9]"></div>
                    )}
                  </div>
                  <h4 className="font-semibold text-gray-800 mb-3 text-lg group-hover:text-[#8DB892] transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {step.description}
                  </p>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Services;
