/**
 * JWT Token Management Utility
 * Handles creation and verification of JSON Web Tokens for authentication
 */

import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret_key"
const JWT_EXPIRES_IN = "7d" // Token expires in 7 days

export interface JWTPayload {
  userId: number
  email: string
  role: string
}

/**
 * Generate a JWT token for authenticated user
 */
export class JWTManager {
  static generateToken(payload: JWTPayload): string {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    })
  }

  /**
   * Verify and decode a JWT token
   * @throws Error if token is invalid or expired
   */
  static verifyToken(token: string): JWTPayload {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JWTPayload
      return decoded
    } catch (error) {
      throw new Error("Token inválido ou expirado")
    }
  }

  /**
   * Extract token from Authorization header
   */
  static extractTokenFromHeader(authHeader: string | null): string | null {
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return null
    }
    return authHeader.substring(7)
  }
}
