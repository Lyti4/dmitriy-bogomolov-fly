import { trackEvent } from '../utils/analytics';

const HeroBanner = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Фоновое изображение */}
      <div className="absolute inset-0">
        <img
          src="/images/vidGlav.jpg"
          alt="Геометрия. Тишина. Совершенство."
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Контент баннера */}
      <div className="relative h-full container mx-auto px-4 z-10 flex items-center">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Левая часть - триада концепции */}
          <div className="text-white">
            <div className="mb-6">
              <h1 className="text-3xl md:text-5xl font-light mb-2 drop-shadow-lg text-black">
                <span className="block">Геометрия.</span>
                <span className="block">Тишина.</span>
                <span className="block font-medium">Совершенство.</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl drop-shadow-md max-w-md text-black">
              Три принципа, превращающие мебель<br />
              в философию пространства
            </p>
          </div>

          {/* Правая часть - расшифровка принципов */}
          <div className="hidden lg:block self-center space-y-4">
            <div className="flex items-start">
              <span className="text-2xl mr-3 opacity-70">◼</span>
              <div>
                <h3 className="text-xl font-medium text-black">Геометрия</h3>
                <p className="text-base opacity-90 text-black">Чистые линии, свободные от декора</p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-2xl mr-3 opacity-70">◼</span>
              <div>
                <h3 className="text-xl font-medium text-black">Тишина</h3>
                <p className="text-base opacity-90 text-black">Форма, которая не кричит, а звучит</p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-2xl mr-3 opacity-70">◼</span>
              <div>
                <h3 className="text-xl font-medium text-black">Совершенство</h3>
                <p className="text-base opacity-90 text-black">Детали, заметные только при касании</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка CTA */}
      <div className="absolute right-4 lg:right-8 bottom-8 z-20">
        <a
          href="#contacts"
          onClick={() => trackEvent('hero_cta_click', { button: 'Достичь совершенства' })}
          className="inline-block bg-white hover:bg-gray-100 border border-white text-black py-3 px-8 rounded-md transition-all duration-300 shadow-lg backdrop-blur-sm"
        >
          Достичь совершенства
        </a>
      </div>
    </section>
  );
};

export default HeroBanner;
