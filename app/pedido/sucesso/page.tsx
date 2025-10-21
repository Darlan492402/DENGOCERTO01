"use client"

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle2 } from "lucide-react"
import Image from "next/image"

export default function PedidoSucessoPage() {
  const [orderData, setOrderData] = useState<any>(null)

  useEffect(() => {
    const data = sessionStorage.getItem("lastOrder")
    if (data) {
      setOrderData(JSON.parse(data))
    }
  }, [])

  if (!orderData) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12 md:py-16">
          <div className="container max-w-2xl">
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-muted-foreground">Carregando informações do pedido...</p>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-2xl">
          <Card>
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="rounded-full bg-green-100 p-3">
                    <CheckCircle2 className="h-12 w-12 text-green-600" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-balance mb-2">Pedido Confirmado!</h1>
                  <p className="text-muted-foreground">
                    Obrigado pela sua compra. Você receberá um email de confirmação em breve.
                  </p>
                </div>
              </div>

              <div className="border-t border-b py-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Número do Pedido</p>
                  <p className="font-mono font-semibold">#{orderData.id.toUpperCase()}</p>
                </div>

                <div className="flex gap-4 items-center">
                  <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                    <Image
                      src={orderData.product.imageUrl || "/placeholder.svg"}
                      alt={orderData.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{orderData.product.name}</h3>
                    <p className="text-lg font-bold text-primary">
                      R$ {orderData.product.price.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-muted-foreground mb-1">Entregar para</p>
                  <p className="font-medium">{orderData.customer.fullName}</p>
                  <p className="text-sm text-muted-foreground">{orderData.customer.email}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    {orderData.customer.address}, {orderData.customer.city} - {orderData.customer.state}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full" size="lg">
                  <Link href="/">Voltar para Home</Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent" size="lg">
                  <Link href="/produtos">Ver Mais Produtos</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
