"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if ((email === "admin@dengo.com" || email === "admin@caixinha.com") && password === "admin123") {
        console.log("[v0] Admin login successful for:", email)
        localStorage.setItem("userEmail", email)
        localStorage.setItem("userName", "Administrador")
        localStorage.setItem("userType", "admin")

        // Trigger multiple events to ensure header updates
        window.dispatchEvent(new Event("storage"))
        window.dispatchEvent(new Event("userLoggedIn"))

        console.log("[v0] Admin credentials saved, redirecting to /admin")

        // Navigate to admin page
        setTimeout(() => {
          router.push("/admin")
        }, 100)
      } else if (email && password.length >= 6) {
        console.log("[v0] User login successful")
        localStorage.setItem("userEmail", email)
        localStorage.setItem("userName", email.split("@")[0])
        localStorage.setItem("userType", "user")

        window.dispatchEvent(new Event("storage"))
        window.dispatchEvent(new Event("userLoggedIn"))

        setTimeout(() => {
          router.push("/")
        }, 100)
      } else {
        setError("Email ou senha inválidos")
      }
    } catch (err) {
      setError("Erro ao realizar login. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Link href="/" className="flex items-center gap-2 justify-center">
            <Image
              src="/logo.png"
              alt="Dengo na Caixinha"
              width={180}
              height={60}
              className="h-12 w-auto"
              unoptimized
            />
          </Link>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Entrar</CardTitle>
              <CardDescription>Digite seu email e senha para acessar sua conta</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin}>
                <div className="flex flex-col gap-6">
                  {error && (
                    <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>
                  )}
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      minLength={6}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isLoading}
                  >
                    {isLoading ? "Entrando..." : "Entrar"}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  Não tem uma conta?{" "}
                  <Link
                    href="/auth/cadastro"
                    className="underline underline-offset-4 text-primary hover:text-primary/80"
                  >
                    Cadastre-se
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
