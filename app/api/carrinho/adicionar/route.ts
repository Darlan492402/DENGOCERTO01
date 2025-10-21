/**
 * Add to Cart API Endpoint
 * POST /api/carrinho/adicionar - Add product to cart
 */

import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { authenticateRequest } from "@/lib/auth/middleware"

/**
 * POST - Add product to cart
 * Requires authentication
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request)

    if (!authResult.authenticated) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const usuarioId = authResult.user?.userId
    const body = await request.json()
    const { produtoId, quantidade } = body

    // Validate input
    if (!produtoId || !quantidade) {
      return NextResponse.json({ error: "produtoId e quantidade são obrigatórios" }, { status: 400 })
    }

    if (quantidade <= 0) {
      return NextResponse.json({ error: "Quantidade deve ser maior que zero" }, { status: 400 })
    }

    console.log("[v0] Adding product to cart:", { usuarioId, produtoId, quantidade })

    // Check if product exists and has stock
    const produto = await prisma.produto.findUnique({
      where: { id: Number.parseInt(produtoId) },
    })

    if (!produto) {
      return NextResponse.json({ error: "Produto não encontrado" }, { status: 404 })
    }

    if (!produto.ativo) {
      return NextResponse.json({ error: "Produto não está disponível" }, { status: 400 })
    }

    if (produto.estoque < quantidade) {
      return NextResponse.json({ error: "Estoque insuficiente" }, { status: 400 })
    }

    // Find or create cart
    let carrinho = await prisma.carrinho.findUnique({
      where: { usuarioId },
    })

    if (!carrinho) {
      carrinho = await prisma.carrinho.create({
        data: { usuarioId },
      })
    }

    // Check if item already exists in cart
    const existingItem = await prisma.itemCarrinho.findUnique({
      where: {
        carrinhoId_produtoId: {
          carrinhoId: carrinho.id,
          produtoId: Number.parseInt(produtoId),
        },
      },
    })

    if (existingItem) {
      // Update quantity
      const newQuantity = existingItem.quantidade + Number.parseInt(quantidade)

      if (produto.estoque < newQuantity) {
        return NextResponse.json({ error: "Estoque insuficiente para a quantidade solicitada" }, { status: 400 })
      }

      const itemCarrinho = await prisma.itemCarrinho.update({
        where: { id: existingItem.id },
        data: { quantidade: newQuantity },
        include: { produto: true },
      })

      return NextResponse.json({
        message: "Quantidade atualizada no carrinho",
        item: itemCarrinho,
      })
    } else {
      // Add new item to cart
      const itemCarrinho = await prisma.itemCarrinho.create({
        data: {
          carrinhoId: carrinho.id,
          produtoId: Number.parseInt(produtoId),
          quantidade: Number.parseInt(quantidade),
          precoUnit: produto.preco,
        },
        include: { produto: true },
      })

      return NextResponse.json(
        {
          message: "Produto adicionado ao carrinho",
          item: itemCarrinho,
        },
        { status: 201 },
      )
    }
  } catch (error: any) {
    console.error("[v0] Add to cart error:", error)
    return NextResponse.json({ error: `Erro ao adicionar produto ao carrinho: ${error.message}` }, { status: 500 })
  }
}
