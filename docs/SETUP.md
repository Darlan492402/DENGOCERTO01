# Setup do Projeto

## Pré-requisitos

1. Node.js 18+ instalado
2. Banco de dados PostgreSQL (Supabase configurado)
3. Variáveis de ambiente configuradas

## Instalação

### 1. Instalar dependências

\`\`\`bash
npm install
\`\`\`

### 2. Configurar variáveis de ambiente

O arquivo `.env` já está configurado com:
- `DATABASE_URL`: URL de conexão com PostgreSQL do Supabase
- `JWT_SECRET`: Chave secreta para geração de tokens JWT

### 3. Gerar Prisma Client

\`\`\`bash
npm run prisma:generate
\`\`\`

### 4. Executar migrations do banco de dados

\`\`\`bash
npm run prisma:migrate
\`\`\`

Ou execute o script SQL manualmente:

\`\`\`bash
# O script está em: scripts/001_create_complete_schema.sql
\`\`\`

### 5. Iniciar o servidor de desenvolvimento

\`\`\`bash
npm run dev
\`\`\`

## Estrutura do Banco de Dados

O projeto usa 4 tabelas principais:

- **Usuario**: Usuários do sistema (com autenticação)
- **Produto**: Catálogo de produtos
- **Pedido**: Pedidos realizados
- **ItemPedido**: Itens de cada pedido

## Troubleshooting

### Erro: "Tabela não existe"

Se você ver erros como "Tabela 'usuario' não existe", significa que as migrations não foram executadas. Execute:

\`\`\`bash
npm run prisma:migrate
\`\`\`

### Erro: "PrismaClient is unable to connect"

Verifique se:
1. A variável `DATABASE_URL` no `.env` está correta
2. O banco de dados PostgreSQL está acessível
3. As credenciais estão corretas

### Erro ao fazer login/cadastro

Verifique os logs do console no navegador (F12) para ver detalhes do erro. Os erros agora incluem mensagens detalhadas para facilitar o debug.
