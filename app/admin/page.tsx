"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Package, ShoppingCart, Users, TrendingUp, DollarSign } from "@/lib/icons"
import { useEffect, useState } from "react"
import { getProducts } from "@/lib/mock-data"

export default function AdminPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [stats, setStats] = useState({
    productsCount: 0,
    ordersCount: 0,
    usersCount: 0,
    monthlyRevenue: 0,
  })
  const [recentOrders, setRecentOrders] = useState<any[]>([])

  useEffect(() => {
    const userType = localStorage.getItem("userType")
    if (userType !== "admin") {
      window.location.href = "/auth/login"
      return
    }
    setIsAuthorized(true)

    const products = getProducts()
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const allUsers = JSON.parse(localStorage.getItem("users") || "[]")

    // Calculate total revenue from orders
    const totalRevenue = allOrders.reduce((sum: number, order: any) => sum + order.total, 0)

    setStats({
      productsCount: products.length,
      ordersCount: allOrders.length,
      usersCount: allUsers.length,
      monthlyRevenue: totalRevenue,
    })

    // Get 4 most recent orders
    const sortedOrders = [...allOrders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    setRecentOrders(sortedOrders.slice(0, 4))
  }, [])

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Verificando permissões...</p>
      </div>
    )
  }

  const salesData = [
    { month: "Jan", value: 12500 },
    { month: "Fev", value: 14200 },
    { month: "Mar", value: 13800 },
    { month: "Abr", value: 15100 },
    { month: "Mai", value: 16400 },
    { month: "Jun", value: 15847 },
  ]

  const topProducts = [
    { name: "Caixinha Dinossauros", sales: 45 },
    { name: "Caixinha Espaço", sales: 38 },
    { name: "Caixinha Princesas", sales: 32 },
    { name: "Caixinha Super-Heróis", sales: 28 },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16 bg-muted/30">
        <div className="container max-w-7xl">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance">Dashboard Administrativo</h1>
              <p className="text-muted-foreground mt-2">Visão geral do seu negócio</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-l-4 border-l-primary">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total de Produtos</CardTitle>
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.productsCount}</div>
                  <p className="text-xs text-muted-foreground mt-2">Produtos ativos</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-secondary">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Pedidos</CardTitle>
                    <div className="h-10 w-10 rounded-full bg-secondary/10 flex items-center justify-center">
                      <ShoppingCart className="h-5 w-5 text-secondary" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.ordersCount}</div>
                  <p className="text-xs text-muted-foreground mt-2">Total de pedidos</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Clientes</CardTitle>
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stats.usersCount}</div>
                  <p className="text-xs text-muted-foreground mt-2">Usuários cadastrados</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Receita Total</CardTitle>
                    <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-green-600" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">R$ {stats.monthlyRevenue.toFixed(2).replace(".", ",")}</div>
                  <p className="text-xs text-muted-foreground mt-2">De todos os pedidos</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Vendas dos Últimos 6 Meses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {salesData.map((item, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="w-12 text-sm font-medium text-muted-foreground">{item.month}</div>
                        <div className="flex-1">
                          <div className="h-8 bg-muted rounded-md overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                              style={{ width: `${(item.value / 20000) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="w-24 text-sm font-semibold text-right">
                          R$ {item.value.toLocaleString("pt-BR")}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Produtos Mais Vendidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <div className="mt-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-accent to-primary"
                              style={{ width: `${(product.sales / 50) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-sm font-semibold">{product.sales} vendas</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Pedidos Recentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentOrders.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">Nenhum pedido realizado ainda</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-semibold text-sm">Pedido</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Cliente</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Valor</th>
                          <th className="text-left py-3 px-4 font-semibold text-sm">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b last:border-0 hover:bg-muted/50">
                            <td className="py-3 px-4 font-medium">#{order.id.slice(0, 8)}</td>
                            <td className="py-3 px-4">{order.customerName}</td>
                            <td className="py-3 px-4">R$ {order.total.toFixed(2).replace(".", ",")}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  order.status === "Entregue"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Em trânsito"
                                      ? "bg-blue-100 text-blue-800"
                                      : "bg-yellow-100 text-yellow-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>

            <div>
              <h2 className="text-2xl font-bold mb-4">Gerenciamento</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-primary">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Package className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle>Produtos</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">Adicione, edite ou remova produtos do catálogo</p>
                    <Button asChild className="w-full">
                      <Link href="/admin/produtos">Gerenciar Produtos</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-secondary">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <ShoppingCart className="h-6 w-6 text-secondary" />
                      </div>
                      <CardTitle>Pedidos</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">Visualize e atualize o status dos pedidos</p>
                    <Button asChild className="w-full">
                      <Link href="/admin/pedidos">Gerenciar Pedidos</Link>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow border-t-4 border-t-accent">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                        <Users className="h-6 w-6 text-accent" />
                      </div>
                      <CardTitle>Usuários</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">Visualize informações dos clientes</p>
                    <Button asChild className="w-full">
                      <Link href="/admin/usuarios">Gerenciar Usuários</Link>
                    </Button>
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
