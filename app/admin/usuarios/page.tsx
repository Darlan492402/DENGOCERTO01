"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Mail, Calendar, ShoppingBag } from "@/lib/icons"
import { useEffect, useState } from "react"

export default function AdminUsuariosPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [users, setUsers] = useState<any[]>([])

  useEffect(() => {
    const userType = localStorage.getItem("userType")
    if (userType !== "admin") {
      window.location.href = "/auth/login"
      return
    }
    setIsAuthorized(true)

    const allUsers = JSON.parse(localStorage.getItem("users") || "[]")
    const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")

    // Add order count to each user
    const usersWithOrders = allUsers.map((user: any) => {
      const userOrders = allOrders.filter((order: any) => order.customerEmail === user.email)
      return {
        ...user,
        orderCount: userOrders.length,
        totalSpent: userOrders.reduce((sum: number, order: any) => sum + order.total, 0),
      }
    })

    setUsers(usersWithOrders)
  }, [])

  if (!isAuthorized) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">Verificando permissões...</p>
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
                <h1 className="text-3xl md:text-4xl font-bold text-balance">Gerenciar Usuários</h1>
                <p className="text-muted-foreground mt-2">{users.length} usuários cadastrados</p>
              </div>
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/admin">Voltar</Link>
              </Button>
            </div>

            {users.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">Nenhum usuário cadastrado ainda</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {users.map((user) => (
                  <Link key={user.email} href={`/admin/usuarios/${encodeURIComponent(user.email)}`}>
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{user.name}</h3>
                            {user.type === "admin" && (
                              <Badge variant="default" className="mt-1">
                                Admin
                              </Badge>
                            )}
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-primary">
                              {user.orderCount} {user.orderCount === 1 ? "pedido" : "pedidos"}
                            </p>
                            {user.totalSpent > 0 && (
                              <p className="text-xs text-muted-foreground">
                                R$ {user.totalSpent.toFixed(2).replace(".", ",")}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span>{user.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Cadastrado em {new Date(user.createdAt).toLocaleDateString("pt-BR")}</span>
                          </div>
                          {user.orderCount > 0 && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <ShoppingBag className="h-4 w-4" />
                              <span>
                                {user.orderCount} compra{user.orderCount !== 1 ? "s" : ""} realizada
                                {user.orderCount !== 1 ? "s" : ""}
                              </span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
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
