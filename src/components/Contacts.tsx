import AnimatedSection from './AnimatedSection';

const Contacts = () => {
  const contactInfo = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: "Адрес",
      value: "г.Балашиха ул.Текстильщиков 16",
      link: "https://maps.google.com/?q=г.Балашиха+ул.Текстильщиков+16"
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: "Телефон",
      value: "+7 (926) 546-45-45",
      link: "tel:+79265464545"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white" id="contacts">
      <div className="container mx-auto px-4">
        <AnimatedSection animation="fadeIn" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Свяжитесь с <span className="font-medium text-[#8DB892]">нами</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Готовы обсудить ваш проект? Мы всегда на связи для консультаций и вопросов
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Контактная информация */}
          <AnimatedSection animation="slideLeft" delay={200}>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-2 bg-[#8DB892] rounded-full mr-3"></div>
                Контактная информация
              </h3>

              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <AnimatedSection key={index} animation="slideUp" delay={300 + index * 100}>
                    <div className="group">
                      <a
                        href={contact.link}
                        target={contact.link.startsWith('http') ? '_blank' : undefined}
                        rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="flex items-start p-4 rounded-lg transition-all duration-300 hover:bg-gray-50 hover:shadow-sm border border-transparent hover:border-[#8DB892]/20"
                      >
                        <div className="flex-shrink-0 w-12 h-12 bg-[#8DB892]/10 rounded-lg flex items-center justify-center text-[#8DB892] group-hover:bg-[#8DB892] group-hover:text-white transition-all duration-300">
                          {contact.icon}
                        </div>
                        <div className="ml-4">
                          <h4 className="font-semibold text-gray-800 group-hover:text-[#8DB892] transition-colors">
                            {contact.title}
                          </h4>
                          <p className="text-gray-600 mt-1 text-sm md:text-base">
                            {contact.value}
                          </p>
                        </div>
                      </a>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Мессенджеры */}
          <AnimatedSection animation="slideRight" delay={400}>
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <div className="w-2 h-2 bg-[#8DB892] rounded-full mr-3"></div>
                Мы в мессенджерах
              </h3>

              <div className="space-y-4">
                <AnimatedSection animation="slideUp" delay={500}>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-[#8DB892]/30 transition-all duration-300 hover:bg-gray-50">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white mr-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Telegram</h4>
                        <p className="text-gray-600 text-sm">@DecorFusion</p>
                      </div>
                    </div>
                    <a
                      href="https://t.me/DecorFusion"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#8DB892] text-white px-4 py-2 rounded-lg hover:bg-[#7AA37E] transition-colors duration-300 font-medium text-sm hover:scale-105 transform"
                    >
                      Написать
                    </a>
                  </div>
                </AnimatedSection>

                <AnimatedSection animation="fadeIn" delay={600}>
                  <div className="mt-6 p-4 bg-gradient-to-r from-[#8DB892]/10 to-[#8DB892]/5 rounded-lg border border-[#8DB892]/20">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 w-8 h-8 bg-[#8DB892] rounded-full flex items-center justify-center text-white mr-3 mt-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-1">Быстрый ответ</h4>
                        <p className="text-gray-600 text-sm">
                          Обычно отвечаем в течение часа в рабочее время
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Дополнительная информация */}
        <AnimatedSection animation="slideUp" delay={700} className="mt-12 text-center">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl mx-auto">
            <h4 className="font-semibold text-gray-800 mb-3">Время работы</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <span className="font-medium">Пн-Пт:</span> 9:00 - 18:00
              </div>
              <div>
                <span className="font-medium">Сб-Вс:</span> По договоренности
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default Contacts;
