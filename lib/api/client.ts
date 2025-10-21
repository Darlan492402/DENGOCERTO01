/**
 * API Client Utility
 * Centralized API calls with authentication
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || ""

export class ApiClient {
  private static getAuthHeader(): HeadersInit {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  static async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...this.getAuthHeader(),
        ...options.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || "Erro na requisição")
    }

    return data
  }

  static async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" })
  }

  static async post<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    })
  }

  static async put<T>(endpoint: string, body: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    })
  }

  static async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" })
  }
}
