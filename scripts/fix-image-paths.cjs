const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Функция для получения правильного пути к изображению
function getCorrectImagePath(imagePath, category) {
  if (!imagePath || typeof imagePath !== 'string') return imagePath;

  // Убираем ведущий слэш если есть
  const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;

  // Если путь уже правильный (содержит категорию), возвращаем как есть
  if (cleanPath.includes(`portfolio/${category}/`)) {
    return '/' + cleanPath;
  }

  // Если путь начинается с images/portfolio/, добавляем категорию
  if (cleanPath.startsWith('images/portfolio/')) {
    // Извлекаем имя файла
    const fileName = path.basename(cleanPath);
    return `/images/portfolio/${category}/${fileName}`;
  }

  // Если это просто имя файла, создаем полный путь
  const fileName = path.basename(cleanPath);
  return `/images/portfolio/${category}/${fileName}`;
}

// Функция для проверки существования файла
function checkImageExists(imagePath) {
  const fullPath = path.join(__dirname, '..', 'public', imagePath.startsWith('/') ? imagePath.slice(1) : imagePath);
  return fs.existsSync(fullPath);
}

// Функция для обработки одного markdown файла
function processMarkdownFile(filePath, category) {
  console.log(`\nОбрабатываем файл: ${filePath}`);

  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: markdownContent } = matter(content);

  let hasChanges = false;

  // Исправляем основное изображение
  if (data.image) {
    const correctedPath = getCorrectImagePath(data.image, category);
    if (correctedPath !== data.image) {
      console.log(`  Исправляем image: ${data.image} -> ${correctedPath}`);
      data.image = correctedPath;
      hasChanges = true;
    }

    // Проверяем существование
    if (!checkImageExists(data.image)) {
      console.warn(`  ⚠️ Изображение не найдено: ${data.image}`);
    }
  }

  // Исправляем массив изображений
  if (data.images && Array.isArray(data.images)) {
    const correctedImages = [];

    // Добавляем основное изображение в начало массива, если его там нет
    if (data.image) {
      correctedImages.push(data.image);
    }

    data.images.forEach(img => {
      if (typeof img === 'string') {
        const correctedPath = getCorrectImagePath(img, category);
        if (correctedPath !== img) {
          console.log(`  Исправляем images: ${img} -> ${correctedPath}`);
          hasChanges = true;
        }

        // Добавляем только если это не дубликат основного изображения
        if (correctedPath !== data.image) {
          correctedImages.push(correctedPath);
        }

        // Проверяем существование
        if (!checkImageExists(correctedPath)) {
          console.warn(`  ⚠️ Изображение не найдено: ${correctedPath}`);
        }
      } else if (img && typeof img === 'object' && img.image) {
        const correctedPath = getCorrectImagePath(img.image, category);
        if (correctedPath !== img.image) {
          console.log(`  Исправляем images[].image: ${img.image} -> ${correctedPath}`);
          hasChanges = true;
        }

        // Добавляем только если это не дубликат основного изображения
        if (correctedPath !== data.image) {
          correctedImages.push(correctedPath);
        }

        // Проверяем существование
        if (!checkImageExists(correctedPath)) {
          console.warn(`  ⚠️ Изображение не найдено: ${correctedPath}`);
        }
      }
    });

    data.images = correctedImages;
  } else if (data.image) {
    // Если массив images отсутствует, создаем его с основным изображением
    data.images = [data.image];
    hasChanges = true;
    console.log(`  Создаем массив images с основным изображением`);
  }

  // Сохраняем файл если были изменения
  if (hasChanges) {
    const newContent = matter.stringify(markdownContent, data);
    fs.writeFileSync(filePath, newContent);
    console.log(`  ✅ Файл обновлен`);
  } else {
    console.log(`  ✨ Изменения не требуются`);
  }
}

// Функция для обработки всех файлов в категории
function processCategory(categoryPath, categoryName) {
  console.log(`\n📁 Обрабатываем категорию: ${categoryName}`);

  if (!fs.existsSync(categoryPath)) {
    console.log(`  Папка не найдена: ${categoryPath}`);
    return;
  }

  const files = fs.readdirSync(categoryPath);
  const markdownFiles = files.filter(file => file.endsWith('.md'));

  console.log(`  Найдено файлов: ${markdownFiles.length}`);

  markdownFiles.forEach(file => {
    const filePath = path.join(categoryPath, file);
    processMarkdownFile(filePath, categoryName);
  });
}

// Основная функция
function main() {
  console.log('🚀 Начинаем исправление путей к изображениям...\n');

  const portfolioDir = path.join(__dirname, '..', 'src', 'data', 'portfolio');

  // Получаем список всех категорий
  const categories = fs.readdirSync(portfolioDir).filter(item => {
    const itemPath = path.join(portfolioDir, item);
    return fs.statSync(itemPath).isDirectory();
  });

  console.log('Найденные категории:', categories);

  // Обрабатываем каждую категорию
  categories.forEach(category => {
    const categoryPath = path.join(portfolioDir, category);
    processCategory(categoryPath, category);
  });

  console.log('\n✅ Обработка завершена!');
}

// Запускаем скрипт
if (require.main === module) {
  main();
}

module.exports = { main, processMarkdownFile, getCorrectImagePath };
