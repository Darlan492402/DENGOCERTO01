import Link from "next/link"
import { Sparkles, Instagram, MessageCircle } from "@/lib/icons"

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="font-bold">Caixinha de Dengo</span>
            </div>
            <p className="text-sm text-muted-foreground text-pretty">
              Caixas personalizadas com amor para o desenvolvimento e diversão das crianças.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Produtos</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/produtos" className="text-muted-foreground hover:text-primary transition-colors">
                  Todas as Caixas
                </Link>
              </li>
              <li>
                <Link href="/assinatura" className="text-muted-foreground hover:text-primary transition-colors">
                  Assinatura Mensal
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="text-muted-foreground hover:text-primary transition-colors">
                  Faça o Quiz
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Ajuda</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contato" className="text-muted-foreground hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-muted-foreground hover:text-primary transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
              <li>
                <Link href="/envio" className="text-muted-foreground hover:text-primary transition-colors">
                  Envio e Entrega
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contatos</h3>
            <p className="text-sm text-muted-foreground text-pretty mb-4">
              Quer conhecer mais sobre a gente? Acompanhe nossas fofuras no Instagram ou fale direto com a gente pelo
              WhatsApp.
            </p>
            <div className="flex gap-3">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="https://wa.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Caixinha de Dengo. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
