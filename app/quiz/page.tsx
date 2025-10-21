"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { QuizStep } from "@/components/quiz-step"
import { Progress } from "@/components/ui/progress"

interface QuizAnswers {
  childAge: string
  interests: string[]
  preferences: string
}

const QUIZ_STEPS = [
  {
    id: "age",
    title: "Qual a idade do seu filho?",
    description: "Isso nos ajuda a recomendar produtos adequados para o desenvolvimento.",
    type: "single" as const,
    options: [
      { value: "0-2", label: "0 a 2 anos", description: "Bebês e primeiros passos" },
      { value: "3-5", label: "3 a 5 anos", description: "Pré-escola" },
      { value: "6-8", label: "6 a 8 anos", description: "Idade escolar" },
      { value: "9+", label: "9 anos ou mais", description: "Pré-adolescente" },
    ],
  },
  {
    id: "interests",
    title: "Quais são os interesses do seu filho?",
    description: "Selecione todos que se aplicam.",
    type: "multiple" as const,
    options: [
      { value: "dinosaurs", label: "Dinossauros", description: "Pré-história e criaturas antigas" },
      { value: "space", label: "Espaço", description: "Planetas, estrelas e astronautas" },
      { value: "animals", label: "Animais", description: "Fazenda, selva e pets" },
      { value: "princesses", label: "Princesas", description: "Contos de fada e fantasia" },
      { value: "superheroes", label: "Super-heróis", description: "Aventura e ação" },
      { value: "art", label: "Arte e Criatividade", description: "Desenho, pintura e artesanato" },
      { value: "ocean", label: "Fundo do Mar", description: "Oceano e vida marinha" },
    ],
  },
  {
    id: "preferences",
    title: "O que você prefere?",
    description: "Escolha a opção que melhor se adequa.",
    type: "single" as const,
    options: [
      { value: "onetime", label: "Compra única", description: "Escolher uma caixa específica" },
      { value: "subscription", label: "Assinatura mensal", description: "Receber surpresas todo mês" },
      { value: "both", label: "Ambos", description: "Quero ver todas as opções" },
    ],
  },
]

export default function QuizPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<QuizAnswers>({
    childAge: "",
    interests: [],
    preferences: "",
  })

  const currentQuizStep = QUIZ_STEPS[currentStep]
  const progress = ((currentStep + 1) / QUIZ_STEPS.length) * 100

  const handleAnswerChange = (value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuizStep.id === "age" ? "childAge" : currentQuizStep.id === "interests" ? "interests" : "preferences"]:
        value,
    }))
  }

  const handleNext = async () => {
    if (currentStep < QUIZ_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      const params = new URLSearchParams({
        age: answers.childAge,
        interests: answers.interests.join(","),
        preferences: answers.preferences,
      })
      router.push(`/quiz/resultados?${params.toString()}`)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const getCurrentValue = () => {
    if (currentQuizStep.id === "age") return answers.childAge
    if (currentQuizStep.id === "interests") return answers.interests
    return answers.preferences
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 py-12 md:py-16">
        <div className="container max-w-4xl">
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-4xl font-bold text-balance">Quiz de Personalização</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Responda algumas perguntas para encontrarmos a caixinha perfeita!
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>
                  Pergunta {currentStep + 1} de {QUIZ_STEPS.length}
                </span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            <QuizStep
              title={currentQuizStep.title}
              description={currentQuizStep.description}
              type={currentQuizStep.type}
              options={currentQuizStep.options}
              value={getCurrentValue()}
              onChange={handleAnswerChange}
              onNext={handleNext}
              onBack={currentStep > 0 ? handleBack : undefined}
              isLastStep={currentStep === QUIZ_STEPS.length - 1}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
