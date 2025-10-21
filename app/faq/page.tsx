import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function FAQPage() {
  const faqs = [
    {
      id: "1",
      question: "Qual é a faixa etária recomendada?",
      answer:
        "Nossas caixinhas são adequadas para crianças de 2 a 8 anos. Cada caixa é personalizada de acordo com a idade informada no cadastro.",
    },
    {
      id: "2",
      question: "Como funciona a assinatura?",
      answer:
        "Você escolhe um plano (mensal, trimestral ou semestral), preenche o perfil do seu filho e recebe uma caixa temática a cada mês. Pode cancelar quando quiser.",
    },
    {
      id: "3",
      question: "Qual é o prazo de entrega?",
      answer:
        "O prazo de entrega varia de 5 a 15 dias úteis dependendo da sua região. O frete é grátis para todo o Brasil.",
    },
    {
      id: "4",
      question: "Posso escolher o tema da caixinha?",
      answer:
        "Os temas são surpresa e escolhidos por nossa equipe de especialistas. Porém, você pode informar as preferências do seu filho para personalizarmos melhor.",
    },
    {
      id: "5",
      question: "Como faço para cancelar a assinatura?",
      answer:
        "Você pode cancelar a qualquer momento acessando sua conta. Não há multas ou taxas adicionais. O cancelamento é imediato.",
    },
    {
      id: "6",
      question: "Os produtos são seguros?",
      answer:
        "Sim! Todos os produtos são cuidadosamente selecionados e testados para garantir segurança. Utilizamos apenas materiais não-tóxicos e apropriados para cada faixa etária.",
    },
    {
      id: "7",
      question: "Posso presentear alguém?",
      answer:
        "Sim! Você pode comprar uma caixa única ou uma assinatura como presente. Oferecemos opções de personalização com mensagem e embalagem especial.",
    },
    {
      id: "8",
      question: "Como faço para rastrear meu pedido?",
      answer:
        "Você receberá um email com o código de rastreamento assim que seu pedido for enviado. Pode acompanhar em tempo real no site dos Correios.",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
          <div className="container">
            <div className="mx-auto max-w-3xl text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-balance">Perguntas Frequentes</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Encontre respostas para as dúvidas mais comuns sobre nossos produtos e serviços.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mx-auto max-w-3xl">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {faqs.map((faq) => (
                  <Card key={faq.id}>
                    <AccordionItem value={faq.id} className="border-0">
                      <AccordionTrigger className="hover:no-underline px-6 py-4">
                        <span className="text-left font-semibold">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="px-6 pb-4 text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </Card>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
