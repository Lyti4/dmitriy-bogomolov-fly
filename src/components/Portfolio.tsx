import { Splide, SplideSlide } from '@splidejs/react-splide';
import { useState, useEffect, useMemo } from 'react';

import '@splidejs/splide/dist/css/splide.min.css';
import OptimizedImage from './OptimizedImage';

// Определение типов для элементов портфолио
interface PortfolioItem {
  id: number | string;
  category: string;
  title?: string;
  image?: string;
  images?: string[];
  description?: string;
}

// Функция предварительной загрузки изображений
const preloadImage = (url: string) => {
  const img = new Image();
  img.src = url;
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
    // Устанавливаем данные портфолио
    const hardcodedPortfolioItems: PortfolioItem[] = [
      {
        id: 1,
        category: 'proven',
        title: 'Кухня с островом - 5 лет использования',
        image: '/images/portfolio/kitchens/kyxnia10.jpg',
        description: 'То, что не раздражает и годами работает: кухня из массива дерева с островом, проверенная временем. Фасады и механизмы сохраняют свой первоначальный вид и функциональность.'
      },
      {
        id: 2,
        category: 'proven',
        title: 'Угловая кухня - 3 года эксплуатации',
        image: '/images/portfolio/kitchens/kyxnia3.jpg',
        description: 'Угловая кухня из массива дерева - сохраняет вид и функциональность на протяжении лет. Проверена интенсивным использованием в семье с детьми.'
      },
      {
        id: 3,
        category: 'proven',
        title: 'Встроенные шкафы - 4 года использования',
        image: '/images/portfolio/kitchens/kyxnia7.jpg',
        description: 'Встроенные шкафы из натурального дерева, которые выдерживают испытание временем и сохраняют первоначальный вид. Механизмы работают безупречно.'
      },
      {
        id: 4,
        category: 'kitchens',
        title: 'Практичность',
        image: '/images/portfolio/kitchens/kyxnia.jpg',
        description: 'Кухня выполнена в современном стиле, сочетающем светлые оттенки белого и серого. Практичность кухни подчеркивается наличием удобных выдвижных ящиков и корзин, которые позволяют эффективно использовать пространство. Светлая отделка и глянцевые поверхности создают ощущение простора и чистоты.'
      },
      // Группа: 3,4,5 объединены
      {
        id: 1001,
        category: 'kitchens',
        title: 'Современная кухня (серия 1)',
        images: [
          '/images/portfolio/kitchens/kyxnia3.jpg',
          '/images/portfolio/kitchens/kyxnia4.jpg',
          '/images/portfolio/kitchens/kyxnia5.jpg',
        ],
        description: 'Современная кухня: три ракурса одного изделия.'
      },
      // Группа: 6,7 объединены
      {
        id: 1002,
        category: 'kitchens',
        title: 'Современная кухня (серия 2)',
        images: [
          '/images/portfolio/kitchens/kyxnia6.jpg',
          '/images/portfolio/kitchens/kyxnia7.jpg',
        ],
        description: 'Современная кухня: два ракурса одного изделия.'
      },
      // Все остальные кухни — одиночные карточки
      {
        id: 101,
        category: 'kitchens',
        title: 'Кухня: отдельное фото 1',
        images: ['/images/portfolio/kitchens/kyxnia1.jpg'],
      },
      {
        id: 103,
        category: 'kitchens',
        title: 'Кухня: отдельное фото 3',
        images: ['/images/portfolio/kitchens/kyxnia8.jpg'],
      },
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
        id: 15,
        category: 'kitchens',
        title: 'Кухня с островом в современном стиле',
        image: '/images/portfolio/kitchens/kyxnia10.jpg',
        description: 'Кухня из натурального дерева'
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
      {
        id: 999,
        category: 'proven',
        title: 'Desk at a geometric wall',
        image: '/images/Desk_at_a_geometric_wall.jpg',
        description: 'Desk at a geometric wall (Unsplash)'
      },
      {
        id: 'vidGlav',
        category: 'proven',
        title: 'Видеогалерея: Кухня с фасадами из массива',
        image: '/images/portfolio/kitchens/vidGlav.jpg',
        description: 'Кухня с фасадами из массива дерева, выдержавшая испытание временем. Надежные механизмы, натуральные материалы и индивидуальный подход к проекту.'
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

    // Объединяем все элементы и преобразуем в стандартный формат
    const unifiedItems = [...hardcodedPortfolioItems, ...wardrobeGroups].map(item => ({
      ...item,
      images: item.images && item.images.length > 0 ? item.images : item.image ? [item.image] : [],
    }));

    // Устанавливаем состояние
    setPortfolioItems(unifiedItems);
    setIsLoading(false);
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
          {(item.images && item.images.length > 0 ? item.images : []).map((image: string, imgIndex: number) => (
            <SplideSlide key={`${item.id}-${image}-${imgIndex}`}>
              <OptimizedImage
                src={image}
                alt={item.title || 'Фото работы из портфолио'}
                className="w-full h-80"
                objectFit="cover"
                priority={index < 3}
                onClick={() => {
                  const imagesToShow = item.images && item.images.length > 0 ? item.images : [];
                  setSelectedImages(imagesToShow);
                  setSelectedImage(imagesToShow[0] || null);
                  setSelectedTitle(item.title ?? '');
                }}
                height={320}
              />
            </SplideSlide>
          ))}
        </Splide>
        {(item.title || item.description) && (
          <div className="p-4">
            {item.title && <div className="font-semibold text-lg mb-1">{item.title}</div>}
            {item.description && <div className="text-gray-600 text-sm">{item.description}</div>}
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
