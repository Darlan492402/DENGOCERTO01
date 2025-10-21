"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface QuizStepProps {
  title: string
  description: string
  type: "single" | "multiple"
  options: { value: string; label: string; description?: string }[]
  value: string | string[]
  onChange: (value: string | string[]) => void
  onNext: () => void
  onBack?: () => void
  isLastStep?: boolean
}

export function QuizStep({
  title,
  description,
  type,
  options,
  value,
  onChange,
  onNext,
  onBack,
  isLastStep,
}: QuizStepProps) {
  const handleSingleChange = (newValue: string) => {
    onChange(newValue)
  }

  const handleMultipleChange = (optionValue: string, checked: boolean) => {
    const currentValues = Array.isArray(value) ? value : []
    if (checked) {
      onChange([...currentValues, optionValue])
    } else {
      onChange(currentValues.filter((v) => v !== optionValue))
    }
  }

  const isValid = type === "single" ? !!value : Array.isArray(value) && value.length > 0

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-balance">{title}</CardTitle>
        <CardDescription className="text-pretty">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {type === "single" ? (
          <RadioGroup value={value as string} onValueChange={handleSingleChange}>
            <div className="space-y-3">
              {options.map((option) => (
                <div key={option.value} className="flex items-start space-x-3 space-y-0">
                  <RadioGroupItem value={option.value} id={option.value} />
                  <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                    <div className="font-medium">{option.label}</div>
                    {option.description && (
                      <div className="text-sm text-muted-foreground text-pretty">{option.description}</div>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </RadioGroup>
        ) : (
          <div className="space-y-3">
            {options.map((option) => (
              <div key={option.value} className="flex items-start space-x-3 space-y-0">
                <Checkbox
                  id={option.value}
                  checked={Array.isArray(value) && value.includes(option.value)}
                  onCheckedChange={(checked) => handleMultipleChange(option.value, checked as boolean)}
                />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  <div className="font-medium">{option.label}</div>
                  {option.description && (
                    <div className="text-sm text-muted-foreground text-pretty">{option.description}</div>
                  )}
                </Label>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-3 pt-4">
          {onBack && (
            <Button variant="outline" onClick={onBack} className="flex-1 bg-transparent">
              Voltar
            </Button>
          )}
          <Button onClick={onNext} disabled={!isValid} className="flex-1">
            {isLastStep ? "Ver Recomendações" : "Próximo"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
