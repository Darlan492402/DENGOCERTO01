# Configuração do Banco de Dados Neon

## Passos para conectar ao Neon:

1. **Copie o arquivo de exemplo:**
   \`\`\`bash
   cp .env.local.example .env.local
   \`\`\`

2. **Obtenha sua connection string do Neon:**
   - Acesse [Neon Console](https://console.neon.tech)
   - Selecione seu projeto
   - Copie a connection string (deve começar com `postgresql://`)

3. **Configure o arquivo .env.local:**
   \`\`\`bash
   DATABASE_URL="sua-connection-string-do-neon-aqui"
   JWT_SECRET="gere-uma-chave-secreta-aleatoria"
   \`\`\`

4. **Instale as dependências:**
   \`\`\`bash
   npm install
   \`\`\`

5. **Execute a migration do Prisma:**
   \`\`\`bash
   npx prisma migrate dev --name init
   \`\`\`

6. **Gere o Prisma Client:**
   \`\`\`bash
   npx prisma generate
   \`\`\`

7. **Opcional - Popule o banco com dados iniciais:**
   \`\`\`bash
   npx prisma db seed
   \`\`\`

## Comandos úteis:

- Ver o banco de dados no Prisma Studio:
  \`\`\`bash
  npx prisma studio
  \`\`\`

- Resetar o banco de dados:
  \`\`\`bash
  npx prisma migrate reset
  \`\`\`

- Criar uma nova migration:
  \`\`\`bash
  npx prisma migrate dev --name nome_da_migration
