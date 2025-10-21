"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Package, User, MapPin, CreditCard } from "@/lib/icons"

export default function AdminPedidoDetalhesPage() {
  const params = useParams()
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [order, setOrder] = useState<any>(null)
  const [status, setStatus] = useState("")

  useEffect(() => {
    const userType = localStorage.getItem("userType")
    if (userType !== "admin") {
      window.location.href = "/auth/login"
      return
    }
    setIsAuthorized(true)

    // Load order from localStorage
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const foundOrder = allOrders.find((o: any) => o.id === params.id)

    if (foundOrder) {
      setOrder(foundOrder)
      setStatus(foundOrder.status)
    }
  }, [params.id])

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)

    // Update order in localStorage
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")
    const updatedOrders = allOrders.map((o: any) => (o.id === params.id ? { ...o, status: newStatus } : o))
    localStorage.setItem("orders", JSON.stringify(updatedOrders))
    setOrder({ ...order, status: newStatus })
  }

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

  if (!order) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 py-12 md:py-16">
          <div className="container max-w-4xl">
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">Pedido não encontrado</p>
                <Button asChild className="mt-4">
                  <Link href="/admin/pedidos">Voltar para Pedidos</Link>
                </Button>
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

      <main className="flex-1 py-12 md:py-16 bg-muted/30">
        <div className="container max-w-4xl">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" asChild>
                <Link href="/admin/pedidos">
                  <ArrowLeft className="h-4 w-4" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold">Pedido #{order.id.slice(0, 8)}</h1>
                <p className="text-muted-foreground mt-1">
                  Realizado em{" "}
                  {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Itens do Pedido
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {order.items.map((item: any, index: number) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b last:border-0">
                      <div className="flex-1">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                      </div>
                      <p className="font-semibold">R$ {(item.price * item.quantity).toFixed(2).replace(".", ",")}</p>
                    </div>
                  ))}
                  <div className="pt-4 border-t">
                    <div className="flex items-center justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-primary">R$ {order.total.toFixed(2).replace(".", ",")}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Status do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-center py-2">{getStatusBadge(status)}</div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Atualizar Status</label>
                      <Select value={status} onValueChange={handleStatusChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Processando">Processando</SelectItem>
                          <SelectItem value="Em trânsito">Em trânsito</SelectItem>
                          <SelectItem value="Entregue">Entregue</SelectItem>
                          <SelectItem value="Cancelado">Cancelado</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Cliente
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="font-medium">{order.customerName}</p>
                    <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                    {order.phone && <p className="text-sm text-muted-foreground">{order.phone}</p>}
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Endereço de Entrega
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{order.address}</p>
              </CardContent>
            </Card>

            {order.paymentMethod && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Método de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{order.paymentMethod}</p>
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
