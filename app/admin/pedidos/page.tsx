"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import { useEffect, useState } from "react"
import { toast } from "sonner"

interface Order {
  id: number
  customerName: string
  customerEmail: string
  status: string
  total: number
  address: string
  createdAt: string
  items: Array<{
    productName: string
    quantity: number
    price: number
  }>
}

const mockOrders: Order[] = [
  {
    id: 1,
    customerName: "Maria Silva",
    customerEmail: "maria@example.com",
    status: "pendente",
    total: 179.8,
    address: "Rua das Flores, 123 - São Paulo, SP",
    createdAt: new Date().toISOString(),
    items: [{ productName: "Caixinha Dinossauros", quantity: 2, price: 89.9 }],
  },
  {
    id: 2,
    customerName: "João Santos",
    customerEmail: "joao@example.com",
    status: "pago",
    total: 79.9,
    address: "Av. Principal, 456 - Rio de Janeiro, RJ",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    items: [{ productName: "Caixinha Fazendinha", quantity: 1, price: 79.9 }],
  },
]

export default function AdminPedidosPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [orders, setOrders] = useState<Order[]>(mockOrders)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const userType = localStorage.getItem("userType")
    if (userType !== "admin") {
      window.location.href = "/auth/login"
      return
    }
    setIsAuthorized(true)
    setIsLoading(false)
  }, [])

  const handleStatusChange = (orderId: number, newStatus: string) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status: newStatus } : order)))
    toast.success("Status atualizado com sucesso")
  }

  const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { className: string; label: string }> = {
      pendente: { className: "bg-yellow-100 text-yellow-800", label: "Pendente" },
      pago: { className: "bg-blue-100 text-blue-800", label: "Pago" },
      enviado: { className: "bg-purple-100 text-purple-800", label: "Enviado" },
      entregue: { className: "bg-green-100 text-green-800", label: "Entregue" },
      cancelado: { className: "bg-red-100 text-red-800", label: "Cancelado" },
    }
    const config = statusMap[status] || { className: "", label: status }
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    )
  }

  if (!isAuthorized || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Carregando...</p>
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
                <h1 className="text-3xl md:text-4xl font-bold text-balance">Gerenciar Pedidos</h1>
                <p className="text-muted-foreground mt-2">{orders.length} pedidos no total</p>
              </div>
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/admin">Voltar</Link>
              </Button>
            </div>

            {orders.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Nenhum pedido realizado ainda</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <Card key={order.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
                          <p className="text-sm text-muted-foreground">Cliente: {order.customerName}</p>
                          <p className="text-sm text-muted-foreground">Email: {order.customerEmail}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.createdAt).toLocaleDateString("pt-BR", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                        <div className="text-right space-y-2">
                          <p className="text-lg font-bold text-primary">
                            R$ {order.total.toFixed(2).replace(".", ",")}
                          </p>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm font-medium">Itens do pedido:</p>
                        {order.items.map((item, idx) => (
                          <div key={idx} className="text-sm text-muted-foreground">
                            • {item.productName} x{item.quantity} - R${" "}
                            {(item.price * item.quantity).toFixed(2).replace(".", ",")}
                          </div>
                        ))}
                      </div>
                      <div className="pt-3 border-t">
                        <p className="text-sm">
                          <span className="font-medium">Endereço:</span> {order.address}
                        </p>
                      </div>
                      <div className="pt-3 border-t">
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-medium">Atualizar Status:</label>
                          <Select value={order.status} onValueChange={(value) => handleStatusChange(order.id, value)}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pendente">Pendente</SelectItem>
                              <SelectItem value="pago">Pago</SelectItem>
                              <SelectItem value="enviado">Enviado</SelectItem>
                              <SelectItem value="entregue">Entregue</SelectItem>
                              <SelectItem value="cancelado">Cancelado</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
