import { useState, useEffect, useRef } from 'react';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  projectTitle?: string;
}

const ImageModal = ({ isOpen, onClose, images, currentIndex, onIndexChange, projectTitle }: ImageModalProps) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [touchEnd, setTouchEnd] = useState<{ x: number; y: number } | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Minimum distance for swipe
  const minSwipeDistance = 50;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsImageLoaded(false);
    } else {
      document.body.style.overflow = 'unset';
      setIsZoomed(false);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          navigatePrevious();
          break;
        case 'ArrowRight':
          navigateNext();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex]);

  const navigatePrevious = () => {
    if (currentIndex > 0) {
      onIndexChange(currentIndex - 1);
      setIsImageLoaded(false);
    }
  };

  const navigateNext = () => {
    if (currentIndex < images.length - 1) {
      onIndexChange(currentIndex + 1);
      setIsImageLoaded(false);
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distanceX = touchStart.x - touchEnd.x;
    const distanceY = touchStart.y - touchEnd.y;
    const isHorizontalSwipe = Math.abs(distanceX) > Math.abs(distanceY);

    if (isHorizontalSwipe && Math.abs(distanceX) > minSwipeDistance) {
      if (distanceX > 0) {
        navigateNext();
      } else {
        navigatePrevious();
      }
    }
  };

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      {/* Loading spinner */}
      {!isImageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
        </div>
      )}

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Title */}
      {projectTitle && (
        <div className="absolute top-4 left-4 z-50 p-3 rounded-lg bg-black/50 text-white backdrop-blur-sm">
          <h3 className="font-medium">{projectTitle}</h3>
          <p className="text-sm opacity-75">{currentIndex + 1} из {images.length}</p>
        </div>
      )}

      {/* Previous button */}
      {currentIndex > 0 && (
        <button
          onClick={navigatePrevious}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={navigateNext}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-50 p-3 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all hover:scale-110"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Main image */}
      <div className="relative w-full h-full flex items-center justify-center p-4">
        <img
          ref={imageRef}
          src={images[currentIndex]}
          alt={`${projectTitle || 'Изображение'} - ${currentIndex + 1}`}
          className={`max-w-full max-h-full object-contain cursor-pointer transition-all duration-300 ${
            isZoomed ? 'scale-150' : 'scale-100'
          } ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onClick={handleImageClick}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          onLoad={() => setIsImageLoaded(true)}
          draggable={false}
        />
      </div>

      {/* Zoom indicator */}
      <div className="absolute bottom-4 right-4 z-50 p-2 rounded-lg bg-black/50 text-white text-sm backdrop-blur-sm">
        {isZoomed ? '🔍 Нажмите для уменьшения' : '🔍 Нажмите для увеличения'}
      </div>

      {/* Image indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-50 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => onIndexChange(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      )}

      {/* Swipe instruction for mobile */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-50 text-white text-sm opacity-75 md:hidden">
        ← Свайпайте для навигации →
      </div>
    </div>
  );
};

export default ImageModal;
