import fs from 'fs';
import path from 'path';

const IMAGES_DIR = 'public/images/portfolio';

async function cleanupImages() {
  console.log('🧹 Начинаем очистку оставшихся изображений...\n');

  let cleaned = 0;
  let skipped = 0;

  // Очищаем файлы из корня portfolio
  console.log('📁 Очистка корня portfolio папки...');

  const rootItems = fs.readdirSync(IMAGES_DIR);

  for (const item of rootItems) {
    const itemPath = path.join(IMAGES_DIR, item);
    const stat = fs.statSync(itemPath);

    if (stat.isFile() && (item.endsWith('.jpg') || item.endsWith('.jpeg') || item.endsWith('.png'))) {
      try {
        fs.unlinkSync(itemPath);
        console.log(`✅ Удален: ${item}`);
        cleaned++;
      } catch (error) {
        console.error(`❌ Ошибка при удалении ${item}:`, error.message);
      }
    } else if (stat.isDirectory()) {
      console.log(`⏭️  Пропуск папки: ${item}`);
      skipped++;
    }
  }

  // Очищаем папку {{category}}
  const categoryDir = path.join(IMAGES_DIR, '{{category}}');
  if (fs.existsSync(categoryDir)) {
    console.log('\n📁 Очистка папки {{category}}...');

    const categoryItems = fs.readdirSync(categoryDir);

    for (const item of categoryItems) {
      const itemPath = path.join(categoryDir, item);

      try {
        fs.unlinkSync(itemPath);
        console.log(`✅ Удален: {{category}}/${item}`);
        cleaned++;
      } catch (error) {
        console.error(`❌ Ошибка при удалении {{category}}/${item}:`, error.message);
      }
    }

    // Удаляем саму папку {{category}} если она пустая
    try {
      fs.rmdirSync(categoryDir);
      console.log(`✅ Удалена пустая папка: {{category}}`);
    } catch (error) {
      console.log(`⚠️  Папка {{category}} не удалена (возможно, не пустая):`, error.message);
    }
  }

  console.log(`\n🎉 Очистка завершена!`);
  console.log(`   Удалено файлов: ${cleaned}`);
  console.log(`   Пропущено элементов: ${skipped}`);

  // Показываем итоговую структуру
  console.log(`\n📁 Итоговая структура папок:`);
  showDirectoryStructure(IMAGES_DIR);
}

// Функция для отображения структуры папок
function showDirectoryStructure(dir) {
  try {
    const items = fs.readdirSync(dir);

    for (const item of items) {
      const itemPath = path.join(dir, item);
      const stat = fs.statSync(itemPath);

      if (stat.isDirectory() && !item.startsWith('.')) {
        const files = fs.readdirSync(itemPath).filter(f => !f.endsWith('.md'));
        console.log(`   ${item}/ (${files.length} файлов)`);
      }
    }
  } catch (error) {
    console.error('Ошибка при отображении структуры:', error.message);
  }
}

// Запускаем скрипт
cleanupImages().catch(console.error);
