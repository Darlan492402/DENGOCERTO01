"use client"

import type React from "react"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"
import Image from "next/image"
import { Plus, Edit, Trash2 } from "@/lib/icons"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { mockProducts } from "@/lib/mock-data"

interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  theme: string
  age_range: string
  is_subscription: boolean
}

export default function AdminProdutosPage() {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [products, setProducts] = useState<Product[]>(mockProducts)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    theme: "",
    age_range: "",
    is_subscription: false,
  })

  useEffect(() => {
    const userType = localStorage.getItem("userType")
    if (userType !== "admin") {
      window.location.href = "/auth/login"
      return
    }
    setIsAuthorized(true)
  }, [])

  const handleOpenDialog = (product?: Product) => {
    if (product) {
      setEditingProduct(product)
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image_url: product.image_url,
        theme: product.theme,
        age_range: product.age_range,
        is_subscription: product.is_subscription,
      })
    } else {
      setEditingProduct(null)
      setFormData({
        name: "",
        description: "",
        price: "",
        image_url: "",
        theme: "",
        age_range: "",
        is_subscription: false,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const productData: Product = {
      id: editingProduct?.id || `${Date.now()}`,
      name: formData.name,
      description: formData.description,
      price: Number.parseFloat(formData.price),
      image_url: formData.image_url,
      theme: formData.theme,
      age_range: formData.age_range,
      is_subscription: formData.is_subscription,
    }

    if (editingProduct) {
      setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? productData : p)))
      toast.success("Produto atualizado com sucesso")
    } else {
      setProducts((prev) => [...prev, productData])
      toast.success("Produto criado com sucesso")
    }

    setIsDialogOpen(false)
    setIsLoading(false)
  }

  const handleDelete = (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este produto?")) {
      return
    }

    setProducts((prev) => prev.filter((p) => p.id !== id))
    toast.success("Produto excluído com sucesso")
  }

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
                <h1 className="text-3xl md:text-4xl font-bold text-balance">Gerenciar Produtos</h1>
                <p className="text-muted-foreground mt-2">{products.length} produtos cadastrados</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" asChild className="bg-transparent">
                  <Link href="/admin">Voltar</Link>
                </Button>
                <Button onClick={() => handleOpenDialog()}>
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Produto
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative aspect-square bg-muted">
                    <Image
                      src={product.image_url || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      unoptimized
                      className="object-cover"
                    />
                    {product.is_subscription && (
                      <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
                        Assinatura
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <h3 className="font-semibold text-balance leading-tight">{product.name}</h3>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {product.theme}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {product.age_range}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-primary">R$ {product.price.toFixed(2).replace(".", ",")}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={() => handleOpenDialog(product)}
                      >
                        <Edit className="h-4 w-4 mr-2" />
                        Editar
                      </Button>
                      <Button
                        variant="outline"
                        className="bg-transparent text-destructive hover:text-destructive"
                        onClick={() => handleDelete(product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingProduct ? "Editar Produto" : "Novo Produto"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome do Produto</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Preço (R$)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="age_range">Faixa Etária</Label>
                <Input
                  id="age_range"
                  value={formData.age_range}
                  onChange={(e) => setFormData({ ...formData, age_range: e.target.value })}
                  placeholder="Ex: 0-6 meses"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image_url">URL da Imagem</Label>
              <Input
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                placeholder="/nome-da-imagem.jpg"
              />
              <p className="text-xs text-muted-foreground">
                Imagens disponíveis: /dinosaur-toys-box.jpg, /farm-animals-toys.jpg, /ocean-sea-toys.jpg,
                /princess-toys-box.jpg, /space-toys-kids.jpg, /superhero-toys-kids.jpg
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="theme">Tema</Label>
              <Select value={formData.theme} onValueChange={(value) => setFormData({ ...formData, theme: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Dinossauros">Dinossauros</SelectItem>
                  <SelectItem value="Fazenda">Fazenda</SelectItem>
                  <SelectItem value="Oceano">Oceano</SelectItem>
                  <SelectItem value="Princesas">Princesas</SelectItem>
                  <SelectItem value="Espaço">Espaço</SelectItem>
                  <SelectItem value="Super-Heróis">Super-Heróis</SelectItem>
                  <SelectItem value="Variado">Variado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="is_subscription"
                checked={formData.is_subscription}
                onChange={(e) => setFormData({ ...formData, is_subscription: e.target.checked })}
                className="h-4 w-4"
              />
              <Label htmlFor="is_subscription" className="cursor-pointer">
                Produto de assinatura
              </Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : editingProduct ? "Salvar Alterações" : "Criar Produto"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  )
}
