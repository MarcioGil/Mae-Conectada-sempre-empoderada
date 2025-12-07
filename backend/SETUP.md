# Setup do Backend — Mae-Conecta

## 1. Pré-requisitos
- Node.js 20+
- Docker e Docker Compose (para banco e ambiente prod)
- PostgreSQL (local ou via Docker)

## 2. Variáveis de ambiente
- Copie `.env.example` para `.env` e preencha as variáveis:
  - DATABASE_URL
  - JWT_SECRET, REFRESH_TOKEN_SECRET
  - SMTP configs
  - WHATSAPP/MSG provider
  - S3/Storage
  - SENTRY_DSN, PRIVACY_EMAIL

## 3. Instalação
```bash
cd backend
npm install
```

## 4. Banco de dados
- Para rodar localmente:
```bash
cd backend
docker-compose up -d
```
- Aplique as migrations:
```bash
docker-compose exec backend npm run migrate
```

## 5. Rodando o backend
```bash
npm run dev
```

## 6. Testes
```bash
npx jest --coverage
```

## 7. CI/CD
- Pipeline automatizado via GitHub Actions (`.github/workflows/ci.yml`)

## 8. Documentação
- Endpoints: `API_DOCS.yaml`
- Política de privacidade: `PRIVACY_POLICY.md`
- Segurança: `SECURITY.md`

---

> Dúvidas? Contate Marcio Gil (autor) ou consulte o README.md.
