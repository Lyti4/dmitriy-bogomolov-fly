declare module '@splidejs/react-splide' {
  import { ReactNode } from 'react';

  export interface SplideOptions {
    type?: 'slide' | 'loop' | 'fade';
    gap?: string | number;
    arrows?: boolean;
    pagination?: boolean;
    height?: number | string;
    width?: number | string;
    perPage?: number;
    perMove?: number;
    autoplay?: boolean;
    interval?: number;
    pauseOnHover?: boolean;
    pauseOnFocus?: boolean;
    resetProgress?: boolean;
    drag?: boolean;
    snap?: boolean;
    keyboard?: boolean;
    wheel?: boolean;
    releaseWheel?: boolean;
    trimSpace?: boolean;
    focus?: string | number;
    isNavigation?: boolean;
    updateOnMove?: boolean;
    classes?: {
      root?: string;
      slider?: string;
      track?: string;
      list?: string;
      slide?: string;
      clone?: string;
      arrows?: string;
      arrow?: string;
      prev?: string;
      next?: string;
      pagination?: string;
      page?: string;
    };
    breakpoints?: {
      [key: number]: SplideOptions;
    };
  }

  export interface SplideProps {
    options?: SplideOptions;
    className?: string;
    children?: ReactNode;
    onMounted?: (splide: any) => void;
    onMove?: (newIndex: number, prevIndex: number, destIndex: number) => void;
    onMoved?: (newIndex: number, prevIndex: number, destIndex: number) => void;
  }

  export interface SplideSlideProps {
    className?: string;
    children?: ReactNode;
  }

  export const Splide: React.FC<SplideProps>;
  export const SplideSlide: React.FC<SplideSlideProps>;
}
