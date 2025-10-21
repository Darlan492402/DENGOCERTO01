import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Heart, Users, Sparkles, Target } from "@/lib/icons"

export default function SobrePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-b from-secondary/10 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Sobre a Caixinha de Dengo</h1>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Criamos experiências mágicas que unem diversão e aprendizado, levando alegria para crianças e famílias
                em todo o Brasil.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-4xl space-y-12">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-balance">Nossa História</h2>
                <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <p>
                    A Caixinha de Dengo nasceu do sonho de criar momentos especiais entre pais e filhos. Tudo começou
                    quando percebemos que as crianças precisavam de mais do que apenas brinquedos - elas precisavam de
                    experiências que estimulassem sua criatividade, curiosidade e desenvolvimento.
                  </p>
                  <p>
                    Cada caixinha é cuidadosamente preparada com amor e atenção aos detalhes, pensando no sorriso e na
                    alegria que vai proporcionar. Selecionamos brinquedos educativos, atividades criativas e materiais
                    de qualidade que contribuem para o crescimento saudável das crianças.
                  </p>
                  <p>
                    Hoje, já levamos felicidade para mais de 500 famílias em todo o Brasil, e continuamos crescendo com
                    o mesmo propósito: fazer a diferença na vida das crianças através de experiências memoráveis.
                  </p>
                </div>
              </div>

              {/* Values Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 text-primary">
                    <Heart className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold">Amor e Cuidado</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Cada caixinha é preparada com carinho, pensando no desenvolvimento e na felicidade de cada criança.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-secondary/15 text-secondary">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold">Criatividade</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Estimulamos a imaginação com temas variados e atividades que despertam a curiosidade natural das
                    crianças.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/15 text-accent">
                    <Target className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold">Qualidade</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Selecionamos cuidadosamente cada item, garantindo produtos seguros, educativos e de alta qualidade.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/15 text-primary">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-semibold">Comunidade</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Construímos uma comunidade de famílias que valorizam momentos especiais e o desenvolvimento
                    infantil.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-3xl text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-balance">Nossa Missão</h2>
              <p className="text-xl text-muted-foreground text-pretty leading-relaxed">
                Proporcionar experiências únicas que unem diversão e aprendizado, contribuindo para o desenvolvimento
                saudável e feliz das crianças, enquanto criamos memórias inesquecíveis para toda a família.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
