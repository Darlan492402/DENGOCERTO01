/**
 * Remove from Cart API Endpoint
 * DELETE /api/carrinho/remover - Remove product from cart
 */

import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { authenticateRequest } from "@/lib/auth/middleware"

/**
 * DELETE - Remove product from cart
 * Requires authentication
 */
export async function DELETE(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request)

    if (!authResult.authenticated) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const usuarioId = authResult.user?.userId
    const body = await request.json()
    const { produtoId } = body

    // Validate input
    if (!produtoId) {
      return NextResponse.json({ error: "produtoId é obrigatório" }, { status: 400 })
    }

    console.log("[v0] Removing product from cart:", { usuarioId, produtoId })

    // Find user's cart
    const carrinho = await prisma.carrinho.findUnique({
      where: { usuarioId },
    })

    if (!carrinho) {
      return NextResponse.json({ error: "Carrinho não encontrado" }, { status: 404 })
    }

    // Remove item from cart
    const deletedItem = await prisma.itemCarrinho.deleteMany({
      where: {
        carrinhoId: carrinho.id,
        produtoId: Number.parseInt(produtoId),
      },
    })

    if (deletedItem.count === 0) {
      return NextResponse.json({ error: "Produto não encontrado no carrinho" }, { status: 404 })
    }

    return NextResponse.json({
      message: "Produto removido do carrinho",
    })
  } catch (error: any) {
    console.error("[v0] Remove from cart error:", error)
    return NextResponse.json({ error: `Erro ao remover produto do carrinho: ${error.message}` }, { status: 500 })
  }
}
