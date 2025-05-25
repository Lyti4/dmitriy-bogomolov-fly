import { trackEvent } from '../utils/analytics';

const HeroBanner = () => {
  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Фоновое изображение - полный показ без обрезки */}
      <div className="absolute inset-0">
        <img
          src="/images/vidGlav.jpg"
          alt="Геометрия. Тишина. Совершенство."
          className="w-full h-full object-cover object-center"
          style={{ filter: 'brightness(0.9)' }}
        />
      </div>

      {/* Затемнение фона */}
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

      {/* Контент баннера */}
      <div className="relative h-full container mx-auto px-4 z-10">
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Левая часть - триада концепции */}
          <div className="pt-12 lg:pt-0 text-white">
            <div className="mb-6">
              <h1 className="text-3xl md:text-5xl font-light mb-2 drop-shadow-lg">
                <span className="block">Геометрия.</span>
                <span className="block">Тишина.</span>
                <span className="block font-medium">Совершенство.</span>
              </h1>
            </div>
            <p className="text-lg md:text-xl drop-shadow-md max-w-md">
              Три принципа, превращающие мебель<br/>
              в философию пространства
            </p>
          </div>

          {/* Правая часть - расшифровка принципов */}
          <div className="hidden lg:block text-white self-center space-y-4">
            <div className="flex items-start">
              <span className="text-2xl mr-3">◼</span>
              <div>
                <h3 className="text-xl font-medium">Геометрия</h3>
                <p className="text-base opacity-90">Чистые линии, свободные от декора</p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-2xl mr-3">◼</span>
              <div>
                <h3 className="text-xl font-medium">Тишина</h3>
                <p className="text-base opacity-90">Форма, которая не кричит, а звучит</p>
              </div>
            </div>

            <div className="flex items-start">
              <span className="text-2xl mr-3">◼</span>
              <div>
                <h3 className="text-xl font-medium">Совершенство</h3>
                <p className="text-base opacity-90">Детали, заметные только при касании</p>
              </div>
            </div>
          </div>
        </div>

        {/* Кнопка в правом нижнем углу */}
        <div className="absolute right-4 lg:right-8 bottom-8">
          <a
            href="#contacts"
            onClick={() => trackEvent('hero_cta_click', { button: 'Достичь совершенства' })}
            className="inline-block bg-white/10 hover:bg-white/20 border border-white/30 text-white py-3 px-8 rounded-md transition-all duration-300 shadow-lg backdrop-blur-sm hover:backdrop-blur-md"
          >
            Достичь совершенства
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
