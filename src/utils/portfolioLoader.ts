// Instructions: Исправить загрузку markdown файлов для работы с Vite

import matter from 'gray-matter';

export interface PortfolioMarkdownItem {
  id: string;
  category: string;
  title: string;
  image?: string;
  images?: string[];
  description?: string;
  date?: string;
  featured?: boolean;
}

// Функция для загрузки всех markdown файлов из папки portfolio
export const loadPortfolioData = async (): Promise<PortfolioMarkdownItem[]> => {
  const portfolioItems: PortfolioMarkdownItem[] = [];

  try {
    console.log('Начинаем загрузку портфолио...');

    // Получаем список всех markdown файлов в папке src/data/portfolio
    const portfolioModules = import.meta.glob('/src/data/portfolio/*.md', {
      eager: true,
      query: '?raw',
      import: 'default'
    });

    console.log('Найдено модулей:', Object.keys(portfolioModules));

    for (const [path, content] of Object.entries(portfolioModules)) {
      try {
        console.log('Обрабатываем файл:', path);
        const rawContent = content as string;
        const { data, content: markdownContent } = matter(rawContent);

        // Извлекаем имя файла для использования как ID
        const fileName = path.split('/').pop()?.replace('.md', '') || '';

        // Обрабатываем массив изображений
        let processedImages: string[] = [];
        if (data.images && Array.isArray(data.images)) {
          processedImages = data.images.map((img: any) => {
            if (typeof img === 'string') {
              return img;
            } else if (img && img.image) {
              return img.image;
            }
            return '';
          }).filter(Boolean);
        } else if (data.image) {
          processedImages = [data.image];
        }

        const item: PortfolioMarkdownItem = {
          id: fileName,
          category: data.category || 'uncategorized',
          title: data.title || fileName,
          image: data.image,
          images: processedImages,
          description: data.description || markdownContent || '',
          date: data.date,
          featured: data.featured || false
        };

        console.log('Добавлен элемент:', item);
        portfolioItems.push(item);
      } catch (error) {
        console.warn(`Ошибка при загрузке файла ${path}:`, error);
      }
    }

    console.log('Всего загружено элементов:', portfolioItems.length);
  } catch (error) {
    console.error('Ошибка при загрузке портфолио:', error);
  }

  return portfolioItems;
};
