# API Documentation - Caixinha de Dengo E-commerce

## Base URL
All API endpoints are relative to: `/api`

## Authentication
Most endpoints require JWT authentication. Include the token in the Authorization header:
\`\`\`
Authorization: Bearer <your_jwt_token>
\`\`\`

---

## Authentication Endpoints

### POST /auth/register
Create a new user account.

**Request Body:**
\`\`\`json
{
  "nome": "João Silva",
  "email": "joao@example.com",
  "senha": "senha123"
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "message": "Usuário cadastrado com sucesso",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "role": "user",
    "criadoEm": "2025-01-14T10:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\`

### POST /auth/login
Authenticate a user.

**Request Body:**
\`\`\`json
{
  "email": "joao@example.com",
  "senha": "senha123"
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "message": "Login realizado com sucesso",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "role": "user"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
\`\`\`

### GET /auth/me
Get current authenticated user.

**Headers:** Requires authentication

**Response (200):**
\`\`\`json
{
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@example.com",
    "role": "user",
    "criadoEm": "2025-01-14T10:00:00.000Z"
  }
}
\`\`\`

---

## Products Endpoints

### GET /produtos
List all active products (public endpoint).

**Query Parameters:**
- `categoria` (optional): Filter by category
- `ativo` (optional): Filter by active status (true/false)

**Response (200):**
\`\`\`json
{
  "produtos": [
    {
      "id": 1,
      "nome": "Caixinha Dinossauros",
      "descricao": "Caixa temática com brinquedos de dinossauros",
      "preco": 89.90,
      "estoque": 50,
      "categoria": "Dinossauros",
      "imagemUrl": "/dinosaur-toys-box.jpg",
      "ativo": true,
      "criadoEm": "2025-01-14T10:00:00.000Z",
      "atualizadoEm": "2025-01-14T10:00:00.000Z"
    }
  ]
}
\`\`\`

### POST /produtos
Create a new product (admin only).

**Headers:** Requires admin authentication

**Request Body:**
\`\`\`json
{
  "nome": "Caixinha Espaço",
  "descricao": "Caixa temática espacial",
  "preco": 99.90,
  "estoque": 30,
  "categoria": "Espaço",
  "imagemUrl": "/space-toys-kids.jpg",
  "ativo": true
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "message": "Produto criado com sucesso",
  "produto": { /* product object */ }
}
\`\`\`

### GET /produtos/[id]
Get a single product by ID (public endpoint).

**Response (200):**
\`\`\`json
{
  "produto": { /* product object */ }
}
\`\`\`

### PUT /produtos/[id]
Update a product (admin only).

**Headers:** Requires admin authentication

**Request Body:** (all fields optional)
\`\`\`json
{
  "nome": "Caixinha Espaço Atualizada",
  "preco": 109.90,
  "estoque": 25
}
\`\`\`

**Response (200):**
\`\`\`json
{
  "message": "Produto atualizado com sucesso",
  "produto": { /* updated product object */ }
}
\`\`\`

### DELETE /produtos/[id]
Delete a product (admin only).

**Headers:** Requires admin authentication

**Response (200):**
\`\`\`json
{
  "message": "Produto excluído com sucesso"
}
\`\`\`

---

## Orders Endpoints

### GET /pedidos
List orders (authenticated users see their own, admins see all).

**Headers:** Requires authentication

**Query Parameters:**
- `status` (optional): Filter by status (pendente, pago, enviado, entregue, cancelado)

**Response (200):**
\`\`\`json
{
  "pedidos": [
    {
      "id": 1,
      "usuarioId": 1,
      "status": "pendente",
      "total": 179.80,
      "enderecoEntrega": "Rua Example, 123, São Paulo - SP, CEP: 01234-567",
      "criadoEm": "2025-01-14T10:00:00.000Z",
      "atualizadoEm": "2025-01-14T10:00:00.000Z",
      "usuario": {
        "id": 1,
        "nome": "João Silva",
        "email": "joao@example.com"
      },
      "itens": [
        {
          "id": 1,
          "pedidoId": 1,
          "produtoId": 1,
          "quantidade": 2,
          "precoUnit": 89.90,
          "produto": {
            "id": 1,
            "nome": "Caixinha Dinossauros",
            "descricao": "...",
            "imagemUrl": "/dinosaur-toys-box.jpg"
          }
        }
      ]
    }
  ]
}
\`\`\`

### POST /pedidos
Create a new order (authenticated users).

**Headers:** Requires authentication

**Request Body:**
\`\`\`json
{
  "itens": [
    {
      "produtoId": 1,
      "quantidade": 2
    },
    {
      "produtoId": 3,
      "quantidade": 1
    }
  ],
  "enderecoEntrega": "Rua Example, 123, São Paulo - SP, CEP: 01234-567"
}
\`\`\`

**Response (201):**
\`\`\`json
{
  "message": "Pedido criado com sucesso",
  "pedido": { /* order object with items */ }
}
\`\`\`

### GET /pedidos/[id]
Get a single order by ID.

**Headers:** Requires authentication (users can only see their own orders)

**Response (200):**
\`\`\`json
{
  "pedido": { /* order object with items and user */ }
}
\`\`\`

### PUT /pedidos/[id]
Update order status (admin only).

**Headers:** Requires admin authentication

**Request Body:**
\`\`\`json
{
  "status": "enviado"
}
\`\`\`

**Valid statuses:** pendente, pago, enviado, entregue, cancelado

**Response (200):**
\`\`\`json
{
  "message": "Status do pedido atualizado com sucesso",
  "pedido": { /* updated order object */ }
}
\`\`\`

---

## Error Responses

All endpoints may return error responses in the following format:

\`\`\`json
{
  "error": "Error message description"
}
\`\`\`

Common HTTP status codes:
- `400` - Bad Request (validation errors)
- `401` - Unauthorized (missing or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `409` - Conflict (e.g., email already exists)
- `500` - Internal Server Error
