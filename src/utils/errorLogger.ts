import React from 'react';

interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  url?: string;
  userAgent?: string;
  timestamp?: Date;
  additionalData?: Record<string, any>;
}

interface ErrorLogEntry {
  message: string;
  error: Error | unknown;
  context: ErrorContext;
  stack?: string;
  level: 'error' | 'warn' | 'info';
}

class ErrorLogger {
  private isDevelopment = import.meta.env.DEV;

  log(message: string, error: Error | unknown, context: ErrorContext = {}, level: 'error' | 'warn' | 'info' = 'error'): void {
    const logEntry: ErrorLogEntry = {
      message,
      error,
      context: {
        ...context,
        timestamp: new Date(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
      stack: error instanceof Error ? error.stack : undefined,
      level,
    };

    // Console logging (always in development, configurable in production)
    if (this.isDevelopment || level === 'error') {
      const consoleMethod = console[level] || console.error;
      consoleMethod('🚨 Error Log:', {
        message: logEntry.message,
        error: logEntry.error,
        context: logEntry.context,
        stack: logEntry.stack,
      });
    }

    // In production, you might want to send errors to a logging service
    if (!this.isDevelopment && level === 'error') {
      this.sendToLoggingService(logEntry);
    }
  }

  private sendToLoggingService(logEntry: ErrorLogEntry): void {
    // Placeholder for external logging service integration
    // Example: Sentry, LogRocket, etc.
    try {
      // fetch('/api/logs', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(logEntry)
      // });
    } catch (err) {
      console.error('Failed to send error to logging service:', err);
    }
  }

  // Convenience methods
  error(message: string, error: Error | unknown, context?: ErrorContext): void {
    this.log(message, error, context, 'error');
  }

  warn(message: string, error: Error | unknown, context?: ErrorContext): void {
    this.log(message, error, context, 'warn');
  }

  info(message: string, error: Error | unknown, context?: ErrorContext): void {
    this.log(message, error, context, 'info');
  }

  // Global error handler
  setupGlobalErrorHandling(): void {
    // Catch unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.error('Unhandled Promise Rejection', event.reason, {
        component: 'Global',
        action: 'unhandledrejection',
      });
    });

    // Catch global errors
    window.addEventListener('error', (event) => {
      this.error('Global Error', event.error || event.message, {
        component: 'Global',
        action: 'error',
        additionalData: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno,
        },
      });
    });
  }
}

export const errorLogger = new ErrorLogger();

// React Hook for error logging
export const useErrorLogger = () => {
  return {
    logError: (message: string, error: Error | unknown, context?: ErrorContext) =>
      errorLogger.error(message, error, context),
    logWarning: (message: string, error: Error | unknown, context?: ErrorContext) =>
      errorLogger.warn(message, error, context),
    logInfo: (message: string, error: Error | unknown, context?: ErrorContext) =>
      errorLogger.info(message, error, context),
  };
};

// Higher-order component for automatic error logging
export const withErrorLogging = <P extends Record<string, any>>(
  WrappedComponent: React.ComponentType<P>,
  componentName: string
) => {
  const ErrorLoggedComponent = (props: P) => {
    try {
      return React.createElement(WrappedComponent, props);
    } catch (error) {
      errorLogger.error(`Error in component ${componentName}`, error, {
        component: componentName,
        action: 'render',
      });
      throw error;
    }
  };

  ErrorLoggedComponent.displayName = `withErrorLogging(${componentName})`;
  return ErrorLoggedComponent;
};

export default errorLogger;