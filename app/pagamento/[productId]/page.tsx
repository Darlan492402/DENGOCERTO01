import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { DirectPurchaseForm } from "@/components/direct-purchase-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { notFound } from "next/navigation"
import { mockProducts } from "@/lib/mock-data"

export default async function PagamentoPage({ params }: { params: Promise<{ productId: string }> }) {
  const { productId } = await params

  const product = mockProducts.find((p) => p.id === productId)

  if (!product) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-6xl">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance">Finalizar Compra</h1>
              <p className="text-muted-foreground mt-2">Preencha os dados para concluir seu pedido</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <DirectPurchaseForm product={product} />
              </div>

              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <CardHeader>
                    <CardTitle>Resumo do Pedido</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-3 pb-4 border-b">
                      <div className="relative w-20 h-20 flex-shrink-0 overflow-hidden rounded-md bg-muted">
                        <Image
                          src={product.image_url || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <h3 className="font-semibold text-sm text-balance leading-tight">{product.name}</h3>
                        <div className="flex gap-1 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {product.theme}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {product.age_range}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>R$ {product.price.toFixed(2).replace(".", ",")}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Frete</span>
                        <span className="text-green-600">Grátis</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary">R$ {product.price.toFixed(2).replace(".", ",")}</span>
                      </div>
                    </div>

                    {product.is_subscription && (
                      <div className="mt-4 p-3 bg-secondary/10 rounded-lg border border-secondary/20">
                        <p className="text-xs font-medium text-secondary-foreground">Assinatura Mensal</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Você será cobrado mensalmente. Cancele quando quiser.
                        </p>
                      </div>
                    )}
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
