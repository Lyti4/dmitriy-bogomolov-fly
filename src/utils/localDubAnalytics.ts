// Локальная реализация Dub Analytics
interface DubConfig {
  domainsConfig?: {
    site?: boolean;
    outbound?: boolean;
  };
  scriptProps?: {
    src?: string;
    defer?: boolean;
    [key: string]: any;
  };
  apiHost?: string;
  shortDomain?: string;
  attributionModel?: string;
  cookieOptions?: Record<string, any>;
  queryParam?: string;
}

// Локальная заглушка для аналитики
class LocalDubAnalytics {
  private config: DubConfig;
  private events: Array<{timestamp: number, event: string, data?: any}> = [];

  constructor(config: DubConfig = {}) {
    this.config = config;
    console.log('[Dub Analytics] Initialized in local mode');
  }

  track(event: string, properties?: Record<string, any>) {
    const eventData = {
      timestamp: Date.now(),
      event,
      data: properties
    };

    this.events.push(eventData);

    if (import.meta.env.DEV) {
      console.log('[Dub Analytics] Event tracked:', eventData);
    }
  }

  getEvents() {
    return this.events;
  }

  clearEvents() {
    this.events = [];
  }
}

// Глобальная функция инициализации (замена оригинального скрипта)
export function initLocalDubAnalytics(config: DubConfig = {}) {
  if (typeof window === 'undefined') return;

  // В development режиме используем локальную реализацию
  if (import.meta.env.DEV) {
    const analytics = new LocalDubAnalytics(config);

    // Добавляем в window для совместимости
    (window as any).dub = {
      track: analytics.track.bind(analytics),
      getEvents: analytics.getEvents.bind(analytics),
      clearEvents: analytics.clearEvents.bind(analytics)
    };

    console.log('[Dub Analytics] Local analytics initialized');
    return;
  }

  // В production режиме используем оригинальный код (без внешнего скрипта)
  const localAnalytics = new LocalDubAnalytics(config);

  // Создаем локальный API
  (window as any).dub = {
    track: (event: string, properties?: Record<string, any>) => {
      // Отправляем данные на ваш собственный endpoint вместо Dub
      if (config.apiHost) {
        fetch(`${config.apiHost}/analytics`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ event, properties, timestamp: Date.now() })
        }).catch(err => console.warn('[Local Analytics] Failed to send:', err));
      }

      localAnalytics.track(event, properties);
    },
    getEvents: localAnalytics.getEvents.bind(localAnalytics),
    clearEvents: localAnalytics.clearEvents.bind(localAnalytics)
  };
}

// Автоматическое отслеживание визитов страниц
export function trackPageView(page?: string) {
  if (typeof window !== 'undefined' && (window as any).dub) {
    (window as any).dub.track('page_view', {
      page: page || window.location.pathname,
      referrer: document.referrer,
      timestamp: Date.now()
    });
  }
}

// Автоматическое отслеживание кликов по внешним ссылкам
export function trackOutboundLinks() {
  if (typeof window === 'undefined') return;

  document.addEventListener('click', (event) => {
    const link = (event.target as HTMLElement).closest('a');
    if (link && link.hostname !== window.location.hostname) {
      if ((window as any).dub) {
        (window as any).dub.track('outbound_click', {
          url: link.href,
          text: link.textContent,
          timestamp: Date.now()
        });
      }
    }
  });
}

// Экспорт основных функций
export { LocalDubAnalytics };
export type { DubConfig };
