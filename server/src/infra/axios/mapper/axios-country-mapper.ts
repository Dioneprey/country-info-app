import { Country } from 'src/domain/contry-info/enterprise/entities/country'

export interface AxiosCountry {
  countryCode: string
  name?: string
  commonName?: string
  officialName?: string | null
  region?: string | null
  borders?: AxiosCountry[] | null
  population?: {
    year: number
    value: number
  }[]
  flags?: {
    name: string
    flag: string
    iso2: string
    iso3: string
  }
}

export class AxiosCountryMapper {
  static toDomain(raw: AxiosCountry): Country {
    return Country.create({
      countryCode: raw.countryCode,
      name: (raw.name || raw.commonName) ?? '',
      officialName: raw.officialName,
      borders: raw?.borders ? raw.borders.map(AxiosCountryMapper.toDomain) : [],
      region: raw?.region,
      flagUrl: raw?.flags?.flag,
      population: raw.population
        ? raw.population.map((item) => {
            return {
              year: item?.year,
              value: item?.value,
            }
          })
        : [],
    })
  }
}
