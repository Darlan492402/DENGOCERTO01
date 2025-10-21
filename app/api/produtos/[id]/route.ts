/**
 * Single Product API Endpoint
 * GET /api/produtos/[id] - Get product by ID (public)
 * PUT /api/produtos/[id] - Update product (admin only)
 * DELETE /api/produtos/[id] - Delete product (admin only)
 */

import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { requireAdmin } from "@/lib/auth/middleware"

/**
 * GET - Get product by ID
 * Public endpoint
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    console.log("[v0] Fetching product:", id)

    const produto = await prisma.produto.findUnique({
      where: { id: Number.parseInt(id) },
    })

    if (!produto) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    return NextResponse.json({ produto })
  } catch (error: any) {
    console.error("[v0] Get product error:", error)
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

    return NextResponse.json({ error: `Erro ao buscar produto: ${error.message}` }, { status: 500 })
  }
}

/**
 * PUT - Update product
 * Requires admin authentication
 */
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin(request)

    if (!authResult.authorized) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.error?.includes("Token") ? 401 : 403 })
    }

    const { id } = params
    const body = await request.json()
    const {
      nome,
      descricao,
      preco,
      estoque,
      categoria,
      imagemUrl,
      ativo,
      desconto,
      promocaoAtiva,
      dataValidade,
      categoriaId,
    } = body

    // Check if product exists
    const existingProduct = await prisma.produto.findUnique({
      where: { id: Number.parseInt(id) },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    // Validate numeric fields if provided
    if (preco !== undefined && preco < 0) {
      return NextResponse.json({ error: "Preço deve ser um valor positivo" }, { status: 400 })
    }

    if (estoque !== undefined && estoque < 0) {
      return NextResponse.json({ error: "Estoque deve ser um valor positivo" }, { status: 400 })
    }

    if (desconto !== undefined && (desconto < 0 || desconto > 100)) {
      return NextResponse.json({ error: "Desconto deve ser entre 0 e 100" }, { status: 400 })
    }

    // Update product
    const produto = await prisma.produto.update({
      where: { id: Number.parseInt(id) },
      data: {
        ...(nome && { nome }),
        ...(descricao && { descricao }),
        ...(preco !== undefined && { preco: Number.parseFloat(preco) }),
        ...(estoque !== undefined && { estoque: Number.parseInt(estoque) }),
        ...(categoria && { categoria }),
        ...(categoriaId !== undefined && { categoriaId: categoriaId ? Number.parseInt(categoriaId) : null }),
        ...(imagemUrl !== undefined && { imagemUrl }),
        ...(ativo !== undefined && { ativo }),
        ...(desconto !== undefined && { desconto: Number.parseFloat(desconto) }),
        ...(promocaoAtiva !== undefined && { promocaoAtiva }),
        ...(dataValidade !== undefined && { dataValidade: dataValidade ? new Date(dataValidade) : null }),
      },
    })

    return NextResponse.json({
      message: "Produto atualizado com sucesso",
      produto,
    })
  } catch (error: any) {
    console.error("[v0] Update product error:", error)
    console.error("[v0] Error details:", {
      message: error.message,
      code: error.code,
    })

    return NextResponse.json({ error: `Erro ao atualizar produto: ${error.message}` }, { status: 500 })
  }
}

/**
 * DELETE - Delete product
 * Requires admin authentication
 */
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check admin authorization
    const authResult = await requireAdmin(request)

    if (!authResult.authorized) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.error?.includes("Token") ? 401 : 403 })
    }

    const { id } = params

    // Check if product exists
    const existingProduct = await prisma.produto.findUnique({
      where: { id: Number.parseInt(id) },
    })

    if (!existingProduct) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    // Delete product
    await prisma.produto.delete({
      where: { id: Number.parseInt(id) },
    })

    return NextResponse.json({
      message: "Produto excluído com sucesso",
    })
  } catch (error: any) {
    console.error("[v0] Delete product error:", error)
    console.error("[v0] Error details:", {
      message: error.message,
      code: error.code,
    })

    return NextResponse.json({ error: `Erro ao excluir produto: ${error.message}` }, { status: 500 })
  }
}
