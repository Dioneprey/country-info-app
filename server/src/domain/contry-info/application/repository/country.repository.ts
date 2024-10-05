import { Country } from '../../enterprise/entities/country'

export abstract class CountryRepository {
  abstract getAvailableCountries(): Promise<Country[]>
  abstract getCountryInfo(countryCode: string): Promise<Country | null>
}
