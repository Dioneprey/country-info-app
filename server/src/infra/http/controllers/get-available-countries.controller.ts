import { BadRequestException, Controller, Get, HttpCode } from '@nestjs/common'
import { GetAvailableCountriesUseCase } from 'src/domain/contry-info/application/use-cases/get-available-countries'
import { CountryPresenter } from '../presenters/country-presenter'

@Controller('/available-countries')
export class GetAvailableCountriesController {
  constructor(
    private readonly getAvailableCountries: GetAvailableCountriesUseCase,
  ) {}

  @Get()
  @HttpCode(200)
  async handle() {
    const result = await this.getAvailableCountries.execute()

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const countries = result.value.countries

    return {
      countries: countries.map(CountryPresenter.toHTTP),
    }
  }
}
