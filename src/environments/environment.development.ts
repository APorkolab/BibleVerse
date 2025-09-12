export const environment = {
  production: false,
  development: true,
  staging: false,
  name: 'development',
  version: '1.0.0-dev',
  
  // API Configuration
  api: {
    baseUrl: 'https://szentiras.hu/api',
    timeout: 10000,
    retries: 3
  },
  
  // Feature Flags
  features: {
    enableDevTools: true,
    enableLogging: true,
    enableDebugging: true,
    enableAnalytics: false,
    enableServiceWorker: false,
    enableE2EHelpers: true
  },
  
  // Logging Configuration
  logging: {
    level: 'debug',
    enableConsoleLogging: true,
    enableRemoteLogging: false,
    remoteLoggingUrl: ''
  },
  
  // Analytics Configuration
  analytics: {
    enabled: false,
    googleAnalyticsId: '',
    trackingEvents: false
  },
  
  // Cache Configuration
  cache: {
    enabled: true,
    ttl: 300, // 5 minutes for development
    maxSize: 100
  },
  
  // Security Configuration
  security: {
    enableCSP: false,
    allowUnsafeEval: true,
    allowUnsafeInline: true
  }
};
