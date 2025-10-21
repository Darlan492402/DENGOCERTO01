/**
 * Mock Data Store
 * Usado quando o Prisma não está disponível (preview/desenvolvimento)
 */

import { hashPassword } from "@/lib/auth/password"

// Tipos
export interface MockUser {
  id: string
  nome: string
  email: string
  senha: string
  role: "USER" | "ADMIN"
  criadoEm: Date
}

export interface MockProduct {
  id: string
  nome: string
  descricao: string
  preco: number
  estoque: number
  categoria: string
  imagemUrl: string
  ativo: boolean
  criadoEm: Date
}

export interface MockOrderItem {
  id: string
  pedidoId: string
  produtoId: string
  quantidade: number
  precoUnitario: number
}

export interface MockOrder {
  id: string
  usuarioId: string
  status: "PENDENTE" | "PROCESSANDO" | "ENVIADO" | "ENTREGUE" | "CANCELADO"
  total: number
  enderecoEntrega: string
  criadoEm: Date
  items: MockOrderItem[]
}

// Store em memória
class MockDataStore {
  private users: Map<string, MockUser> = new Map()
  private products: Map<string, MockProduct> = new Map()
  private orders: Map<string, MockOrder> = new Map()
  private initialized = false

  async initialize() {
    if (this.initialized) return

    // Criar usuário admin padrão
    const adminPassword = await hashPassword("admin123")
    this.users.set("admin-1", {
      id: "admin-1",
      nome: "Administrador",
      email: "admin@caixinhas.com",
      senha: adminPassword,
      role: "ADMIN",
      criadoEm: new Date(),
    })

    // Criar produtos de exemplo
    const produtos: Omit<MockProduct, "id" | "criadoEm">[] = [
      {
        nome: "Caixinha Surpresa Colorida",
        descricao: "Uma caixinha mágica cheia de surpresas coloridas para alegrar o dia!",
        preco: 49.9,
        estoque: 50,
        categoria: "surpresa",
        imagemUrl: "/colorful-surprise-box.jpg",
        ativo: true,
      },
      {
        nome: "Caixinha Dinossauros",
        descricao: "Aventura pré-histórica com dinossauros incríveis!",
        preco: 54.9,
        estoque: 30,
        categoria: "dinossauros",
        imagemUrl: "/dinosaur-toys-box.jpg",
        ativo: true,
      },
      {
        nome: "Caixinha Princesas",
        descricao: "Um mundo mágico de princesas e castelos encantados!",
        preco: 54.9,
        estoque: 40,
        categoria: "princesas",
        imagemUrl: "/princess-toys-box.jpg",
        ativo: true,
      },
      {
        nome: "Caixinha Super-Heróis",
        descricao: "Poderes incríveis e aventuras heroicas!",
        preco: 54.9,
        estoque: 35,
        categoria: "super-herois",
        imagemUrl: "/superhero-toys-kids.jpg",
        ativo: true,
      },
      {
        nome: "Caixinha Animais da Fazenda",
        descricao: "Conheça os animais da fazenda de forma divertida!",
        preco: 49.9,
        estoque: 45,
        categoria: "animais",
        imagemUrl: "/farm-animals-toys.jpg",
        ativo: true,
      },
      {
        nome: "Caixinha Fundo do Mar",
        descricao: "Explore as maravilhas do oceano!",
        preco: 54.9,
        estoque: 25,
        categoria: "oceano",
        imagemUrl: "/ocean-sea-toys.jpg",
        ativo: true,
      },
    ]

    produtos.forEach((produto, index) => {
      const id = `produto-${index + 1}`
      this.products.set(id, {
        ...produto,
        id,
        criadoEm: new Date(),
      })
    })

    this.initialized = true
  }

  // Users
  async findUserByEmail(email: string): Promise<MockUser | null> {
    await this.initialize()
    return Array.from(this.users.values()).find((u) => u.email === email) || null
  }

  async findUserById(id: string): Promise<MockUser | null> {
    await this.initialize()
    return this.users.get(id) || null
  }

  async createUser(data: Omit<MockUser, "id" | "criadoEm">): Promise<MockUser> {
    await this.initialize()
    const id = `user-${Date.now()}`
    const user: MockUser = {
      ...data,
      id,
      criadoEm: new Date(),
    }
    this.users.set(id, user)
    return user
  }

  async getAllUsers(): Promise<MockUser[]> {
    await this.initialize()
    return Array.from(this.users.values())
  }

  // Products
  async getAllProducts(): Promise<MockProduct[]> {
    await this.initialize()
    return Array.from(this.products.values()).filter((p) => p.ativo)
  }

  async findProductById(id: string): Promise<MockProduct | null> {
    await this.initialize()
    return this.products.get(id) || null
  }

  async createProduct(data: Omit<MockProduct, "id" | "criadoEm">): Promise<MockProduct> {
    await this.initialize()
    const id = `produto-${Date.now()}`
    const product: MockProduct = {
      ...data,
      id,
      criadoEm: new Date(),
    }
    this.products.set(id, product)
    return product
  }

  async updateProduct(id: string, data: Partial<MockProduct>): Promise<MockProduct | null> {
    await this.initialize()
    const product = this.products.get(id)
    if (!product) return null

    const updated = { ...product, ...data }
    this.products.set(id, updated)
    return updated
  }

  async deleteProduct(id: string): Promise<boolean> {
    await this.initialize()
    return this.products.delete(id)
  }

  // Orders
  async createOrder(data: Omit<MockOrder, "id" | "criadoEm">): Promise<MockOrder> {
    await this.initialize()
    const id = `pedido-${Date.now()}`
    const order: MockOrder = {
      ...data,
      id,
      criadoEm: new Date(),
    }
    this.orders.set(id, order)
    return order
  }

  async getAllOrders(): Promise<MockOrder[]> {
    await this.initialize()
    return Array.from(this.orders.values())
  }

  async findOrderById(id: string): Promise<MockOrder | null> {
    await this.initialize()
    return this.orders.get(id) || null
  }

  async updateOrderStatus(id: string, status: MockOrder["status"]): Promise<MockOrder | null> {
    await this.initialize()
    const order = this.orders.get(id)
    if (!order) return null

    order.status = status
    this.orders.set(id, order)
    return order
  }
}

const mockStore = new MockDataStore()
mockStore.initialize().catch(console.error)

export { mockStore }
