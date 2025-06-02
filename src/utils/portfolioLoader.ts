// Instructions: Исправить загрузку markdown файлов для работы с Vite

import matter from 'gray-matter';

export interface PortfolioMarkdownItem {
  id: string;
  category: string;
  title: string;
  image?: string;
  images?: string[];
  description?: string;
  body?: string;
  fullDescription?: string; // Объединенное описание
  date?: string;
  featured?: boolean;
}

// Функция для создания полного описания без обрезания
const createFullDescription = (description?: string, body?: string, markdownContent?: string): string => {
  const parts: string[] = [];

  // Добавляем краткое описание если есть
  if (description && description.trim()) {
    parts.push(description.trim());
  }

  // Добавляем body из frontmatter если есть
  if (body && body.trim()) {
    parts.push(body.trim());
  }

  // Добавляем markdown контент если есть
  if (markdownContent && markdownContent.trim()) {
    parts.push(markdownContent.trim());
  }

  // Объединяем все части с двойным переносом строки
  return parts.join('\n\n');
};

// Функция для загрузки всех markdown файлов из папки portfolio
export const loadPortfolioData = async (): Promise<PortfolioMarkdownItem[]> => {
  const portfolioItems: PortfolioMarkdownItem[] = [];

  try {
    console.log('Начинаем загрузку портфолио...');

    // Получаем список всех markdown файлов в папке src/data/portfolio и её подпапках
    const portfolioModules = import.meta.glob('/src/data/portfolio/**/*.md', {
      eager: true,
      query: '?raw',
      import: 'default'
    });

    console.log('Найдено модулей:', Object.keys(portfolioModules));

    for (const [path, content] of Object.entries(portfolioModules)) {
      try {
        console.log('Обрабатываем файл:', path);
        const rawContent = content as string;

        // Используем gray-matter для правильного парсинга frontmatter
        const { data, content: markdownContent } = matter(rawContent);

        // Извлекаем имя файла для использования как ID
        const fileName = path.split('/').pop()?.replace('.md', '') || '';

        // Обрабатываем массив изображений
        let processedImages: string[] = [];
        if (data.images && Array.isArray(data.images)) {
          processedImages = data.images
            .filter(img => img && typeof img === 'string' && img.trim().length > 0)
            .map(img => img.trim());
        } else if (data.image && typeof data.image === 'string') {
          processedImages = [data.image.trim()];
        }

        // Создаем полное описание без обрезания
        const fullDescription = createFullDescription(
          data.description,
          data.body,
          markdownContent
        );

        const item: PortfolioMarkdownItem = {
          id: fileName,
          category: data.category || 'uncategorized',
          title: data.title || fileName,
          image: data.image,
          images: processedImages,
          description: data.description, // Краткое описание
          body: data.body, // Body из frontmatter
          fullDescription, // Полное объединенное описание
          date: data.date,
          featured: data.featured || false
        };

        console.log('Добавлен элемент:', {
          ...item,
          imagesCount: processedImages.length,
          hasGallery: processedImages.length > 1,
          descriptionLength: fullDescription.length,
          hasFullDescription: fullDescription.length > 0
        });
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
