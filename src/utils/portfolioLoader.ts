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
    // Получаем список всех markdown файлов в папке src/data/portfolio
    const portfolioModules = import.meta.glob('/src/data/portfolio/*.md', {
      query: '?raw',
      import: 'default'
    });

    for (const path in portfolioModules) {
      try {
        const content = await portfolioModules[path]() as string;
        const { data, content: markdownContent } = matter(content);

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

        portfolioItems.push(item);
      } catch (error) {
        console.warn(`Ошибка при загрузке файла ${path}:`, error);
      }
    }
  } catch (error) {
    console.error('Ошибка при загрузке портфолио:', error);
  }

  return portfolioItems;
};
