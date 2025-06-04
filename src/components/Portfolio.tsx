import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useState, useEffect, useMemo } from 'react';

import '@splidejs/splide/dist/css/splide.min.css';
import OptimizedImage from './OptimizedImage';
import ImageModal from './ImageModal';
import AnimatedSection from './AnimatedSection';
import { loadPortfolioData } from '../utils/portfolioLoader';

// Определение типов для элементов портфолио
interface PortfolioItem {
  id: number | string;
  category: string;
  title?: string;
  image?: string;
  images?: string[];
  description?: string;
  body?: string;
  fullDescription?: string;
}

// Функция предварительной загрузки изображений (не используется в данной версии)
// const preloadImage = (url: string) => {
//   const img = new Image();
//   img.src = url;
// };

// Простая функция для рендеринга markdown
const renderMarkdown = (text: string) => {
  return text
    .replace(/### (.*$)/gim, '<h3 class="font-semibold text-base mb-2 mt-3">$1</h3>')
    .replace(/## (.*$)/gim, '<h2 class="font-bold text-lg mb-3 mt-4">$1</h2>')
    .replace(/# (.*$)/gim, '<h1 class="font-bold text-xl mb-4 mt-5">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
    .replace(/\n\n/g, '</p><p class="mb-2">')
    .replace(/^(?!<[h|l|p])/gm, '<p class="mb-2">')
    .replace(/(<li.*<\/li>)/gs, '<ul class="list-disc list-inside mb-2">$1</ul>')
    .replace(/<\/p><p class="mb-2">(<[h])/g, '$1')
    .replace(/(<\/h[1-6]>)<p class="mb-2">/g, '$1');
};

const Portfolio = () => {
  const [activeFilter, setActiveFilter] = useState('proven');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState<string[]>([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalTitle, setModalTitle] = useState('');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  // Отслеживание изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Загружаем данные портфолио
    const loadData = async () => {
      try {
        // Загружаем данные из markdown файлов
        const markdownItems = await loadPortfolioData();
        console.log('Загружено из markdown:', markdownItems);

        // Преобразуем в формат PortfolioItem
        const portfolioFromMarkdown: PortfolioItem[] = markdownItems.map(item => ({
          id: item.id,
          category: item.category,
          title: item.title,
          image: item.image,
          images: item.images || [],
          description: item.description?.trim() || '',
          body: item.body,
          fullDescription: item.fullDescription
        }));

        const hardcodedPortfolioItems: PortfolioItem[] = [];
        const wardrobeGroups: PortfolioItem[] = [];

        // Объединяем все элементы: markdown данные + жестко прописанные + группы шкафов
        const allItems = [...portfolioFromMarkdown, ...hardcodedPortfolioItems, ...wardrobeGroups];

        // Преобразуем в стандартный формат
        const unifiedItems = allItems.map(item => ({
          ...item,
          images: item.images && item.images.length > 0 ? item.images : item.image ? [item.image] : [],
        }));

        // Устанавливаем состояние
        setPortfolioItems(unifiedItems);
        setIsLoading(false);
      } catch (error) {
        console.error('Ошибка при загрузке портфолио:', error);
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const filters = [
    { id: 'proven', name: 'Интерьеры' },
    { id: 'kitchens', name: 'Кухни' },
    { id: 'cabinets', name: 'Гардеробные' },
    { id: 'wardrobes', name: 'Шкафы' },
    { id: 'children', name: 'Детская мебель' },
    { id: 'shelves', name: 'Тумбы/столы' },
    { id: 'bathroom', name: 'Мебель для ванных' },
    { id: 'storage', name: 'Элементы хранения' }
  ];

  // Фильтруем элементы по активной категории и мемоизируем результат
  const filteredItems = useMemo(() =>
    portfolioItems.filter(item => item.category === activeFilter),
    [portfolioItems, activeFilter]
  );

  const openModal = (item: PortfolioItem, imageIndex: number = 0) => {
    // Создаем массив всех изображений для проекта
    const allImages = [];
    if (item.image && typeof item.image === 'string' && item.image.trim().length > 0) {
      allImages.push(item.image);
    }
    if (item.images && item.images.length > 0) {
      const additionalImages = item.images.filter(img =>
        img && typeof img === 'string' && img.trim().length > 0 && img !== item.image
      );
      allImages.push(...additionalImages);
    }

    setModalImages(allImages);
    setCurrentImageIndex(imageIndex);
    setModalTitle(item.title || 'Проект');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImages([]);
    setCurrentImageIndex(0);
    setModalTitle('');
  };

  // Улучшенные настройки слайдера для мобильных устройств
  const getSliderOptions = () => {
    const isMobile = windowSize.width < 768;
    return {
      type: 'loop' as const,
      gap: '0.5rem',
      arrows: !isMobile,
      pagination: !isMobile, // Скрываем точки на мобильных устройствах
      height: isMobile ? 250 : 320,
      perPage: 1,
      perMove: 1,
      wheel: true,
      wheelSleep: 300,
      drag: true,
      swipe: true,
      snap: true,
      speed: 400,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
    };
  };

  // Рендер специальной компоновки для категории "Интерьеры"
  const renderInteriorLayout = () => {
    if (filteredItems.length === 0) return null;

    const [mainItem, ...otherItems] = filteredItems;

    // Создаем массив изображений для главного элемента
    const mainImages = [];
    if (mainItem.image && typeof mainItem.image === 'string' && mainItem.image.trim().length > 0) {
      mainImages.push(mainItem.image);
    }
    if (mainItem.images && mainItem.images.length > 0) {
      const additionalImages = mainItem.images.filter(img =>
        img && typeof img === 'string' && img.trim().length > 0 && img !== mainItem.image
      );
      mainImages.push(...additionalImages);
    }

    return (
      <div className="w-full -mt-16">
        {/* Главная карточка на весь экран */}
        <AnimatedSection animation="fadeIn" className="relative h-[70vh] min-h-[500px] overflow-hidden group w-full">
          <div className="absolute inset-0">
            {mainImages.length > 1 ? (
              <Splide options={{
                type: 'loop',
                gap: '0rem',
                arrows: true,
                pagination: true,
                height: '100%',
                perPage: 1,
                perMove: 1,
                autoplay: true,
                interval: 5000,
                pauseOnHover: true,
                speed: 800,
                easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
              }}>
                {mainImages.map((image: string, imgIndex: number) => (
                  <SplideSlide key={`main-${mainItem.id}-${imgIndex}`}>
                    <div className="relative h-full">
                      <OptimizedImage
                        src={image}
                        alt={mainItem.title || 'Главный проект интерьера'}
                        className="w-full h-full"
                        objectFit="contain"
                        priority={true}
                        onClick={() => openModal(mainItem, imgIndex)}
                      />
                    </div>
                  </SplideSlide>
                ))}
              </Splide>
            ) : mainImages.length === 1 ? (
              <OptimizedImage
                src={mainImages[0]}
                alt={mainItem.title || 'Главный проект интерьера'}
                className="w-full h-full"
                objectFit="cover"
                priority={true}
                onClick={() => openModal(mainItem, 0)}
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Нет изображения</span>
              </div>
            )}

            {/* Иконка увеличения */}
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                 onClick={() => openModal(mainItem, 0)}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
              </svg>
            </div>

            {/* Индикатор количества фото */}
            {mainImages.length > 1 && (
              <div className="absolute top-4 left-4 bg-black/50 text-white text-sm px-3 py-1.5 rounded-full backdrop-blur-sm">
                📷 {mainImages.length}
              </div>
            )}
          </div>

          {/* Контент поверх изображения */}
          <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6">
            <div className="max-w-md bg-black/20 backdrop-blur-sm rounded-lg p-4">
              {mainItem.title && (
                <h3 className="text-lg md:text-xl font-bold mb-2 text-white">
                  {mainItem.title}
                </h3>
              )}
              {(mainItem.fullDescription || mainItem.description) && (
                <div
                  className="text-sm md:text-base leading-snug text-white line-clamp-2 [&_*]:!text-white [&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_p]:!text-white [&_li]:!text-white [&_strong]:!text-white [&_em]:!text-white"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(mainItem.fullDescription || mainItem.description || '')
                  }}
                />
              )}
            </div>
          </div>
        </AnimatedSection>

        {/* Остальные карточки в слайдере */}
        {otherItems.length > 0 && (
          <div className="container mx-auto px-4 lg:px-8 mt-8">
            <AnimatedSection animation="slideUp" delay={200}>
              <div className="mb-6">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2">
                  Другие проекты интерьеров
                </h3>
                <p className="text-gray-600">Нажмите на любой проект, чтобы увидеть детали</p>
              </div>

            <Splide options={{
              type: 'slide',
              gap: '0.5rem',
              arrows: true,
              pagination: false,
              perPage: 3,
              perMove: 1,
              breakpoints: {
                768: { perPage: 3, gap: '0.5rem' },
                1024: { perPage: 2, gap: '1rem' },
                1280: { perPage: 3, gap: '1.5rem' }
              },
              wheel: true,
              wheelSleep: 300,
              drag: true,
              swipe: true,
            }}>
              {otherItems.map((item, index) => (
                <SplideSlide key={`other-${item.id}-${index}`}>
                  <div className="bg-white overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group cursor-pointer transform hover:-translate-y-1"
                       onClick={() => openModal(item, 0)}>
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage
                        src={item.image || (item.images && item.images[0]) || ''}
                        alt={item.title || 'Проект интерьера'}
                        className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                        objectFit="contain"
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>

                      {/* Индикатор количества фото для слайдера */}
                      {item.images && item.images.length > 1 && (
                        <div className="absolute bottom-3 left-3 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                          📷 {item.images.length}
                        </div>
                      )}
                    </div>

                    <div className="p-4">
                      {item.title && (
                        <h4 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-[#8DB892] transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                      )}
                      {(item.fullDescription || item.description) && (
                        <div
                          className="text-gray-600 text-sm line-clamp-2"
                          dangerouslySetInnerHTML={{
                            __html: renderMarkdown(item.fullDescription || item.description || '')
                          }}
                        />
                      )}
                    </div>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
            </AnimatedSection>
          </div>
        )}
      </div>
    );
  };

  // Рендер элемента портфолио (для остальных категорий)
  const renderPortfolioItem = (item: PortfolioItem, index: number) => {
    // Создаем массив изображений: сначала главное изображение, потом галерея
    const allImages = [];
    if (item.image && typeof item.image === 'string' && item.image.trim().length > 0) {
      allImages.push(item.image);
    }
    if (item.images && item.images.length > 0) {
      const additionalImages = item.images.filter(img =>
        img && typeof img === 'string' && img.trim().length > 0 && img !== item.image
      );
      allImages.push(...additionalImages);
    }

    return (
      <AnimatedSection
        key={`${item.id}-${index}`}
        animation="slideUp"
        delay={index * 100}
        className="group overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-white"
      >
        <div className="relative overflow-hidden">
          {allImages.length > 1 ? (
            <Splide options={getSliderOptions()}>
              {allImages.map((image: string, imgIndex: number) => (
                <SplideSlide key={`${item.id}-${image}-${imgIndex}`}>
                  <div
                    className="relative cursor-pointer group/image"
                    onClick={() => openModal(item, imgIndex)}
                  >
                    <OptimizedImage
                      src={image}
                      alt={item.title || 'Фото работы из портфолио'}
                      className="w-full h-48 md:h-56 transition-transform duration-500 group-hover/image:scale-105"
                      objectFit="contain"
                      priority={index < 3}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300" />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                      <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </SplideSlide>
              ))}
            </Splide>
          ) : allImages.length === 1 ? (
            <div
              className="relative cursor-pointer group/image"
              onClick={() => openModal(item, 0)}
            >
              <OptimizedImage
                src={allImages[0]}
                alt={item.title || 'Фото работы из портфолио'}
                className="w-full h-48 md:h-56 transition-transform duration-500 group-hover/image:scale-105"
                objectFit="contain"
                priority={index < 3}
              />
              <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300" />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="w-full h-48 md:h-56 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">Нет изображения</span>
            </div>
          )}

          {/* Индикатор количества фото */}
          {allImages.length > 1 && (
            <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
              📷 {allImages.length}
            </div>
          )}
        </div>

        {(item.title || item.fullDescription || item.description) && (
          <div className="p-4 md:p-6">
            {item.title && (
              <h3 className="font-semibold text-lg mb-2 text-gray-900 group-hover:text-[#8DB892] transition-colors">
                {item.title}
              </h3>
            )}
            {(item.fullDescription || item.description) && (
              <div
                className="text-gray-600 text-sm prose prose-sm max-w-none line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(item.fullDescription || item.description || '')
                }}
              />
            )}
          </div>
        )}
      </AnimatedSection>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="inline-flex items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-[#8DB892] border-t-transparent"></div>
          <span className="text-lg text-gray-600">Загрузка портфолио...</span>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white" id="portfolio">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection animation="fadeIn" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light mb-4">
            Наши <span className="font-medium text-[#8DB892]">работы</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {activeFilter === 'proven'
              ? 'То, что не раздражает и годами работает'
              : 'Каждое изделие создаётся с заботой о деталях и индивидуальном подходе к клиенту'
            }
          </p>
        </AnimatedSection>

        {/* Улучшенные фильтры с мобильной адаптацией */}
        <AnimatedSection animation="slideUp" delay={200} className="mb-12">
          <div className="flex flex-wrap justify-center gap-2 md:gap-4">
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-3 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium transition-all duration-300 transform hover:scale-105 ${
                  activeFilter === filter.id
                    ? 'bg-[#8DB892] text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm border border-gray-200'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {filter.name}
              </button>
            ))}
          </div>
        </AnimatedSection>

        {activeFilter !== 'proven' && (
          filteredItems.length === 0 ? (
            <AnimatedSection animation="fadeIn" className="text-center py-12">
              <div className="text-gray-500 text-lg">
                Для категории "{filters.find(f => f.id === activeFilter)?.name}" пока нет работ.
              </div>
            </AnimatedSection>
          ) : (
            // Обычная сетка для остальных категорий
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredItems.map((item, index) => renderPortfolioItem(item, index))}
            </div>
          )
        )}
      </div>

      {/* Специальная компоновка для категории "Интерьеры" - вне контейнера */}
      {activeFilter === 'proven' && renderInteriorLayout()}

      {/* Улучшенное модальное окно */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        images={modalImages}
        currentIndex={currentImageIndex}
        onIndexChange={setCurrentImageIndex}
        projectTitle={modalTitle}
      />
    </section>
  );
};

export default Portfolio;
