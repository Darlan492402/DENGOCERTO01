"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface BuyNowButtonProps {
  productId: string
  productName: string
}

export function BuyNowButton({ productId, productName }: BuyNowButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showLoginAlert, setShowLoginAlert] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleBuyNow = () => {
    if (!isClient) return

    setIsLoading(true)

    const userEmail = localStorage.getItem("userEmail")

    if (!userEmail) {
      setIsLoading(false)
      setShowLoginAlert(true)
      return
    }

    // User is authenticated, proceed to payment
    router.push(`/pagamento/${productId}`)
  }

  const handleLoginRedirect = () => {
    router.push("/auth/login")
  }

  return (
    <>
      <Button size="lg" className="w-full" onClick={handleBuyNow} disabled={isLoading}>
        {isLoading ? "Verificando..." : "Comprar Agora"}
      </Button>

      <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Necessário</AlertDialogTitle>
            <AlertDialogDescription className="text-pretty">
              Para realizar a compra de <span className="font-semibold">{productName}</span>, você precisa estar logado.
              Faça login ou crie uma conta para continuar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleLoginRedirect}>Fazer Login</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
