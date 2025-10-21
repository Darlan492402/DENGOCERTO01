import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { LogoutButton } from "@/components/logout-button"

export default async function ConfiguracoesPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-2xl">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-balance">Configurações</h1>
                <p className="text-muted-foreground mt-2">Gerencie suas preferências</p>
              </div>
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/conta">Voltar</Link>
              </Button>
            </div>

            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Conta</CardTitle>
                  <CardDescription>Informações da sua conta</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">ID da Conta</p>
                    <p className="font-mono text-sm">{user.id.slice(0, 16)}...</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notificações</CardTitle>
                  <CardDescription>Gerencie suas preferências de notificação</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Atualizações de Pedidos</p>
                        <p className="text-sm text-muted-foreground">Receba emails sobre seus pedidos</p>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Ativado
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Ofertas e Promoções</p>
                        <p className="text-sm text-muted-foreground">Receba novidades e descontos</p>
                      </div>
                      <Button variant="outline" size="sm" className="bg-transparent">
                        Ativado
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-destructive/50">
                <CardHeader>
                  <CardTitle className="text-destructive">Zona de Perigo</CardTitle>
                  <CardDescription>Ações irreversíveis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <LogoutButton />
                  <Button variant="destructive" className="w-full">
                    Excluir Conta
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
