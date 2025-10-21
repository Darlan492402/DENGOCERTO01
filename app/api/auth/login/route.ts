/**
 * User Login API Endpoint
 * POST /api/auth/login
 */

import { type NextRequest, NextResponse } from "next/server"
import { prisma, checkDatabaseConnection, isUsingMockData } from "@/lib/db/prisma"
import { mockStore } from "@/lib/db/mock-data"
import { PasswordManager } from "@/lib/auth/password"
import { JWTManager } from "@/lib/auth/jwt"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, senha } = body

    console.log("[v0] Login attempt for email:", email)

    // Validate required fields
    if (!email || !senha) {
      return NextResponse.json({ error: "Email e senha são obrigatórios" }, { status: 400 })
    }

    await mockStore.initialize()
    await checkDatabaseConnection()

    if (isUsingMockData()) {
      console.log("[v0] Using mock data store for login")

      // Find user in mock store
      const user = await mockStore.findUserByEmail(email)

      if (!user) {
        return NextResponse.json({ error: "Email ou senha incorretos" }, { status: 401 })
      }

      // Verify password
      const isPasswordValid = await PasswordManager.verifyPassword(senha, user.senha)

      if (!isPasswordValid) {
        return NextResponse.json({ error: "Email ou senha incorretos" }, { status: 401 })
      }

      // Generate JWT token
      const token = JWTManager.generateToken({
        userId: Number.parseInt(user.id),
        email: user.email,
        role: user.role,
      })

      const { senha: _, ...userWithoutPassword } = user

      return NextResponse.json({
        message: "Login realizado com sucesso (modo preview)",
        user: userWithoutPassword,
        token,
      })
    }

    // Use real database
    const user = await prisma.usuario.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json({ error: "Email ou senha incorretos" }, { status: 401 })
    }

    // Verify password
    const isPasswordValid = await PasswordManager.verifyPassword(senha, user.senha)

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Email ou senha incorretos" }, { status: 401 })
    }

    // Generate JWT token
    const token = JWTManager.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    // Return user data without password
    const { senha: _, ...userWithoutPassword } = user

    console.log("[v0] Login successful for user:", user.id)

    return NextResponse.json({
      message: "Login realizado com sucesso",
      user: userWithoutPassword,
      token,
    })
  } catch (error: any) {
    console.error("[v0] Login error:", error)
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

    return NextResponse.json({ error: `Erro ao realizar login: ${error.message}` }, { status: 500 })
  }
}
