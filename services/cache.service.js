// Simple in-memory cache with expiration
class CacheService {
  constructor(ttl = 3600000) { // Default 1 hour
    this.cache = new Map();
    this.ttl = ttl;
  }

  get(key) {
    const item = this.cache.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiredAt) {
      this.cache.delete(key);
      return null;
    }
    
    return item.value;
  }

  set(key, value) {
    this.cache.set(key, {
      value,
      expiredAt: Date.now() + this.ttl,
    });
  }

  clear() {
    this.cache.clear();
  }
}

export default new CacheService();
