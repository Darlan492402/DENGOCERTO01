/**
 * User Registration API Endpoint
 * POST /api/auth/register
 */

import { type NextRequest, NextResponse } from "next/server"
import { prisma, checkDatabaseConnection, isUsingMockData } from "@/lib/db/prisma"
import { mockStore } from "@/lib/db/mock-data"
import { PasswordManager } from "@/lib/auth/password"
import { JWTManager } from "@/lib/auth/jwt"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, email, senha } = body

    // Validate required fields
    if (!nome || !email || !senha) {
      return NextResponse.json({ error: "Nome, email e senha são obrigatórios" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 })
    }

    // Validate password strength
    const passwordValidation = PasswordManager.validatePasswordStrength(senha)
    if (!passwordValidation.valid) {
      return NextResponse.json({ error: passwordValidation.message }, { status: 400 })
    }

    console.log("[v0] Register attempt for email:", email)

    await mockStore.initialize()
    await checkDatabaseConnection()

    if (isUsingMockData()) {
      console.log("[v0] Using mock data store for registration")

      // Check if user exists
      const existingUser = await mockStore.findUserByEmail(email)
      if (existingUser) {
        return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 })
      }

      // Hash password
      const hashedPassword = await PasswordManager.hashPassword(senha)

      // Create user in mock store
      const user = await mockStore.createUser({
        nome,
        email,
        senha: hashedPassword,
        role: "USER",
      })

      // Generate JWT token
      const token = JWTManager.generateToken({
        userId: Number.parseInt(user.id),
        email: user.email,
        role: user.role,
      })

      const { senha: _, ...userWithoutPassword } = user

      return NextResponse.json(
        {
          message: "Usuário cadastrado com sucesso (modo preview)",
          user: userWithoutPassword,
          token,
        },
        { status: 201 },
      )
    }

    // Use real database
    const existingUser = await prisma.usuario.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await PasswordManager.hashPassword(senha)

    // Create user
    const user = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: hashedPassword,
        role: "user",
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        criadoEm: true,
      },
    })

    console.log("[v0] User created successfully:", user.id)

    // Generate JWT token
    const token = JWTManager.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    return NextResponse.json(
      {
        message: "Usuário cadastrado com sucesso",
        user,
        token,
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("[v0] Registration error:", error)
    console.error("[v0] Error details:", {
      message: error.message,
      code: error.code,
      meta: error.meta,
    })

    if (error.code === "P2002") {
      return NextResponse.json({ error: "Email já cadastrado" }, { status: 409 })
    }

    if (error.code === "P2021") {
      return NextResponse.json(
        { error: "Tabela 'usuario' não existe. Execute as migrations do banco de dados." },
        { status: 500 },
      )
    }

    return NextResponse.json({ error: `Erro ao cadastrar usuário: ${error.message}` }, { status: 500 })
  }
}
