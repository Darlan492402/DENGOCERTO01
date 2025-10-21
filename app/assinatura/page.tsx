import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Gift, Sparkles, Truck } from "@/lib/icons"
import Image from "next/image"
import Link from "next/link"

export default function AssinaturaPage() {
  const plans = [
    {
      id: 1,
      name: "Plano Mensal",
      price: 79.9,
      frequency: "mensal",
      description: "Receba uma caixa surpresa todo mês",
      features: [
        "1 caixa temática por mês",
        "Tema surpresa escolhido por especialistas",
        "Brinquedos educativos de qualidade",
        "Atividades criativas inclusas",
        "Frete grátis para todo Brasil",
        "Cancele quando quiser",
      ],
      popular: false,
    },
    {
      id: 2,
      name: "Plano Trimestral",
      price: 74.9,
      frequency: "trimestral",
      description: "3 meses de diversão garantida",
      features: [
        "3 caixas temáticas (1 por mês)",
        "Temas variados e exclusivos",
        "Brinquedos educativos premium",
        "Atividades criativas inclusas",
        "Frete grátis para todo Brasil",
        "Economia de R$ 15,00",
        "Cancele quando quiser",
      ],
      popular: true,
    },
    {
      id: 3,
      name: "Plano Semestral",
      price: 69.9,
      frequency: "semestral",
      description: "6 meses de alegria e aprendizado",
      features: [
        "6 caixas temáticas (1 por mês)",
        "Temas exclusivos e variados",
        "Brinquedos educativos premium",
        "Atividades criativas inclusas",
        "Frete grátis para todo Brasil",
        "Economia de R$ 60,00",
        "Brinde especial incluso",
        "Cancele quando quiser",
      ],
      popular: false,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <Badge className="mx-auto w-fit">Assinatura Mensal</Badge>
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Surpresas Todo Mês na Porta da Sua Casa</h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Assine e receba caixas temáticas com brinquedos educativos, atividades criativas e muita diversão para
                seu filho. Cada mês um novo tema para explorar!
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">
                Por que assinar a Caixinha de Dengo?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card>
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 text-primary mb-4">
                      <Gift className="h-6 w-6" />
                    </div>
                    <CardTitle>Surpresa Garantida</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      Cada mês um tema diferente cuidadosamente selecionado por especialistas em desenvolvimento
                      infantil.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/15 text-secondary mb-4">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <CardTitle>Qualidade Premium</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      Brinquedos educativos de alta qualidade que estimulam criatividade, coordenação e aprendizado.
                    </CardDescription>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/15 text-accent mb-4">
                      <Truck className="h-6 w-6" />
                    </div>
                    <CardTitle>Entrega Grátis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      Frete grátis para todo o Brasil. Receba sua caixinha no conforto da sua casa, sem custos
                      adicionais.
                    </CardDescription>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-16 md:py-20 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <div className="text-center mb-12 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-balance">Escolha Seu Plano</h2>
                <p className="text-lg text-muted-foreground text-pretty">
                  Quanto mais tempo assinar, mais você economiza!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan) => (
                  <Card key={plan.id} className={plan.popular ? "border-primary shadow-lg" : ""}>
                    {plan.popular && (
                      <div className="bg-primary text-primary-foreground text-center py-2 text-sm font-medium">
                        Mais Popular
                      </div>
                    )}
                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                      <div className="pt-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold">R$ {plan.price.toFixed(2).replace(".", ",")}</span>
                          <span className="text-muted-foreground">/mês</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Cobrado{" "}
                          {plan.frequency === "mensal"
                            ? "mensalmente"
                            : plan.frequency === "trimestral"
                              ? "trimestralmente"
                              : "semestralmente"}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-sm leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full" size="lg" variant={plan.popular ? "default" : "outline"} asChild>
                        <Link href="/auth/login">Assinar Agora</Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Como Funciona</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 text-primary text-2xl font-bold">
                    1
                  </div>
                  <h3 className="font-semibold">Escolha seu plano</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Selecione a frequência que melhor se adapta à sua família
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/15 text-secondary text-2xl font-bold">
                    2
                  </div>
                  <h3 className="font-semibold">Personalize</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Informe a idade e preferências do seu filho no questionário
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/15 text-accent text-2xl font-bold">
                    3
                  </div>
                  <h3 className="font-semibold">Receba em casa</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Sua caixinha chega todo mês com frete grátis
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/15 text-primary text-2xl font-bold">
                    4
                  </div>
                  <h3 className="font-semibold">Divirta-se!</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Aproveite momentos especiais com seu filho
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Box */}
        <section className="py-16 md:py-20 bg-muted/50">
          <div className="container">
            <div className="mx-auto max-w-5xl">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Exemplo de Caixinha</h2>
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-0">
                  <div className="relative aspect-square bg-muted">
                    <Image src="/colorful-surprise-box.jpg" alt="Exemplo de caixinha" fill className="object-cover" />
                  </div>
                  <div className="p-8 flex flex-col justify-center space-y-6">
                    <div>
                      <Badge className="mb-4">Tema: Aventura Espacial</Badge>
                      <h3 className="text-2xl font-bold mb-4">O que vem na caixinha?</h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Brinquedos temáticos educativos (3-5 itens)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Livro de atividades ilustrado</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Material para atividades criativas</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Guia para pais com dicas educativas</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="leading-relaxed">Surpresas especiais</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-20">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">Perguntas Frequentes</h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Posso cancelar a qualquer momento?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Sim! Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas adicionais. Basta
                      acessar sua conta e gerenciar sua assinatura.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Como funciona a entrega?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Enviamos sua caixinha todo mês no mesmo dia. O frete é grátis para todo o Brasil e o prazo de
                      entrega varia de 5 a 15 dias úteis dependendo da sua região.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Posso escolher o tema da caixinha?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Os temas são surpresa e escolhidos por nossa equipe de especialistas em desenvolvimento infantil.
                      Porém, você pode informar as preferências do seu filho no questionário para personalizarmos melhor
                      as caixinhas.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Para qual faixa etária são as caixinhas?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed">
                      Nossas caixinhas são adequadas para crianças de 2 a 8 anos. Ao assinar, você informa a idade do
                      seu filho e selecionamos produtos apropriados para o desenvolvimento dele.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-20 bg-gradient-to-b from-primary/10 to-background">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Pronto para Começar a Aventura?</h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Assine agora e garanta momentos especiais de diversão e aprendizado para seu filho!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" asChild>
                  <Link href="/auth/login">Assinar Agora</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/quiz">Fazer Questionário</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
