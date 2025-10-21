let currentStep = 1
const totalSteps = 3
const answers = {
  age: "",
  interests: [],
  preferences: "",
}

const nextBtn = document.getElementById("nextBtn")
const backBtn = document.getElementById("backBtn")

function updateProgress() {
  const progress = (currentStep / totalSteps) * 100
  document.getElementById("currentStep").textContent = currentStep
  document.getElementById("progressPercent").textContent = Math.round(progress)
  document.getElementById("progressFill").style.width = progress + "%"
}

function showStep(step) {
  document.querySelectorAll(".quiz-step").forEach((s) => (s.style.display = "none"))
  document.getElementById("step" + step).style.display = "block"

  if (step === 1) {
    backBtn.style.display = "none"
  } else {
    backBtn.style.display = "inline-flex"
  }

  if (step === totalSteps) {
    nextBtn.textContent = "Ver Resultados"
  } else {
    nextBtn.textContent = "Próximo"
  }

  updateProgress()
}

function validateStep(step) {
  if (step === 1) {
    const selected = document.querySelector('input[name="age"]:checked')
    if (!selected) {
      alert("Por favor, selecione uma faixa etária.")
      return false
    }
    answers.age = selected.value
  } else if (step === 2) {
    const selected = document.querySelectorAll('input[name="interests"]:checked')
    if (selected.length === 0) {
      alert("Por favor, selecione pelo menos um interesse.")
      return false
    }
    answers.interests = Array.from(selected).map((cb) => cb.value)
  } else if (step === 3) {
    const selected = document.querySelector('input[name="preferences"]:checked')
    if (!selected) {
      alert("Por favor, selecione uma preferência.")
      return false
    }
    answers.preferences = selected.value
  }
  return true
}

nextBtn.addEventListener("click", () => {
  if (!validateStep(currentStep)) {
    return
  }

  if (currentStep < totalSteps) {
    currentStep++
    showStep(currentStep)
  } else {
    // Quiz completed
    alert("Quiz concluído! Redirecionando para os resultados...")
    window.location.href = "produtos.html"
  }
})

backBtn.addEventListener("click", () => {
  if (currentStep > 1) {
    currentStep--
    showStep(currentStep)
  }
})

// Initialize
showStep(1)
