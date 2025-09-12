export const environment = {
  production: true,
  development: false,
  staging: false,
  name: 'production',
  version: '1.0.0',
  
  // API Configuration
  api: {
    baseUrl: 'https://szentiras.hu/api',
    timeout: 5000,
    retries: 3
  },
  
  // Feature Flags
  features: {
    enableDevTools: false,
    enableLogging: false,
    enableDebugging: false,
    enableAnalytics: true,
    enableServiceWorker: true,
    enableE2EHelpers: false
  },
  
  // Logging Configuration
  logging: {
    level: 'error',
    enableConsoleLogging: false,
    enableRemoteLogging: true,
    remoteLoggingUrl: 'https://logs.porkolab.hu/api/logs'
  },
  
  // Analytics Configuration
  analytics: {
    enabled: true,
    googleAnalyticsId: 'GA-PRODUCTION-ID',
    trackingEvents: true
  },
  
  // Cache Configuration
  cache: {
    enabled: true,
    ttl: 3600, // 1 hour for production
    maxSize: 1000
  },
  
  // Security Configuration
  security: {
    enableCSP: true,
    allowUnsafeEval: false,
    allowUnsafeInline: false
  },
  
  // Performance Configuration
  performance: {
    enableLazyLoading: true,
    enablePreloading: true,
    enableCompression: true,
    enablePWA: true
  }
};
