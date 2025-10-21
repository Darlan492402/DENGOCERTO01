/**
 * Update Cart Item API Endpoint
 * PUT /api/carrinho/atualizar - Update item quantity in cart
 */

import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { authenticateRequest } from "@/lib/auth/middleware"

/**
 * PUT - Update item quantity in cart
 * Requires authentication
 */
export async function PUT(request: NextRequest) {
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
    if (!produtoId || quantidade === undefined) {
      return NextResponse.json({ error: "produtoId e quantidade são obrigatórios" }, { status: 400 })
    }

    if (quantidade < 0) {
      return NextResponse.json({ error: "Quantidade não pode ser negativa" }, { status: 400 })
    }

    console.log("[v0] Updating cart item:", { usuarioId, produtoId, quantidade })

    // Find user's cart
    const carrinho = await prisma.carrinho.findUnique({
      where: { usuarioId },
    })

    if (!carrinho) {
      return NextResponse.json({ error: "Carrinho não encontrado" }, { status: 404 })
    }

    // Find item in cart
    const itemCarrinho = await prisma.itemCarrinho.findUnique({
      where: {
        carrinhoId_produtoId: {
          carrinhoId: carrinho.id,
          produtoId: Number.parseInt(produtoId),
        },
      },
      include: { produto: true },
    })

    if (!itemCarrinho) {
      return NextResponse.json({ error: "Produto não encontrado no carrinho" }, { status: 404 })
    }

    // If quantity is 0, remove item
    if (quantidade === 0) {
      await prisma.itemCarrinho.delete({
        where: { id: itemCarrinho.id },
      })

      return NextResponse.json({
        message: "Produto removido do carrinho",
      })
    }

    // Check stock availability
    if (itemCarrinho.produto.estoque < quantidade) {
      return NextResponse.json({ error: "Estoque insuficiente" }, { status: 400 })
    }

    // Update quantity
    const updatedItem = await prisma.itemCarrinho.update({
      where: { id: itemCarrinho.id },
      data: { quantidade: Number.parseInt(quantidade) },
      include: { produto: true },
    })

    return NextResponse.json({
      message: "Quantidade atualizada no carrinho",
      item: updatedItem,
    })
  } catch (error: any) {
    console.error("[v0] Update cart item error:", error)
    return NextResponse.json({ error: `Erro ao atualizar item no carrinho: ${error.message}` }, { status: 500 })
  }
}
