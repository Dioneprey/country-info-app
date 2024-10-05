import { firstValueFrom } from 'rxjs'
import { Injectable } from '@nestjs/common'
import { HttpService } from '@nestjs/axios'
import { CountryRepository } from 'src/domain/contry-info/application/repository/country.repository'
import { AxiosCountryMapper } from '../mapper/axios-country-mapper'
import {
  AxiosCountryFlagsResponse,
  AxiosCountryPopulationsResponse,
  AxiosCountryResponse,
} from '../@types/axios.response.interface'
import { RedisCacheRepository } from 'src/infra/cache/redis-cache.repository'

@Injectable()
export class AxiosCountryRepository implements CountryRepository {
  constructor(
    private httpService: HttpService,
    private redisCacheRepository: RedisCacheRepository,
  ) {}

  async getAvailableCountries() {
    const countriesCache =
      await this.redisCacheRepository.get('AvailableCountries')
    const flagsCache = await this.redisCacheRepository.get('CountriesFlags')

    let countries
    let flagsData

    if (!countriesCache || !flagsCache) {
      // Buscar dados das APIs se não estiverem no cache
      const [countriesResponse, flagDataResponse] = await Promise.all([
        firstValueFrom(
          this.httpService.get<AxiosCountryResponse[]>(
            'https://date.nager.at/api/v3/AvailableCountries',
          ),
        ),
        firstValueFrom(
          this.httpService.get<AxiosCountryFlagsResponse>(
            'https://countriesnow.space/api/v0.1/countries/flag/images',
          ),
        ),
      ])

      countries = countriesResponse.data
      flagsData = flagDataResponse.data // Corrigido para acessar diretamente os dados

      // Armazenar dados no cache
      await Promise.all([
        this.redisCacheRepository.set({
          data: countries,
          key: 'AvailableCountries',
        }),
        this.redisCacheRepository.set({
          data: flagsData,
          key: 'CountriesFlags',
        }),
      ])
    } else {
      countries = countriesCache
      flagsData = flagsCache
    }

    const countriesWithFlag = countries.map((country) => {
      const countryFlag = flagsData.data.find(
        (item) => item.iso2 === country.countryCode,
      )
      return {
        ...country,
        flags: countryFlag,
      }
    })

    return countriesWithFlag.map(AxiosCountryMapper.toDomain)
  }

  async getCountryInfo(countryCode: string) {
    const countryInfoCache = await this.redisCacheRepository.get(
      `Country:${countryCode}`,
    )
    const flagsCache = await this.redisCacheRepository.get('CountriesFlags')
    const populationCache = await this.redisCacheRepository.get(
      'CountriesPopulation',
    )

    let flagData
    let populationData

    if (flagsCache && populationCache) {
      // Se os dados estiverem no cache, use-os
      flagData = flagsCache
      populationData = populationCache
    } else {
      // Se os dados não estiverem no cache, faça as requisições HTTP
      const [flagDataResponse, populationDataResponse] = await Promise.all([
        firstValueFrom(
          this.httpService.get<AxiosCountryFlagsResponse>(
            'https://countriesnow.space/api/v0.1/countries/flag/images',
          ),
        ),
        firstValueFrom(
          this.httpService.get<AxiosCountryPopulationsResponse>(
            'https://countriesnow.space/api/v0.1/countries/population',
          ),
        ),
      ])

      // Extração dos dados relevantes
      flagData = flagDataResponse.data
      populationData = populationDataResponse.data

      // Armazene os dados no cache
      await Promise.all([
        this.redisCacheRepository.set({
          key: 'CountriesFlags',
          data: flagData,
        }),
        this.redisCacheRepository.set({
          key: 'CountriesPopulation',
          data: populationData,
        }),
      ])
    }

    let countryInfo

    if (countryInfoCache) {
      countryInfo = countryInfoCache
    } else {
      const countryInfoResponse = await firstValueFrom(
        this.httpService.get<AxiosCountryResponse>(
          `https://date.nager.at/api/v3/CountryInfo/${countryCode}`,
        ),
      )

      countryInfo = countryInfoResponse.data

      this.redisCacheRepository.set({
        key: `Country:${countryCode}`,
        data: countryInfo,
      })
    }

    const countryFlag = flagData.data.find((item) => {
      return item?.iso2 === countryInfo?.countryCode
    })

    const countryPopulation =
      populationData?.data?.find((item) => {
        if (countryFlag?.iso3) {
          return item?.iso3 === countryFlag?.iso3
        } else return item?.country === countryInfo?.commonName
      })?.populationCounts || []

    const countriesBorders = countryInfo?.borders?.map((border) => {
      const borderCountryFlag = flagData?.data?.find(
        (item) => item?.iso2 === border?.countryCode,
      )

      const borderCountryPopulationData =
        populationData?.data?.find((item) => {
          if (borderCountryFlag?.iso3) {
            return item?.iso3 === borderCountryFlag?.iso3
          } else {
            return item?.country === border?.commonName
          }
        })?.populationCounts || []

      // Obter o último registro de população do país fronteiriço
      const lastBorderCountryPopulation = borderCountryPopulationData.length
        ? borderCountryPopulationData[borderCountryPopulationData.length - 1]
        : null

      return {
        ...border,
        flags: borderCountryFlag,
        population: [lastBorderCountryPopulation],
      }
    })

    return AxiosCountryMapper?.toDomain({
      countryCode: countryInfo?.countryCode,
      commonName: countryInfo?.commonName,
      officialName: countryInfo?.officialName,
      region: countryInfo?.region,
      borders: countriesBorders,
      flags: countryFlag,
      population: countryPopulation,
    })
  }
}
