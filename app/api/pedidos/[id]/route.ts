/**
 * Single Order API Endpoint
 * GET /api/pedidos/[id] - Get order by ID
 * PUT /api/pedidos/[id] - Update order status (admin only)
 */

import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { authenticateRequest, requireAdmin } from "@/lib/auth/middleware"

/**
 * GET - Get order by ID
 * Users can only see their own orders, admins can see all
 */
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request)

    if (!authResult.authenticated) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    const { id } = params

    console.log("[v0] Fetching order:", id)

    const pedido = await prisma.pedido.findUnique({
      where: { id: Number.parseInt(id) },
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
    })

    if (!pedido) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 })
    }

    // Check if user has permission to view this order
    if (authResult.user!.role !== "admin" && pedido.usuarioId !== authResult.user!.userId) {
      return NextResponse.json({ error: "Você não tem permissão para visualizar este pedido" }, { status: 403 })
    }

    return NextResponse.json({ pedido })
  } catch (error: any) {
    console.error("[v0] Get order error:", error)
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

    return NextResponse.json({ error: `Erro ao buscar pedido: ${error.message}` }, { status: 500 })
  }
}

/**
 * PUT - Update order status
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
    const { status } = body

    console.log("[v0] Updating order status:", id, status)

    // Validate status
    const validStatuses = ["pendente", "pago", "enviado", "entregue", "cancelado"]
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json(
        { error: `Status inválido. Valores permitidos: ${validStatuses.join(", ")}` },
        { status: 400 },
      )
    }

    // Check if order exists
    const existingOrder = await prisma.pedido.findUnique({
      where: { id: Number.parseInt(id) },
    })

    if (!existingOrder) {
      return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 })
    }

    // Update order status
    const pedido = await prisma.pedido.update({
      where: { id: Number.parseInt(id) },
      data: { status },
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
    })

    console.log("[v0] Order status updated successfully")

    return NextResponse.json({
      message: "Status do pedido atualizado com sucesso",
      pedido,
    })
  } catch (error: any) {
    console.error("[v0] Update order error:", error)
    console.error("[v0] Error details:", {
      message: error.message,
      code: error.code,
    })

    return NextResponse.json({ error: `Erro ao atualizar pedido: ${error.message}` }, { status: 500 })
  }
}
