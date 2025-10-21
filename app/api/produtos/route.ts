/**
 * Products API Endpoint
 * GET /api/produtos - List all active products (public)
 * POST /api/produtos - Create new product (admin only)
 */

import { type NextRequest, NextResponse } from "next/server"
import { prisma, checkDatabaseConnection, isUsingMockData } from "@/lib/db/prisma"
import { mockStore } from "@/lib/db/mock-data"
import { requireAdmin } from "@/lib/auth/middleware"

/**
 * GET - List all active products
 * Public endpoint, no authentication required
 */
export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Fetching products")

    await checkDatabaseConnection()

    if (isUsingMockData()) {
      console.log("[v0] Using mock data store for products")
      const produtos = await mockStore.getAllProducts()
      return NextResponse.json({ produtos })
    }

    // Use real database
    const { searchParams } = new URL(request.url)
    const categoria = searchParams.get("categoria")
    const ativo = searchParams.get("ativo")

    const where: any = {}

    if (categoria) {
      where.categoria = categoria
    }

    if (ativo !== null) {
      where.ativo = ativo === "true"
    } else {
      where.ativo = true
    }

    const produtos = await prisma.produto.findMany({
      where,
      orderBy: {
        criadoEm: "desc",
      },
    })

    console.log("[v0] Products fetched successfully:", produtos.length)

    return NextResponse.json({ produtos })
  } catch (error: any) {
    console.error("[v0] Get products error:", error)
    console.error("[v0] Error details:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
    })

    if (error.code === "P2021") {
      return NextResponse.json(
        { error: "Tabela 'produto' não existe. Execute as migrations do banco de dados." },
        { status: 500 },
      )
    }

    return NextResponse.json({ error: `Erro ao buscar produtos: ${error.message}` }, { status: 500 })
  }
}

/**
 * POST - Create new product
 * Requires admin authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin(request)

    if (!authResult.authorized) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.error?.includes("Token") ? 401 : 403 })
    }

    const body = await request.json()
    const {
      nome,
      descricao,
      preco,
      estoque,
      categoria,
      categoriaId,
      imagemUrl,
      ativo,
      desconto,
      promocaoAtiva,
      dataValidade,
    } = body

    // Validate required fields
    if (!nome || !descricao || preco === undefined || estoque === undefined || !categoria) {
      return NextResponse.json(
        { error: "Nome, descrição, preço, estoque e categoria são obrigatórios" },
        { status: 400 },
      )
    }

    // Validate numeric fields
    if (preco < 0 || estoque < 0) {
      return NextResponse.json({ error: "Preço e estoque devem ser valores positivos" }, { status: 400 })
    }

    if (desconto !== undefined && (desconto < 0 || desconto > 100)) {
      return NextResponse.json({ error: "Desconto deve ser entre 0 e 100" }, { status: 400 })
    }

    await checkDatabaseConnection()

    if (isUsingMockData()) {
      console.log("[v0] Using mock data store to create product")
      const produto = await mockStore.createProduct({
        nome,
        descricao,
        preco: Number.parseFloat(preco),
        estoque: Number.parseInt(estoque),
        categoria,
        imagemUrl: imagemUrl || "/placeholder.svg?height=400&width=400",
        ativo: ativo !== undefined ? ativo : true,
      })

      return NextResponse.json(
        {
          message: "Produto criado com sucesso (modo preview)",
          produto,
        },
        { status: 201 },
      )
    }

    // Use real database
    const produto = await prisma.produto.create({
      data: {
        nome,
        descricao,
        preco: Number.parseFloat(preco),
        estoque: Number.parseInt(estoque),
        categoria,
        categoriaId: categoriaId ? Number.parseInt(categoriaId) : null,
        imagemUrl: imagemUrl || null,
        ativo: ativo !== undefined ? ativo : true,
        desconto: desconto !== undefined ? Number.parseFloat(desconto) : 0,
        promocaoAtiva: promocaoAtiva !== undefined ? promocaoAtiva : false,
        dataValidade: dataValidade ? new Date(dataValidade) : null,
      },
    })

    return NextResponse.json(
      {
        message: "Produto criado com sucesso",
        produto,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Create product error:", error)
    return NextResponse.json({ error: "Erro ao criar produto" }, { status: 500 })
  }
}
