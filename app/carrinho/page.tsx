"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShoppingBag, Trash2 } from "@/lib/icons"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

interface CartItem {
  id: string
  productId: string
  productName: string
  price: number
  quantity: number
  imageUrl: string
  personalization?: {
    cardMessage?: string
    babyName?: string
    themes?: string[]
  }
}

export default function CarrinhoPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail")
    if (!userEmail) {
      router.push("/auth/login")
      return
    }

    const savedCart = localStorage.getItem("cart")
    console.log("[v0] Loading cart:", savedCart)
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCartItems(parsedCart)
        console.log("[v0] Cart loaded:", parsedCart)
      } catch (error) {
        console.error("[v0] Error parsing cart:", error)
      }
    }
    setIsLoading(false)
  }, [router])

  const removeItem = (itemId: string) => {
    const updatedCart = cartItems.filter((item) => item.id !== itemId)
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    console.log("[v0] Item removed, cart updated:", updatedCart)
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    const updatedCart = cartItems.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    setCartItems(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
    console.log("[v0] Quantity updated, cart:", updatedCart)
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p>Carregando...</p>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-6xl">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance">Carrinho de Compras</h1>
              <p className="text-muted-foreground mt-2">
                {cartItems.length} {cartItems.length === 1 ? "item" : "itens"} no carrinho
              </p>
            </div>

            {cartItems.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                  {cartItems.map((item) => (
                    <Card key={item.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={item.imageUrl || "/placeholder.svg"}
                              alt={item.productName}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-1 flex-col justify-between">
                            <div>
                              <h3 className="font-semibold">{item.productName}</h3>
                              {item.personalization?.babyName && (
                                <p className="text-sm text-muted-foreground">Para: {item.personalization.babyName}</p>
                              )}
                              {item.personalization?.cardMessage && (
                                <p className="text-sm text-muted-foreground italic">
                                  "{item.personalization.cardMessage}"
                                </p>
                              )}
                              <p className="text-lg font-bold text-primary mt-1">
                                R$ {item.price.toFixed(2).replace(".", ",")}
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  -
                                </Button>
                                <span className="w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </Button>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeItem(item.id)}
                                className="text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="lg:col-span-1">
                  <Card className="sticky top-20">
                    <CardHeader>
                      <CardTitle>Resumo do Pedido</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Subtotal</span>
                          <span>R$ {total.toFixed(2).replace(".", ",")}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Frete</span>
                          <span className="text-green-600">Grátis</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-bold text-lg">
                          <span>Total</span>
                          <span className="text-primary">R$ {total.toFixed(2).replace(".", ",")}</span>
                        </div>
                      </div>

                      <Button asChild className="w-full" size="lg">
                        <Link href="/checkout">Finalizar Compra</Link>
                      </Button>

                      <Button asChild variant="outline" className="w-full bg-transparent">
                        <Link href="/">Continuar Comprando</Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
                  <div className="rounded-full bg-muted p-6">
                    <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Carrinho vazio</h3>
                    <p className="text-muted-foreground">Adicione produtos para começar suas compras</p>
                  </div>
                  <Button asChild size="lg">
                    <Link href="/">Ver Produtos</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
