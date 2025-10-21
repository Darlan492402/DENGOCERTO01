"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"

interface ProductCardProps {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string
  theme: string
  ageRange: string
  isSubscription: boolean
}

export function ProductCard({
  id,
  name,
  description,
  price,
  imageUrl,
  theme,
  ageRange,
  isSubscription,
}: ProductCardProps) {
  const [imageError, setImageError] = useState(false)

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {!imageError ? (
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={name}
            fill
            unoptimized
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => {
              setImageError(true)
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
            <div className="text-center p-6">
              <div className="text-6xl mb-2">🎁</div>
              <p className="text-sm font-medium text-muted-foreground">{theme}</p>
            </div>
          </div>
        )}
        {isSubscription && (
          <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">Assinatura</Badge>
        )}
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-lg text-balance leading-tight">{name}</h3>
          <span className="text-lg font-bold text-primary whitespace-nowrap">
            R$ {price.toFixed(2).replace(".", ",")}
          </span>
        </div>
        <p className="text-sm text-muted-foreground text-pretty line-clamp-2">{description}</p>
        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs">
            {theme}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {ageRange}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button asChild className="w-full">
          <Link href={`/produto/${id}`}>Ver Detalhes</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
