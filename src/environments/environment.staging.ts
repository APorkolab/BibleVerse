export const environment = {
  production: false,
  development: false,
  staging: true,
  name: 'staging',
  version: '1.0.0-staging',

  // API Configuration
  api: {
    baseUrl: 'https://szentiras.hu/api',
    timeout: 8000,
    retries: 2,
  },

  // Feature Flags
  features: {
    enableDevTools: false,
    enableLogging: true,
    enableDebugging: false,
    enableAnalytics: true,
    enableServiceWorker: true,
    enableE2EHelpers: false,
  },

  // Logging Configuration
  logging: {
    level: 'info',
    enableConsoleLogging: false,
    enableRemoteLogging: true,
    remoteLoggingUrl: 'https://staging-logs.porkolab.hu/api/logs',
  },

  // Analytics Configuration
  analytics: {
    enabled: true,
    googleAnalyticsId: 'GA-STAGING-ID',
    trackingEvents: true,
  },

  // Cache Configuration
  cache: {
    enabled: true,
    ttl: 1800, // 30 minutes for staging
    maxSize: 500,
  },

  // Security Configuration
  security: {
    enableCSP: true,
    allowUnsafeEval: false,
    allowUnsafeInline: false,
  },

  // Performance Configuration
  performance: {
    enableLazyLoading: true,
    enablePreloading: true,
    enableCompression: true,
  },
};
