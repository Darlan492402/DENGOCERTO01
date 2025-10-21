-- Create complete database schema for e-commerce platform
-- This migration creates Users, Products, Orders, and OrderItems tables

-- Drop existing tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS "ItemPedido" CASCADE;
DROP TABLE IF EXISTS "Pedido" CASCADE;
DROP TABLE IF EXISTS "Produto" CASCADE;
DROP TABLE IF EXISTS "Usuario" CASCADE;

-- Create Usuario table with authentication fields
CREATE TABLE "Usuario" (
  "id" SERIAL PRIMARY KEY,
  "nome" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) UNIQUE NOT NULL,
  "senha" VARCHAR(255) NOT NULL,
  "role" VARCHAR(50) DEFAULT 'user' NOT NULL,
  "criadoEm" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create Produto table for product catalog
CREATE TABLE "Produto" (
  "id" SERIAL PRIMARY KEY,
  "nome" VARCHAR(255) NOT NULL,
  "descricao" TEXT NOT NULL,
  "preco" DECIMAL(10, 2) NOT NULL,
  "estoque" INTEGER NOT NULL,
  "categoria" VARCHAR(100) NOT NULL,
  "imagemUrl" VARCHAR(500),
  "ativo" BOOLEAN DEFAULT true NOT NULL,
  "criadoEm" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "atualizadoEm" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Create Pedido table for orders
CREATE TABLE "Pedido" (
  "id" SERIAL PRIMARY KEY,
  "usuarioId" INTEGER NOT NULL,
  "status" VARCHAR(50) DEFAULT 'pendente' NOT NULL,
  "total" DECIMAL(10, 2) NOT NULL,
  "enderecoEntrega" TEXT NOT NULL,
  "criadoEm" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  "atualizadoEm" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
  FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE
);

-- Create ItemPedido table for order line items
CREATE TABLE "ItemPedido" (
  "id" SERIAL PRIMARY KEY,
  "pedidoId" INTEGER NOT NULL,
  "produtoId" INTEGER NOT NULL,
  "quantidade" INTEGER NOT NULL,
  "precoUnit" DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE CASCADE,
  FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT
);

-- Create indexes for better query performance
CREATE INDEX "idx_usuario_email" ON "Usuario"("email");
CREATE INDEX "idx_produto_categoria" ON "Produto"("categoria");
CREATE INDEX "idx_produto_ativo" ON "Produto"("ativo");
CREATE INDEX "idx_pedido_usuario" ON "Pedido"("usuarioId");
CREATE INDEX "idx_pedido_status" ON "Pedido"("status");
CREATE INDEX "idx_itempedido_pedido" ON "ItemPedido"("pedidoId");
CREATE INDEX "idx_itempedido_produto" ON "ItemPedido"("produtoId");
