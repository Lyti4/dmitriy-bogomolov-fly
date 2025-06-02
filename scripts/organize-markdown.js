import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PORTFOLIO_DIR = 'src/data/portfolio';

async function organizeMarkdownFiles() {
  console.log('📁 Начинаем организацию файлов описаний по категориям...\n');

  // Получаем все .md файлы из корня папки portfolio
  const markdownFiles = fs.readdirSync(PORTFOLIO_DIR)
    .filter(file => file.endsWith('.md') && fs.statSync(path.join(PORTFOLIO_DIR, file)).isFile())
    .map(file => path.join(PORTFOLIO_DIR, file));

  const categoryStats = {};
  let processed = 0;
  let errors = 0;

  // Анализируем каждый файл и группируем по категориям
  for (const filePath of markdownFiles) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const fileName = path.basename(filePath);

      let frontmatter;
      let content = '';

      // Парсинг frontmatter (поддержка разных форматов)
      if (fileContent.startsWith('---')) {
        const { data, content: markdownContent } = matter(fileContent);
        frontmatter = data;
        content = markdownContent;
      } else {
        // Парсим как YAML без разделителей
        const lines = fileContent.split('\n');
        frontmatter = {};
        let contentStartIndex = 0;

        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.trim() === '') continue;
          if (line.includes(':')) {
            const [key, ...valueParts] = line.split(':');
            const value = valueParts.join(':').trim();

            if (key.trim() === 'images') {
              contentStartIndex = i + 1;
              if (!frontmatter.images) frontmatter.images = [];
              continue;
            } else if (line.startsWith('  - ') && frontmatter.images) {
              const imageValue = line.replace('  - ', '').trim();
              if (imageValue.startsWith("'") || imageValue.startsWith('"')) {
                frontmatter.images.push(imageValue.slice(1, -1));
              } else {
                frontmatter.images.push(imageValue);
              }
              contentStartIndex = i + 1;
              continue;
            }

            if (value.startsWith("'") || value.startsWith('"')) {
              frontmatter[key.trim()] = value.slice(1, -1);
            } else {
              frontmatter[key.trim()] = value;
            }
            contentStartIndex = i + 1;
          } else {
            break;
          }
        }

        content = lines.slice(contentStartIndex).join('\n').trim();
      }

      const category = frontmatter.category;

      if (!category) {
        console.log(`⚠️  ${fileName}: категория не найдена, пропускаем`);
        continue;
      }

      // Статистика по категориям
      if (!categoryStats[category]) {
        categoryStats[category] = [];
      }
      categoryStats[category].push(fileName);

      // Создаем папку категории если её нет
      const categoryDir = path.join(PORTFOLIO_DIR, category);
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
        console.log(`📁 Создана папка: ${category}/`);
      }

      // Обновляем пути к изображениям
      const updatedFrontmatter = { ...frontmatter };

      if (updatedFrontmatter.image) {
        updatedFrontmatter.image = updateImagePath(updatedFrontmatter.image);
      }

      if (updatedFrontmatter.images && Array.isArray(updatedFrontmatter.images)) {
        updatedFrontmatter.images = updatedFrontmatter.images.map(img => {
          if (typeof img === 'string') {
            return updateImagePath(img);
          } else if (img && img.image) {
            return { ...img, image: updateImagePath(img.image) };
          }
          return img;
        });
      }

      // Создаем новый контент файла
      const updatedContent = matter.stringify(content, updatedFrontmatter);

      // Записываем файл в папку категории
      const newFilePath = path.join(categoryDir, fileName);
      fs.writeFileSync(newFilePath, updatedContent);

      console.log(`✅ ${fileName} → ${category}/`);
      processed++;

    } catch (error) {
      console.error(`❌ Ошибка при обработке ${path.basename(filePath)}:`, error.message);
      errors++;
    }
  }

  console.log(`\n📊 Статистика обработки:`);
  console.log(`   Обработано файлов: ${processed}`);
  console.log(`   Ошибок: ${errors}`);

  console.log(`\n📁 Распределение по категориям:`);
  for (const [category, files] of Object.entries(categoryStats)) {
    console.log(`   ${category}: ${files.length} файлов (${files.join(', ')})`);
  }

  // Удаляем оригинальные файлы из корня
  console.log(`\n🗑️  Удаляем оригинальные файлы из корня...`);
  let deleted = 0;

  for (const filePath of markdownFiles) {
    try {
      fs.unlinkSync(filePath);
      console.log(`✅ Удален: ${path.basename(filePath)}`);
      deleted++;
    } catch (error) {
      console.error(`❌ Ошибка при удалении ${path.basename(filePath)}:`, error.message);
    }
  }

  console.log(`\n🎉 Организация завершена!`);
  console.log(`   Перемещено: ${processed} файлов`);
  console.log(`   Удалено из корня: ${deleted} файлов`);

  // Показываем итоговую структуру
  console.log(`\n📁 Итоговая структура src/data/portfolio:`);
  showDirectoryStructure(PORTFOLIO_DIR);
}

// Функция для обновления пути к изображению
function updateImagePath(imagePath) {
  if (!imagePath || typeof imagePath !== 'string') return imagePath;

  // Убираем ведущие слеши
  const cleanPath = imagePath.replace(/^\/+/, '');

  // Если путь уже правильный (начинается с images/portfolio), возвращаем как есть
  if (cleanPath.startsWith('images/portfolio/')) {
    return '/' + cleanPath;
  }

  // Если путь начинается с public/, убираем public/
  if (cleanPath.startsWith('public/')) {
    return '/' + cleanPath.replace('public/', '');
  }

  // Если это просто имя файла, пытаемся найти его в правильной папке
  const fileName = path.basename(cleanPath);

  // Возвращаем путь как есть, если уже корректный
  return imagePath;
}

// Функция для отображения структуры папок
function showDirectoryStructure(dir) {
  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory() && !item.startsWith('.') && !item.startsWith('public')) {
        const files = fs.readdirSync(itemPath).filter(f => f.endsWith('.md'));
        console.log(`   ${item}/ (${files.length} .md файлов)`);
      }
    }
  } catch (error) {
    console.error('Ошибка при отображении структуры:', error.message);
  }
}

// Запускаем скрипт
organizeMarkdownFiles().catch(console.error);
