import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useState, useEffect, useMemo } from 'react';

import '@splidejs/splide/dist/css/splide.min.css';
import OptimizedImage from './OptimizedImage';
import ImageModal from './ImageModal';
import ImageGallery from './ImageGallery';
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
  featured?: boolean;
  date?: string;
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
  const [modalDescription, setModalDescription] = useState('');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState<Set<string | number>>(new Set());



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
          fullDescription: item.fullDescription,
          featured: item.featured || false,
          date: item.date
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

  // Фильтруем элементы по активной категории и сортируем (featured первые)
  const filteredItems = useMemo(() =>
    portfolioItems
      .filter(item => item.category === activeFilter)
      .sort((a, b) => {
        // Сначала featured элементы
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        // Затем по дате (новые первыми)
        if (a.date && b.date) {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
      }),
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
    setModalDescription('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalImages([]);
    setCurrentImageIndex(0);
    setModalDescription('');
    setModalTitle('');
  };

  const toggleCardExpansion = (itemId: string | number) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
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
      <div className="w-full">
        {/* Главная карточка на весь экран */}
        <AnimatedSection animation="fadeIn" className="relative h-[40vh] sm:h-[50vh] md:h-[70vh] lg:h-[80vh] min-h-[300px] sm:min-h-[350px] md:min-h-[600px] lg:min-h-[800px] overflow-hidden group w-full">
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
              }}
              className="[&_.splide__pagination]:!bottom-4 [&_.splide__pagination]:!z-30 [&_.splide__pagination__page]:!bg-white/50 [&_.splide__pagination__page.is-active]:!bg-white [&_.splide__arrow]:!bg-white/20 [&_.splide__arrow]:!border-none [&_.splide__arrow]:!z-30 [&_.splide__arrow]:backdrop-blur-sm [&_.splide__arrow]:hover:!bg-white/40"
              >
                {mainImages.map((image: string, imgIndex: number) => (
                  <SplideSlide key={`main-${mainItem.id}-${imgIndex}`}>
                    <div className="relative h-full">
                      <OptimizedImage
                        src={image}
                        alt={mainItem.title || 'Главный проект интерьера'}
                        className="w-full h-full"
                        objectFit="cover"
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


          </div>

          {/* Контент поверх изображения - мобильная версия (нижний левый угол) */}
          <div className="absolute bottom-8 left-4 z-20 block md:hidden">
            <div className="max-w-xs">
              {mainItem.title && (
                <h3 className="text-sm font-bold mb-1 text-white drop-shadow-2xl">
                  {mainItem.title}
                </h3>
              )}
              {(mainItem.fullDescription || mainItem.description) && (
                <div
                  className="text-xs leading-relaxed text-white line-clamp-2 [&_*]:!text-white [&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_p]:!text-white [&_li]:!text-white [&_strong]:!text-white [&_em]:!text-white drop-shadow-lg"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(mainItem.fullDescription || mainItem.description || '')
                  }}
                />
              )}
            </div>
          </div>

          {/* Контент поверх изображения - десктопная версия (нижний левый угол) */}
          <div className="absolute bottom-6 left-6 z-20 hidden md:block">
            <div className="max-w-md">
              {mainItem.title && (
                <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-white drop-shadow-2xl">
                  {mainItem.title}
                </h3>
              )}
              {(mainItem.fullDescription || mainItem.description) && (
                <div
                  className="text-base lg:text-lg leading-relaxed text-white line-clamp-3 [&_*]:!text-white [&_h1]:!text-white [&_h2]:!text-white [&_h3]:!text-white [&_p]:!text-white [&_li]:!text-white [&_strong]:!text-white [&_em]:!text-white drop-shadow-lg"
                  dangerouslySetInnerHTML={{
                    __html: renderMarkdown(mainItem.fullDescription || mainItem.description || '')
                  }}
                />
              )}
            </div>
          </div>
        </AnimatedSection>
        {/* Карточки на полную ширину экрана */}
        {otherItems.length > 0 && (
          <div className="w-full px-4 md:px-8 py-4 mt-4">{/* Убрали container mx-auto чтобы растянуть на полную ширину */}

            <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:gap-6">
              {otherItems.map((item, index) => {
                const isExpanded = expandedCards.has(item.id);
                return (
                  <div key={`other-${item.id}-${index}`}
                       className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 group transform hover:-translate-y-1 h-full flex flex-col">
                    <div className="relative h-20 sm:h-32 md:h-40 lg:h-80 xl:h-[480px] overflow-hidden flex-shrink-0 cursor-pointer"
                         onClick={() => openModal(item, 0)}>
                      <OptimizedImage
                        src={item.image || (item.images && item.images[0]) || ''}
                        alt={item.title || 'Проект интерьера'}
                        className="w-full h-full transition-transform duration-500 group-hover:scale-105"
                        objectFit="cover"
                        priority={index < 3}
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                      <div className="absolute top-1 right-1 sm:top-2 sm:right-2 bg-white/90 backdrop-blur-sm rounded-full p-1 sm:p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <svg className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </div>
                    </div>

                    <div className="p-2 sm:p-3 lg:p-4 flex-grow flex flex-col">
                      <div className="flex justify-between items-start mb-1 sm:mb-2">
                        {item.title && (
                          <h4 className="font-semibold text-xs sm:text-sm lg:text-base text-black transition-colors flex-grow line-clamp-2">
                            {item.title}
                          </h4>
                        )}
                        {(item.fullDescription || item.description) && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCardExpansion(item.id);
                            }}
                            className="ml-1 sm:ml-2 p-1 rounded-full hover:bg-gray-100 transition-colors duration-200 flex-shrink-0"
                          >
                            <svg
                              className={`w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-gray-600 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        )}
                      </div>

                      {(item.fullDescription || item.description) && (
                        <div
                          className={`text-black text-xs sm:text-sm leading-relaxed transition-all duration-300 overflow-hidden ${
                            isExpanded ? 'max-h-96' : 'max-h-8 sm:max-h-12 lg:max-h-16'
                          } ${isExpanded ? '' : 'line-clamp-2 sm:line-clamp-3'}`}
                          dangerouslySetInnerHTML={{
                            __html: renderMarkdown(item.fullDescription || item.description || '')
                          }}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
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
        className="group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 bg-white h-full flex flex-col"
      >
        <div className="relative overflow-hidden flex-shrink-0">
          <ImageGallery
            images={allImages}
            alt={item.title || 'Фото работы из портфолио'}
            onImageClick={(imgIndex) => openModal(item, imgIndex)}
            title={item.title}
            className="h-auto"
          />
        </div>

        {(item.title || item.fullDescription || item.description) && (
          <div className="p-4 md:p-6 flex-grow flex flex-col">
            {item.title && (
              <h3 className="font-semibold text-lg mb-2 text-black transition-colors line-clamp-2">
                {item.title}
              </h3>
            )}
            {(item.fullDescription || item.description) && (
              <div
                className="text-black text-sm prose prose-sm max-w-none line-clamp-3 flex-grow"
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
        description={modalDescription}
      />
    </section>
  );
};

export default Portfolio;
