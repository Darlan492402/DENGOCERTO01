"use client"

import Link from "next/link"
import { ShoppingCart, User, Settings } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

export function Header() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = () => {
      const userType = localStorage.getItem("userType")
      const userEmail = localStorage.getItem("userEmail")
      console.log("[v0] Header auth check:", { userType, userEmail })
      setIsAdmin(userType === "admin")
      setIsLoggedIn(!!userEmail)
    }

    checkAuth()

    // Listen for storage changes (when user logs in/out)
    window.addEventListener("storage", checkAuth)
    window.addEventListener("userLoggedIn", checkAuth)

    return () => {
      window.removeEventListener("storage", checkAuth)
      window.removeEventListener("userLoggedIn", checkAuth)
    }
  }, [pathname])

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="Dengo na Caixinha"
            width={240}
            height={80}
            className="h-16 w-auto"
            priority
            unoptimized
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-base font-medium hover:text-primary transition-colors">
            Início
          </Link>
          <Link href="/produtos" className="text-base font-medium hover:text-primary transition-colors">
            Produtos
          </Link>
          <Link href="/sobre" className="text-base font-medium hover:text-primary transition-colors">
            Quem Somos
          </Link>
          <Link href="/quiz" className="text-base font-medium hover:text-primary transition-colors">
            Quiz
          </Link>
          <Link href="/assinatura" className="text-base font-medium hover:text-primary transition-colors">
            Assinatura
          </Link>
          <Link href="/contato" className="text-base font-medium hover:text-primary transition-colors">
            Contato
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/carrinho">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Carrinho</span>
            </Link>
          </Button>

          <Button variant="ghost" size="icon" asChild>
            <Link href={isLoggedIn ? "/conta" : "/auth/login"}>
              <User className="h-5 w-5" />
              <span className="sr-only">{isLoggedIn ? "Minha Conta" : "Entrar"}</span>
            </Link>
          </Button>

          {isAdmin && (
            <Button variant="ghost" size="icon" asChild>
              <Link href="/admin">
                <Settings className="h-5 w-5" />
                <span className="sr-only">Admin</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
