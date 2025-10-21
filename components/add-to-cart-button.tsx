"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ShoppingCart } from "@/lib/icons"
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

interface AddToCartButtonProps {
  productId: string
  productName: string
}

export function AddToCartButton({ productId, productName }: AddToCartButtonProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showLoginAlert, setShowLoginAlert] = useState(false)

  const handleAddToCart = () => {
    setIsLoading(true)

    const userEmail = localStorage.getItem("userEmail")

    if (!userEmail) {
      setIsLoading(false)
      setShowLoginAlert(true)
      return
    }

    const cartKey = `cart_${userEmail}`
    const existingCart = localStorage.getItem(cartKey)
    const cart = existingCart ? JSON.parse(existingCart) : []

    // Check if product already exists in cart
    const existingItemIndex = cart.findIndex((item: any) => item.productId === productId)

    if (existingItemIndex !== -1) {
      // Increment quantity if product exists
      cart[existingItemIndex].quantity += 1
    } else {
      // Add new product to cart
      cart.push({
        productId,
        quantity: 1,
        addedAt: new Date().toISOString(),
      })
    }

    // Save updated cart to localStorage
    localStorage.setItem(cartKey, JSON.stringify(cart))

    setIsLoading(false)
    router.push("/carrinho")
  }

  const handleLoginRedirect = () => {
    router.push("/auth/login")
  }

  return (
    <>
      <Button size="lg" variant="secondary" onClick={handleAddToCart} disabled={isLoading} className="w-full">
        <ShoppingCart className="h-5 w-5 mr-2" />
        {isLoading ? "Adicionando..." : "Adicionar ao Carrinho"}
      </Button>

      <AlertDialog open={showLoginAlert} onOpenChange={setShowLoginAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Login Necessário</AlertDialogTitle>
            <AlertDialogDescription className="text-pretty">
              Para adicionar <span className="font-semibold">{productName}</span> ao carrinho, você precisa estar
              logado. Faça login ou crie uma conta para continuar.
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
