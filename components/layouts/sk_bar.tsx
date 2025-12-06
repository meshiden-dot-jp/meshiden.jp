import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"

const sk_bar = () => {
  return (
    <div>
    {[...Array(10)].map((_, index) => (
        <div key={index}>
            <Skeleton className="w-full h-[48px] rounded-xl mt-2" />
        </div>
    ))}
</div>
  )
}

export default sk_bar