"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Package, ShoppingBag, LogOut } from "@/lib/icons"
import Link from "next/link"

interface Order {
  id: string
  date: string
  total: number
  status: string
  items: Array<{
    productId: string
    productName: string
    quantity: number
    price: number
  }>
}

export default function ContaPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")
  const [userName, setUserName] = useState("")
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    const name = localStorage.getItem("userName")

    if (!email) {
      router.push("/auth/login")
      return
    }

    setUserEmail(email)
    setUserName(name || email.split("@")[0])

    const savedOrders = localStorage.getItem(`orders_${email}`)
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders))
    }

    setLoading(false)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("userEmail")
    localStorage.removeItem("userName")
    localStorage.removeItem("userType")
    router.push("/")
  }

  if (loading) {
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-balance">Minha Conta</h1>
                <p className="text-muted-foreground mt-2">Bem-vindo, {userName}!</p>
              </div>
              <Button variant="outline" onClick={handleLogout} className="gap-2 bg-transparent">
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-base">Perfil</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-1 font-medium">{userName}</p>
                  <p className="text-sm text-muted-foreground mb-3">{userEmail}</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-secondary/20 p-2">
                      <Package className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">Pedidos</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{orders.length} pedidos realizados</p>
                  <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                    <Link href="/produtos">Continuar Comprando</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-accent/20 p-2">
                      <ShoppingBag className="h-5 w-5" />
                    </div>
                    <CardTitle className="text-base">Carrinho</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">Ver itens salvos</p>
                  <Button variant="outline" size="sm" asChild className="w-full bg-transparent">
                    <Link href="/carrinho">Ir ao Carrinho</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Pedidos</CardTitle>
                <CardDescription>Seus pedidos realizados</CardDescription>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground mb-4">Você ainda não realizou nenhum pedido</p>
                    <Button asChild>
                      <Link href="/produtos">Começar a Comprar</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                        <div>
                          <p className="font-medium">Pedido #{order.id.slice(0, 8)}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.date).toLocaleDateString("pt-BR")}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {order.items.length} {order.items.length === 1 ? "item" : "itens"}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">R$ {order.total.toFixed(2).replace(".", ",")}</p>
                          <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
