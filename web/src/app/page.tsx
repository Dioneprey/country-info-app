'use client'

import { CountryListCard } from "@/components/country-list-card";
import { getAvailableCountries } from "@/services/country";
import { useQuery } from "@tanstack/react-query";

export default function Home() {  
  const { data: countriesData } = useQuery({
    queryKey: ['countries'],
    queryFn: () => getAvailableCountries(),
  })

  return (
    <div>
      <div>
        <h1 className="text-4xl font-bold">the Country Info App</h1>
        <h2 className="text-xl font-normal">Discover some information about all countries</h2>
      </div>
      <div className="pb-10 px-3 mt-5 max-h-[500px] grid xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 overflow-y-auto">
        {countriesData?.countries.map((country, index) => {
          return <CountryListCard key={index} country={country} />
        })}
      </div>
    </div>
  )
}
