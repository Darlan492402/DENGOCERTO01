/**
 * Orders API Endpoint
 * GET /api/pedidos - List orders (user: own orders, admin: all orders)
 * POST /api/pedidos - Create new order (authenticated users)
 */

import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { authenticateRequest } from "@/lib/auth/middleware"

/**
 * GET - List orders
 * Users see their own orders, admins see all orders
 */
export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Fetching orders")

    // Authenticate request
    const authResult = await authenticateRequest(request)

    if (!authResult.authenticated) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")

    const where: any = {}

    // Non-admin users can only see their own orders
    if (authResult.user!.role !== "admin") {
      where.usuarioId = authResult.user!.userId
    }

    // Filter by status if provided
    if (status) {
      where.status = status
    }

    const pedidos = await prisma.pedido.findMany({
      where,
      include: {
        usuario: {
          select: {
            id: true,
            nome: true,
            email: true,
          },
        },
        itens: {
          include: {
            produto: true,
          },
        },
      },
      orderBy: {
        criadoEm: "desc",
      },
    })

    console.log("[v0] Orders fetched successfully:", pedidos.length)

    return NextResponse.json({ pedidos })
  } catch (error: any) {
    console.error("[v0] Get orders error:", error)
    console.error("[v0] Error details:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
    })

    if (error.code === "P2021") {
      return NextResponse.json(
        { error: "Tabelas não existem. Execute as migrations do banco de dados." },
        { status: 500 },
      )
    }

    return NextResponse.json({ error: `Erro ao buscar pedidos: ${error.message}` }, { status: 500 })
  }
}

/**
 * POST - Create new order
 * Requires authentication
 */
export async function POST(request: NextRequest) {
  try {
    console.log("[v0] Creating order")

    // Authenticate request
    const authResult = await authenticateRequest(request)

    if (!authResult.authenticated) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const body = await request.json()
    const { itens, enderecoEntrega } = body

    // Validate required fields
    if (!itens || !Array.isArray(itens) || itens.length === 0) {
      return NextResponse.json({ error: "Itens do pedido são obrigatórios" }, { status: 400 })
    }

    if (!enderecoEntrega) {
      return NextResponse.json({ error: "Endereço de entrega é obrigatório" }, { status: 400 })
    }

    // Validate and calculate total
    let total = 0
    const validatedItems = []

    for (const item of itens) {
      if (!item.produtoId || !item.quantidade || item.quantidade <= 0) {
        return NextResponse.json({ error: "Itens inválidos no pedido" }, { status: 400 })
      }

      // Get product and check stock
      const produto = await prisma.produto.findUnique({
        where: { id: item.produtoId },
      })

      if (!produto) {
        return NextResponse.json({ error: `Produto ${item.produtoId} não encontrado` }, { status: 404 })
      }

      if (!produto.ativo) {
        return NextResponse.json({ error: `Produto ${produto.nome} não está disponível` }, { status: 400 })
      }

      if (produto.estoque < item.quantidade) {
        return NextResponse.json(
          { error: `Estoque insuficiente para ${produto.nome}. Disponível: ${produto.estoque}` },
          { status: 400 },
        )
      }

      validatedItems.push({
        produtoId: produto.id,
        quantidade: item.quantidade,
        precoUnit: produto.preco,
      })

      total += produto.preco * item.quantidade
    }

    // Create order with items in a transaction
    const pedido = await prisma.$transaction(async (tx) => {
      // Create order
      const newPedido = await tx.pedido.create({
        data: {
          usuarioId: authResult.user!.userId,
          status: "pendente",
          total,
          enderecoEntrega,
          itens: {
            create: validatedItems,
          },
        },
        include: {
          itens: {
            include: {
              produto: true,
            },
          },
        },
      })

      // Update product stock
      for (const item of validatedItems) {
        await tx.produto.update({
          where: { id: item.produtoId },
          data: {
            estoque: {
              decrement: item.quantidade,
            },
          },
        })
      }

      return newPedido
    })

    console.log("[v0] Order created successfully:", pedido.id)

    return NextResponse.json(
      {
        message: "Pedido criado com sucesso",
        pedido,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[v0] Create order error:", error)
    console.error("[v0] Error details:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
    })

    return NextResponse.json({ error: `Erro ao criar pedido: ${error.message}` }, { status: 500 })
  }
}
