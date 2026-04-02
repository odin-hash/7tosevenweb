import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-none border border-zinc-500 bg-zinc-900 px-3 py-2 text-base text-white shadow-none transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-white placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white focus-visible:border-white disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props} />
  );
})
Input.displayName = "Input"

export { Input }
