declare module '@splidejs/react-splide' {
  import type { Options as SplideOptions } from '@splidejs/splide';
  import type { ReactNode } from 'react';

  export interface SplideProps {
    /**
     * The Splide configuration options.
     */
    options?: SplideOptions;

    /**
     * Splide events handler.
     */
    onMounted?: () => void;
    onReady?: () => void;
    onMove?: (splide: unknown, newIndex: number) => void;
    onMoved?: (splide: unknown, newIndex: number, prevIndex: number, dest: unknown) => void;
    onDrag?: (splide: unknown) => void;
    onDragged?: (splide: unknown) => void;
    onVisible?: (splide: unknown) => void;
    onHidden?: (splide: unknown) => void;
    // Добавьте другие типизированные события по мере необходимости

    /**
     * Custom class name for the root element.
     */
    className?: string;

    /**
     * Allow other properties that могут быть переданы как DOM атрибуты
     */
    [key: string]: unknown;

    /**
     * Children nodes.
     */
    children?: ReactNode;
  }

  export interface SplideSlideProps {
    /**
     * Custom class name for the slide element.
     */
    className?: string;

    /**
     * Allow other properties that могут быть переданы как DOM атрибуты
     */
    [key: string]: unknown;

    /**
     * Children nodes.
     */
    children?: ReactNode;
  }

  export function Splide(props: SplideProps): JSX.Element;
  export function SplideSlide(props: SplideSlideProps): JSX.Element;
}

declare module '@splidejs/splide/dist/css/splide.min.css';
