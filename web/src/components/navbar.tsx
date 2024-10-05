import { ModeToggle } from '@/components/mode-toggle'
import { Home } from 'lucide-react'
import Link from 'next/link'

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 w-full bg-background shadow backdrop-blur dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center">
        <Link href="/" className="flex items-center font-bold">
          <Home />
        </Link>
        <div className="flex flex-1 items-center justify-end">
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}
