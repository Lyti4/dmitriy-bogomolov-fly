import { useState } from 'react';

interface HeaderProps {
  activePage: string;
}

const Header = ({ activePage }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="flex items-center">
          <img
            src="/images/kyxnia21_4.jpg"
            alt="МебельЭко логотип"
            className="w-10 h-10 mr-2 rounded object-cover"
          />
          <span className="text-lg font-medium text-gray-800">МебельЭко</span>
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className={`text-sm font-medium ${activePage === 'home' ? 'text-[#8DB892]' : 'text-gray-700 hover:text-[#8DB892]'} transition-colors`}>
            Главная
          </a>
          <a href="#portfolio" className={`text-sm font-medium ${activePage === 'portfolio' ? 'text-[#8DB892]' : 'text-gray-700 hover:text-[#8DB892]'} transition-colors`}>
            Портфолио
          </a>
          <a href="#services" className={`text-sm font-medium ${activePage === 'services' ? 'text-[#8DB892]' : 'text-gray-700 hover:text-[#8DB892]'} transition-colors`}>
            Услуги
          </a>
          <a href="#about" className={`text-sm font-medium ${activePage === 'about' ? 'text-[#8DB892]' : 'text-gray-700 hover:text-[#8DB892]'} transition-colors`}>
            О нас
          </a>
          <a href="#contacts" className={`text-sm font-medium ${activePage === 'contacts' ? 'text-[#8DB892]' : 'text-gray-700 hover:text-[#8DB892]'} transition-colors`}>
            Контакты
          </a>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white shadow-lg py-4 px-6 space-y-4">
          <a href="#" className={`block text-sm font-medium ${activePage === 'home' ? 'text-[#8DB892]' : 'text-gray-700'}`}>
            Главная
          </a>
          <a href="#portfolio" className={`block text-sm font-medium ${activePage === 'portfolio' ? 'text-[#8DB892]' : 'text-gray-700'}`}>
            Портфолио
          </a>
          <a href="#services" className={`block text-sm font-medium ${activePage === 'services' ? 'text-[#8DB892]' : 'text-gray-700'}`}>
            Услуги
          </a>
          <a href="#about" className={`block text-sm font-medium ${activePage === 'about' ? 'text-[#8DB892]' : 'text-gray-700'}`}>
            О нас
          </a>
          <a href="#contacts" className={`block text-sm font-medium ${activePage === 'contacts' ? 'text-[#8DB892]' : 'text-gray-700'}`}>
            Контакты
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
