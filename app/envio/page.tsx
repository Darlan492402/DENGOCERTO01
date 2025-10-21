import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Truck, MapPin, Clock, Shield } from "@/lib/icons"

export default function EnvioPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Envio e Entrega</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Informações sobre como entregamos suas caixinhas com segurança e rapidez.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 text-primary mb-4">
                      <Truck className="h-6 w-6" />
                    </div>
                    <CardTitle>Frete Grátis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Todas as compras e assinaturas incluem frete grátis para todo o Brasil. Sem custos adicionais!
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/15 text-secondary mb-4">
                      <Clock className="h-6 w-6" />
                    </div>
                    <CardTitle>Prazo de Entrega</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Entregamos em 5 a 15 dias úteis, dependendo da sua região. Você receberá um código de
                      rastreamento.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/15 text-accent mb-4">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <CardTitle>Cobertura Nacional</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Entregamos em todo o Brasil, incluindo regiões remotas. Nenhuma localidade é excluída.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 text-primary mb-4">
                      <Shield className="h-6 w-6" />
                    </div>
                    <CardTitle>Embalagem Segura</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Suas caixinhas são embaladas com cuidado para chegar em perfeito estado. Garantia de qualidade!
                    </p>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
                <CardHeader>
                  <CardTitle>Processo de Entrega</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Pedido Confirmado</h4>
                        <p className="text-sm text-muted-foreground">
                          Você recebe um email confirmando seu pedido e os dados de rastreamento.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Preparação</h4>
                        <p className="text-sm text-muted-foreground">
                          Nossa equipe prepara sua caixinha com cuidado e a embala com segurança.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Envio</h4>
                        <p className="text-sm text-muted-foreground">
                          Sua caixinha é enviada pelos Correios com rastreamento completo.
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0">
                        4
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Entrega</h4>
                        <p className="text-sm text-muted-foreground">
                          Sua caixinha chega na porta da sua casa com toda a segurança e cuidado.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Dúvidas sobre Entrega?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Se você tiver dúvidas sobre sua entrega, entre em contato conosco:
                  </p>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Email:</span> contato@caixinhadedengo.com.br
                    </p>
                    <p>
                      <span className="font-semibold">Telefone:</span> (11) 98765-4321
                    </p>
                    <p>
                      <span className="font-semibold">Horário:</span> Segunda a Sexta, 9h às 18h
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
