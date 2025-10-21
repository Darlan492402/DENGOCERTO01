"use client"

import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LogOut } from "@/lib/icons"

export function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  return (
    <Button variant="outline" className="w-full bg-transparent" onClick={handleLogout}>
      <LogOut className="h-4 w-4 mr-2" />
      Sair da Conta
    </Button>
  )
}
