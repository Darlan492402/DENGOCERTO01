"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { notFound, useRouter } from "next/navigation"
import { Package, Truck, Shield } from "@/lib/icons"
import { mockProducts } from "@/lib/mock-data"
import Link from "next/link"
import { useState } from "react"

export default function ProdutoPage({ params }: { params: { id: string } }) {
  const { id } = params
  const router = useRouter()
  const [cardMessage, setCardMessage] = useState("")
  const [babyName, setBabyName] = useState("")
  const [selectedThemes, setSelectedThemes] = useState<string[]>([])
  const [quantity, setQuantity] = useState(1)

  const product = mockProducts.find((p) => p.id === id)

  if (!product) {
    notFound()
  }

  const handleThemeToggle = (theme: string) => {
    setSelectedThemes((prev) => (prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme]))
  }

  const handleAddToCart = () => {
    console.log("[v0] Adding to cart:", { product: product.name, quantity })

    const cartItem = {
      id: `${product.id}-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity,
      imageUrl: product.image_url,
      personalization: {
        cardMessage,
        babyName,
        themes: selectedThemes,
      },
    }

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
    existingCart.push(cartItem)
    localStorage.setItem("cart", JSON.stringify(existingCart))

    console.log("[v0] Cart updated:", existingCart)
    alert(`${product.name} adicionado ao carrinho!`)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/carrinho")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.image_url || "/placeholder.svg"}
                alt={product.name}
                fill
                unoptimized
                className="object-cover"
                priority
              />
              {product.is_subscription && (
                <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">Assinatura</Badge>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-balance mb-2">{product.name}</h1>
                <div className="flex gap-2 flex-wrap mb-4">
                  <Badge variant="outline">{product.theme}</Badge>
                  <Badge variant="outline">{product.age_range}</Badge>
                </div>
                <p className="text-3xl font-bold text-primary">
                  R$ {product.price.toFixed(2).replace(".", ",")}
                  {product.is_subscription && <span className="text-lg font-normal text-muted-foreground">/mês</span>}
                </p>
              </div>

              <p className="text-lg text-muted-foreground text-pretty">{product.description}</p>

              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardContent className="p-6 space-y-4">
                  <h3 className="text-xl font-bold">💌 Personalize com um toque de carinho extra (opcional)</h3>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardMessage" className="text-base font-semibold mb-2 block">
                        📝 Mensagem para o cartão
                      </Label>
                      <p className="text-sm text-muted-foreground mb-2">
                        Digite algo lindo para acompanhar o presente (até 200 caracteres)
                      </p>
                      <Textarea
                        id="cardMessage"
                        placeholder="Ex: Mal posso esperar pra te conhecer, pequeno milagre!"
                        value={cardMessage}
                        onChange={(e) => setCardMessage(e.target.value.slice(0, 200))}
                        maxLength={200}
                        rows={3}
                        className="resize-none bg-white"
                      />
                      <p className="text-xs text-muted-foreground mt-1 text-right">
                        {cardMessage.length}/200 caracteres
                      </p>
                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <p className="font-medium">Exemplos prontos:</p>
                        <ul className="space-y-1">
                          <li>• "Mal posso esperar pra te conhecer, pequeno milagre!"</li>
                          <li>• "Você chegou e já encheu nosso mundo de amor!"</li>
                          <li>• "Com todo carinho do titio/titia 💛"</li>
                        </ul>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="babyName" className="text-base font-semibold mb-2 block">
                        🏷 Nome ou apelido do bebê para etiqueta
                      </Label>
                      <Input
                        id="babyName"
                        type="text"
                        placeholder="Ex: Malu, Benzinho, Dengo da Vovó"
                        value={babyName}
                        onChange={(e) => setBabyName(e.target.value)}
                        className="bg-white"
                      />
                    </div>

                    <div>
                      <Label className="text-base font-semibold mb-2 block">🎨 Quer um tema especial? (opcional)</Label>
                      <div className="space-y-2 mt-3">
                        {["Ursinho", "Estrelinha", "Arco-íris", "Coraçãozinho", "Deixa surpresa!"].map((theme) => (
                          <label key={theme} className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="checkbox"
                              className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                              checked={selectedThemes.includes(theme)}
                              onChange={() => handleThemeToggle(theme)}
                            />
                            <span className="text-sm">{theme}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="space-y-3">
                <div className="flex items-center gap-4">
                  <Label htmlFor="quantity">Quantidade:</Label>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                      -
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                      +
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={handleBuyNow}
                >
                  Comprar Agora
                </Button>

                <Button size="lg" variant="outline" className="w-full bg-transparent" onClick={handleAddToCart}>
                  Adicionar ao Carrinho
                </Button>

                <Button size="lg" variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/quiz">Fazer Quiz para Recomendação</Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 gap-4 pt-6 border-t">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Package className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Estoque Disponível</p>
                    <p className="text-sm text-muted-foreground">Pronto para envio</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-secondary/20 p-2">
                    <Truck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Entrega Rápida</p>
                    <p className="text-sm text-muted-foreground">Receba em até 7 dias úteis</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-accent/20 p-2">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium">Compra Segura</p>
                    <p className="text-sm text-muted-foreground">Seus dados estão protegidos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Card>
              <CardContent className="p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-4">Sobre este produto</h2>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground text-pretty">
                    Cada caixinha é cuidadosamente preparada com produtos de qualidade, pensados para estimular o
                    desenvolvimento, criatividade e diversão das crianças. Nossos produtos são selecionados por
                    especialistas em desenvolvimento infantil.
                  </p>
                  {product.is_subscription && (
                    <div className="mt-4 p-4 bg-muted rounded-lg">
                      <p className="font-medium mb-2">Como funciona a assinatura:</p>
                      <ul className="space-y-1 text-sm text-muted-foreground">
                        <li>• Receba uma caixa surpresa todo mês</li>
                        <li>• Temas variados e sempre novos</li>
                        <li>• Cancele quando quiser, sem compromisso</li>
                        <li>• Frete grátis em todas as entregas</li>
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
