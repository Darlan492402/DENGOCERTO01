"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, Mail, Calendar, ShoppingBag, User } from "@/lib/icons"

export default function AdminUsuarioDetalhesPage() {
  const params = useParams()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [orders, setOrders] = useState<any[]>([])

  useEffect(() => {
    const userType = localStorage.getItem("userType")
    if (userType !== "admin") {
      window.location.href = "/auth/login"
      return
    }
    setIsAuthorized(true)

    const email = decodeURIComponent(params.email as string)

    // Load user from localStorage
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const foundUser = allUsers.find((u: any) => u.email === email)

    if (foundUser) {
      setUser(foundUser)

      // Load user's orders
      const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      const userOrders = allOrders.filter((order: any) => order.customerEmail === email)
      const sortedOrders = userOrders.sort(
        (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
      setOrders(sortedOrders)
    }
  }, [params.email])

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { variant: "default" | "secondary" | "outline"; className: string }> = {
      Pendente: { variant: "secondary", className: "bg-yellow-100 text-yellow-800" },
      Processando: { variant: "default", className: "bg-blue-100 text-blue-800" },
      "Em trânsito": { variant: "default", className: "bg-purple-100 text-purple-800" },
      Entregue: { variant: "outline", className: "bg-green-100 text-green-800" },
      Cancelado: { variant: "outline", className: "bg-red-100 text-red-800" },
    }
    const config = statusMap[status] || { variant: "outline", className: "" }
    return (
      <Badge variant={config.variant} className={config.className}>
        {status}
      </Badge>
    )
  }

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Verificando permissões...</p>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12 md:py-16">
          <div className="container max-w-4xl">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Usuário não encontrado</p>
                <Button asChild className="mt-4">
                  <Link href="/admin/usuarios">Voltar para Usuários</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/admin/usuarios">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground mt-1">{user.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Informações
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {user.type === "admin" && <Badge variant="default">Admin</Badge>}
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      Desde {new Date(user.createdAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base flex items-center gap-2">
                    <ShoppingBag className="h-4 w-4" />
                    Estatísticas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-2xl font-bold">{orders.length}</p>
                    <p className="text-sm text-muted-foreground">Pedidos realizados</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">R$ {totalSpent.toFixed(2).replace(".", ",")}</p>
                    <p className="text-sm text-muted-foreground">Total gasto</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Ticket Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-primary">
                    R$ {orders.length > 0 ? (totalSpent / orders.length).toFixed(2).replace(".", ",") : "0,00"}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">Por pedido</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Pedidos</CardTitle>
              </CardHeader>
              <CardContent>
                {orders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Nenhum pedido realizado ainda</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <Link key={order.id} href={`/admin/pedidos/${order.id}`}>
                        <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                          <div className="space-y-1">
                            <p className="font-medium">Pedido #{order.id.slice(0, 8)}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                          <div className="text-right space-y-2">
                            <p className="font-semibold text-primary">R$ {order.total.toFixed(2).replace(".", ",")}</p>
                            {getStatusBadge(order.status)}
                          </div>
                        </div>
                      </Link>
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
