import { Country } from "@/@types/country";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

interface CountryListCardProps {
  country: Country
}

export function CountryListCard({ country }: CountryListCardProps) {
  return (
    <Link href={`/country/${country.countryCode}`}>
      <Card className="hover:border-primary min-h-[150px]">
        <CardContent className="py-5 cursor-pointer ">
          <div className="flex gap-2 items-center">
            <Image src={country.flagUrl || 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Flag_of_None.svg'} width={30} height={30} alt="country-flag" />
            <span className="font-semibold text-lg">{country.countryCode}</span>
          </div>
          <div className="flex text-muted-foreground flex-col justify-end my-5">
            <span className="dark:text-white text-black">{country.name}</span>
            <span>{country.officialName}</span>
          </div>
          <Button className="w-full">
            Show
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}