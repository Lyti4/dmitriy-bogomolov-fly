import { useState, useEffect, useRef } from 'react';

// Base64 SVG плейсхолдеры
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
  quality?: number;
  sizes?: string;
}

// Кэш для уже загруженных изображений
const imageCache = new Set<string>();

const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  objectFit = 'cover',
  priority = false,
  onClick,
  sizes
}: OptimizedImageProps) => {
  const [isLoaded, setIsLoaded] = useState(() => imageCache.has(src));
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState<string>(src || PLACEHOLDER_SVG);
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Нормализация пути
  useEffect(() => {
    setIsLoaded(false);
    setError(false);

    if (!src) {
      setImageSrc(PLACEHOLDER_SVG);
      return;
    }

    const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
    setImageSrc(normalizedSrc);
  }, [src]);

  const handleLoad = () => {
    setIsLoaded(true);
    imageCache.add(src);
  };

  const handleError = () => {
    console.error(`Ошибка загрузки изображения: ${imageSrc}`);
    setError(true);
    setImageSrc(ERROR_SVG);
  };

  // Ленивая загрузка через IntersectionObserver
  useEffect(() => {
    if (priority || !imageRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imageRef.current) {
            imageRef.current.src = imageSrc;
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px 200px 0px'
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [imageSrc, priority]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ width: width ? `${width}px` : '100%', height: height ? `${height}px` : 'auto' }}
    >
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
              strokeWidth={2}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 bg-red-50 flex items-center justify-center text-sm text-red-600">
          Изображение не найдено
        </div>
      )}

      <img
        ref={imageRef}
        src={priority ? imageSrc : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        sizes={sizes}
        decoding="async"
        style={{
          objectFit,
          width: '100%',
          height: '100%',
          opacity: isLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          cursor: onClick ? 'pointer' : 'default',
          willChange: 'opacity',
        }}
      />
    </div>
  );
};

export default OptimizedImage;
