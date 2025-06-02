// Шаблон предпросмотра для портфолио
const PortfolioPreview = createClass({
  render: function() {
    const entry = this.props.entry;
    const title = entry.getIn(['data', 'title']) || '';
    const category = entry.getIn(['data', 'category']) || '';
    const description = entry.getIn(['data', 'description']) || '';
    let imageUrl = entry.getIn(['data', 'image']);
    let images = entry.getIn(['data', 'images']) || [];

    // Обработка изображений
    if (this.props.getAsset) {
      if (imageUrl) {
        imageUrl = this.props.getAsset(imageUrl).toString();
      }

      if (images && images.size > 0) {
        images = images.map(img => {
          const imgPath = img.get('image');
          return this.props.getAsset(imgPath).toString();
        });
      } else {
        images = [];
      }
    }

    // Если нет изображений в галерее, но есть основное изображение
    if (images.length === 0 && imageUrl) {
      images = [imageUrl];
    }

    // Перевод категорий
    const categoryLabels = {
      'kitchens': 'Кухни',
      'cabinets': 'Шкафы',
      'shelves': 'Тумбы/столы',
      'bathroom': 'Мебель для ванных',
      'proven': 'Проверено в быту'
    };

    // Класс для категории
    const categoryClass = `portfolio-category ${category}`;

    return h('div', {className: 'portfolio-item'},
      h('div', {className: 'portfolio-content'},
        h('h1', {className: 'portfolio-title'}, title),
        h('div', {className: categoryClass}, categoryLabels[category] || category),
        h('div', {className: 'portfolio-description'}, this.props.widgetFor('description')),

        // Галерея изображений
        h('div', {className: 'portfolio-gallery'},
          images.length > 0
            ? images.map((img, i) => h('img', {
                src: img,
                key: i,
                alt: `${title} - изображение ${i+1}`
              }))
            : h('div', {}, 'Нет изображений')
        )
      )
    );
  }
});

// Регистрируем шаблоны предпросмотра
if (window.CMS) {
  window.CMS.registerPreviewTemplate('portfolio', PortfolioPreview);
}
