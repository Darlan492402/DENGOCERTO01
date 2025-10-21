/**
 * Authentication Type Definitions
 */

export interface User {
  id: number
  nome: string
  email: string
  role: "user" | "admin"
  criadoEm: Date
}

export interface RegisterRequest {
  nome: string
  email: string
  senha: string
}

export interface LoginRequest {
  email: string
  senha: string
}

export interface AuthResponse {
  message: string
  user: User
  token: string
}

export interface ErrorResponse {
  error: string
}
