"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { Calendar, CreditCard } from "@/lib/icons"

interface Subscription {
  id: number
  product_id: number
  status: "active" | "inactive"
  frequency: "mensal" | "trimestral" | "semestral"
  next_delivery_date: string
  created_at: string
  product: {
    name: string
    description: string
    price: number
    image_url: string
  }
}

export default function AssinaturasPage() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSubscriptions = () => {
      const stored = localStorage.getItem("user_subscriptions")
      if (stored) {
        setSubscriptions(JSON.parse(stored))
      } else {
        // Mock data for demonstration
        const mockSubscriptions: Subscription[] = [
          {
            id: 1,
            product_id: 7,
            status: "active",
            frequency: "mensal",
            next_delivery_date: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(),
            created_at: new Date().toISOString(),
            product: {
              name: "Assinatura Mensal - Surpresa",
              description: "Receba uma caixa surpresa todo mês com temas variados e brinquedos educativos",
              price: 79.9,
              image_url: "/colorful-surprise-box.jpg",
            },
          },
        ]
        setSubscriptions(mockSubscriptions)
        localStorage.setItem("user_subscriptions", JSON.stringify(mockSubscriptions))
      }
      setLoading(false)
    }

    loadSubscriptions()
  }, [])

  const handleCancelSubscription = (id: number) => {
    const updated = subscriptions.map((sub) => (sub.id === id ? { ...sub, status: "inactive" as const } : sub))
    setSubscriptions(updated)
    localStorage.setItem("user_subscriptions", JSON.stringify(updated))
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12 md:py-16">
          <div className="container max-w-6xl">
            <div className="text-center">Carregando...</div>
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
        <div className="container max-w-6xl">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-balance">Minhas Assinaturas</h1>
                <p className="text-muted-foreground mt-2">Gerencie suas assinaturas mensais</p>
              </div>
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/conta">Voltar</Link>
              </Button>
            </div>

            {subscriptions && subscriptions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {subscriptions.map((subscription) => (
                  <Card key={subscription.id} className="overflow-hidden">
                    <div className="relative aspect-video bg-muted">
                      <Image
                        src={subscription.product.image_url || "/placeholder.svg"}
                        alt={subscription.product.name}
                        fill
                        className="object-cover"
                      />
                      <Badge
                        className="absolute top-3 right-3"
                        variant={subscription.status === "active" ? "default" : "secondary"}
                      >
                        {subscription.status === "active" ? "Ativa" : "Inativa"}
                      </Badge>
                    </div>
                    <CardHeader>
                      <CardTitle>{subscription.product.name}</CardTitle>
                      <CardDescription>{subscription.product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Valor mensal:</span>
                          <span className="font-medium">
                            R$ {subscription.product.price.toFixed(2).replace(".", ",")}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Frequência:</span>
                          <span className="font-medium capitalize">{subscription.frequency}</span>
                        </div>
                        {subscription.next_delivery_date && subscription.status === "active" && (
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Próxima entrega:</span>
                            <span className="font-medium">
                              {new Date(subscription.next_delivery_date).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                        )}
                      </div>
                      {subscription.status === "active" ? (
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={() => handleCancelSubscription(subscription.id)}
                        >
                          Cancelar Assinatura
                        </Button>
                      ) : (
                        <Button variant="outline" className="w-full bg-transparent" asChild>
                          <Link href="/assinatura">Reativar Assinatura</Link>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16 space-y-4">
                  <div className="rounded-full bg-muted p-6">
                    <CreditCard className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">Nenhuma assinatura ativa</h3>
                    <p className="text-muted-foreground">Assine e receba surpresas todo mês</p>
                  </div>
                  <Button asChild size="lg">
                    <Link href="/assinatura">Ver Planos</Link>
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
