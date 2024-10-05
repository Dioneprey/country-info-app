import { RedisService } from '@liaoliaots/nestjs-redis'
import { Injectable } from '@nestjs/common'
import Redis from 'ioredis'

@Injectable()
export class RedisCacheRepository {
  private readonly redis: Redis
  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getOrThrow()
  }

  async set<T>({ data, key }: { data: T; key: string }): Promise<void> {
    // key -> the key where Redis will save the data
    // JSON.stringify(data) -> save the data in JSON format
    // EX -> used to indicate that the time will be specified in seconds
    // ONE_WEEK_IN_SECONDS -> 60s * 60m * 24h * 7 = 7 days of cache

    const ONE_WEEK_IN_SECONDS = 60 * 60 * 24 * 7 // 60s * 60m * 24h * 7

    await this.redis.set(key, JSON.stringify(data), 'EX', ONE_WEEK_IN_SECONDS)
  }

  async get<T>(key: string): Promise<T | null> {
    // returns the saved data from the key
    const data = await this.redis.get(key)

    return data ? (JSON.parse(data) as T) : null
  }
}
