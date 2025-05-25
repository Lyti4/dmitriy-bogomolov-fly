import { useState, useEffect } from 'react';

// Base64 encoded SVG placeholders
const PLACEHOLDER_SVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2UyZThmMCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiMxZTI5M2IiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPlBsYWNlaG9sZGVyPC90ZXh0Pjwvc3ZnPg==';
const ERROR_SVG = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2YxZjVmOSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IiM2NDc0OGIiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  onClick?: () => void;
}

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  objectFit = 'cover',
  priority = false,
  onClick
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [supportsWebP, setSupportsWebP] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(src || PLACEHOLDER_SVG);

  // Проверка поддержки WebP
  useEffect(() => {
    const checkWebPSupport = async () => {
      try {
        const webPTest = new Image();
        webPTest.onload = function() {
          setSupportsWebP(true);
        };
        webPTest.onerror = function() {
          setSupportsWebP(false);
        };
        webPTest.src = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
      } catch (_e) {
        setSupportsWebP(false);
      }
    };

    checkWebPSupport();
  }, []);

  // Устанавливаем источник изображения при изменении src
  useEffect(() => {
    setIsLoaded(false);
    setError(false);

    if (!src) {
      setImageSrc(PLACEHOLDER_SVG);
      return;
    }

    // Replace formattedSrc assignment to add leading slash if missing
    const formattedSrc = src.startsWith('/') ? src : `/${src}`;

    // Если путь к файлу включает расширение файла и браузер поддерживает WebP
    if (supportsWebP && formattedSrc.match(/\.(jpe?g|png)$/i)) {
      // В реальном проекте здесь могли бы использовать WebP версию
      // setImageSrc(formattedSrc.replace(/\.(jpe?g|png)$/i, '.webp'));
      setImageSrc(formattedSrc);
    } else {
      setImageSrc(formattedSrc);
    }
  }, [src, supportsWebP]);

  const handleImageLoaded = () => {
    setIsLoaded(true);
  };

  const handleImageError = () => {
    // eslint-disable-next-line no-console
    console.error(`Failed to load image: ${imageSrc}`);
    setError(true);
    setImageSrc(ERROR_SVG);
  };

  // Если приоритетное изображение, не используем ленивую загрузку
  const loadingAttr = priority ? 'eager' : 'lazy';

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : 'auto' }}
    >
      {/* Плейсхолдер пока изображение загружается */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
          <svg
            className="w-12 h-12 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      <img
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loadingAttr}
        onLoad={handleImageLoaded}
        onError={handleImageError}
        onClick={onClick}
        style={{
          objectFit,
          width: '100%',
          height: '100%',
          opacity: isLoaded && !error ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          cursor: onClick ? 'pointer' : 'default'
        }}
      />
    </div>
  );
};

export default OptimizedImage;
