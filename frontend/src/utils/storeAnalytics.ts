// Analytics para monitorar instalações de todas as lojas
// Adicionar no _app.tsx ou layout.tsx
import React from 'react';

declare global {
  function gtag(...args: any[]): void;
}

interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  source?: string;
}

export class StoreAnalytics {
  private static instance: StoreAnalytics;
  private isInitialized = false;

  static getInstance(): StoreAnalytics {
    if (!StoreAnalytics.instance) {
      StoreAnalytics.instance = new StoreAnalytics();
    }
    return StoreAnalytics.instance;
  }

  initialize() {
    if (this.isInitialized) return;
    
    // Detectar fonte de instalação
    this.detectInstallSource();
    
    // Configurar eventos PWA
    this.setupPWAEvents();
    
    this.isInitialized = true;
  }

  private detectInstallSource() {
    const params = new URLSearchParams(window.location.search);
    const referrer = document.referrer;
    const userAgent = navigator.userAgent;
    
    let source = 'direct';
    
    // Detectar APKPure
    if (referrer.includes('apkpure.com') || params.get('utm_source') === 'apkpure') {
      source = 'apkpure';
    }
    // Detectar F-Droid
    else if (referrer.includes('f-droid.org') || params.get('utm_source') === 'fdroid') {
      source = 'fdroid';
    }
    // Detectar Amazon Appstore
    else if (referrer.includes('amazon.com') || params.get('utm_source') === 'amazon') {
      source = 'amazon';
    }
    // Detectar PWA instalado
    else if (window.matchMedia('(display-mode: standalone)').matches) {
      source = 'pwa_installed';
    }
    
    // Salvar fonte no localStorage
    localStorage.setItem('install_source', source);
    localStorage.setItem('install_date', new Date().toISOString());
    
    // Enviar evento de abertura
    this.trackEvent({
      action: 'app_open',
      category: 'engagement',
      label: source,
      source
    });
  }

  private setupPWAEvents() {
    // Detectar instalação PWA
    window.addEventListener('beforeinstallprompt', (e) => {
      this.trackEvent({
        action: 'pwa_prompt_shown',
        category: 'pwa',
        label: 'install_prompt'
      });
    });

    // Detectar when app é instalado
    window.addEventListener('appinstalled', () => {
      this.trackEvent({
        action: 'pwa_installed',
        category: 'pwa',
        label: 'successful_install'
      });
    });
  }

  trackEvent(event: AnalyticsEvent) {
    const timestamp = new Date().toISOString();
    const installSource = localStorage.getItem('install_source') || 'unknown';
    
    const eventData = {
      ...event,
      timestamp,
      install_source: installSource,
      user_agent: navigator.userAgent,
      page_url: window.location.href
    };

    // Salvar localmente para backup
    this.saveEventLocally(eventData);

    // Enviar para Google Analytics (se disponível)
    if (typeof gtag !== 'undefined') {
      gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
        custom_parameter_source: event.source
      });
    }

    // Console log para debugging
    console.log('📊 Analytics Event:', eventData);
  }

  private saveEventLocally(eventData: any) {
    try {
      const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
      events.push(eventData);
      
      // Manter apenas últimos 100 eventos
      if (events.length > 100) {
        events.splice(0, events.length - 100);
      }
      
      localStorage.setItem('analytics_events', JSON.stringify(events));
    } catch (error) {
      console.error('Erro ao salvar evento:', error);
    }
  }

  // Métodos para tracking específico de cada loja
  trackAPKPureDownload() {
    this.trackEvent({
      action: 'download_initiated',
      category: 'store_distribution',
      label: 'apkpure',
      source: 'apkpure'
    });
  }

  trackFDroidDownload() {
    this.trackEvent({
      action: 'download_initiated',
      category: 'store_distribution',
      label: 'fdroid',
      source: 'fdroid'
    });
  }

  trackAmazonDownload() {
    this.trackEvent({
      action: 'download_initiated',
      category: 'store_distribution',
      label: 'amazon',
      source: 'amazon'
    });
  }

  trackClaraUsage() {
    this.trackEvent({
      action: 'clara_opened',
      category: 'feature_usage',
      label: 'ai_assistant'
    });
  }

  trackEmergencyUsage() {
    this.trackEvent({
      action: 'emergency_activated',
      category: 'feature_usage',
      label: 'gps_emergency'
    });
  }

  trackModuleAccess(moduleName: string) {
    this.trackEvent({
      action: 'module_accessed',
      category: 'educational_content',
      label: moduleName
    });
  }

  // Relatório de analytics
  generateReport() {
    const events = JSON.parse(localStorage.getItem('analytics_events') || '[]');
    const installSource = localStorage.getItem('install_source');
    const installDate = localStorage.getItem('install_date');
    
    return {
      install_source: installSource,
      install_date: installDate,
      total_events: events.length,
      events_by_category: this.groupEventsByCategory(events),
      events_by_source: this.groupEventsBySource(events),
      last_30_days: this.filterLast30Days(events)
    };
  }

  private groupEventsByCategory(events: any[]) {
    return events.reduce((acc, event) => {
      acc[event.category] = (acc[event.category] || 0) + 1;
      return acc;
    }, {});
  }

  private groupEventsBySource(events: any[]) {
    return events.reduce((acc, event) => {
      const source = event.install_source || event.source || 'unknown';
      acc[source] = (acc[source] || 0) + 1;
      return acc;
    }, {});
  }

  private filterLast30Days(events: any[]) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    return events.filter(event => 
      new Date(event.timestamp) > thirtyDaysAgo
    );
  }
}

// Exportar instância global
export const analytics = StoreAnalytics.getInstance();

// Hook para React
export const useAnalytics = () => {
  React.useEffect(() => {
    analytics.initialize();
  }, []);

  return analytics;
};