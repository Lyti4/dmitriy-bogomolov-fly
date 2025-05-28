// Полностью локальная реализация Dub Analytics
import { initLocalDubAnalytics, trackPageView, trackOutboundLinks, type DubConfig } from './localDubAnalytics';

export function initDubAnalytics(config: DubConfig = {}) {
  // Используем локальную реализацию вместо внешнего скрипта
  initLocalDubAnalytics(config);

  // Настраиваем автоматическое отслеживание если включено в конфиге
  if (config.domainsConfig?.site) {
    trackPageView();
  }

  if (config.domainsConfig?.outbound) {
    trackOutboundLinks();
  }
}

// Функция для отслеживания событий
export function trackEvent(eventName: string, properties?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).dub) {
    (window as any).dub.track(eventName, properties);
  } else {
    console.log('[Analytics] Not initialized, event:', eventName, properties);
  }
}

// Экспортируем дополнительные функции
export { trackPageView, trackOutboundLinks };
