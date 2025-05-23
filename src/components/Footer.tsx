const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F9F7F2] py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 mr-2 rounded flex items-center justify-center bg-[#8DB892] text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
                  <path d="M17 11l0 8a1 1 0 0 1 -1 1l-12 0a1 1 0 0 1 -1 -1l0 -8" />
                  <path d="M14 11v-7a1 1 0 0 0 -1 -1h-6a1 1 0 0 0 -1 1v7" />
                  <path d="M5 11l14 0" />
                  <path d="M9 11l0 4" />
                  <path d="M15 11l0 4" />
                </svg>
              </div>
              <span className="text-lg font-medium text-gray-800">МебельЭко</span>
            </div>
            <p className="text-gray-600 mb-4">
              Изготовление корпусной мебели и предметов декора на заказ с использованием натуральных материалов.
            </p>
            <p className="text-gray-600">
              © {currentYear} МебельЭко. Все права защищены.
            </p>
          </div>

          <div>
            <h3 className="text-gray-800 font-medium mb-4">Разделы</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-600 hover:text-[#8DB892] transition-colors">
                  Главная
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-600 hover:text-[#8DB892] transition-colors">
                  Портфолио
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 hover:text-[#8DB892] transition-colors">
                  Услуги
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-600 hover:text-[#8DB892] transition-colors">
                  О нас
                </a>
              </li>
              <li>
                <a href="#contacts" className="text-gray-600 hover:text-[#8DB892] transition-colors">
                  Контакты
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 font-medium mb-4">Услуги</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-600 hover:text-[#8DB892] transition-colors">
                  Кухонные гарнитуры
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 hover:text-[#8DB892] transition-colors">
                  Шкафы и стеллажи
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 hover:text-[#8DB892] transition-colors">
                  Элементы декора
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 hover:text-[#8DB892] transition-colors">
                  Консультация дизайнера
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-600 hover:text-[#8DB892] transition-colors">
                  Монтаж мебели
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gray-800 font-medium mb-4">Контакты</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <div className="text-[#8DB892] mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-gray-600">
                  г.Балашиха ул.Текстильщиков 16
                </span>
              </li>
              <li className="flex items-start">
                <div className="text-[#8DB892] mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-gray-600">
                  +7 (926) 546-45-45
                </span>
              </li>
              <li className="flex items-start">
                <div className="text-[#8DB892] mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
                <a href="https://t.me/DecorFusion" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-[#8DB892] transition-colors">
                  Telegram: @DecorFusion
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center text-sm text-gray-600">
          <p>Разработано с любовью к дереву &#10084;</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
