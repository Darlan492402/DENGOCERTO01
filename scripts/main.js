// Sample products data
const products = [
  {
    id: 1,
    name: "Caixinha Mundo dos Dinossauros",
    description: "Explore a era dos dinossauros com atividades, brinquedos e livros educativos",
    price: 139.9,
    image: "/dinosaur-toys-box.jpg",
    theme: "dinossauros",
  },
  {
    id: 2,
    name: "Caixinha Fazendinha Divertida",
    description: "Conheça os animais da fazenda com jogos, quebra-cabeças e muito mais",
    price: 129.9,
    image: "/farm-animals-toys.jpg",
    theme: "fazenda",
  },
  {
    id: 3,
    name: "Caixinha Aventura Espacial",
    description: "Viaje pelo espaço com atividades sobre planetas, estrelas e astronautas",
    price: 149.9,
    image: "/space-toys-kids.jpg",
    theme: "espaco",
  },
  {
    id: 4,
    name: "Caixinha Reino das Princesas",
    description: "Um mundo mágico com atividades criativas e histórias encantadoras",
    price: 139.9,
    image: "/princess-toys-box.jpg",
    theme: "princesas",
  },
  {
    id: 5,
    name: "Caixinha Fundo do Mar",
    description: "Descubra os mistérios do oceano com jogos e atividades aquáticas",
    price: 134.9,
    image: "/ocean-sea-toys.jpg",
    theme: "mar",
  },
  {
    id: 6,
    name: "Caixinha Super-Heróis",
    description: "Desenvolva superpoderes com atividades de coragem e criatividade",
    price: 144.9,
    image: "/superhero-toys-kids.jpg",
    theme: "herois",
  },
]

// Load products on page load
document.addEventListener("DOMContentLoaded", () => {
  loadProducts()
  updateCartCount()
})

// Load products into grid
function loadProducts() {
  const productsGrid = document.getElementById("products-grid")
  if (!productsGrid) return

  productsGrid.innerHTML = products
    .map(
      (product) => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">R$ ${product.price.toFixed(2)}</span>
                    <button class="btn btn-primary product-btn" onclick="addToCart(${product.id})">
                        Adicionar
                    </button>
                </div>
            </div>
        </div>
    `,
    )
    .join("")
}

// Cart functionality
function getCart() {
  const cart = localStorage.getItem("cart")
  return cart ? JSON.parse(cart) : []
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart))
  updateCartCount()
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId)
  if (!product) return

  const cart = getCart()
  const existingItem = cart.find((item) => item.id === productId)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
  }

  saveCart(cart)
  showNotification("Produto adicionado ao carrinho!")
}

function updateCartCount() {
  const cart = getCart()
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartCountElement = document.querySelector(".cart-count")
  if (cartCountElement) {
    cartCountElement.textContent = totalItems
  }
}

function showNotification(message) {
  // Simple notification - you can enhance this
  alert(message)
}

// Search functionality
const searchBtn = document.querySelector(".search-btn")
if (searchBtn) {
  searchBtn.addEventListener("click", () => {
    const searchTerm = prompt("O que você está procurando?")
    if (searchTerm) {
      console.log("Searching for:", searchTerm)
      // Implement search functionality here
    }
  })
}
