# Performance Optimization Guide

## Overview

This guide outlines performance optimization strategies, monitoring practices, and best practices for the HJC Chartered Accountants application. Our goal is to maintain excellent Core Web Vitals scores and provide users with a fast, responsive experience.

## Table of Contents

- [Performance Goals](#performance-goals)
- [Core Web Vitals](#core-web-vitals)
- [Frontend Optimizations](#frontend-optimizations)
- [Backend Optimizations](#backend-optimizations)
- [Database Optimizations](#database-optimizations)
- [Asset Optimization](#asset-optimization)
- [Monitoring and Metrics](#monitoring-and-metrics)
- [Performance Testing](#performance-testing)
- [Troubleshooting](#troubleshooting)
- [Performance Budget](#performance-budget)

## Performance Goals

### Target Metrics

| Metric | Mobile | Desktop | Current |
|--------|--------|---------|---------|
| **First Contentful Paint (FCP)** | < 1.8s | < 1.2s | ✅ |
| **Largest Contentful Paint (LCP)** | < 2.5s | < 2.0s | ✅ |
| **First Input Delay (FID)** | < 100ms | < 100ms | ✅ |
| **Cumulative Layout Shift (CLS)** | < 0.1 | < 0.1 | ✅ |
| **Time to Interactive (TTI)** | < 3.8s | < 2.5s | ✅ |
| **Speed Index** | < 3.4s | < 2.3s | ✅ |

### Performance Principles

1. **Measure First**: Always measure before optimizing
2. **User-Centric**: Focus on user-perceived performance
3. **Progressive Enhancement**: Core functionality works everywhere
4. **Lazy Loading**: Load resources only when needed
5. **Efficient Caching**: Cache strategically at multiple layers

## Core Web Vitals

### Largest Contentful Paint (LCP)

**Optimization Strategies:**

```typescript
// 1. Image optimization
const OptimizedImage: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={{
        aspectRatio: '16/9',
        objectFit: 'cover',
      }}
      sizes="(max-width: 768px) 100vw, 50vw"
    />
  );
};

// 2. Preload critical resources
const preloadCriticalResources = () => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = '/hero-image.webp';
  document.head.appendChild(link);
};
```

**Critical Resource Loading:**

```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

<!-- Preload critical images -->
<link rel="preload" href="/hero.webp" as="image" type="image/webp">

<!-- DNS prefetch for external domains -->
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//supabase.co">
```

### First Input Delay (FID)

**Code Splitting Strategy:**

```typescript
// Route-based splitting
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Documents = lazy(() => import('./pages/Documents'));

// Component-based splitting for heavy components
const DataVisualization = lazy(() => import('./components/DataVisualization'));

// Suspend with fallback
<Suspense fallback={<PageSkeleton />}>
  <Routes>
    <Route path="/dashboard" element={<Dashboard />} />
    <Route path="/documents" element={<Documents />} />
  </Routes>
</Suspense>
```

**Web Workers for Heavy Processing:**

```typescript
// worker.ts
self.onmessage = function(e) {
  const { data, operation } = e.data;

  switch (operation) {
    case 'processDocuments':
      const processed = processLargeDataSet(data);
      self.postMessage({ result: processed });
      break;
  }
};

// main thread
const useWebWorker = () => {
  const workerRef = useRef<Worker>();

  useEffect(() => {
    workerRef.current = new Worker('/worker.js');
    return () => workerRef.current?.terminate();
  }, []);

  const processData = useCallback((data: any[]) => {
    return new Promise((resolve) => {
      workerRef.current!.onmessage = (e) => resolve(e.data.result);
      workerRef.current!.postMessage({ data, operation: 'processDocuments' });
    });
  }, []);

  return { processData };
};
```

### Cumulative Layout Shift (CLS)

**Layout Stability:**

```css
/* Reserve space for images */
.image-container {
  aspect-ratio: 16 / 9;
  background-color: #f3f4f6;
}

/* Skeleton loading states */
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

```typescript
// Loading skeletons to prevent layout shifts
const DocumentSkeleton = () => (
  <div className="space-y-4">
    {Array.from({ length: 5 }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        <div className="skeleton h-12 w-12 rounded" />
        <div className="skeleton h-4 w-full rounded" />
      </div>
    ))}
  </div>
);
```

## Frontend Optimizations

### React Performance

#### 1. Memoization

```typescript
// Component memoization
const DocumentCard = memo<DocumentCardProps>(({ document, onDelete }) => {
  return (
    <div className="document-card">
      <h3>{document.name}</h3>
      <button onClick={() => onDelete(document.id)}>Delete</button>
    </div>
  );
});

// Callback memoization
const DocumentList: React.FC<{ documents: Document[] }> = ({ documents }) => {
  const handleDelete = useCallback((id: string) => {
    // Delete logic
  }, []);

  const sortedDocuments = useMemo(() => {
    return documents.sort((a, b) =>
      new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    );
  }, [documents]);

  return (
    <div>
      {sortedDocuments.map(doc => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};
```

#### 2. Virtual Scrolling

```typescript
import { FixedSizeList as List } from 'react-window';

const VirtualizedDocumentList: React.FC<{ documents: Document[] }> = ({ documents }) => {
  const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => (
    <div style={style}>
      <DocumentCard document={documents[index]} />
    </div>
  );

  return (
    <List
      height={400}
      itemCount={documents.length}
      itemSize={80}
      overscanCount={5}
    >
      {Row}
    </List>
  );
};
```

#### 3. State Management Optimization

```typescript
// Split large contexts into smaller ones
const AuthContext = createContext<AuthContextType | null>(null);
const DocumentsContext = createContext<DocumentsContextType | null>(null);
const UIContext = createContext<UIContextType | null>(null);

// Use reducers for complex state
const documentReducer = (state: DocumentState, action: DocumentAction) => {
  switch (action.type) {
    case 'ADD_DOCUMENT':
      return {
        ...state,
        documents: [...state.documents, action.document],
        total: state.total + 1,
      };
    case 'REMOVE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.filter(doc => doc.id !== action.id),
        total: state.total - 1,
      };
    default:
      return state;
  }
};
```

### Bundle Optimization

#### Vite Configuration

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],

          // Utility chunks
          utils: ['clsx', 'tailwind-merge', 'class-variance-authority'],
          date: ['date-fns'],

          // Feature chunks
          supabase: ['@supabase/supabase-js'],
          query: ['@tanstack/react-query'],
          charts: ['recharts'],
        },
      },
    },

    // Compression
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
    },
  },

  // Plugin configuration
  plugins: [
    react(),

    // Compression plugins
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024,
    }),

    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
    }),
  ],
});
```

### Asset Loading Strategies

#### 1. Progressive Image Loading

```typescript
const ProgressiveImage: React.FC<{
  src: string;
  placeholder: string;
  alt: string;
}> = ({ src, placeholder, alt }) => {
  const [loading, setLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholder);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setCurrentSrc(src);
      setLoading(false);
    };
    img.src = src;
  }, [src]);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={`transition-opacity duration-300 ${
        loading ? 'opacity-50' : 'opacity-100'
      }`}
    />
  );
};
```

#### 2. Intersection Observer for Lazy Loading

```typescript
const useLazyLoad = (ref: RefObject<HTMLElement>) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [ref]);

  return isVisible;
};

const LazyComponent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isVisible = useLazyLoad(ref);

  return (
    <div ref={ref}>
      {isVisible ? <HeavyComponent /> : <ComponentSkeleton />}
    </div>
  );
};
```

## Backend Optimizations

### Supabase Query Optimization

#### 1. Efficient Data Fetching

```typescript
// ❌ Bad - Overfetching
const { data } = await supabase
  .from('documents')
  .select('*')
  .eq('user_id', userId);

// ✅ Good - Select only needed fields
const { data } = await supabase
  .from('documents')
  .select('id, name, upload_date, status')
  .eq('user_id', userId)
  .order('upload_date', { ascending: false })
  .limit(20);
```

#### 2. Pagination Implementation

```typescript
const useDocuments = (page: number, limit: number = 20) => {
  return useQuery({
    queryKey: ['documents', page, limit],
    queryFn: async () => {
      const from = page * limit;
      const to = from + limit - 1;

      const { data, error, count } = await supabase
        .from('documents')
        .select('id, name, upload_date, status', { count: 'exact' })
        .range(from, to)
        .order('upload_date', { ascending: false });

      if (error) throw error;

      return {
        documents: data || [],
        totalCount: count || 0,
        hasMore: (count || 0) > to + 1,
      };
    },
  });
};
```

#### 3. Real-time Optimization

```typescript
// Subscribe only to necessary changes
const useDocumentSubscription = (userId: string) => {
  useEffect(() => {
    const subscription = supabase
      .channel('document-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'documents',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          // Handle real-time updates
          queryClient.invalidateQueries(['documents']);
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [userId]);
};
```

## Database Optimizations

### Indexing Strategy

```sql
-- Primary indexes for frequently queried columns
CREATE INDEX CONCURRENTLY idx_documents_user_upload_date
ON documents(user_id, upload_date DESC);

-- Partial indexes for specific conditions
CREATE INDEX CONCURRENTLY idx_documents_pending
ON documents(user_id, upload_date DESC)
WHERE status = 'pending';

-- Composite indexes for complex queries
CREATE INDEX CONCURRENTLY idx_documents_complex
ON documents(user_id, service_type, status, upload_date DESC);

-- Full-text search index
CREATE INDEX CONCURRENTLY idx_documents_fts
ON documents USING gin(to_tsvector('english', name || ' ' || COALESCE(description, '')));
```

### Query Optimization Examples

```sql
-- ❌ Inefficient query
SELECT d.*, p.first_name, p.last_name
FROM documents d
JOIN profiles p ON d.user_id = p.id
WHERE d.status = 'pending'
ORDER BY d.upload_date DESC;

-- ✅ Optimized query
SELECT d.id, d.name, d.upload_date, d.status,
       p.first_name, p.last_name
FROM documents d
JOIN profiles p ON d.user_id = p.id
WHERE d.status = 'pending'
  AND d.upload_date >= CURRENT_DATE - INTERVAL '30 days'
ORDER BY d.upload_date DESC
LIMIT 50;
```

### Connection Pooling

```typescript
// Supabase automatically handles connection pooling
// But you can optimize by closing connections when not needed
const createOptimizedClient = () => {
  const client = createClient(supabaseUrl, supabaseKey, {
    db: {
      schema: 'public',
    },
    auth: {
      autoRefreshToken: true,
      persistSession: true,
    },
    global: {
      headers: { 'x-my-custom-header': 'my-app-name' },
    },
  });

  return client;
};
```

## Asset Optimization

### Image Optimization

```typescript
// Image optimization service
const generateOptimizedImageUrl = (
  originalUrl: string,
  width: number,
  height?: number,
  format: 'webp' | 'avif' | 'jpeg' = 'webp'
) => {
  const params = new URLSearchParams({
    w: width.toString(),
    f: format,
    q: '85', // Quality
  });

  if (height) {
    params.append('h', height.toString());
  }

  return `${originalUrl}?${params.toString()}`;
};

// Responsive image component
const ResponsiveImage: React.FC<{
  src: string;
  alt: string;
  sizes?: string;
}> = ({ src, alt, sizes = '100vw' }) => {
  const srcSet = [
    `${generateOptimizedImageUrl(src, 320)} 320w`,
    `${generateOptimizedImageUrl(src, 640)} 640w`,
    `${generateOptimizedImageUrl(src, 1024)} 1024w`,
    `${generateOptimizedImageUrl(src, 1366)} 1366w`,
  ].join(', ');

  return (
    <img
      src={generateOptimizedImageUrl(src, 640)}
      srcSet={srcSet}
      sizes={sizes}
      alt={alt}
      loading="lazy"
      decoding="async"
    />
  );
};
```

### Font Optimization

```css
/* Font loading optimization */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap; /* Ensures text is always visible */
  src: url('/fonts/inter-regular.woff2') format('woff2'),
       url('/fonts/inter-regular.woff') format('woff');
}

/* Preload critical fonts */
.font-preload {
  font-family: 'Inter', system-ui, sans-serif;
}
```

### CSS Optimization

```css
/* Critical CSS - inline this in HTML */
.critical-styles {
  /* Above-the-fold styles only */
  body { font-family: system-ui, sans-serif; }
  .header { /* header styles */ }
}

/* Non-critical CSS - load asynchronously */
.non-critical-styles {
  /* Below-the-fold and interactive styles */
}
```

## Monitoring and Metrics

### Performance Monitoring Implementation

```typescript
// Web Vitals monitoring
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = (metric: Metric) => {
  // Send to your analytics service
  if (import.meta.env.PROD) {
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        url: window.location.href,
        timestamp: Date.now(),
      }),
    });
  }
};

// Initialize monitoring
export const initPerformanceMonitoring = () => {
  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
};

// Custom metrics
export const trackCustomMetric = (name: string, value: number) => {
  sendToAnalytics({
    name,
    value,
    id: generateUniqueId(),
  });
};
```

### Performance Dashboard

```typescript
interface PerformanceMetrics {
  fcp: number;
  lcp: number;
  fid: number;
  cls: number;
  ttfb: number;
  bundleSize: number;
  loadTime: number;
  apiResponseTime: number;
}

const usePerformanceMetrics = () => {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    // Collect performance metrics
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        // Process performance entries
      });
    });

    observer.observe({ entryTypes: ['navigation', 'measure', 'paint'] });

    return () => observer.disconnect();
  }, []);

  return metrics;
};
```

## Performance Testing

### Lighthouse Testing

```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run Lighthouse audit
lhci autorun --upload.target=temporary-public-storage

# Lighthouse configuration
# lighthouserc.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:8080'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
      },
    },
  },
};
```

### Load Testing

```javascript
// load-test.js (using k6)
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 10 },
    { duration: '1m', target: 50 },
    { duration: '30s', target: 100 },
    { duration: '1m', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'],
    http_req_failed: ['rate<0.01'],
  },
};

export default function () {
  const response = http.get('https://your-app.com');

  check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });

  sleep(1);
}
```

### Performance Regression Testing

```typescript
// performance-test.ts
import { test, expect } from '@playwright/test';

test('performance regression test', async ({ page }) => {
  await page.goto('/dashboard');

  // Measure page load time
  const navigationPromise = page.waitForLoadState('networkidle');
  const startTime = Date.now();
  await navigationPromise;
  const loadTime = Date.now() - startTime;

  expect(loadTime).toBeLessThan(3000);

  // Check Core Web Vitals
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      new PerformanceObserver((list) => {
        const entries = list.getEntries();
        resolve(entries);
      }).observe({ entryTypes: ['paint', 'largest-contentful-paint'] });
    });
  });

  console.log('Performance metrics:', metrics);
});
```

## Performance Budget

### Bundle Size Budget

```json
{
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "500kb",
      "maximumError": "1mb"
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "50kb",
      "maximumError": "100kb"
    },
    {
      "type": "bundle",
      "name": "vendor",
      "maximumWarning": "300kb",
      "maximumError": "500kb"
    }
  ]
}
```

### Performance Monitoring Alerts

```typescript
const performanceThresholds = {
  lcp: 2500, // ms
  fid: 100,  // ms
  cls: 0.1,  // score
  fcp: 1800, // ms
  ttfb: 800, // ms
};

const checkPerformanceThreshold = (metric: string, value: number) => {
  const threshold = performanceThresholds[metric as keyof typeof performanceThresholds];

  if (value > threshold) {
    // Send alert
    console.warn(`Performance threshold exceeded: ${metric} = ${value}ms (threshold: ${threshold}ms)`);

    // In production, send to monitoring service
    sendAlert({
      type: 'performance',
      metric,
      value,
      threshold,
      url: window.location.href,
    });
  }
};
```

## Troubleshooting

### Common Performance Issues

#### 1. Bundle Size Too Large

```bash
# Analyze bundle size
npm run build:analyze

# Check which dependencies are large
npx bundle-analyzer dist/stats.html
```

**Solutions:**
- Tree shake unused code
- Use dynamic imports
- Replace large libraries with smaller alternatives

#### 2. Slow Initial Page Load

**Diagnosis:**
```typescript
// Measure time to interactive
const measureTTI = () => {
  const navigation = performance.getEntriesByType('navigation')[0];
  console.log('Navigation timing:', navigation);

  const paintEntries = performance.getEntriesByType('paint');
  console.log('Paint entries:', paintEntries);
};
```

**Solutions:**
- Implement code splitting
- Optimize critical rendering path
- Preload critical resources

#### 3. Memory Leaks

**Detection:**
```typescript
// Memory usage monitoring
const monitorMemory = () => {
  if ('memory' in performance) {
    const memory = (performance as any).memory;
    console.log({
      usedJSHeapSize: memory.usedJSHeapSize,
      totalJSHeapSize: memory.totalJSHeapSize,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
    });
  }
};

// Run periodically
setInterval(monitorMemory, 10000);
```

**Solutions:**
- Clean up event listeners
- Cancel pending requests on unmount
- Clear intervals and timeouts

### Performance Testing Checklist

- [ ] **Lighthouse score > 90** for all categories
- [ ] **Bundle size < 500KB** (gzipped)
- [ ] **LCP < 2.5s** on mobile
- [ ] **FID < 100ms**
- [ ] **CLS < 0.1**
- [ ] **TTI < 5s** on mobile
- [ ] **Network payload < 1MB**
- [ ] **Images optimized** (WebP/AVIF)
- [ ] **Fonts optimized** (woff2, font-display)
- [ ] **Critical CSS inlined**
- [ ] **JavaScript optimized** (minified, compressed)

---

**Last Updated**: December 2024
**Version**: 1.0.0
**Performance Framework**: Web Vitals + Lighthouse

For performance questions, contact: hazli@hazlijohar.my