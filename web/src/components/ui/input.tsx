import * as React from "react"

import { cn } from "@/lib/utils"
import { Label } from "./label"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, ...props }, ref) => {
    return (
      <div className="relative w-full flex flex-col justify-center">
        {label && (
          <Label
            className='absolute font-normal text-xs px-1 -top-2 left-2 bg-background'
            htmlFor={props.id}
          >
            {label}
          </Label>
        )}
        <input
          className={cn(
            'px-3 flex h-9 w-full rounded-md border border-input placeholder:text-muted-foreground bg-transparent py-6 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)
Input.displayName = "Input"

export { Input }
