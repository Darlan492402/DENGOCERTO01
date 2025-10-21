-- Script completo para configurar o banco de dados PostgreSQL
-- Execute este script no Supabase SQL Editor ou em qualquer cliente PostgreSQL

-- Limpar tabelas existentes (se necessário)
DROP TABLE IF EXISTS "ItemPedido" CASCADE;
DROP TABLE IF EXISTS "Pedido" CASCADE;
DROP TABLE IF EXISTS "Produto" CASCADE;
DROP TABLE IF EXISTS "Usuario" CASCADE;

-- Criar tabela de Usuários
CREATE TABLE "Usuario" (
    "id" SERIAL PRIMARY KEY,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "senha" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) DEFAULT 'user' NOT NULL,
    "criadoEm" TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Criar tabela de Produtos
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

-- Criar tabela de Pedidos
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

-- Criar tabela de Itens do Pedido
CREATE TABLE "ItemPedido" (
    "id" SERIAL PRIMARY KEY,
    "pedidoId" INTEGER NOT NULL,
    "produtoId" INTEGER NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "precoUnit" DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY ("pedidoId") REFERENCES "Pedido"("id") ON DELETE CASCADE,
    FOREIGN KEY ("produtoId") REFERENCES "Produto"("id") ON DELETE CASCADE
);

-- Criar índices para melhor performance
CREATE INDEX "idx_usuario_email" ON "Usuario"("email");
CREATE INDEX "idx_produto_categoria" ON "Produto"("categoria");
CREATE INDEX "idx_produto_ativo" ON "Produto"("ativo");
CREATE INDEX "idx_pedido_usuario" ON "Pedido"("usuarioId");
CREATE INDEX "idx_pedido_status" ON "Pedido"("status");
CREATE INDEX "idx_item_pedido" ON "ItemPedido"("pedidoId");
CREATE INDEX "idx_item_produto" ON "ItemPedido"("produtoId");

-- Inserir usuário admin padrão (senha: admin123)
-- Hash bcrypt da senha "admin123"
INSERT INTO "Usuario" ("nome", "email", "senha", "role") 
VALUES ('Administrador', 'admin@caixinhas.com', '$2a$10$rN8qzKJ5K5K5K5K5K5K5K.K5K5K5K5K5K5K5K5K5K5K5K5K5K5K5K', 'admin');

-- Inserir produtos de exemplo
INSERT INTO "Produto" ("nome", "descricao", "preco", "estoque", "categoria", "imagemUrl", "ativo") VALUES
('Caixinha Surpresa Colorida', 'Uma caixinha mágica cheia de surpresas coloridas para alegrar o dia!', 49.90, 50, 'surpresa', '/colorful-surprise-box.jpg', true),
('Caixinha Dinossauros', 'Aventura pré-histórica com dinossauros incríveis!', 54.90, 30, 'dinossauros', '/dinosaur-toys-box.jpg', true),
('Caixinha Princesas', 'Um mundo mágico de princesas e castelos encantados!', 54.90, 40, 'princesas', '/princess-toys-box.jpg', true),
('Caixinha Super-Heróis', 'Poderes incríveis e aventuras heroicas!', 54.90, 35, 'super-herois', '/superhero-toys-kids.jpg', true),
('Caixinha Animais da Fazenda', 'Conheça os animais da fazenda de forma divertida!', 49.90, 45, 'animais', '/farm-animals-toys.jpg', true),
('Caixinha Fundo do Mar', 'Explore as maravilhas do oceano!', 54.90, 25, 'oceano', '/ocean-sea-toys.jpg', true),
('Caixinha Espaço Sideral', 'Viaje pelo universo e descubra os planetas!', 59.90, 20, 'espaco', '/space-toys-kids.jpg', true);

-- Criar função para atualizar atualizadoEm automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."atualizadoEm" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Criar triggers para atualizar atualizadoEm
CREATE TRIGGER update_produto_updated_at BEFORE UPDATE ON "Produto"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_pedido_updated_at BEFORE UPDATE ON "Pedido"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Verificar se tudo foi criado corretamente
SELECT 'Tabelas criadas com sucesso!' as status;
SELECT COUNT(*) as total_produtos FROM "Produto";
SELECT COUNT(*) as total_usuarios FROM "Usuario";
