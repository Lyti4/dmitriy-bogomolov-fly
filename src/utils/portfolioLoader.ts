// Instructions: Исправить загрузку markdown файлов для работы с Vite

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

// Простой парсер frontmatter без dependencies
const parseFrontmatter = (content: string) => {
  const lines = content.split('\n');
  let inFrontmatter = false;
  let frontmatterEnd = 0;
  const data: Record<string, any> = {};

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line === '---') {
      if (!inFrontmatter) {
        inFrontmatter = true;
        continue;
      } else {
        frontmatterEnd = i;
        break;
      }
    }

    if (inFrontmatter && line) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.substring(0, colonIndex).trim();
        let value = line.substring(colonIndex + 1).trim();

        // Убираем кавычки
        if (value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        if (value.startsWith('"') && value.endsWith('"')) {
          value = value.slice(1, -1);
        }

        // Обработка булевых значений и присвоение значения
        if (value === 'true') {
          data[key] = true;
        } else if (value === 'false') {
          data[key] = false;
        } else {
          data[key] = value;
        }
      }
    }
  }

  // Обработка массива images (улучшенная для поддержки разных форматов)
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.includes('images:')) {
      const images: string[] = [];
      for (let j = i + 1; j < lines.length; j++) {
        const imgLine = lines[j].trim();

        // Поддержка формата "- image: /path/to/image.jpg"
        if (imgLine.startsWith('- image:')) {
          let imgPath = imgLine.replace('- image:', '').trim();
          if (imgPath.startsWith("'") && imgPath.endsWith("'")) {
            imgPath = imgPath.slice(1, -1);
          }
          if (imgPath.startsWith('"') && imgPath.endsWith('"')) {
            imgPath = imgPath.slice(1, -1);
          }
          images.push(imgPath);
        }
        // Поддержка формата "- /path/to/image.jpg"
        else if (imgLine.startsWith('- ') && !imgLine.includes(':')) {
          let imgPath = imgLine.replace('- ', '').trim();
          if (imgPath.startsWith("'") && imgPath.endsWith("'")) {
            imgPath = imgPath.slice(1, -1);
          }
          if (imgPath.startsWith('"') && imgPath.endsWith('"')) {
            imgPath = imgPath.slice(1, -1);
          }
          images.push(imgPath);
        }
        // Если строка не начинается с пробела или тире и не пустая - конец массива
        else if (imgLine && !imgLine.startsWith(' ') && !imgLine.startsWith('-')) {
          break;
        }
      }
      if (images.length > 0) {
        data.images = images;
      }
      break;
    }
  }

  const markdownContent = lines.slice(frontmatterEnd + 1).join('\n').trim();

  return { data, content: markdownContent };
};

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
        const { data, content: markdownContent } = parseFrontmatter(rawContent);

        // Извлекаем имя файла для использования как ID
        const fileName = path.split('/').pop()?.replace('.md', '') || '';

        // Обрабатываем массив изображений
        let processedImages: string[] = [];
        if (data.images && Array.isArray(data.images)) {
          processedImages = data.images.filter(Boolean);
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

        console.log('Добавлен элемент:', {
          ...item,
          imagesCount: processedImages.length,
          hasGallery: processedImages.length > 1
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
