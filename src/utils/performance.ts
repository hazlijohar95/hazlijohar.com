import { onCLS, onFCP, onLCP, onTTFB } from 'web-vitals';

interface PerformanceMetrics {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
  timestamp: number;
}

export type { PerformanceMetrics };

// Performance thresholds based on Google's recommendations
const THRESHOLDS = {
  CLS: { good: 0.1, poor: 0.25 },
  FCP: { good: 1800, poor: 3000 },
  LCP: { good: 2500, poor: 4000 },
  TTFB: { good: 800, poor: 1800 }
};

function getRating(name: string, value: number): 'good' | 'needs-improvement' | 'poor' {
  const threshold = THRESHOLDS[name as keyof typeof THRESHOLDS];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
}

function sendToAnalytics(metric: PerformanceMetrics): void {
  // In a real application, you would send this to your analytics service
  // For now, we'll just log to console in development
  if (import.meta.env.DEV) {
    console.warn(`📊 Web Vitals: ${metric.name} - ${metric.value}ms (${metric.rating}) - ID: ${metric.id}`);
  }

  // Store metrics in sessionStorage for debugging
  try {
    const existingMetrics = JSON.parse(sessionStorage.getItem('webVitals') || '[]');
    existingMetrics.push(metric);
    sessionStorage.setItem('webVitals', JSON.stringify(existingMetrics));
  } catch (error) {
    console.warn('Failed to store Web Vitals metrics:', error);
  }
}

function handleMetric(metric: any): void {
  const performanceMetric: PerformanceMetrics = {
    name: metric.name,
    value: metric.value,
    rating: getRating(metric.name, metric.value),
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType || 'unknown',
    timestamp: Date.now()
  };

  sendToAnalytics(performanceMetric);
}

export function initWebVitals(): void {
  // Only initialize in browser environment
  if (typeof window === 'undefined') return;

  try {
    onCLS(handleMetric);
    onFCP(handleMetric);
    onLCP(handleMetric);
    onTTFB(handleMetric);
  } catch (error) {
    console.warn('Failed to initialize Web Vitals:', error);
  }
}

export function getStoredMetrics(): PerformanceMetrics[] {
  try {
    return JSON.parse(sessionStorage.getItem('webVitals') || '[]');
  } catch {
    return [];
  }
}

export function clearStoredMetrics(): void {
  try {
    sessionStorage.removeItem('webVitals');
  } catch (error) {
    console.warn('Failed to clear stored metrics:', error);
  }
}

// Performance observer for custom metrics
export function observePageLoad(): void {
  if (typeof window === 'undefined' || !('performance' in window)) return;

  window.addEventListener('load', () => {
    // Measure page load time
    const loadTime = performance.now();
    const customMetric: PerformanceMetrics = {
      name: 'PAGE_LOAD',
      value: loadTime,
      rating: getRating('PAGE_LOAD', loadTime),
      delta: loadTime,
      id: self.crypto?.randomUUID() || Math.random().toString(36),
      navigationType: 'navigation',
      timestamp: Date.now()
    };
    sendToAnalytics(customMetric);

    // Measure DOM content loaded time
    const domContentLoadedTime = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (domContentLoadedTime) {
      const dcl = domContentLoadedTime.domContentLoadedEventEnd - domContentLoadedTime.fetchStart;
      const dclMetric: PerformanceMetrics = {
        name: 'DOM_CONTENT_LOADED',
        value: dcl,
        rating: getRating('DOM_CONTENT_LOADED', dcl),
        delta: dcl,
        id: self.crypto?.randomUUID() || Math.random().toString(36),
        navigationType: 'navigation',
        timestamp: Date.now()
      };
      sendToAnalytics(dclMetric);
    }
  });
}

// Resource loading performance
export function observeResourceLoading(): void {
  if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === 'resource') {
        const resourceEntry = entry as PerformanceResourceTiming;

        // Only track slow resources (>1s)
        if (resourceEntry.duration > 1000) {
          const slowResourceMetric: PerformanceMetrics = {
            name: 'SLOW_RESOURCE',
            value: resourceEntry.duration,
            rating: 'poor',
            delta: resourceEntry.duration,
            id: self.crypto?.randomUUID() || Math.random().toString(36),
            navigationType: 'navigation',
            timestamp: Date.now()
          };
          sendToAnalytics(slowResourceMetric);
        }
      }
    }
  });

  try {
    observer.observe({ entryTypes: ['resource'] });
  } catch (error) {
    console.warn('Failed to observe resource loading:', error);
  }
}