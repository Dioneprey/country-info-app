export type Country = {
  countryCode: string
  name: string
  officialName: string
  region: string
  flagUrl: string
  borders: Country[],
  population: {
    year: number
    value: number
  }[]
}
