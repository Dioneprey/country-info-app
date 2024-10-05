import { Country } from '@/@types/country'
import { api } from '@/lib/api'

export async function getAvailableCountries() {
  const { data } = await api.get<{countries: Country[]}>('/available-countries')

  return data
}

export async function getCountryInfo(id: string) {
  const { data } = await api.get<{country: Country}>(`/country/${id}`)

  return data
}