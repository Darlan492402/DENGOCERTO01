import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { Heart, Gift, Zap, Clock } from "@/lib/icons"
import { ProductCard } from "@/components/product-card"
import { mockProducts } from "@/lib/mock-data"

export default function HomePage() {
  const featuredProducts = mockProducts.slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <Badge className="w-fit bg-primary/20 text-primary-foreground border-primary">
                  🧸 Bem-vindo à Caixinha de Dengo
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold text-balance leading-tight">
                  Um mundo de descobertas dentro de cada caixinha
                </h1>
                <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                  Brinquedos educativos e experiências pensadas para acompanhar o crescimento do seu pequeno — e
                  transformar cada momento em aprendizado e encantamento.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Link href="/quiz">🧡 Quero minha caixinha</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="bg-transparent border-primary text-primary hover:bg-primary/10"
                  >
                    <Link href="/produtos">🎁 Quero presentear</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-96 md:h-[500px]">
                <Image
                  src="/colorful-surprise-box.jpg"
                  alt="Caixinha de Dengo - Brinquedos Educativos"
                  fill
                  unoptimized
                  className="object-cover rounded-3xl shadow-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24 bg-card/50">
          <div className="container max-w-6xl">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">💛 Sobre o Dengo na Caixinha</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                O Dengo na Caixinha nasceu do desejo de tornar o brincar mais leve, consciente e cheio de propósito.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A cada mês, entregamos uma caixinha com brinquedos educativos, materiais sensoriais e ideias de
                  atividades pensadas com carinho para acompanhar cada fase do bebê — dos primeiros toques às grandes
                  descobertas.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Mais do que produtos, enviamos tempo de qualidade e vínculos que crescem junto com o seu pequeno.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  E pra espalhar ainda mais esse carinho, também criamos presentes personalizados: caixinhas únicas,
                  montadas sob medida para cada criança — seja um mimo da vovó, do padrinho, da tia coruja, do primo
                  brincalhão ou de quem quer demonstrar amor em forma de dengo. 💛
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-8 space-y-4">
                <h3 className="text-xl font-bold">Cada presente é pensado para encantar e fortalecer laços.</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Brinquedos Educativos</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Materiais Sensoriais</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Atividades Pensadas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>Presentes Personalizados</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">🌱 Como Funciona</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Três passos simples para encontrar a caixinha perfeita.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 text-primary mb-4">
                    <span className="text-xl font-bold">1</span>
                  </div>
                  <CardTitle>Você se cadastra</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Preenche o perfil do seu bebê — o que ele gosta, como está se desenvolvendo, o que desperta sua
                    curiosidade.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 text-primary mb-4">
                    <span className="text-xl font-bold">2</span>
                  </div>
                  <CardTitle>Nós preparamos</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Selecionamos com cuidado brinquedos e experiências adequadas à idade e à fase do desenvolvimento.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 text-primary mb-4">
                    <span className="text-xl font-bold">3</span>
                  </div>
                  <CardTitle>Seu dengo recebe</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    A cada mês, uma nova caixinha chega até vocês — cheia de descobertas, aprendizado e amor.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24 bg-card/50">
          <div className="container max-w-6xl">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">🎁 Por que escolher o Dengo na Caixinha</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Oferecemos experiências únicas que combinam diversão, aprendizado e qualidade.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 text-primary mb-4">
                    <Gift className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">Brinquedos seguros e educativos</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Todos os produtos são selecionados com cuidado para garantir segurança e qualidade.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 text-primary mb-4">
                    <Heart className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">Materiais sustentáveis</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Comprometidos com o meio ambiente e o futuro das crianças.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 text-primary mb-4">
                    <Zap className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">Experiências únicas a cada mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Novas descobertas, aprendizado e diversão em cada caixinha que chega.
                  </CardDescription>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 text-primary mb-4">
                    <Clock className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg">Entregas cheias de carinho</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">
                    Preparamos e entregamos suas caixinhas com rapidez e segurança direto na porta da sua casa.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16 md:py-24">
          <div className="container max-w-6xl">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Produtos em Destaque</h2>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Conheça algumas de nossas caixinhas mais populares.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  price={product.price}
                  imageUrl={product.image_url}
                  theme={product.theme}
                  ageRange={product.age_range}
                  isSubscription={product.is_subscription}
                />
              ))}
            </div>

            <div className="text-center">
              <Button
                size="lg"
                variant="outline"
                asChild
                className="bg-transparent border-primary text-primary hover:bg-primary/10"
              >
                <Link href="/produtos">Ver Todos os Produtos</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-card/50">
          <div className="container max-w-4xl">
            <Card className="bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20">
              <CardHeader className="text-center space-y-4">
                <CardTitle className="text-3xl md:text-4xl text-balance">Pronto para Começar?</CardTitle>
                <CardDescription className="text-lg text-pretty">
                  Descubra qual caixinha é perfeita para seu filho respondendo nosso quiz personalizado.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Link href="/quiz">Fazer Quiz Agora</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="bg-transparent border-primary text-primary hover:bg-primary/10"
                >
                  <Link href="/assinatura">Ver Planos de Assinatura</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
