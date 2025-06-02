import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useState, useEffect, useMemo } from 'react';

import '@splidejs/splide/dist/css/splide.min.css';
import OptimizedImage from './OptimizedImage';
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

// Функция предварительной загрузки изображений
const preloadImage = (url: string) => {
  const img = new Image();
  img.src = url;
};

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string>('');
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });

  // Закрытие модального окна при нажатии ESC
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleEscKey);

    // Блокировка прокрутки страницы при открытом модальном окне
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [selectedImage]);

  // Предварительная загрузка изображений в модальном окне
  useEffect(() => {
    if (!selectedImage || !selectedImages.length) return;

    const currentIndex = selectedImages.indexOf(selectedImage);
    [-2, -1, 1, 2].forEach((offset) => {
      const indexToPreload = (currentIndex + offset + selectedImages.length) % selectedImages.length;
      preloadImage(selectedImages[indexToPreload]);
    });
  }, [selectedImage, selectedImages]);

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

        // Жестко прописанные элементы (сохраняем существующие)
        const hardcodedPortfolioItems: PortfolioItem[] = [
          {
            id: 132,
            category: 'kitchens',
            image: '/images/portfolio/kitchens/kyxnia2.jpg',
            description: 'Кухня выполнена в светлых тонах, что создает ощущение простора и чистоты. Угловая планировка позволяет рационально использовать пространство. Наличие навесных шкафов над рабочей зоной увеличивает полезную площадь для хранения. Рабочая поверхность из HPL и кухонные элементы в светлом оттенке обеспечивают легкость в уборке. Освещение за счет точечных источников света и LED-полосы над рабочей зоной достаточное и равномерное. В целом кухня выглядит функциональной и удобной для повседневного использования.'
          },
          {
            id: 167,
            category: 'kitchens',
            image: '/images/portfolio/kitchens/kyxnia9.jpg',
            description: 'На фото современная кухня. Серые глянцевые фасады, детали из темного дерева, и светлая мраморная столешница создают стильный и лаконичный интерьер. Отсутствие лишних деталей и чёткость линий подчеркивают минималистский характер дизайна.'
          },
          {
            id: 9,
            category: 'bathroom',
            title: 'Современная тумба для ванной',
            image: '/images/portfolio/bathroom/Vanna.jpg',
            description: 'Тумба под раковину с матовыми фасадами и системой хранения'
          },
          {
            id: 10,
            category: 'bathroom',
            title: 'Тумба для ванной с ящиками',
            image: '/images/portfolio/bathroom/Vanna3.jpg',
            description: 'Тумба с удобными выдвижными ящиками и встроенной раковиной'
          },
          // Детская мебель
          {
            id: 'child1',
            category: 'children',
            title: 'Детская кровать-домик',
            images: ['/images/portfolio/children/bedhouse1.jpg'],
            description: 'Кровать-домик из массива дерева для детской комнаты.'
          },
          {
            id: 'child2',
            category: 'children',
            title: 'Детский письменный стол',
            images: ['/images/portfolio/children/desk1.jpg'],
            description: 'Удобный письменный стол для школьника с ящиками для хранения.'
          },
          {
            id: 'child3',
            category: 'children',
            title: 'Детский шкаф для одежды',
            images: ['/images/portfolio/children/wardrobe1.jpg'],
            description: 'Компактный шкаф для хранения одежды и игрушек.'
          },
          // Элементы хранения
          {
            id: 'storage1',
            category: 'storage',
            title: 'Система хранения в прихожей',
            images: ['/images/portfolio/storage/hallway1.jpg'],
            description: 'Встроенная система хранения для верхней одежды и обуви.'
          },
          {
            id: 'storage2',
            category: 'storage',
            title: 'Стеллаж для книг',
            images: ['/images/portfolio/storage/bookshelf1.jpg'],
            description: 'Открытый стеллаж для книг и декора.'
          },
          {
            id: 'storage3',
            category: 'storage',
            title: 'Комод с ящиками',
            images: ['/images/portfolio/storage/commode1.jpg'],
            description: 'Комод с выдвижными ящиками для хранения белья и аксессуаров.'
          }
        ];

        // Группы шкафов из wardrobeGroups
        const wardrobeGroups: PortfolioItem[] = [
          {
            id: 'garder1',
            category: 'cabinets',
            title: 'Гардероб 1',
            images: [
              '/images/portfolio/wardrobes/garder1_1.jpg',
              '/images/portfolio/wardrobes/garder1_2.jpg',
              '/images/portfolio/wardrobes/garder1_3.jpg',
              '/images/portfolio/wardrobes/garder1_4.jpg',
              '/images/portfolio/wardrobes/garder1_5.jpg',
            ],
          },
          {
            id: 'garder2',
            category: 'cabinets',
            title: 'Гардероб 2',
            images: [
              '/images/portfolio/wardrobes/garder2_1.jpg',
              '/images/portfolio/wardrobes/garder2_2.jpg',
              '/images/portfolio/wardrobes/garder2_3.jpg',
              '/images/portfolio/wardrobes/garder2_4.jpg',
            ],
          },
          {
            id: 'prix1',
            category: 'cabinets',
            title: 'Prix 1',
            images: [
              '/images/portfolio/wardrobes/prix1.jpg',
              '/images/portfolio/wardrobes/prix1_1.jpg',
              '/images/portfolio/wardrobes/prix1_2.jpg',
              '/images/portfolio/wardrobes/prix1_3.jpg',
              '/images/portfolio/wardrobes/prix1_4.jpg',
              '/images/portfolio/wardrobes/prix1_5.jpg',
              '/images/portfolio/wardrobes/prix1_6.jpg',
            ],
          },
          {
            id: 'prix2',
            category: 'cabinets',
            title: 'Prix 2',
            images: ['/images/portfolio/wardrobes/prix2.jpg'],
          },
          {
            id: 'shkaf1',
            category: 'wardrobes',
            title: 'Шкаф 1',
            images: ['/images/portfolio/wardrobes/shkaf.jpg'],
          },
          {
            id: 'shkaf2',
            category: 'wardrobes',
            title: 'Шкаф 2',
            images: ['/images/portfolio/wardrobes/shkaf1.jpg'],
          },
          {
            id: 'shkaf3',
            category: 'wardrobes',
            title: 'Шкаф 3',
            images: ['/images/portfolio/wardrobes/shkaf2.jpg'],
          },
          {
            id: 'shkaf4',
            category: 'wardrobes',
            title: 'Шкаф 4',
            images: [
              '/images/portfolio/wardrobes/shkaf3.jpg',
              '/images/portfolio/wardrobes/shkaf3_1.jpg',
            ],
          },
          // Добавляем стол из оригинального списка
          {
            id: 'stol',
            category: 'shelves',
            title: 'Письменный стол',
            description: 'Функциональный письменный стол для работы и учебы',
            images: ['/images/portfolio/wardrobes/stol.jpg'],
          }
        ];

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

  // Определяем количество колонок в зависимости от ширины экрана
  const _getColumnCount = () => {
    if (windowSize.width < 768) return 1;
    if (windowSize.width < 1024) return 2;
    return 3;
  };

  // Рендер элемента портфолио (используем обычный рендер вместо виртуализации)
  const renderPortfolioItem = (item: PortfolioItem, index: number) => {
    return (
      <div key={`${item.id}-${index}`} className="group overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <Splide options={{ type: 'loop', gap: '1rem', arrows: true, pagination: true, height: 320 }}>
          {(() => {
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
            return allImages.map((image: string, imgIndex: number) => (
            <SplideSlide key={`${item.id}-${image}-${imgIndex}`}>
              <OptimizedImage
                src={image}
                alt={item.title || 'Фото работы из портфолио'}
                className="w-full h-80"
                objectFit="cover"
                priority={index < 3}
                onClick={() => {
                  // Создаем тот же массив изображений для модального окна
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
                  setSelectedImages(allImages);
                  setSelectedImage(allImages[0] || null);
                  setSelectedTitle(item.title ?? '');
                }}
                height={320}
              />
            </SplideSlide>
            ));
          })()}
        </Splide>
        {(item.title || item.fullDescription || item.description) && (
          <div className="p-4">
            {item.title && <div className="font-semibold text-lg mb-1">{item.title}</div>}
            {(item.fullDescription || item.description) && (
              <div
                className="text-gray-600 text-sm prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(item.fullDescription || item.description || '')
                }}
              />
            )}
          </div>
        )}
      </div>
    );
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-16 text-center">Загрузка портфолио...</div>;
  }

  // Если элементов нет, показываем сообщение
  if (filteredItems.length === 0) {
    return (
      <section className="py-16" id="portfolio">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-4">
            Наши <span className="font-medium">работы</span>
          </h2>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-md transition-colors ${
                  activeFilter === filter.id
                    ? 'bg-[#5AAADF] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.name}
              </button>
            ))}
          </div>
          <div className="text-center text-gray-500">
            Для категории &quot;{filters.find(f => f.id === activeFilter)?.name}&quot; пока нет работ.
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16" id="portfolio">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-light text-center mb-4">
          Наши <span className="font-medium">работы</span>
        </h2>
        <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
          {activeFilter === 'proven'
            ? 'То, что не раздражает и годами работает'
            : 'Каждое изделие создаётся с заботой о деталях и индивидуальном подходе к клиенту'
          }
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-md transition-colors ${
                activeFilter === filter.id
                  ? 'bg-[#5AAADF] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.name}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => renderPortfolioItem(item, index))}
        </div>
      </div>

      {/* Модальное окно для просмотра увеличенного изображения */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <button
              className="absolute top-2 right-2 bg-white bg-opacity-80 text-gray-800 hover:bg-opacity-100 rounded-full w-10 h-10 flex items-center justify-center z-10"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Splide options={{
              type: 'loop',
              gap: '1rem',
              arrows: true,
              pagination: true,
              width: 'auto',
              height: '80vh'
            }}>
              {selectedImages.map((img: string, index: number) => (
                <SplideSlide key={`${img}-${index}`}>
                  <img
                    src={img}
                    alt={selectedTitle || 'Увеличенное фото работы'}
                    className="max-h-[80vh] w-auto mx-auto"
                  />
                </SplideSlide>
              ))}
            </Splide>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio;
