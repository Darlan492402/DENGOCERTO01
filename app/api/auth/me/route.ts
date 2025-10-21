/**
 * Get Current User API Endpoint
 * GET /api/auth/me
 * Requires authentication
 */

import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db/prisma"
import { authenticateRequest } from "@/lib/auth/middleware"

export async function GET(request: NextRequest) {
  try {
    console.log("[v0] Fetching current user")

    // Authenticate request
    const authResult = await authenticateRequest(request)

    if (!authResult.authenticated) {
      return NextResponse.json({ error: authResult.error }, { status: 401 })
    }

    // Get user from database
    const user = await prisma.usuario.findUnique({
      where: { id: authResult.user!.userId },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        criadoEm: true,
      },
    })

    if (!user) {
      return NextResponse.json({ error: "Usuário não encontrado" }, { status: 404 })
    }

    console.log("[v0] User fetched successfully:", user.id)

    return NextResponse.json({ user })
  } catch (error: any) {
    console.error("[v0] Get current user error:", error)
    console.error("[v0] Error details:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
    })

    if (error.code === "P2021") {
      return NextResponse.json(
        { error: "Tabela 'usuario' não existe. Execute as migrations do banco de dados." },
        { status: 500 },
      )
    }

    return NextResponse.json({ error: `Erro ao buscar usuário: ${error.message}` }, { status: 500 })
  }
}
