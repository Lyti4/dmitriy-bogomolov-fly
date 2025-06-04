import { trackEvent } from '../utils/analytics';
import AnimatedSection from './AnimatedSection';

const HeroBanner = () => {
  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    trackEvent('hero_cta_click', { button: 'Достичь совершенства' });

    const contactsElement = document.getElementById('contacts');
    if (contactsElement) {
      contactsElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className="relative h-[100vh] min-h-[500px] sm:min-h-[600px] max-h-[800px] overflow-hidden">
      {/* Фоновое изображение */}
      <div className="absolute inset-0">
        <img
          src="/images/vidGlav.jpg"
          alt="Геометрия. Тишина. Совершенство."
          className="w-full h-full object-cover object-center scale-105 animate-slow-zoom"
        />
        {/* Overlay для лучшей читаемости */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Контент баннера */}
      <div className="relative h-full container mx-auto px-4 z-10 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center w-full">
          {/* Левая часть - триада концепции */}
          <AnimatedSection animation="slideLeft" className="text-center lg:text-left">
            <div className="mb-6 lg:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light mb-4 drop-shadow-2xl text-black">
                <AnimatedSection animation="slideUp" delay={200}>
                  <span className="block opacity-90">Геометрия.</span>
                </AnimatedSection>
                <AnimatedSection animation="slideUp" delay={400}>
                  <span className="block opacity-90">Тишина.</span>
                </AnimatedSection>
                <AnimatedSection animation="slideUp" delay={600}>
                  <span className="block font-medium text-[#8DB892] drop-shadow-lg">Совершенство.</span>
                </AnimatedSection>
              </h1>
            </div>
            <AnimatedSection animation="fadeIn" delay={800}>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl drop-shadow-lg max-w-lg mx-auto lg:mx-0 text-black leading-relaxed">
                Три принципа, превращающие мебель<br className="hidden sm:block" />
                <span className="sm:hidden"> </span>в философию пространства
              </p>
            </AnimatedSection>
          </AnimatedSection>

          {/* Правая часть - расшифровка принципов */}
          <AnimatedSection
            animation="slideRight"
            delay={1000}
            className="hidden lg:block self-center space-y-6"
          >
            <AnimatedSection animation="slideUp" delay={1200}>
              <div className="flex items-start group hover:transform hover:translate-x-2 transition-transform duration-300">
                <span className="text-3xl mr-4 opacity-70 text-[#8DB892]">◼</span>
                <div>
                  <h3 className="text-2xl font-semibold text-black mb-1">Геометрия</h3>
                  <p className="text-lg opacity-90 text-black">Чистые линии, свободные от декора</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={1400}>
              <div className="flex items-start group hover:transform hover:translate-x-2 transition-transform duration-300">
                <span className="text-3xl mr-4 opacity-70 text-[#8DB892]">◼</span>
                <div>
                  <h3 className="text-2xl font-semibold text-black mb-1">Тишина</h3>
                  <p className="text-lg opacity-90 text-black">Форма, которая не кричит, а звучит</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideUp" delay={1600}>
              <div className="flex items-start group hover:transform hover:translate-x-2 transition-transform duration-300">
                <span className="text-3xl mr-4 opacity-70 text-[#8DB892]">◼</span>
                <div>
                  <h3 className="text-2xl font-semibold text-black mb-1">Совершенство</h3>
                  <p className="text-lg opacity-90 text-black">Детали, заметные только при касании</p>
                </div>
              </div>
            </AnimatedSection>
          </AnimatedSection>

          {/* Мобильная версия принципов */}
          <AnimatedSection
            animation="slideUp"
            delay={1000}
            className="lg:hidden space-y-3 mt-6"
          >
            {[
              { title: "Геометрия", desc: "Чистые линии, свободные от декора" },
              { title: "Тишина", desc: "Форма, которая не кричит, а звучит" },
              { title: "Совершенство", desc: "Детали, заметные только при касании" }
            ].map((item, index) => (
              <div key={index} className="text-center sm:text-left">
                <div className="flex items-center justify-center sm:justify-start space-x-3 text-black mb-1">
                  <span className="text-xl sm:text-2xl text-[#8DB892]">◼</span>
                  <span className="font-semibold text-base sm:text-lg">{item.title}</span>
                </div>
                <p className="text-sm sm:text-base opacity-90 text-black px-6 sm:px-0 sm:ml-8">
                  {item.desc}
                </p>
              </div>
            ))}
          </AnimatedSection>
        </div>

        {/* Кнопка CTA - перенесена в контейнер для лучшего позиционирования */}
        <AnimatedSection
          animation="slideUp"
          delay={1800}
          className="mt-8 lg:mt-12 text-center lg:text-right"
        >
          <button
            onClick={handleCtaClick}
            className="group inline-flex items-center bg-white/95 hover:bg-white border-2 border-[#8DB892] text-black py-3 px-6 sm:py-4 sm:px-8 md:py-5 md:px-10 rounded-full transition-all duration-500 shadow-xl backdrop-blur-sm hover:shadow-2xl hover:scale-105 font-medium text-base sm:text-lg"
          >
            Достичь совершенства
            <svg
              className="ml-2 sm:ml-3 w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform text-[#8DB892]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </AnimatedSection>
      </div>



      {/* Scroll indicator */}
      <AnimatedSection
        animation="fadeIn"
        delay={2000}
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20 hidden sm:block"
      >
        <div className="animate-bounce">
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </AnimatedSection>
    </section>
  );
};

export default HeroBanner;
