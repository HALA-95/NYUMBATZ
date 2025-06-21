/**
 * OPTIMIZED DATA STRUCTURES - ALGORITHM EFFICIENCY
 * 
 * Custom data structures for optimal performance in property management.
 * Includes spatial indexing, search trees, and efficient caching.
 */

/**
 * SPATIAL INDEX FOR LOCATION-BASED SEARCH
 * 
 * Efficiently finds properties within geographic bounds.
 * Uses quadtree-like structure for O(log n) location queries.
 */
export class SpatialIndex {
  private grid: Map<string, Set<string>> = new Map();
  private readonly gridSize: number;

  constructor(gridSize: number = 0.01) { // ~1km grid cells
    this.gridSize = gridSize;
  }

  private getGridKey(lat: number, lng: number): string {
    const gridLat = Math.floor(lat / this.gridSize);
    const gridLng = Math.floor(lng / this.gridSize);
    return `${gridLat},${gridLng}`;
  }

  addProperty(id: string, lat: number, lng: number): void {
    const key = this.getGridKey(lat, lng);
    if (!this.grid.has(key)) {
      this.grid.set(key, new Set());
    }
    this.grid.get(key)!.add(id);
  }

  removeProperty(id: string, lat: number, lng: number): void {
    const key = this.getGridKey(lat, lng);
    const cell = this.grid.get(key);
    if (cell) {
      cell.delete(id);
      if (cell.size === 0) {
        this.grid.delete(key);
      }
    }
  }

  findNearby(lat: number, lng: number, radiusKm: number): Set<string> {
    const result = new Set<string>();
    const gridRadius = Math.ceil(radiusKm / (this.gridSize * 111)); // Approximate km per degree

    for (let i = -gridRadius; i <= gridRadius; i++) {
      for (let j = -gridRadius; j <= gridRadius; j++) {
        const checkLat = lat + (i * this.gridSize);
        const checkLng = lng + (j * this.gridSize);
        const key = this.getGridKey(checkLat, checkLng);
        const cell = this.grid.get(key);
        
        if (cell) {
          cell.forEach(id => result.add(id));
        }
      }
    }

    return result;
  }
}

/**
 * TRIE FOR FAST TEXT SEARCH
 * 
 * Enables instant search suggestions and autocomplete.
 * O(m) search time where m is query length.
 */
export class SearchTrie {
  private root: TrieNode = new TrieNode();

  addProperty(property: { id: string; title: string; city: string; amenities: string[] }): void {
    const words = [
      ...property.title.toLowerCase().split(/\s+/),
      property.city.toLowerCase(),
      ...property.amenities.map(a => a.toLowerCase())
    ];

    words.forEach(word => {
      if (word.length > 2) { // Only index words longer than 2 characters
        this.insertWord(word, property.id);
      }
    });
  }

  private insertWord(word: string, propertyId: string): void {
    let current = this.root;
    
    for (const char of word) {
      if (!current.children.has(char)) {
        current.children.set(char, new TrieNode());
      }
      current = current.children.get(char)!;
      current.propertyIds.add(propertyId);
    }
  }

  search(prefix: string): Set<string> {
    if (prefix.length < 2) return new Set();
    
    let current = this.root;
    const lowerPrefix = prefix.toLowerCase();
    
    for (const char of lowerPrefix) {
      if (!current.children.has(char)) {
        return new Set();
      }
      current = current.children.get(char)!;
    }
    
    return current.propertyIds;
  }

  getSuggestions(prefix: string, limit: number = 10): string[] {
    if (prefix.length < 2) return [];
    
    let current = this.root;
    const lowerPrefix = prefix.toLowerCase();
    
    for (const char of lowerPrefix) {
      if (!current.children.has(char)) {
        return [];
      }
      current = current.children.get(char)!;
    }
    
    const suggestions: string[] = [];
    this.collectWords(current, lowerPrefix, suggestions, limit);
    return suggestions;
  }

  private collectWords(node: TrieNode, prefix: string, suggestions: string[], limit: number): void {
    if (suggestions.length >= limit) return;
    
    if (node.propertyIds.size > 0) {
      suggestions.push(prefix);
    }
    
    for (const [char, child] of node.children) {
      this.collectWords(child, prefix + char, suggestions, limit);
    }
  }
}

class TrieNode {
  children: Map<string, TrieNode> = new Map();
  propertyIds: Set<string> = new Set();
}

/**
 * LRU CACHE FOR EFFICIENT MEMORY MANAGEMENT
 * 
 * Keeps frequently accessed data in memory while managing memory usage.
 * O(1) get and put operations.
 */
export class LRUCache<K, V> {
  private capacity: number;
  private cache: Map<K, V> = new Map();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: K): V | undefined {
    if (this.cache.has(key)) {
      // Move to end (most recently used)
      const value = this.cache.get(key)!;
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return undefined;
  }

  set(key: K, value: V): void {
    if (this.cache.has(key)) {
      // Update existing
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Remove least recently used (first item)
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    
    this.cache.set(key, value);
  }

  has(key: K): boolean {
    return this.cache.has(key);
  }

  delete(key: K): boolean {
    return this.cache.delete(key);
  }

  clear(): void {
    this.cache.clear();
  }

  size(): number {
    return this.cache.size;
  }
}

/**
 * BLOOM FILTER FOR FAST EXISTENCE CHECKS
 * 
 * Quickly check if a property might exist without false negatives.
 * Useful for avoiding expensive database queries.
 */
export class BloomFilter {
  private bitArray: boolean[];
  private size: number;
  private hashFunctions: number;

  constructor(expectedElements: number, falsePositiveRate: number = 0.01) {
    this.size = Math.ceil((-expectedElements * Math.log(falsePositiveRate)) / (Math.log(2) ** 2));
    this.hashFunctions = Math.ceil((this.size / expectedElements) * Math.log(2));
    this.bitArray = new Array(this.size).fill(false);
  }

  private hash(item: string, seed: number): number {
    let hash = seed;
    for (let i = 0; i < item.length; i++) {
      hash = ((hash << 5) + hash + item.charCodeAt(i)) & 0xffffffff;
    }
    return Math.abs(hash) % this.size;
  }

  add(item: string): void {
    for (let i = 0; i < this.hashFunctions; i++) {
      const index = this.hash(item, i);
      this.bitArray[index] = true;
    }
  }

  mightContain(item: string): boolean {
    for (let i = 0; i < this.hashFunctions; i++) {
      const index = this.hash(item, i);
      if (!this.bitArray[index]) {
        return false;
      }
    }
    return true;
  }
}

/**
 * PRIORITY QUEUE FOR SEARCH RANKING
 * 
 * Efficiently maintains top search results by relevance score.
 * O(log n) insertion and extraction.
 */
export class PriorityQueue<T> {
  private heap: Array<{ item: T; priority: number }> = [];

  private parent(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private leftChild(index: number): number {
    return 2 * index + 1;
  }

  private rightChild(index: number): number {
    return 2 * index + 2;
  }

  private swap(i: number, j: number): void {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private heapifyUp(index: number): void {
    while (index > 0) {
      const parentIndex = this.parent(index);
      if (this.heap[parentIndex].priority >= this.heap[index].priority) {
        break;
      }
      this.swap(parentIndex, index);
      index = parentIndex;
    }
  }

  private heapifyDown(index: number): void {
    while (this.leftChild(index) < this.heap.length) {
      const leftIndex = this.leftChild(index);
      const rightIndex = this.rightChild(index);
      
      let maxIndex = leftIndex;
      if (rightIndex < this.heap.length && 
          this.heap[rightIndex].priority > this.heap[leftIndex].priority) {
        maxIndex = rightIndex;
      }
      
      if (this.heap[index].priority >= this.heap[maxIndex].priority) {
        break;
      }
      
      this.swap(index, maxIndex);
      index = maxIndex;
    }
  }

  enqueue(item: T, priority: number): void {
    this.heap.push({ item, priority });
    this.heapifyUp(this.heap.length - 1);
  }

  dequeue(): T | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop()!.item;
    
    const max = this.heap[0].item;
    this.heap[0] = this.heap.pop()!;
    this.heapifyDown(0);
    
    return max;
  }

  peek(): T | undefined {
    return this.heap.length > 0 ? this.heap[0].item : undefined;
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}