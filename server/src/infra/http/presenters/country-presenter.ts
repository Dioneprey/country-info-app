import { Country } from 'src/domain/contry-info/enterprise/entities/country'

export class CountryPresenter {
  static toHTTP(country: Country | null) {
    if (country === null) {
      return {}
    }

    return {
      countryCode: country.countryCode ?? null,
      name: country.name ?? null,
      officialName: country.officialName ?? null,
      region: country?.region ?? null,
      flagUrl: country?.flagUrl ?? null,
      borders: country?.borders
        ? country.borders.map(CountryPresenter.toHTTP)
        : [],

      population: country.population
        ? country.population.map((item) => {
            return {
              year: item.year,
              value: item.value,
            }
          })
        : [],
    }
  }
}
