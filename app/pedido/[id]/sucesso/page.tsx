import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CheckCircle, Package } from "@/lib/icons"
import { notFound, redirect } from "next/navigation"

export default async function PedidoSucessoPage({ params }: { params: { id: string } }) {
  const { id } = params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: order } = await supabase.from("orders").select("*").eq("id", id).eq("user_id", user.id).single()

  if (!order) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-2xl">
          <Card>
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-4">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-3xl">Pedido Confirmado!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-2">
                <p className="text-muted-foreground">Seu pedido foi realizado com sucesso.</p>
                <p className="text-sm text-muted-foreground">
                  Número do pedido: <span className="font-mono font-medium">#{order.id.slice(0, 8)}</span>
                </p>
              </div>

              <div className="bg-muted rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Package className="h-5 w-5 text-primary mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium">O que acontece agora?</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Você receberá um email de confirmação</li>
                      <li>• Prepararemos seu pedido com carinho</li>
                      <li>• Enviaremos o código de rastreamento</li>
                      <li>• Entrega em até 7 dias úteis</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button asChild className="w-full" size="lg">
                  <Link href="/conta/pedidos">Ver Meus Pedidos</Link>
                </Button>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/produtos">Continuar Comprando</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
