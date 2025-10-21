-- Migration: Add Cart system and update Product/Order models
-- This script adds the Carrinho, ItemCarrinho, and Categoria models
-- and updates existing models with new fields

-- Create Categoria table
CREATE TABLE IF NOT EXISTS "Categoria" (
  "id" SERIAL PRIMARY KEY,
  "nome" TEXT NOT NULL,
  "descricao" TEXT,
  "parentId" INTEGER,
  "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "Categoria_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Categoria"("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- Add new fields to Produto table
ALTER TABLE "Produto" 
  ADD COLUMN IF NOT EXISTS "categoriaId" INTEGER,
  ADD COLUMN IF NOT EXISTS "desconto" DOUBLE PRECISION DEFAULT 0,
  ADD COLUMN IF NOT EXISTS "promocaoAtiva" BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS "dataValidade" TIMESTAMP(3);

-- Add foreign key constraint for categoriaId
ALTER TABLE "Produto"
  ADD CONSTRAINT "Produto_categoriaId_fkey" 
  FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") 
  ON DELETE SET NULL ON UPDATE CASCADE;

-- Add new fields to Pedido table
ALTER TABLE "Pedido"
  ADD COLUMN IF NOT EXISTS "statusPagamento" TEXT DEFAULT 'pendente',
  ADD COLUMN IF NOT EXISTS "metodoPagamento" TEXT;

-- Add new field to ItemPedido table
ALTER TABLE "ItemPedido"
  ADD COLUMN IF NOT EXISTS "descontoItem" DOUBLE PRECISION DEFAULT 0;

-- Create Carrinho table
CREATE TABLE IF NOT EXISTS "Carrinho" (
  "id" SERIAL PRIMARY KEY,
  "usuarioId" INTEGER NOT NULL UNIQUE,
  "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "atualizadoEm" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Carrinho_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create ItemCarrinho table
CREATE TABLE IF NOT EXISTS "ItemCarrinho" (
  "id" SERIAL PRIMARY KEY,
  "carrinhoId" INTEGER NOT NULL,
  "produtoId" INTEGER NOT NULL,
  "quantidade" INTEGER NOT NULL,
  "precoUnit" DOUBLE PRECISION NOT NULL,
  CONSTRAINT "ItemCarrinho_carrinhoId_fkey" FOREIGN KEY ("carrinhoId") REFERENCES "Carrinho"("id") ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT "ItemCarrinho_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "ItemCarrinho_carrinhoId_produtoId_key" UNIQUE ("carrinhoId", "produtoId")
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS "Categoria_parentId_idx" ON "Categoria"("parentId");
CREATE INDEX IF NOT EXISTS "Produto_categoriaId_idx" ON "Produto"("categoriaId");
CREATE INDEX IF NOT EXISTS "Produto_promocaoAtiva_idx" ON "Produto"("promocaoAtiva");
CREATE INDEX IF NOT EXISTS "Carrinho_usuarioId_idx" ON "Carrinho"("usuarioId");
CREATE INDEX IF NOT EXISTS "ItemCarrinho_carrinhoId_idx" ON "ItemCarrinho"("carrinhoId");
CREATE INDEX IF NOT EXISTS "ItemCarrinho_produtoId_idx" ON "ItemCarrinho"("produtoId");
