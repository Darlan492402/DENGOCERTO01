// Mock database (in production, this would be a real database)
let products = [{
        id: 1,
        name: "Caixinha Dinossauros",
        description: "Explore o mundo pré-histórico com brinquedos e atividades sobre dinossauros.",
        price: 89.9,
        stock: 15,
        theme: "Dinossauros",
        ageRange: "3-5 anos",
        imageUrl: "public2/dinosaur-toys-box.jpg",
        isSubscription: false,
    },
    {
        id: 2,
        name: "Caixinha Espaço",
        description: "Viaje pelo universo com planetas, estrelas e astronautas.",
        price: 89.9,
        stock: 20,
        theme: "Espaço",
        ageRange: "6-8 anos",
        imageUrl: "public2/space-toys-kids.jpg",
        isSubscription: false,
    },
    {
        id: 3,
        name: "Caixinha Princesas",
        description: "Contos de fada e fantasia para pequenas princesas.",
        price: 89.9,
        stock: 12,
        theme: "Princesas",
        ageRange: "3-5 anos",
        imageUrl: "public2/princess-toys-box.jpg",
        isSubscription: false,
    },
]

let editingProductId = null

function loadProducts() {
    const grid = document.getElementById("productsGrid")
    document.getElementById("productCount").textContent = products.length

    grid.innerHTML = products
        .map(
            (product) => `
        <div class="admin-product-card">
            <div class="product-image">
                <img src="${product.imageUrl}" alt="${product.name}">
                ${product.isSubscription ? '<span class="product-badge">Assinatura</span>' : ""}
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-tags">
                    <span class="product-tag">${product.theme}</span>
                    <span class="product-tag">${product.ageRange}</span>
                </div>
                <div class="product-info">
                    <span class="product-price">R$ ${product.price.toFixed(2).replace(".", ",")}</span>
                    <span class="product-stock">Estoque: ${product.stock}</span>
                </div>
                <div class="product-actions">
                    <button class="btn btn-sm btn-outline" onclick="editProduct(${product.id})">
                        <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                        </svg>
                        Editar
                    </button>
                    <button class="btn btn-sm btn-destructive" onclick="deleteProduct(${product.id})">
                        <svg class="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                        </svg>
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    `,
        )
        .join("")
}

function showAddProductModal() {
    editingProductId = null
    document.getElementById("modalTitle").textContent = "Novo Produto"
    document.getElementById("productForm").reset()
    document.getElementById("productId").value = ""
    document.getElementById("productModal").style.display = "flex"
}

function closeProductModal() {
    document.getElementById("productModal").style.display = "none"
    editingProductId = null
}

function editProduct(id) {
    const product = products.find((p) => p.id === id)
    if (!product) return

    editingProductId = id
    document.getElementById("modalTitle").textContent = "Editar Produto"
    document.getElementById("productId").value = product.id
    document.getElementById("productName").value = product.name
    document.getElementById("productDescription").value = product.description
    document.getElementById("productPrice").value = product.price
    document.getElementById("productStock").value = product.stock
    document.getElementById("productTheme").value = product.theme
    document.getElementById("productAgeRange").value = product.ageRange
    document.getElementById("productImage").value = product.imageUrl
    document.getElementById("productSubscription").checked = product.isSubscription

    document.getElementById("productModal").style.display = "flex"
}

function deleteProduct(id) {
    if (confirm("Tem certeza que deseja excluir este produto?")) {
        products = products.filter((p) => p.id !== id)
        loadProducts()
    }
}

document.getElementById("productForm").addEventListener("submit", (e) => {
    e.preventDefault()

    const productData = {
        name: document.getElementById("productName").value,
        description: document.getElementById("productDescription").value,
        price: Number.parseFloat(document.getElementById("productPrice").value),
        stock: Number.parseInt(document.getElementById("productStock").value),
        theme: document.getElementById("productTheme").value,
        ageRange: document.getElementById("productAgeRange").value,
        imageUrl: document.getElementById("productImage").value,
        isSubscription: document.getElementById("productSubscription").checked,
    }

    if (editingProductId) {
        // Update existing product
        const index = products.findIndex((p) => p.id === editingProductId)
        if (index !== -1) {
            products[index] = {...products[index], ...productData }
        }
    } else {
        // Add new product
        const newId = Math.max(...products.map((p) => p.id), 0) + 1
        products.push({ id: newId, ...productData })
    }

    loadProducts()
    closeProductModal()
})

// Close modal when clicking outside
document.getElementById("productModal").addEventListener("click", function(e) {
    if (e.target === this) {
        closeProductModal()
    }
})

// Initialize
loadProducts()
