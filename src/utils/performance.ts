/**
 * PERFORMANCE UTILITIES - SYSTEM OPTIMIZATION
 * 
 * Collection of utilities for monitoring and optimizing performance.
 * Includes caching, memoization, and performance tracking.
 */

// MEMOIZATION CACHE
const memoCache = new Map<string, { value: any; timestamp: number; ttl: number }>();

/**
 * MEMOIZATION WITH TTL
 * Caches function results with time-to-live for better performance
 */
export function memoizeWithTTL<T extends (...args: any[]) => any>(
  fn: T,
  ttl: number = 5 * 60 * 1000 // 5 minutes default
): T {
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args);
    const cached = memoCache.get(key);
    const now = Date.now();

    if (cached && now - cached.timestamp < cached.ttl) {
      return cached.value;
    }

    const result = fn(...args);
    memoCache.set(key, { value: result, timestamp: now, ttl });

    return result;
  }) as T;
}

/**
 * DEBOUNCE FUNCTION
 * Delays function execution until after delay milliseconds
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

/**
 * THROTTLE FUNCTION
 * Limits function execution to once per specified interval
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * BATCH OPERATIONS
 * Groups multiple operations into batches for better performance
 */
export class BatchProcessor<T> {
  private batch: T[] = [];
  private batchSize: number;
  private processor: (items: T[]) => Promise<void>;
  private timeout: NodeJS.Timeout | null = null;

  constructor(
    processor: (items: T[]) => Promise<void>,
    batchSize: number = 10,
    private delay: number = 100
  ) {
    this.processor = processor;
    this.batchSize = batchSize;
  }

  add(item: T): void {
    this.batch.push(item);

    if (this.batch.length >= this.batchSize) {
      this.flush();
    } else {
      this.scheduleFlush();
    }
  }

  private scheduleFlush(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
    
    this.timeout = setTimeout(() => {
      this.flush();
    }, this.delay);
  }

  private async flush(): Promise<void> {
    if (this.batch.length === 0) return;

    const items = [...this.batch];
    this.batch = [];
    
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }

    try {
      await this.processor(items);
    } catch (error) {
      console.error('Batch processing error:', error);
    }
  }
}

/**
 * PERFORMANCE MONITOR
 * Tracks and reports performance metrics
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private metrics: Map<string, number[]> = new Map();

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  startTimer(label: string): () => void {
    const start = performance.now();
    
    return () => {
      const duration = performance.now() - start;
      this.recordMetric(label, duration);
    };
  }

  recordMetric(label: string, value: number): void {
    if (!this.metrics.has(label)) {
      this.metrics.set(label, []);
    }
    
    const values = this.metrics.get(label)!;
    values.push(value);
    
    // Keep only last 100 measurements
    if (values.length > 100) {
      values.shift();
    }
  }

  getMetrics(label: string): { avg: number; min: number; max: number } | null {
    const values = this.metrics.get(label);
    if (!values || values.length === 0) return null;

    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    return { avg, min, max };
  }

  getAllMetrics(): Record<string, { avg: number; min: number; max: number }> {
    const result: Record<string, { avg: number; min: number; max: number }> = {};
    
    for (const [label] of this.metrics) {
      const metrics = this.getMetrics(label);
      if (metrics) {
        result[label] = metrics;
      }
    }
    
    return result;
  }
}

/**
 * MEMORY OPTIMIZATION
 * Utilities for managing memory usage
 */
export class MemoryManager {
  private static cleanupTasks: (() => void)[] = [];

  static addCleanupTask(task: () => void): void {
    this.cleanupTasks.push(task);
  }

  static cleanup(): void {
    this.cleanupTasks.forEach(task => {
      try {
        task();
      } catch (error) {
        console.error('Cleanup task error:', error);
      }
    });
    this.cleanupTasks = [];
  }

  static scheduleCleanup(): void {
    // Run cleanup every 5 minutes
    setInterval(() => {
      this.cleanup();
      
      // Clear memoization cache periodically
      const now = Date.now();
      for (const [key, cached] of memoCache.entries()) {
        if (now - cached.timestamp > cached.ttl) {
          memoCache.delete(key);
        }
      }
    }, 5 * 60 * 1000);
  }
}

// Initialize memory management
if (typeof window !== 'undefined') {
  MemoryManager.scheduleCleanup();
}