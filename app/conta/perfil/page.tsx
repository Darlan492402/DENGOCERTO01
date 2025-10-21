import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ProfileForm } from "@/components/profile-form"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function PerfilPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-2xl">
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-balance">Meu Perfil</h1>
                <p className="text-muted-foreground mt-2">Gerencie suas informações pessoais</p>
              </div>
              <Button variant="outline" asChild className="bg-transparent">
                <Link href="/conta">Voltar</Link>
              </Button>
            </div>

            <ProfileForm
              userId={user.id}
              initialData={{
                fullName: profile?.full_name || "",
                phone: profile?.phone || "",
                email: user.email || "",
              }}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
