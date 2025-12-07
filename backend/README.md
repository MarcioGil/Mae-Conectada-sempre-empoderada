# Mae-Conecta Backend


**Autor:** Marcio Gil (<contato@maeconecta.com.br>)
**Repositório:** [github.com/marcio-gil/mae-conecta](https://github.com/marcio-gil/mae-conecta)

## Descrição
Backend Node.js/Express para autenticação, emergência, documentos, comunidade, vagas e assistente de voz. Foco em segurança, LGPD, escalabilidade e integração com frontend/mobile.

## Como rodar localmente


### 1. Clone o repositório
```bash
git clone https://github.com/marcio-gil/mae-conecta.git
cd mae-conecta/backend
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure variáveis de ambiente
Copie `.env.example` para `.env` e preencha os valores:
```bash
cp .env.example .env
# edite .env conforme necessário
```

### 4. Suba o banco de dados (opcional)
```bash
docker-compose up -d
```

### 5. Rode o backend
```bash
npm run dev
```

## Testes


Execute todos os testes (unitários e integração):
```bash
npx jest --coverage
```

## CI/CD

Pipeline automatizado via GitHub Actions:
- Build, lint, testes e build Docker
- Deploy contínuo (vercel)

## Endpoints principais

Todos os endpoints seguem o padrão REST e retornam JSON, exceto upload/download de arquivos.

### Autenticação
Tokens JWT são usados no header `Authorization: Bearer <token>` para rotas protegidas.

### Endpoints detalhados

#### POST `/api/auth/register`
Cadastra novo usuário.
**Body:**
```json
{
	"email": "user@exemplo.com",
	"password": "senha123",
	"name": "Nome"
}
```
**Response:** 201 Created

#### POST `/api/auth/login`
Login do usuário.
**Body:**
```json
{
	"email": "user@exemplo.com",
	"password": "senha123"
}
```
**Response:** 200 OK
```json
{
	"accessToken": "...",
	"refreshToken": "..."
}
```

#### POST `/api/auth/refresh`
Renova o token de acesso.
**Body:**
```json
{
	"refreshToken": "..."
}
```
**Response:** 200 OK
```json
{
	"accessToken": "..."
}
```

#### GET `/api/user/me`
Retorna dados do usuário autenticado.
**Headers:**
`Authorization: Bearer <token>`
**Response:** 200 OK
```json
{
	"id": "...",
	"email": "...",
	"name": "..."
}
```

#### POST `/api/documents`
Upload de documento (multipart/form-data).
**Headers:**
`Authorization: Bearer <token>`
**Body:**
`file` (arquivo)
**Response:** 201 Created

#### GET `/api/documents/{id}`
Download de documento.
**Headers:**
`Authorization: Bearer <token>`
**Params:**
`id` (string)
**Response:** 200 OK (arquivo)

#### POST `/api/emergency/trigger`
Aciona emergência para o usuário.
**Headers:**
`Authorization: Bearer <token>`
**Body:**
```json
{
	"userId": "...",
	"lat": -23.5,
	"lon": -46.6,
	"mode": "sms|whatsapp|email",
	"contacts": ["+5511999999999"]
}
```
**Response:** 200 OK

#### POST `/api/community/rooms/{id}/message`
Envia mensagem em uma sala da comunidade.
**Headers:**
`Authorization: Bearer <token>`
**Params:**
`id` (string)
**Body:**
```json
{
	"message": "Olá comunidade!"
}
```
**Response:** 201 Created

#### GET `/api/vacancies`
Lista vagas disponíveis.
**Response:** 200 OK
```json
[
	{ "id": "1", "title": "Vaga 1", "desc": "..." }
]
```

#### POST `/api/voice/command`
Envia comando de voz (multipart/form-data).
**Headers:**
`Authorization: Bearer <token>`
**Body:**
`audio` (arquivo de áudio)
**Response:** 200 OK
```json
{
	"result": "Comando reconhecido"
}
```

Consulte `API_DOCS.yaml` para detalhes completos do contrato OpenAPI.

## Estrutura sugerida
- `auth/` — autenticação
- `emergency/` — emergência
- `documents/` — documentos
- `community/` — comunidade
- `vacancies/` — vagas
- `voice/` — assistente de voz

## LGPD & Segurança

- Consentimento explícito do usuário
- Criptografia de dados sensíveis
- Logs de acesso e auditoria
- Política de privacidade e segurança (consulte PRIVACY_POLICY.md e SECURITY.md)

## Contato

Em caso de dúvidas sobre privacidade ou LGPD:
- DPO: dpo@seuorg.com


---

### Exemplos de uso

**Cadastro:**
```bash
curl -X POST http://localhost:4000/api/auth/register -H "Content-Type: application/json" -d '{"email":"user@exemplo.com","password":"123456","name":"Nome"}'
```

**Login:**
```bash
curl -X POST http://localhost:4000/api/auth/login -H "Content-Type: application/json" -d '{"email":"user@exemplo.com","password":"123456"}'
```

**Acionar emergência:**
```bash
curl -X POST http://localhost:4000/api/emergency/trigger -H "Authorization: Bearer <token>" -H "Content-Type: application/json" -d '{"userId":"1","lat":-23.5,"lon":-46.6,"mode":"whatsapp","contacts":["+5511999999999"]}'
```

### Links úteis
- [Documentação OpenAPI (API_DOCS.yaml)](./API_DOCS.yaml)
- [Política de Privacidade](./PRIVACY_POLICY.md)
- [Política de Segurança](./SECURITY.md)
- [Checklist de QA](./QA_CHECKLIST.md)
- [Guia de Setup](./SETUP.md)

---

> Projeto desenvolvido por Marcio Gil e colaboradores. Consulte o repositório para mais detalhes.
