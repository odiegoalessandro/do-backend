import { Cache } from "./cache"

import Redis from "ioredis"

export const redisClient = new Redis({
  host: process.env.REDIS_HOST || "",
  port: process.env.REDIS_PORT ? parseInt(process.env.REDIS_PORT) : 6379
})

export class RedisCache<T = any> extends Cache<T> {
  private redis: Redis

  constructor(redis: Redis) {
    super()
    this.redis = redis
  }

  async get(key: string): Promise<T | undefined> {
    const raw = await this.redis.get(key)
    
    if (!raw) return undefined
    
    return JSON.parse(raw) as T
  }

  async set(key: string, value: T, ttlSeconds = 0): Promise<void> {
    const payload = JSON.stringify(value)

    if (ttlSeconds > 0) {
      await this.redis.set(key, payload, "EX", ttlSeconds)
    
      return
    }

    await this.redis.set(key, payload)
  }

  async delete(key: string): Promise<void> {
    await this.redis.del(key)
  }

  async clear(): Promise<void> {
    await this.redis.flushdb()
  }
}

export const redisCache = new RedisCache(redisClient)