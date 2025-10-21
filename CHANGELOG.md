# Changelog

## Versão 3.0.0

### Alterações
- ❌ Removido arquivo .gitignore do projeto
- ✅ Adicionado Prisma ORM com PostgreSQL
- ✅ Criado arquivo .env com DATABASE_URL
- ✅ Criado schema Prisma com modelo Usuario
- ✅ Adicionados scripts prisma:migrate e prisma:generate
- ✅ Atualizada versão do projeto para 3.0.0

### Arquivos Criados
- `.env` - Configuração do banco de dados
- `prisma/schema.prisma` - Schema do Prisma com modelo Usuario
- `CHANGELOG.md` - Histórico de versões

### Dependências Adicionadas
- `prisma@^6.2.0`
- `@prisma/client@^6.2.0`
