import { Either, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { Country } from '../../enterprise/entities/country'
import { CountryRepository } from '../repository/country.repository'

type GetAvailableCountriesResponse = Either<
  undefined,
  {
    countries: Country[]
  }
>

@Injectable()
export class GetAvailableCountriesUseCase {
  constructor(private countryRepository: CountryRepository) {}

  async execute(): Promise<GetAvailableCountriesResponse> {
    const countries = await this.countryRepository.getAvailableCountries()

    return right({
      countries,
    })
  }
}
