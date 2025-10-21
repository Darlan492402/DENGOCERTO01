"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { products } from "@/lib/mock-data"

interface CartItem {
  productId: string
  quantity: number
}

export default function CheckoutPage() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [userEmail, setUserEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    if (!email) {
      router.push("/auth/login")
      return
    }
    setUserEmail(email)

    const cartKey = `cart_${email}`
    const savedCart = localStorage.getItem(cartKey)
    const items: CartItem[] = savedCart ? JSON.parse(savedCart) : []

    if (items.length === 0) {
      router.push("/carrinho")
      return
    }

    setCartItems(items)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Carregando...</p>
        </main>
        <Footer />
      </div>
    )
  }

  const cartWithProducts = cartItems.map((item) => {
    const product = products.find((p) => p.id === item.productId)
    return {
      ...item,
      product,
    }
  })

  const total = cartWithProducts.reduce((sum, item) => {
    return sum + (item.product?.price || 0) * item.quantity
  }, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-6xl">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance">Finalizar Compra</h1>
              <p className="text-muted-foreground mt-2">Preencha os dados para concluir seu pedido</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <CheckoutForm cartItems={cartItems} total={total} userEmail={userEmail} />
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      {cartWithProducts.map((item) => (
                        <div key={item.productId} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.product?.name} x{item.quantity}
                          </span>
                          <span>R$ {((item.product?.price || 0) * item.quantity).toFixed(2).replace(".", ",")}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 space-y-2">
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
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
