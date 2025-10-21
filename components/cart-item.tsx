"use client"

import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Minus, Plus, Trash2 } from "@/lib/icons"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface CartItemProps {
  id: string
  productId: string
  name: string
  price: number
  imageUrl: string
  quantity: number
  theme: string
}

export function CartItem({ id, productId, name, price, imageUrl, quantity, theme }: CartItemProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return
    setIsLoading(true)
    const supabase = createClient()

    try {
      await supabase.from("cart").update({ quantity: newQuantity }).eq("id", id)
      router.refresh()
    } catch (error) {
      console.error("[v0] Error updating quantity:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const removeItem = async () => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      await supabase.from("cart").delete().eq("id", id)
      router.refresh()
    } catch (error) {
      console.error("[v0] Error removing item:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-md bg-muted">
            <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover" />
          </div>

          <div className="flex-1 space-y-2">
            <div className="flex justify-between items-start gap-2">
              <div>
                <h3 className="font-semibold text-balance leading-tight">{name}</h3>
                <Badge variant="outline" className="mt-1 text-xs">
                  {theme}
                </Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={removeItem} disabled={isLoading}>
                <Trash2 className="h-4 w-4 text-destructive" />
                <span className="sr-only">Remover</span>
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => updateQuantity(quantity - 1)}
                  disabled={isLoading || quantity <= 1}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                  onClick={() => updateQuantity(quantity + 1)}
                  disabled={isLoading}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>

              <p className="font-bold text-lg text-primary">R$ {(price * quantity).toFixed(2).replace(".", ",")}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
