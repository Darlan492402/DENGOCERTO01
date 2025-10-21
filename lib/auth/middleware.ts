/**
 * Authentication Middleware
 * Validates JWT tokens and protects API routes
 */

import type { NextRequest } from "next/server"
import { JWTManager } from "./jwt"

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: number
    email: string
    role: string
  }
}

/**
 * Middleware to verify JWT token and attach user to request
 */
export async function authenticateRequest(
  request: NextRequest,
): Promise<{ authenticated: boolean; user?: any; error?: string }> {
  const authHeader = request.headers.get("authorization")
  const token = JWTManager.extractTokenFromHeader(authHeader)

  if (!token) {
    return {
      authenticated: false,
      error: "Token de autenticação não fornecido",
    }
  }

  try {
    const user = JWTManager.verifyToken(token)
    return {
      authenticated: true,
      user,
    }
  } catch (error) {
    return {
      authenticated: false,
      error: "Token inválido ou expirado",
    }
  }
}

/**
 * Middleware to check if user is admin
 */
export async function requireAdmin(request: NextRequest): Promise<{ authorized: boolean; user?: any; error?: string }> {
  const authResult = await authenticateRequest(request)

  if (!authResult.authenticated) {
    return {
      authorized: false,
      error: authResult.error,
    }
  }

  if (authResult.user?.role !== "admin") {
    return {
      authorized: false,
      error: "Acesso negado. Apenas administradores podem acessar este recurso",
    }
  }

  return {
    authorized: true,
    user: authResult.user,
  }
}
