// Скрипт для настройки интеграций и функций Netlify

// Загружаем имя проекта для использования в конфигурации
const fs = require('fs');
const path = require('path');

// Пытаемся прочитать имя проекта из файла netlify-name.txt
let siteName = 'dmitriy-bogomolov-fly';
try {
  const nameFilePath = path.resolve(__dirname, 'netlify-name.txt');
  if (fs.existsSync(nameFilePath)) {
    siteName = fs.readFileSync(nameFilePath, 'utf8').trim();
    console.log(`Using site name from netlify-name.txt: ${siteName}`);
  }
} catch (error) {
  console.error('Error reading netlify-name.txt:', error);
}

// Функция для создания файла _redirects если он не существует
function ensureRedirectsFile() {
  const redirectsPath = path.resolve(__dirname, 'public', '_redirects');

  // Базовое содержимое файла редиректов
  const redirectsContent = `
# Редиректы и правила ревриайта для Netlify

# Админка должна правильно загружаться
/admin/*    /admin/index.html   200!

# Переадресация на HTTPS
http://${siteName}.netlify.app/* https://${siteName}.netlify.app/:splat 301!

# SPA: перенаправляем все запросы на index.html
/*    /index.html   200
`.trim();

  // Проверяем существует ли файл
  if (!fs.existsSync(redirectsPath)) {
    try {
      fs.writeFileSync(redirectsPath, redirectsContent);
      console.log('Created _redirects file');
    } catch (error) {
      console.error('Error creating _redirects file:', error);
    }
  }
}

// Функция для обновления sitemap.xml с актуальной датой
function updateSitemap() {
  const sitemapPath = path.resolve(__dirname, 'public', 'sitemap.xml');
  if (fs.existsSync(sitemapPath)) {
    try {
      let sitemapContent = fs.readFileSync(sitemapPath, 'utf8');

      // Обновляем дату в тегах lastmod
      const today = new Date().toISOString().split('T')[0];
      sitemapContent = sitemapContent.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

      // Обновляем URL в соответствии с именем сайта
      sitemapContent = sitemapContent.replace(/https:\/\/.*?\.netlify\.app/g, `https://${siteName}.netlify.app`);

      fs.writeFileSync(sitemapPath, sitemapContent);
      console.log('Updated sitemap.xml with current date and site name');
    } catch (error) {
      console.error('Error updating sitemap.xml:', error);
    }
  }
}

// Выполняем все функции
ensureRedirectsFile();
updateSitemap();

// Также можно добавить функцию для создания package.json или файлов конфигурации в будущем
console.log('Netlify configuration completed successfully!');
