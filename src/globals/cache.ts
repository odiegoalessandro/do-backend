export class Cache<T = any> {
  constructor() {
    if (new.target === Cache) {
      throw new TypeError('Cannot construct Cache instances directly')
    }
  }

  async get(key: string): Promise<T | undefined> {
    throw new Error('Method not implemented.')
  }

  async set(key: string, value: T, ttl?: number): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async delete(key: string): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async clear(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  async has(key: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  async keys(): Promise<string[]> {
    throw new Error('Method not implemented.')
  }

  async size(): Promise<number> {
    throw new Error('Method not implemented.')
  }
}