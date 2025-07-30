// Deployment configuration for HJC Chartered Accountants
export default {
  // Environment configurations
  environments: {
    development: {
      name: 'Development',
      url: 'http://localhost:8080',
      apiUrl: 'https://ekgglnhnitrffayubchl.supabase.co',
      features: {
        debug: true,
        analytics: false,
        hotReload: true,
        sourceMaps: true
      }
    },
    staging: {
      name: 'Staging',
      url: 'https://staging.hjc-malaysia.com',
      apiUrl: 'https://ekgglnhnitrffayubchl.supabase.co',
      features: {
        debug: false,
        analytics: true,
        hotReload: false,
        sourceMaps: false
      }
    },
    production: {
      name: 'Production',
      url: 'https://hjc-malaysia.com',
      apiUrl: 'https://ekgglnhnitrffayubchl.supabase.co',
      features: {
        debug: false,
        analytics: true,
        hotReload: false,
        sourceMaps: false
      }
    }
  },

  // Build optimization settings
  build: {
    // Bundle analysis
    analyze: false,
    
    // Compression
    compression: {
      gzip: true,
      brotli: true
    },
    
    // Code splitting
    splitting: {
      vendor: true,
      dynamic: true
    },
    
    // Performance
    performance: {
      minify: true,
      treeShaking: true,
      deadCodeElimination: true
    }
  },

  // Security settings
  security: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      'Strict-Transport-Security': 'max-age=31536000; includeSubDomains'
    },
    
    csp: {
      enabled: true,
      reportOnly: false
    },
    
    rateLimit: {
      enabled: true,
      maxAttempts: 5,
      windowMs: 900000,
      blockDurationMs: 1800000
    }
  },

  // Monitoring and analytics
  monitoring: {
    errorTracking: {
      enabled: true,
      service: 'sentry' // or 'logrocket', 'rollbar'
    },
    
    performance: {
      enabled: true,
      service: 'web-vitals'
    },
    
    analytics: {
      enabled: true,
      service: 'google-analytics' // or 'plausible', 'fathom'
    }
  },

  // CDN and caching
  cdn: {
    enabled: true,
    provider: 'cloudflare', // or 'aws-cloudfront', 'vercel'
    cache: {
      static: '1 year',
      api: '1 hour',
      images: '1 month'
    }
  },

  // Database and storage
  database: {
    provider: 'supabase',
    backup: {
      enabled: true,
      frequency: 'daily',
      retention: '30 days'
    },
    
    migrations: {
      auto: true,
      safe: true
    }
  }
}; 