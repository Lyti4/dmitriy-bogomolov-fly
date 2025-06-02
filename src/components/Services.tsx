import React from 'react';

const App = () => {
  const services = [
    {
      title: "Проектирование интерьера «под ключ»",
      description:
        "Создайте идеальное пространство с дизайном интерьера «под ключ». Мы разрабатываем индивидуальные решения, учитывая стиль, функциональность и особенности вашего помещения. Наши специалисты помогут вам спланировать зонирование, подобрать мебель и создать гармоничный интерьер.",
      image:
        "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      ctaText: "Заказать дизайн интерьера →",
      id: "interior-design"
    },
    {
      title: "Интеграция умной мебели и техники",
      description:
        "Современная жизнь требует технологий. Мы внедряем беспроводную зарядку, встроенные порты питания и трансформируемые механизмы прямо в мебель. Также поможем подобрать встроенную бытовую технику для кухни и ванной комнаты, чтобы всё было в едином стиле.",
      image:
        "https://images.unsplash.com/photo-1600180758890-7fdc4f2b23ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      ctaText: "Выбрать умную мебель и технику →",
      id: "smart-furniture"
    },
    {
      title: "Реализация проекта с авторским надзором",
      description:
        "Идеальный дизайн теряет смысл без точного исполнения. Мы предлагаем авторский надзор за проектом — контроль реализации на всех этапах, начиная с замеров и заканчивая финальной расстановкой мебели. Гарантируем качество и соответствие вашей задумке.",
      image:
        "https://images.unsplash.com/photo-1586105251261-72a756497c4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      ctaText: "Заказать авторский надзор →",
      id: "author-supervision"
    },
    {
      title: "Коммерческие интерьеры и офисы",
      description:
        "Привлекательный интерьер — важный фактор успеха бизнеса. Мы создаём дизайн ресторанов, кафе, офисов и отелей, который повышает эффективность работы, привлекает клиентов и формирует узнаваемость бренда. Фокус на эргономику, безопасность и стиль.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80",
      ctaText: "Оформить коммерческое помещение →",
      id: "commercial-design"
    }
  ];

  return (
    <section id="services" className="py-16 relative bg-[#FEFDF7]">
      {/* Лёгкий фон с текстурой */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/graph-paper.png")',
          opacity: 0.1,
        }}
      ></div>
      <div className="absolute inset-0 bg-[#FAF8F4] opacity-70"></div>

      <div className="relative container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-4">
          <span className="font-medium">Услуги</span>
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Мы предлагаем полный цикл проектирования и реализации мебельных решений — от дизайна до установки.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              id={service.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow duration-300"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YxZjVmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2NDc0OGIiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
                  }}
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-medium text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                <a
                  href="#contacts"
                  className="inline-block text-[#A89C8C] hover:text-[#8E7B6B] font-medium transition-colors text-sm"
                >
                  {service.ctaText}
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white p-6 md:p-8 rounded-lg shadow-md border border-[#E6E2D9]">
          <h3 className="text-xl font-medium text-gray-800 mb-4">Как мы работаем</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="bg-[#A89C8C] text-white w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="font-medium">1</span>
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Знакомство</h4>
              <p className="text-xs text-gray-600">Обсуждаем ваши идеи и особенности пространства</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-[#A89C8C] text-white w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="font-medium">2</span>
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Проект</h4>
              <p className="text-xs text-gray-600">Создаем чертежи и визуализацию будущей мебели</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-[#A89C8C] text-white w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="font-medium">3</span>
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Создание</h4>
              <p className="text-xs text-gray-600">Вручную изготавливаем мебель с любовью к деталям</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="bg-[#A89C8C] text-white w-10 h-10 rounded-full flex items-center justify-center mb-3">
                <span className="font-medium">4</span>
              </div>
              <h4 className="font-medium text-gray-800 mb-2">Установка</h4>
              <p className="text-xs text-gray-600">Привозим и собираем мебель у вас дома</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
