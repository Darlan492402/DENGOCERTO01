// Product data
const products = {
  1: {
    name: "Caixinha Dinossauros",
    theme: "Dinossauros",
    age: "3-6 anos",
    price: "R$ 89,90",
    image: "../public/dinosaur-toys-box.jpg",
    description:
      "Explore o mundo pré-histórico com nossa caixinha temática de dinossauros! Repleta de brinquedos educativos, figuras de dinossauros realistas e atividades criativas que vão despertar a curiosidade e imaginação do seu pequeno paleontólogo.",
  },
  2: {
    name: "Caixinha Fazenda",
    theme: "Fazenda",
    age: "2-5 anos",
    price: "R$ 89,90",
    image: "../public/farm-animals-toys.jpg",
    description:
      "Conheça os animais da fazenda e aprenda sobre a vida no campo! Esta caixinha traz animais de brinquedo, atividades sobre agricultura e natureza, perfeita para ensinar sobre o mundo rural de forma divertida.",
  },
  3: {
    name: "Caixinha Espaço",
    theme: "Espaço",
    age: "4-8 anos",
    price: "R$ 89,90",
    image: "../public/space-toys-kids.jpg",
    description:
      "Viaje pelo universo com planetas, estrelas e astronautas! Uma aventura espacial completa com brinquedos educativos sobre astronomia, foguetes e o sistema solar.",
  },
  4: {
    name: "Caixinha Oceano",
    theme: "Oceano",
    age: "3-7 anos",
    price: "R$ 89,90",
    image: "../public/ocean-sea-toys.jpg",
    description:
      "Mergulhe no fundo do mar e descubra criaturas marinhas incríveis! Explore o oceano com animais aquáticos, atividades sobre vida marinha e muito mais.",
  },
  5: {
    name: "Caixinha Princesas",
    theme: "Princesas",
    age: "3-8 anos",
    price: "R$ 89,90",
    image: "../public/princess-toys-box.jpg",
    description:
      "Contos de fada e fantasia para pequenas princesas! Uma caixinha mágica com acessórios, atividades criativas e histórias encantadoras.",
  },
  6: {
    name: "Caixinha Super-Heróis",
    theme: "Super-Heróis",
    age: "4-9 anos",
    price: "R$ 89,90",
    image: "../public/superhero-toys-kids.jpg",
    description:
      "Aventuras heroicas com super poderes e muita ação! Brinquedos de heróis, atividades de missões e desafios para pequenos salvadores do mundo.",
  },
}

// Get product ID from URL
const urlParams = new URLSearchParams(window.location.search)
const productId = urlParams.get("id") || "1"

// Load product data
const product = products[productId]

if (product) {
  document.getElementById("productImage").src = product.image
  document.getElementById("productImage").alt = product.name
  document.getElementById("themeBadge").textContent = product.theme
  document.getElementById("ageBadge").textContent = product.age
  document.getElementById("productTitle").textContent = product.name
  document.getElementById("productDescription").textContent = product.description
  document.getElementById("productPrice").textContent = product.price
  document.title = `${product.name} - Caixinha de Dengo`
}
