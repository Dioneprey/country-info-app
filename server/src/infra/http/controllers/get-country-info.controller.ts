import {
  BadRequestException,
  Controller,
  HttpCode,
  NotFoundException,
  Param,
  Get,
} from '@nestjs/common'
import { ResourceNotFoundError } from 'src/domain/contry-info/application/use-cases/@errors/resource-not-found.error'
import { GetCountryInfoUseCase } from 'src/domain/contry-info/application/use-cases/get-country-info'
import { CountryPresenter } from '../presenters/country-presenter'

@Controller('/country/:countryCode')
export class GetCountryInfoController {
  constructor(private readonly getCountryInfoUseCase: GetCountryInfoUseCase) {}

  @Get()
  @HttpCode(200)
  async handle(@Param('countryCode') countryCode: string) {
    const result = await this.getCountryInfoUseCase.execute({
      countryCode,
    })

    if (result.isLeft()) {
      const error = result.value

      switch (error.constructor) {
        case ResourceNotFoundError:
          throw new NotFoundException(error.message)
        default:
          throw new BadRequestException(error.message)
      }
    }

    const country = result.value.country

    return {
      country: CountryPresenter.toHTTP(country),
    }
  }
}
