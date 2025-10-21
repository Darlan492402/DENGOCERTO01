/**
 * Prisma Client Singleton
 * Ensures only one instance of PrismaClient is created
 */

import { PrismaClient } from "@prisma/client"

// Prevent multiple instances of Prisma Client in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma

let useMockData = false

/**
 * Check if database is connected and tables exist
 */
export async function checkDatabaseConnection(): Promise<{ connected: boolean; error?: string }> {
  try {
    await prisma.$connect()
    // Try a simple query to verify tables exist
    await prisma.usuario.findFirst()
    useMockData = false
    return { connected: true }
  } catch (error: any) {
    console.log("[v0] Database not available, using mock data for preview")
    useMockData = true
    return {
      connected: false,
      error: error.message || "Usando dados mock para preview",
    }
  }
}

export function isUsingMockData(): boolean {
  return useMockData
}

export function setMockDataMode(enabled: boolean) {
  useMockData = enabled
}
