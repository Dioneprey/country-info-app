import { AxiosCountry } from '../mapper/axios-country-mapper'

export interface AxiosCountryResponse {
  countryCode: string
  name?: string
  commonName?: string
  officialName?: string | null
  region?: string | null
  borders?: AxiosCountry[] | null
}

export interface AxiosCountryPopulationsResponse {
  error: boolean
  msg: string
  data: {
    country: string
    code: string
    iso3: string
    populationCounts: {
      year: number
      value: number
    }[]
  }[]
}

export interface AxiosCountryFlagsResponse {
  error: boolean
  msg: string
  data: {
    name: string
    flag: string
    iso2: string
    iso3: string
  }[]
}
