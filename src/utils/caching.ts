/**
 * ADVANCED CACHING SYSTEM - MEMORY & PERFORMANCE OPTIMIZATION
 * 
 * Multi-level caching system with intelligent eviction policies.
 * Reduces API calls, improves response times, and manages memory efficiently.
 */

import { LRUCache } from './dataStructures';

/**
 * CACHE LEVELS
 * 
 * L1: In-memory cache (fastest, smallest)
 * L2: Session storage (medium speed, medium size)
 * L3: Local storage (slower, larger, persistent)
 */

export class MultiLevelCache {
  private l1Cache: LRUCache<string, any>;
  private l2Cache: Storage | null;
  private l3Cache: Storage | null;
  private readonly l1Size: number;
  private readonly l2Prefix: string;
  private readonly l3Prefix: string;
  private readonly defaultTTL: number;

  constructor(
    l1Size: number = 100,
    l2Prefix: string = 'nyumba_l2_',
    l3Prefix: string = 'nyumba_l3_',
    defaultTTL: number = 5 * 60 * 1000 // 5 minutes
  ) {
    this.l1Cache = new LRUCache(l1Size);
    this.l2Cache = typeof sessionStorage !== 'undefined' ? sessionStorage : null;
    this.l3Cache = typeof localStorage !== 'undefined' ? localStorage : null;
    this.l1Size = l1Size;
    this.l2Prefix = l2Prefix;
    this.l3Prefix = l3Prefix;
    this.defaultTTL = defaultTTL;
  }

  /**
   * GET WITH CACHE HIERARCHY
   * Checks L1 -> L2 -> L3 in order
   */
  get<T>(key: string): T | null {
    // Check L1 cache first
    const l1Result = this.l1Cache.get(key);
    if (l1Result !== undefined) {
      return l1Result;
    }

    // Check L2 cache (session storage)
    if (this.l2Cache) {
      const l2Key = this.l2Prefix + key;
      const l2Data = this.l2Cache.getItem(l2Key);
      if (l2Data) {
        try {
          const parsed = JSON.parse(l2Data);
          if (this.isValid(parsed)) {
            // Promote to L1
            this.l1Cache.set(key, parsed.data);
            return parsed.data;
          } else {
            // Expired, remove from L2
            this.l2Cache.removeItem(l2Key);
          }
        } catch (error) {
          console.warn('L2 cache parse error:', error);
          this.l2Cache.removeItem(l2Key);
        }
      }
    }

    // Check L3 cache (local storage)
    if (this.l3Cache) {
      const l3Key = this.l3Prefix + key;
      const l3Data = this.l3Cache.getItem(l3Key);
      if (l3Data) {
        try {
          const parsed = JSON.parse(l3Data);
          if (this.isValid(parsed)) {
            // Promote to L1 and L2
            this.l1Cache.set(key, parsed.data);
            if (this.l2Cache) {
              this.l2Cache.setItem(this.l2Prefix + key, l3Data);
            }
            return parsed.data;
          } else {
            // Expired, remove from L3
            this.l3Cache.removeItem(l3Key);
          }
        } catch (error) {
          console.warn('L3 cache parse error:', error);
          this.l3Cache.removeItem(l3Key);
        }
      }
    }

    return null;
  }

  /**
   * SET WITH CACHE HIERARCHY
   * Stores in all available cache levels
   */
  set<T>(key: string, data: T, ttl: number = this.defaultTTL, persistent: boolean = false): void {
    const cacheEntry = {
      data,
      timestamp: Date.now(),
      ttl
    };

    // Store in L1
    this.l1Cache.set(key, data);

    // Store in L2 (session storage)
    if (this.l2Cache) {
      try {
        this.l2Cache.setItem(this.l2Prefix + key, JSON.stringify(cacheEntry));
      } catch (error) {
        console.warn('L2 cache storage error:', error);
        this.cleanupL2Cache();
      }
    }

    // Store in L3 (local storage) if persistent
    if (persistent && this.l3Cache) {
      try {
        this.l3Cache.setItem(this.l3Prefix + key, JSON.stringify(cacheEntry));
      } catch (error) {
        console.warn('L3 cache storage error:', error);
        this.cleanupL3Cache();
      }
    }
  }

  /**
   * DELETE FROM ALL CACHE LEVELS
   */
  delete(key: string): void {
    this.l1Cache.delete(key);
    
    if (this.l2Cache) {
      this.l2Cache.removeItem(this.l2Prefix + key);
    }
    
    if (this.l3Cache) {
      this.l3Cache.removeItem(this.l3Prefix + key);
    }
  }

  /**
   * CLEAR ALL CACHE LEVELS
   */
  clear(): void {
    this.l1Cache.clear();
    this.clearL2Cache();
    this.clearL3Cache();
  }

  /**
   * CHECK IF CACHE ENTRY IS VALID
   */
  private isValid(entry: any): boolean {
    if (!entry || typeof entry !== 'object') return false;
    if (!entry.timestamp || !entry.ttl) return false;
    
    const now = Date.now();
    return (now - entry.timestamp) < entry.ttl;
  }

  /**
   * CLEANUP EXPIRED ENTRIES
   */
  cleanup(): void {
    this.cleanupL2Cache();
    this.cleanupL3Cache();
  }

  private cleanupL2Cache(): void {
    if (!this.l2Cache) return;
    
    const keysToRemove: string[] = [];
    for (let i = 0; i < this.l2Cache.length; i++) {
      const key = this.l2Cache.key(i);
      if (key && key.startsWith(this.l2Prefix)) {
        try {
          const data = this.l2Cache.getItem(key);
          if (data) {
            const parsed = JSON.parse(data);
            if (!this.isValid(parsed)) {
              keysToRemove.push(key);
            }
          }
        } catch (error) {
          keysToRemove.push(key);
        }
      }
    }
    
    keysToRemove.forEach(key => this.l2Cache!.removeItem(key));
  }

  private cleanupL3Cache(): void {
    if (!this.l3Cache) return;
    
    const keysToRemove: string[] = [];
    for (let i = 0; i < this.l3Cache.length; i++) {
      const key = this.l3Cache.key(i);
      if (key && key.startsWith(this.l3Prefix)) {
        try {
          const data = this.l3Cache.getItem(key);
          if (data) {
            const parsed = JSON.parse(data);
            if (!this.isValid(parsed)) {
              keysToRemove.push(key);
            }
          }
        } catch (error) {
          keysToRemove.push(key);
        }
      }
    }
    
    keysToRemove.forEach(key => this.l3Cache!.removeItem(key));
  }

  private clearL2Cache(): void {
    if (!this.l2Cache) return;
    
    const keysToRemove: string[] = [];
    for (let i = 0; i < this.l2Cache.length; i++) {
      const key = this.l2Cache.key(i);
      if (key && key.startsWith(this.l2Prefix)) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => this.l2Cache!.removeItem(key));
  }

  private clearL3Cache(): void {
    if (!this.l3Cache) return;
    
    const keysToRemove: string[] = [];
    for (let i = 0; i < this.l3Cache.length; i++) {
      const key = this.l3Cache.key(i);
      if (key && key.startsWith(this.l3Prefix)) {
        keysToRemove.push(key);
      }
    }
    
    keysToRemove.forEach(key => this.l3Cache!.removeItem(key));
  }

  /**
   * GET CACHE STATISTICS
   */
  getStats(): {
    l1Size: number;
    l2Size: number;
    l3Size: number;
    l1MaxSize: number;
  } {
    let l2Size = 0;
    let l3Size = 0;

    if (this.l2Cache) {
      for (let i = 0; i < this.l2Cache.length; i++) {
        const key = this.l2Cache.key(i);
        if (key && key.startsWith(this.l2Prefix)) {
          l2Size++;
        }
      }
    }

    if (this.l3Cache) {
      for (let i = 0; i < this.l3Cache.length; i++) {
        const key = this.l3Cache.key(i);
        if (key && key.startsWith(this.l3Prefix)) {
          l3Size++;
        }
      }
    }

    return {
      l1Size: this.l1Cache.size(),
      l2Size,
      l3Size,
      l1MaxSize: this.l1Size
    };
  }
}

// Global cache instance
export const globalCache = new MultiLevelCache();

// Automatic cleanup every 10 minutes
if (typeof window !== 'undefined') {
  setInterval(() => {
    globalCache.cleanup();
  }, 10 * 60 * 1000);
}