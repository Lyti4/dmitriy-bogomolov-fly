import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PORTFOLIO_DIR = 'src/data/portfolio';
const IMAGES_DIR = 'public/images/portfolio';

async function organizeImages() {
  console.log('🎯 Начинаем организацию изображений по категориям...\n');

  // Получаем все .md файлы из папки портфолио
  const portfolioFiles = fs.readdirSync(PORTFOLIO_DIR)
    .filter(file => file.endsWith('.md'))
    .map(file => path.join(PORTFOLIO_DIR, file));

  const imageMovements = new Map(); // image path -> target category
  const processedFiles = [];

  // Анализируем каждый файл описания проекта
  for (const filePath of portfolioFiles) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');

      let frontmatter;

      // Проверяем, есть ли frontmatter разделители
      if (fileContent.startsWith('---')) {
        const { data } = matter(fileContent);
        frontmatter = data;
      } else {
        // Парсим как YAML без разделителей
        const lines = fileContent.split('\n');
        frontmatter = {};

        for (const line of lines) {
          if (line.trim() === '') continue;
          if (line.includes(':')) {
            const [key, ...valueParts] = line.split(':');
            const value = valueParts.join(':').trim();

            if (key.trim() === 'images' || key.trim() === 'image') {
              // Обработка изображений
              if (value.startsWith("'") || value.startsWith('"')) {
                frontmatter[key.trim()] = value.slice(1, -1);
              } else if (value.startsWith('[')) {
                // Попытка парсить как JSON массив
                try {
                  frontmatter[key.trim()] = JSON.parse(value);
                } catch {
                  frontmatter[key.trim()] = value;
                }
              } else {
                frontmatter[key.trim()] = value;
              }
            } else {
              // Обработка других полей
              if (value.startsWith("'") || value.startsWith('"')) {
                frontmatter[key.trim()] = value.slice(1, -1);
              } else {
                frontmatter[key.trim()] = value;
              }
            }
          } else if (line.startsWith('  - ') && frontmatter.images) {
            // Обработка элементов массива изображений
            if (!Array.isArray(frontmatter.images)) {
              frontmatter.images = [];
            }
            const imageValue = line.replace('  - ', '').trim();
            if (imageValue.startsWith("'") || imageValue.startsWith('"')) {
              frontmatter.images.push(imageValue.slice(1, -1));
            } else {
              frontmatter.images.push(imageValue);
            }
          }
        }
      }

      const fileName = path.basename(filePath);
      const category = frontmatter.category;

      if (!category) {
        console.log(`⚠️  ${fileName}: категория не найдена`);
        continue;
      }

      processedFiles.push({ fileName, category, frontmatter });

      // Собираем все изображения из frontmatter
      const allImages = [];

      // Главное изображение
      if (frontmatter.image) {
        allImages.push(frontmatter.image);
      }

      // Галерея изображений
      if (frontmatter.images && Array.isArray(frontmatter.images)) {
        for (const imageItem of frontmatter.images) {
          if (typeof imageItem === 'string') {
            allImages.push(imageItem);
          } else if (imageItem && imageItem.image) {
            allImages.push(imageItem.image);
          }
        }
      }

      // Обрабатываем каждое изображение
      for (const imagePath of allImages) {
        if (typeof imagePath !== 'string') continue;
        const cleanPath = imagePath.replace(/^\/+/, ''); // убираем ведущие слеши
        const imageName = path.basename(cleanPath);

        // Ищем это изображение в файловой системе
        const possiblePaths = [
          path.join(IMAGES_DIR, imageName),
          path.join(IMAGES_DIR, cleanPath),
          ...findImageInSubdirs(IMAGES_DIR, imageName)
        ];

        let foundPath = null;
        for (const possiblePath of possiblePaths) {
          if (fs.existsSync(possiblePath)) {
            foundPath = possiblePath;
            break;
          }
        }

        if (foundPath) {
          imageMovements.set(foundPath, category);
        } else {
          console.log(`❌ Изображение не найдено: ${imagePath} (файл: ${fileName})`);
        }
      }

      console.log(`✅ ${fileName}: категория "${category}", найдено ${allImages.length} изображений`);

    } catch (error) {
      console.error(`❌ Ошибка при обработке ${filePath}:`, error.message);
    }
  }

  console.log(`\n📊 Статистика обработки:`);
  console.log(`   Обработано файлов: ${processedFiles.length}`);
  console.log(`   Найдено изображений для перемещения: ${imageMovements.size}`);

  // Группируем по категориям для отчета
  const categoriesReport = {};
  for (const [imagePath, category] of imageMovements) {
    if (!categoriesReport[category]) categoriesReport[category] = [];
    categoriesReport[category].push(path.basename(imagePath));
  }

  console.log(`\n📁 Распределение по категориям:`);
  for (const [category, images] of Object.entries(categoriesReport)) {
    console.log(`   ${category}: ${images.length} изображений`);
  }

  // Выполняем перемещение изображений
  console.log(`\n🚀 Начинаем перемещение изображений...\n`);

  let moved = 0;
  let errors = 0;

  for (const [currentPath, targetCategory] of imageMovements) {
    try {
      const imageName = path.basename(currentPath);
      const targetDir = path.join(IMAGES_DIR, targetCategory);
      const targetPath = path.join(targetDir, imageName);

      // Создаем целевую директорию если её нет
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        console.log(`📁 Создана папка: ${targetDir}`);
      }

      // Проверяем, не находится ли файл уже в нужной папке
      if (currentPath === targetPath) {
        console.log(`⏭️  ${imageName}: уже в правильной папке (${targetCategory})`);
        continue;
      }

      // Если файл уже существует в целевой папке, пропускаем
      if (fs.existsSync(targetPath)) {
        console.log(`⚠️  ${imageName}: файл уже существует в ${targetCategory}, пропускаем`);
        continue;
      }

      // Перемещаем файл
      fs.renameSync(currentPath, targetPath);
      console.log(`✅ ${imageName}: ${path.dirname(currentPath)} → ${targetCategory}`);
      moved++;

    } catch (error) {
      console.error(`❌ Ошибка при перемещении ${currentPath}:`, error.message);
      errors++;
    }
  }

  console.log(`\n🎉 Организация завершена!`);
  console.log(`   Перемещено файлов: ${moved}`);
  console.log(`   Ошибок: ${errors}`);

  // Показываем итоговую структуру папок
  console.log(`\n📁 Итоговая структура папок:`);
  showDirectoryStructure(IMAGES_DIR);
}

// Функция для поиска изображения во всех подпапках
function findImageInSubdirs(dir, imageName) {
  const found = [];

  function searchRecursive(currentDir) {
    try {
      const items = fs.readdirSync(currentDir);

      for (const item of items) {
        const itemPath = path.join(currentDir, item);
        const stat = fs.statSync(itemPath);

        if (stat.isDirectory()) {
          searchRecursive(itemPath);
        } else if (item === imageName) {
          found.push(itemPath);
        }
      }
    } catch (error) {
      // Игнорируем ошибки доступа к папкам
    }
  }

  searchRecursive(dir);
  return found;
}

// Функция для отображения структуры папок
function showDirectoryStructure(dir) {
  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory() && !item.startsWith('.') && item !== '{{category}}') {
        const files = fs.readdirSync(itemPath).filter(f => !f.endsWith('.md'));
        console.log(`   ${item}/ (${files.length} файлов)`);
      }
    }
  } catch (error) {
    console.error('Ошибка при отображении структуры:', error.message);
  }
}

// Запускаем скрипт
organizeImages().catch(console.error);
