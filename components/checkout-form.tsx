"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

interface CartItem {
  productId: string
  quantity: number
}

interface CheckoutFormProps {
  cartItems: CartItem[]
  total: number
  userEmail: string
}

export function CheckoutForm({ cartItems, total, userEmail }: CheckoutFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const shippingAddress = `${formData.address}, ${formData.city} - ${formData.state}, CEP: ${formData.zipCode}`

      const token = localStorage.getItem("authToken")

      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          itens: cartItems.map((item) => ({
            produtoId: Number.parseInt(item.productId),
            quantidade: item.quantity,
          })),
          enderecoEntrega: shippingAddress,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        // Clear cart
        const cartKey = `cart_${userEmail}`
        localStorage.removeItem(cartKey)

        toast.success("Pedido criado com sucesso!")
        router.push(`/pedido/sucesso?orderId=${data.pedido.id}`)
      } else {
        toast.error(data.error || "Erro ao processar pedido")
      }
    } catch (error) {
      console.error("[v0] Error creating order:", error)
      toast.error("Erro ao processar pedido. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações de Contato</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="fullName">Nome Completo</Label>
            <Input
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phone">Telefone</Label>
            <Input
              id="phone"
              type="tel"
              required
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={userEmail} disabled />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Endereço de Entrega</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="zipCode">CEP</Label>
            <Input
              id="zipCode"
              required
              placeholder="00000-000"
              value={formData.zipCode}
              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">Endereço Completo</Label>
            <Textarea
              id="address"
              required
              placeholder="Rua, número, complemento"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="city">Cidade</Label>
              <Input
                id="city"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">Estado</Label>
              <Input
                id="state"
                required
                placeholder="UF"
                maxLength={2}
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value.toUpperCase() })}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
        {isLoading ? "Processando..." : "Confirmar Pedido"}
      </Button>
    </form>
  )
}
