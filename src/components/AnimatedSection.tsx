import { useState, useEffect, useRef } from 'react';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn';
  delay?: number;
  duration?: number;
  threshold?: number;
}

const AnimatedSection = ({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  duration = 600,
  threshold = 0.1
}: AnimatedSectionProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [delay, threshold]);

  const getAnimationClasses = () => {
    const baseClasses = `transition-all ease-out`;
    const durationClass = `duration-${duration}`;

    if (!isVisible) {
      switch (animation) {
        case 'fadeIn':
          return `${baseClasses} ${durationClass} opacity-0`;
        case 'slideUp':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`;
        case 'slideLeft':
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`;
        case 'slideRight':
          return `${baseClasses} ${durationClass} opacity-0 translate-x-8`;
        case 'scaleIn':
          return `${baseClasses} ${durationClass} opacity-0 scale-95`;
        default:
          return `${baseClasses} ${durationClass} opacity-0`;
      }
    } else {
      switch (animation) {
        case 'fadeIn':
          return `${baseClasses} ${durationClass} opacity-100`;
        case 'slideUp':
          return `${baseClasses} ${durationClass} opacity-100 translate-y-0`;
        case 'slideLeft':
          return `${baseClasses} ${durationClass} opacity-100 translate-x-0`;
        case 'slideRight':
          return `${baseClasses} ${durationClass} opacity-100 translate-x-0`;
        case 'scaleIn':
          return `${baseClasses} ${durationClass} opacity-100 scale-100`;
        default:
          return `${baseClasses} ${durationClass} opacity-100`;
      }
    }
  };

  return (
    <div
      ref={elementRef}
      className={`${getAnimationClasses()} ${className}`}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
