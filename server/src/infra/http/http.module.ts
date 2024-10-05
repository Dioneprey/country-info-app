import { Module } from '@nestjs/common'
import { GetAvailableCountriesController } from './controllers/get-available-countries.controller'
import { GetAvailableCountriesUseCase } from 'src/domain/contry-info/application/use-cases/get-available-countries'
import { GetCountryInfoController } from './controllers/get-country-info.controller'
import { GetCountryInfoUseCase } from 'src/domain/contry-info/application/use-cases/get-country-info'
import { AxiosModule } from '../axios/axios.module'

@Module({
  imports: [AxiosModule],
  controllers: [GetAvailableCountriesController, GetCountryInfoController],
  providers: [GetAvailableCountriesUseCase, GetCountryInfoUseCase],
})
export class HttpModule {}
