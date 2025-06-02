import React from 'react';

const App = () => {
  const services = [
    {
      title: "Кухни под заказ",
      description: "Кухня — сердце дома. Мы создаём кухни, которые становятся не просто местом для готовки, а настоящим центром уюта вашей семьи. Изготавливаем по вашим размерам из натурального дерева, МДФ или комбинированных материалов. Вы получаете удобную, функциональную и красивую кухню, в которой всё продумано именно для вас.",
      image: "https://plus.unsplash.com/premium_photo-1683141179507-734e6157ddba?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE0fHx8ZW58MHx8fHx8"
    },
    {
      title: "Шкафы и стеллажи",
      description: "Порядок и красота начинаются с правильной организации пространства. Мы создаём вместительные шкафы-купе, распашные системы хранения и открытые стеллажи. Внутреннее наполнение подбираем так, чтобы вам было удобно пользоваться каждым уголком. Результат — идеальная гармония между порядком и эстетикой.",
      image: "https://plus.unsplash.com/premium_photo-1661779760365-a44d80161cee?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
    },
    {
      title: "Элементы декора",
      description: "Иногда именно маленькие детали делают пространство по-настоящему своим. Мы создаём деревянные полки, рамы, панно и перегородки, которые дополняют интерьер и придают ему индивидуальность. Это не просто мебель — это акценты, которые рассказывают историю вашего дома.",
      image: "/images/Desk_at_a_geometric_wall.jpg"
    },
    {
      title: "Мебель для ванной",
      description: "Даже в самой практичной комнате можно создать уют и эстетику. Наши тумбы, пеналы и зеркала изготавливаются с влагостойкими покрытиями, чтобы служить долго и выглядеть красиво. Вы получаете мебель, которая подчёркивает стиль помещения и экономит пространство.",
      image: "/images/portfolio/bathroom/Vanna2.jpg"
    }
  ];

  return (
    <main className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="py-20 bg-[#F9F7F2] text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-light mb-4">Мебель<span className="font-medium">Эко</span></h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-600">
            Экологичная мебель ручной работы для вашего дома. Делаем корпусную мебель и предметы интерьера.
          </p>
        </div>
      </section>

      {/* Services Section - добавлен id="services" */}
      <section id="services" className="py-16 relative bg-[#FEFDF7]">
        {/* Лёгкий фон с текстурой бумаги */}
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("https://www.transparenttextures.com/patterns/graph-paper.png")',
          opacity: 0.1,
        }}></div>
        <div className="absolute inset-0 bg-[#FAF8F4] opacity-70"></div>

        <div className="relative container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-4">
            <span className="font-medium">Услуги</span>
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Создаём корпусную мебель и предметы интерьера, в которых сочетаются экологичность, надёжность и тепло ручной работы
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YxZjVmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2NDc0OGIiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
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
                    Узнать больше →
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

      {/* Footer */}
      <footer className="py-8 bg-[#F9F7F2] text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} &quot;Не мода. Не массовое производство. Просто мебель, разработанная для жизни и сделанная от сердца.&quot;
      </footer>
    </main>
  );
};

export default App;
