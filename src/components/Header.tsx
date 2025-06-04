import { useState, useEffect } from 'react';

interface HeaderProps {
  activePage: string;
}

const Header = ({ activePage }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setIsMenuOpen(false); // Close mobile menu after navigation
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white shadow-sm'
    }`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button
          onClick={() => scrollToSection('home')}
          className="flex items-center group"
        >
          <img
            src="/images/kyxnia21_4.jpg"
            alt="МебельЭко логотип"
            className="w-10 h-10 mr-2 rounded object-cover transition-transform group-hover:scale-105"
          />
          <span className="text-lg font-medium text-gray-800 group-hover:text-[#8DB892] transition-colors">
            МебельЭко
          </span>
        </button>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          <button
            onClick={() => scrollToSection('home')}
            className={`text-sm font-medium relative transition-all duration-300 hover:scale-105 ${
              activePage === 'home' ? 'text-[#8DB892]' : 'text-gray-700 hover:text-[#8DB892]'
            }`}
          >
            Главная
            {activePage === 'home' && (
              <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-[#8DB892] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className={`text-sm font-medium relative transition-all duration-300 hover:scale-105 ${
              activePage === 'portfolio' ? 'text-[#8DB892]' : 'text-gray-700 hover:text-[#8DB892]'
            }`}
          >
            Портфолио
            {activePage === 'portfolio' && (
              <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-[#8DB892] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className={`text-sm font-medium relative transition-all duration-300 hover:scale-105 ${
              activePage === 'services' ? 'text-[#8DB892]' : 'text-gray-700 hover:text-[#8DB892]'
            }`}
          >
            Услуги
            {activePage === 'services' && (
              <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-[#8DB892] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`text-sm font-medium relative transition-all duration-300 hover:scale-105 ${
              activePage === 'about' ? 'text-[#8DB892]' : 'text-gray-700 hover:text-[#8DB892]'
            }`}
          >
            О нас
            {activePage === 'about' && (
              <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-[#8DB892] rounded-full"></span>
            )}
          </button>
          <button
            onClick={() => scrollToSection('contacts')}
            className={`text-sm font-medium relative transition-all duration-300 hover:scale-105 ${
              activePage === 'contacts' ? 'text-[#8DB892]' : 'text-gray-700 hover:text-[#8DB892]'
            }`}
          >
            Контакты
            {activePage === 'contacts' && (
              <span className="absolute bottom-[-4px] left-0 w-full h-0.5 bg-[#8DB892] rounded-full"></span>
            )}
          </button>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={toggleMenu}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`}
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
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <nav className="bg-white/95 backdrop-blur-md shadow-lg py-4 px-6 space-y-4">
          <button
            onClick={() => scrollToSection('home')}
            className={`block w-full text-left text-sm font-medium transition-all duration-200 hover:translate-x-2 ${
              activePage === 'home' ? 'text-[#8DB892]' : 'text-gray-700'
            }`}
          >
            Главная
          </button>
          <button
            onClick={() => scrollToSection('portfolio')}
            className={`block w-full text-left text-sm font-medium transition-all duration-200 hover:translate-x-2 ${
              activePage === 'portfolio' ? 'text-[#8DB892]' : 'text-gray-700'
            }`}
          >
            Портфолио
          </button>
          <button
            onClick={() => scrollToSection('services')}
            className={`block w-full text-left text-sm font-medium transition-all duration-200 hover:translate-x-2 ${
              activePage === 'services' ? 'text-[#8DB892]' : 'text-gray-700'
            }`}
          >
            Услуги
          </button>
          <button
            onClick={() => scrollToSection('about')}
            className={`block w-full text-left text-sm font-medium transition-all duration-200 hover:translate-x-2 ${
              activePage === 'about' ? 'text-[#8DB892]' : 'text-gray-700'
            }`}
          >
            О нас
          </button>
          <button
            onClick={() => scrollToSection('contacts')}
            className={`block w-full text-left text-sm font-medium transition-all duration-200 hover:translate-x-2 ${
              activePage === 'contacts' ? 'text-[#8DB892]' : 'text-gray-700'
            }`}
          >
            Контакты
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
