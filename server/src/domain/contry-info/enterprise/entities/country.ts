/* eslint-disable no-use-before-define */
import { Entity } from 'src/core/entities/entity'

interface CountryPopulation {
  year: number
  value: number
}

export interface CountryProps {
  countryCode: string
  name: string
  officialName?: string | null
  region?: string | null
  flagUrl?: string | null
  borders?: Country[]
  population?: CountryPopulation[]
}

export class Country extends Entity<CountryProps> {
  get countryCode() {
    return this.props.countryCode
  }

  set countryCode(countryCode: string) {
    this.props.countryCode = countryCode
  }

  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
  }

  get officialName() {
    return this.props.officialName
  }

  set officialName(officialName: string | null | undefined) {
    this.props.officialName = officialName
  }

  get region() {
    return this.props.region
  }

  set region(region: string | null | undefined) {
    this.props.region = region
  }

  get flagUrl() {
    return this.props.flagUrl
  }

  set flagUrl(flagUrl: string | null | undefined) {
    this.props.flagUrl = flagUrl
  }

  get borders() {
    return this.props.borders
  }

  set borders(borders: Country[] | undefined) {
    this.props.borders = borders
  }

  get population() {
    return this.props.population
  }

  set population(population: CountryPopulation[] | undefined) {
    this.props.population = population
  }

  static create(props: CountryProps) {
    const country = new Country(props)

    return country
  }
}
