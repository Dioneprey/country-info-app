import { Either, left, right } from 'src/core/either'
import { Injectable } from '@nestjs/common'
import { Country } from '../../enterprise/entities/country'
import { CountryRepository } from '../repository/country.repository'
import { ResourceNotFoundError } from './@errors/resource-not-found.error'

interface GetCountryInfoUseCaseRequest {
  countryCode: string
}

type GetCountryInfoUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    country: Country
  }
>

@Injectable()
export class GetCountryInfoUseCase {
  constructor(private countryRepository: CountryRepository) {}

  async execute({
    countryCode,
  }: GetCountryInfoUseCaseRequest): Promise<GetCountryInfoUseCaseResponse> {
    const country = await this.countryRepository.getCountryInfo(countryCode)

    if (!country) {
      return left(new ResourceNotFoundError(countryCode))
    }

    return right({
      country,
    })
  }
}
