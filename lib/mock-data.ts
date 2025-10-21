export interface Product {
  id: string
  name: string
  description: string
  price: number
  image_url: string
  theme: string
  age_range: string
  is_subscription: boolean
  stock_quantity: number
  created_at: string
}

export const initialProducts: Product[] = [
  {
    id: "1",
    name: "Caixinha Dinossauros",
    description:
      "Uma aventura pré-histórica com dinossauros incríveis! Inclui miniaturas, livro educativo e atividades.",
    price: 89.9,
    image_url: "/dinosaur-toys-box.jpg",
    theme: "Dinossauros",
    age_range: "3-6 anos",
    is_subscription: false,
    stock_quantity: 15,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Caixinha Fazendinha",
    description: "Conheça os animais da fazenda! Vem com animais em miniatura, sons e jogos educativos.",
    price: 79.9,
    image_url: "/farm-animals-toys.jpg",
    theme: "Fazenda",
    age_range: "2-5 anos",
    is_subscription: false,
    stock_quantity: 20,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Caixinha Fundo do Mar",
    description: "Explore o oceano com criaturas marinhas fascinantes! Inclui animais aquáticos e livro sobre o mar.",
    price: 84.9,
    image_url: "/ocean-sea-toys.jpg",
    theme: "Oceano",
    age_range: "4-7 anos",
    is_subscription: false,
    stock_quantity: 12,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Caixinha Princesas",
    description: "Um mundo mágico de princesas e castelos! Com acessórios, coroas e histórias encantadas.",
    price: 94.9,
    image_url: "/princess-toys-box.jpg",
    theme: "Princesas",
    age_range: "3-8 anos",
    is_subscription: false,
    stock_quantity: 18,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Caixinha Espaço",
    description: "Viaje pelo universo! Inclui planetas, astronautas, foguetes e fatos espaciais incríveis.",
    price: 99.9,
    image_url: "/space-toys-kids.jpg",
    theme: "Espaço",
    age_range: "5-10 anos",
    is_subscription: false,
    stock_quantity: 10,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    name: "Caixinha Super-Heróis",
    description: "Seja um herói! Vem com máscaras, capas e histórias de coragem e aventura.",
    price: 89.9,
    image_url: "/superhero-toys-kids.jpg",
    theme: "Super-Heróis",
    age_range: "4-9 anos",
    is_subscription: false,
    stock_quantity: 14,
    created_at: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Assinatura Mensal - Surpresa",
    description: "Receba uma caixinha temática diferente todo mês! Temas variados e sempre novos.",
    price: 79.9,
    image_url: "/colorful-surprise-box.jpg",
    theme: "Variado",
    age_range: "3-10 anos",
    is_subscription: true,
    stock_quantity: 999,
    created_at: new Date().toISOString(),
  },
]

// Helper functions for localStorage
export function getProducts(): Product[] {
  if (typeof window === "undefined") return initialProducts

  const stored = localStorage.getItem("caixinha-products")
  if (!stored) {
    localStorage.setItem("caixinha-products", JSON.stringify(initialProducts))
    return initialProducts
  }
  return JSON.parse(stored)
}

export function saveProducts(products: Product[]): void {
  if (typeof window === "undefined") return
  localStorage.setItem("caixinha-products", JSON.stringify(products))
}

export function addProduct(product: Omit<Product, "id" | "created_at">): Product {
  const products = getProducts()
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    created_at: new Date().toISOString(),
  }
  products.push(newProduct)
  saveProducts(products)
  return newProduct
}

export function updateProduct(id: string, updates: Partial<Product>): Product | null {
  const products = getProducts()
  const index = products.findIndex((p) => p.id === id)
  if (index === -1) return null

  products[index] = { ...products[index], ...updates }
  saveProducts(products)
  return products[index]
}

export function deleteProduct(id: string): boolean {
  const products = getProducts()
  const filtered = products.filter((p) => p.id !== id)
  if (filtered.length === products.length) return false

  saveProducts(filtered)
  return true
}

export const mockProducts = initialProducts

export const products = initialProducts
