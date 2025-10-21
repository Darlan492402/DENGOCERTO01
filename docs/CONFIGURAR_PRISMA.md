# Como Configurar o Prisma

Este guia explica como configurar o Prisma com PostgreSQL (Supabase).

## Opção 1: Usando SQL Direto (Recomendado para v0)

### 1. Acesse o Supabase Dashboard

- Vá para [https://supabase.com](https://supabase.com)
- Faça login e selecione seu projeto

### 2. Abra o SQL Editor

- No menu lateral, clique em "SQL Editor"
- Clique em "New Query"

### 3. Execute o Script SQL

- Copie todo o conteúdo do arquivo `scripts/prisma_setup.sql`
- Cole no editor SQL do Supabase
- Clique em "Run" para executar

### 4. Verifique a Criação

Após executar o script, você verá:
- Mensagem "Tabelas criadas com sucesso!"
- 7 produtos criados
- 1 usuário admin criado

## Opção 2: Usando Prisma CLI (Para Deploy Local/Vercel)

Após fazer download do projeto:

### 1. Instale as Dependências

\`\`\`bash
npm install
\`\`\`

### 2. Configure o .env

Certifique-se que o arquivo `.env` contém:

\`\`\`
DATABASE_URL=postgresql://postgres:2+2=4sim@db.gqwtswekfoavpttzriml.supabase.co:5432/postgres
JWT_SECRET=sua-chave-secreta-super-segura-aqui
\`\`\`

### 3. Gere o Prisma Client

\`\`\`bash
npm run prisma:generate
\`\`\`

### 4. Sincronize o Schema com o Banco

\`\`\`bash
npm run prisma:push
\`\`\`

Ou use o comando combinado:

\`\`\`bash
npm run db:setup
\`\`\`

### 5. (Opcional) Abra o Prisma Studio

Para visualizar e editar dados com interface gráfica:

\`\`\`bash
npm run prisma:studio
\`\`\`

## O que o Script Cria

O script SQL cria automaticamente:

1. **4 Tabelas:**
   - Usuario (usuários do sistema)
   - Produto (catálogo de produtos)
   - Pedido (pedidos dos clientes)
   - ItemPedido (itens de cada pedido)

2. **Índices para Performance:**
   - Índices em email, categoria, status, etc.

3. **Triggers Automáticos:**
   - Atualização automática do campo atualizadoEm

4. **Dados Iniciais:**
   - 1 usuário admin
   - 7 produtos de exemplo

## Credenciais de Acesso

Faça login no sistema com:
- **Email:** admin@caixinhas.com
- **Senha:** admin123

## Após a Configuração

Depois de executar o script SQL:

1. Recarregue a página do v0
2. Faça login com as credenciais admin
3. Acesse `/admin/produtos` para gerenciar produtos
4. Acesse `/admin/pedidos` para ver pedidos

## Troubleshooting

### Erro: "relation already exists"
- As tabelas já existem
- Execute a parte do script que faz DROP das tabelas primeiro

### Erro: "PrismaClient is unable to connect"
- Verifique se a `DATABASE_URL` no arquivo `.env` está correta
- Formato: `postgresql://usuario:senha@host:5432/database`

### Produtos não aparecem
- Verifique se o script SQL foi executado completamente
- Confira no Supabase se a tabela Produto tem dados

### Erro: "Prisma Client not generated"
- Execute `npm run prisma:generate`
- Ou use `npm run db:setup` para configurar tudo

## Próximos Passos

1. Faça login como admin
2. Crie novos produtos através da interface admin
3. Teste o fluxo de compra criando um pedido
4. Crie novos usuários através da página de cadastro
