'use client'

import { CountryListCard } from "@/components/country-list-card"
import { CountryPopulationChart } from "@/components/country-population-chart"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getCountryInfo } from "@/services/country"
import { convertDataToChart } from "@/utils/format-population-to-chart"
import { useQuery } from "@tanstack/react-query"
import { ArrowDown, ArrowUp } from "lucide-react"
import Image from "next/image"
import { useParams } from "next/navigation"

export default function CountryDetails() {
  const { id } = useParams()

  const { data: countryData } = useQuery({
    queryKey: ['countries', String(id)],
    queryFn: () => getCountryInfo(String(id)),
    enabled: !!id
  })

  const lastIndex = (countryData?.country?.population?.length ?? 1) - 1
  const lastPopulationData = countryData?.country.population[lastIndex]
  const secondLastPopulationData = countryData?.country.population[lastIndex - 1]

  const percentageChange = (((lastPopulationData?.value ?? 0) - (secondLastPopulationData?.value ?? 0)) / (secondLastPopulationData?.value ?? 0)) * 100

  return (
    <div>
      <div>
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="text-4xl font-bold">{countryData?.country.name}</h1>
            <Image src={countryData?.country?.flagUrl || 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Flag_of_None.svg'} width={30} height={30} alt="country-flag" />
          </div>
          <h2 className="text-xl font-normal text-muted-foreground">{countryData?.country.officialName}</h2>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2">
        <Card className="py-5 w-full min-w-[300px] max-w-[400px]">
          <CardContent>
            <div className="flex flex-col gap-2">
              <span className="text-lg">Population: </span>
              <div className="flex items-center gap-10">
                <span className="text-4xl font-bold">{lastPopulationData?.value.toLocaleString('en-US')}</span>
                <span className={`${percentageChange < 0 ? 'text-red-500' : 'text-green-500'} flex gap-1 items-center`}>
                  {
                    percentageChange > 0 ? <ArrowUp /> : <ArrowDown />
                  }
                  {percentageChange.toFixed(2)}%
                </span>
              </div>
              <span className="text-muted-foreground text-md">Compared to last year</span>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <span className="text-lg">Border Countries: </span>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="mt-10">
        <CountryPopulationChart chartData={convertDataToChart(countryData?.country.population ?? [])} />
      </div>
      <div className="my-5 text-3xl font-bold">Borders: </div>
      <div className="pb-5 grid xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 overflow-y-auto">
        {countryData?.country?.borders?.map((country, index) => {
          return <CountryListCard key={index} country={country} />
        })}
      </div>
    </div>
  )
}