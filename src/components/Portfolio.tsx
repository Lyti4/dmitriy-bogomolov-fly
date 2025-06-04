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
      pagination: true,
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

  // Рендер элемента портфолио
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
        className="group overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-500 bg-white"
      >
        <div className="relative overflow-hidden">
          {allImages.length > 1 ? (
            <Splide options={getSliderOptions()}>
              {allImages.map((image: string, imgIndex: number) => (
                <SplideSlide key={`${item.id}-${image}-${imgIndex}`}>
                  <div className="relative cursor-pointer group/image">
                    <OptimizedImage
                      src={image}
                      alt={item.title || 'Фото работы из портфолио'}
                      className="w-full h-64 md:h-80 transition-transform duration-500 group-hover/image:scale-105"
                      objectFit="cover"
                      priority={index < 3}
                      onClick={() => openModal(item, imgIndex)}
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
            <div className="relative cursor-pointer group/image">
              <OptimizedImage
                src={allImages[0]}
                alt={item.title || 'Фото работы из портфолио'}
                className="w-full h-64 md:h-80 transition-transform duration-500 group-hover/image:scale-105"
                objectFit="cover"
                priority={index < 3}
                onClick={() => openModal(item, 0)}
              />
              <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300" />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover/image:opacity-100 transition-opacity duration-300">
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          ) : (
            <div className="w-full h-64 md:h-80 bg-gray-200 flex items-center justify-center">
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
      <div className="container mx-auto px-4">
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

        {filteredItems.length === 0 ? (
          <AnimatedSection animation="fadeIn" className="text-center py-12">
            <div className="text-gray-500 text-lg">
              Для категории "{filters.find(f => f.id === activeFilter)?.name}" пока нет работ.
            </div>
          </AnimatedSection>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredItems.map((item, index) => renderPortfolioItem(item, index))}
          </div>
        )}
      </div>

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
