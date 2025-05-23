import { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import Benefits from './components/Benefits';
import Portfolio from './components/Portfolio';
import Services from './components/Services';
import About from './components/About';
import Contacts from './components/Contacts';
import Footer from './components/Footer';

function App() {
  const [activePage, setActivePage] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const sectionId = section.getAttribute('id');
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition < sectionTop + sectionHeight
        ) {
          setActivePage(sectionId || 'home');
        }
      }

      if (scrollPosition < 100) {
        setActivePage('home');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="font-sans antialiased text-gray-900 bg-white min-h-screen">
      <Header activePage={activePage} />
      <main>
        <HeroBanner />
        <Benefits />
        <Portfolio />
        <Services />
        <About />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}

export default App;
