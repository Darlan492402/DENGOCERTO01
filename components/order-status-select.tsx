"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createClient } from "@/lib/supabase/client"

interface OrderStatusSelectProps {
  orderId: string
  currentStatus: string
}

export function OrderStatusSelect({ orderId, currentStatus }: OrderStatusSelectProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusChange = async (newStatus: string) => {
    setIsLoading(true)
    const supabase = createClient()

    try {
      await supabase.from("orders").update({ status: newStatus }).eq("id", orderId)
      router.refresh()
    } catch (error) {
      console.error("[v0] Error updating order status:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Select value={currentStatus} onValueChange={handleStatusChange} disabled={isLoading}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pendente</SelectItem>
        <SelectItem value="processing">Processando</SelectItem>
        <SelectItem value="shipped">Enviado</SelectItem>
        <SelectItem value="delivered">Entregue</SelectItem>
        <SelectItem value="cancelled">Cancelado</SelectItem>
      </SelectContent>
    </Select>
  )
}
