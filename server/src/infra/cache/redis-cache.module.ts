import { RedisModule, RedisModuleOptions } from '@liaoliaots/nestjs-redis'
import { Module } from '@nestjs/common'
import { RedisCacheRepository } from './redis-cache.repository'
import { EnvModule } from '../env/env.module'
import { EnvService } from '../env/env.service'

@Module({
  imports: [
    RedisModule.forRootAsync({
      imports: [EnvModule],
      inject: [EnvService],
      // @ts-expect-error use-factory arg type is unknown[]
      useFactory: async (
        envService: EnvService,
      ): Promise<RedisModuleOptions> => {
        return {
          config: {
            host: envService.get('REDIS_HOST'),
            port: envService.get('REDIS_PORT'),
          },
        }
      },
    }),
  ],
  providers: [RedisCacheRepository],
  exports: [RedisCacheRepository],
})
export class CacheRedisModule {}
