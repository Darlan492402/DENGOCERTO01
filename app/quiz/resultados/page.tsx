"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Sparkles } from "@/lib/icons"
import { mockProducts } from "@/lib/mock-data"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

export default function ResultadosPage() {
  const searchParams = useSearchParams()
  const age = searchParams.get("age")
  const interests = searchParams.get("interests")
  const preferences = searchParams.get("preferences")

  const filteredProducts = useMemo(() => {
    let results = [...mockProducts]

    // Filter by subscription preference
    if (preferences === "subscription") {
      results = results.filter((p) => p.is_subscription)
    } else if (preferences === "onetime") {
      results = results.filter((p) => !p.is_subscription)
    }

    // Filter by interests/themes
    if (interests) {
      const interestList = interests.split(",")
      const themeMap: Record<string, string> = {
        dinosaurs: "Dinossauros",
        space: "Espaço",
        animals: "Fazenda",
        princesses: "Princesas",
        superheroes: "Super-Heróis",
        art: "Arte",
        ocean: "Oceano",
      }

      results = results.filter((p) =>
        interestList.some((interest) => {
          const theme = themeMap[interest]
          return theme && p.theme.includes(theme)
        }),
      )
    }

    return results.slice(0, 6)
  }, [age, interests, preferences])

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container max-w-6xl py-12 md:py-16">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <Sparkles className="h-4 w-4" />
                Recomendações Personalizadas
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-balance">Encontramos as Caixinhas Perfeitas!</h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Baseado nas suas respostas, selecionamos produtos que vão encantar seu filho.
              </p>
            </div>

            {filteredProducts && filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
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
            ) : (
              <div className="text-center py-12 space-y-4">
                <p className="text-muted-foreground">
                  Não encontramos produtos que correspondam exatamente às suas preferências.
                </p>
                <Button asChild>
                  <Link href="/produtos">Ver Todos os Produtos</Link>
                </Button>
              </div>
            )}

            <div className="text-center space-y-4 pt-8">
              <p className="text-muted-foreground">Não encontrou o que procurava?</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="outline" asChild>
                  <Link href="/quiz">Refazer Quiz</Link>
                </Button>
                <Button asChild>
                  <Link href="/produtos">Ver Todos os Produtos</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
