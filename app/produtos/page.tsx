"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProductCard } from "@/components/product-card"
import { mockProducts } from "@/lib/mock-data"

export default function ProdutosPage() {
  const products = mockProducts

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4 mb-12 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Todas as Caixinhas</h1>
              <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
                Explore nossa coleção completa de caixas temáticas e assinaturas mensais.
              </p>
            </div>

            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {products.map((product) => (
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
              <div className="text-center py-12">
                <p className="text-muted-foreground">Nenhum produto disponível no momento.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
