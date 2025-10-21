/**
 * Cart API Endpoint
 * GET /api/carrinho - Get user's cart with items
 */

import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { authenticateRequest } from "@/lib/auth/middleware"

/**
 * GET - Get user's cart
 * Requires authentication
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request)

    if (!authResult.authenticated) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const usuarioId = authResult.user?.userId

    console.log("[v0] Fetching cart for user:", usuarioId)

    // Find or create cart for user
    let carrinho = await prisma.carrinho.findUnique({
      where: { usuarioId },
      include: {
        itens: {
          include: {
            produto: true,
          },
        },
      },
    })

    // If cart doesn't exist, create one
    if (!carrinho) {
      carrinho = await prisma.carrinho.create({
        data: { usuarioId },
        include: {
          itens: {
            include: {
              produto: true,
            },
          },
        },
      })
    }

    // Calculate cart total
    const total = carrinho.itens.reduce((sum, item) => {
      return sum + item.precoUnit * item.quantidade
    }, 0)

    return NextResponse.json({
      carrinho: {
        ...carrinho,
        total,
      },
    })
  } catch (error: any) {
    console.error("[v0] Get cart error:", error)
    return NextResponse.json({ error: `Erro ao recuperar o carrinho: ${error.message}` }, { status: 500 })
  }
}
