// mongoose.module.ts
import { Module } from '@nestjs/common'
import { HttpModule as AxiosHttpModule } from '@nestjs/axios'
import { CountryRepository } from 'src/domain/contry-info/application/repository/country.repository'
import { AxiosCountryRepository } from './repository/axios-country-repository'
import { CacheRedisModule } from '../cache/redis-cache.module'

@Module({
  imports: [AxiosHttpModule, CacheRedisModule],
  providers: [
    {
      provide: CountryRepository,
      useClass: AxiosCountryRepository,
    },
  ],
  exports: [CountryRepository],
})
export class AxiosModule {}
