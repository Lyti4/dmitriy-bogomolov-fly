import { useState, useRef, useEffect } from 'react';
import OptimizedImage from './OptimizedImage';

interface ImageGalleryProps {
  images: string[];
  alt: string;
  onImageClick?: (index: number) => void;
  className?: string;
  title?: string;
}

const ImageGallery = ({ images, alt, onImageClick, className = '', title }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMainImageLoaded, setIsMainImageLoaded] = useState(false);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // Автоскролл к выбранной миниатюре
  useEffect(() => {
    if (thumbnailsRef.current) {
      const thumbnailElement = thumbnailsRef.current.children[currentIndex] as HTMLElement;
      if (thumbnailElement) {
        thumbnailElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        });
      }
    }
  }, [currentIndex]);

  if (!images || images.length === 0) {
    return (
      <div className={`bg-gray-200 rounded-lg flex items-center justify-center min-h-[300px] ${className}`}>
        <span className="text-gray-500">Нет изображений</span>
      </div>
    );
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    setIsMainImageLoaded(false);
  };

  const handleMainImageClick = () => {
    if (onImageClick) {
      onImageClick(currentIndex);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {/* Главное изображение */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden mb-4 group cursor-pointer"
           onClick={handleMainImageClick}>
        {/* Loader */}
        {!isMainImageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-blue-500"></div>
          </div>
        )}

        {/* Главное изображение - без обрезки, подстраивается под экран */}
        <div className="w-full" style={{ aspectRatio: 'auto' }}>
          <img
            src={images[currentIndex]}
            alt={`${alt} - ${currentIndex + 1}`}
            className={`w-full h-auto max-h-[70vh] object-contain transition-all duration-300 ${
              isMainImageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsMainImageLoaded(true)}
            onError={() => setIsMainImageLoaded(true)}
            draggable={false}
          />
        </div>

        {/* Overlay с информацией */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300">


          {/* Иконка увеличения */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
            </svg>
          </div>


        </div>
      </div>

      {/* Миниатюры - фиксированного размера */}
      {images.length > 1 && (
        <div
          ref={thumbnailsRef}
          className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
          style={{ scrollbarWidth: 'thin' }}
        >
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`flex-shrink-0 relative rounded-md overflow-hidden transition-all duration-200 ${
                index === currentIndex
                  ? 'ring-2 ring-blue-500 scale-105 shadow-lg'
                  : 'hover:scale-105 hover:shadow-md'
              }`}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-200">
                <OptimizedImage
                  src={image}
                  alt={`${alt} миниатюра ${index + 1}`}
                  className="w-full h-full"
                  objectFit="cover"
                  priority={index === currentIndex || index < 3}
                />
              </div>

              {/* Overlay для неактивных */}
              {index !== currentIndex && (
                <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-200" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
