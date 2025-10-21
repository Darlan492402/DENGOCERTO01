import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles, Mail } from "@/lib/icons"

export default function CadastroSucessoPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2 justify-center">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Caixinha de Dengo</span>
          </Link>

          <Card>
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-2xl text-center">Verifique seu email</CardTitle>
              <CardDescription className="text-center">
                Enviamos um link de confirmação para o seu email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground text-center text-pretty">
                Por favor, verifique sua caixa de entrada e clique no link de confirmação para ativar sua conta.
              </p>
              <Button asChild className="w-full">
                <Link href="/">Voltar para o Início</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
