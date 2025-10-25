# 🚀 Guia de Setup - Mãe Conecta

## 📋 **Pré-requisitos**

### **💻 Sistema Operacional**
- ✅ Windows 10/11, macOS 10.15+, ou Linux Ubuntu 18.04+
- ✅ **RAM**: Mínimo 8GB (recomendado 16GB)
- ✅ **Armazenamento**: Mínimo 10GB livres

### **🛠️ Ferramentas Necessárias**

#### **Node.js & npm**
```powershell
# Verificar versão atual
node --version  # Necessário: v18.0.0+
npm --version   # Necessário: v8.0.0+

# Download: https://nodejs.org/
# Recomendado: Usar Node.js LTS (v18 ou v20)
```

#### **Git**
```powershell
# Verificar instalação
git --version

# Download: https://git-scm.com/
```

#### **VS Code (Recomendado)**
```powershell
# Download: https://code.visualstudio.com/
# Extensões essenciais serão instaladas automaticamente
```

---

## 📦 **Instalação Rápida**

### **🔽 1. Clonar o Repositório**
```powershell
# Clonar projeto
git clone https://github.com/marcio-gil/mae-conecta.git
cd mae-conecta

# Verificar branch
git branch
```

### **⚙️ 2. Configuração Automática**
```powershell
# Instalar dependências do projeto principal
npm install

# Instalar dependências do frontend
cd frontend
npm install
cd ..

# Configurar hooks de commit
npm run setup:hooks
```

### **🌐 3. Configurar Variáveis de Ambiente**
```powershell
# Copiar arquivo de exemplo
cp .env.example .env

# Editar variáveis (usar VS Code ou editor preferido)
code .env
```

**Configurações básicas (.env):**
```bash
# Aplicação
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000

# Base de dados (PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/mae_conecta_dev"

# Autenticação JWT
JWT_SECRET=sua_chave_super_secreta_aqui
JWT_EXPIRES_IN=7d

# APIs Externas
OPENAI_API_KEY=sk-sua_chave_openai_aqui
GOOGLE_MAPS_API_KEY=sua_chave_google_maps_aqui

# Email (Opcional - para notificações)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu_email@gmail.com
SMTP_PASS=sua_senha_de_app

# Analytics (Opcional)
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
HOTJAR_ID=HOTJAR_SITE_ID
```

### **🚀 4. Iniciar Aplicação**
```powershell
# Desenvolvimento - Frontend apenas
npm run dev

# Ou usar turbo para melhor performance
npm run turbo:dev

# Aplicação estará disponível em:
# http://localhost:3000
```

---

## 🔧 **Setup Detalhado**

### **🎨 Frontend (Next.js)**
```powershell
cd frontend

# Instalar dependências
npm install

# Verificar configuração do Tailwind
npm run build:css

# Executar testes
npm run test

npm run test                  # Testes unitários
npm run test:a11y             # Testes de acessibilidade  
npm run test:e2e              # Testes end-to-end
npm run lint                  # Verificar código
npm run format                # Formatar código
npm run analyze               # Analisar bundle
npm run lighthouse            # Verificar performance
```

---

## 🐳 **Setup com Docker**

### **🚀 Desenvolvimento Rápido**
```powershell
# Subir todos os serviços
docker-compose up -d

# Verificar status
docker-compose ps

# Logs em tempo real
docker-compose logs -f

# Parar serviços
docker-compose down
```

### **📦 Serviços Disponíveis**
```yaml
# docker-compose.yml inclui:
- frontend:3000      # Aplicação Next.js
- backend:4000       # API Node.js + GraphQL  
- postgres:5432      # Banco de dados
- redis:6379         # Cache e sessões
- nginx:80           # Proxy reverso
```

---

## ✅ **Verificação da Instalação**

### **🧪 Testes de Funcionamento**
```powershell
# Executar suite completa de testes
npm run test:all

# Testes unitários
npm run test:unit

# Testes de integração
npm run test:integration

# Testes de acessibilidade
npm run test:a11y

# Testes E2E
npm run test:e2e
```

### **📊 Verificação de Performance**
```powershell
# Lighthouse CI
npm run lighthouse

# Bundle analyzer
npm run analyze

# Verificar Core Web Vitals
npm run vitals
```

### **♿ Verificação de Acessibilidade**
```powershell
# axe-core automated tests
npm run a11y:check

# Verificar contraste de cores
npm run a11y:contrast

# Teste de navegação por teclado
npm run a11y:keyboard
```

---

## 📱 **Teste em Dispositivos Móveis**

### **🔗 Acesso Local**
```powershell
# Encontrar IP da máquina
ipconfig  # Windows
ifconfig  # macOS/Linux

# Exemplo: Se IP for 192.168.1.100
# Acesse no mobile: http://192.168.1.100:3000
```

### **📱 PWA Testing**
1. **Chrome DevTools** → Application → Manifest
2. **Add to Home Screen** teste
3. **Offline functionality** verificação
4. **Service Worker** status
5. **Push notifications** (futuro)

### **🎙️ Teste do Assistente de Voz**
1. Permitir acesso ao **microfone**
2. Testar comando: *"Olá Clara"*
3. Navegação por voz: *"Ir para direitos"*
4. Verificar **síntese de voz** (TTS)
5. Testar em **diferentes navegadores**

---

## 🔍 **Troubleshooting**

### **❌ Problemas Comuns**

#### **Node.js/npm Issues**
```powershell
# Limpar cache npm
npm cache clean --force

# Deletar node_modules e reinstalar
rm -rf node_modules package-lock.json
npm install

# Usar versão específica do Node
nvm use 18.17.0  # Se tiver nvm instalado
```

#### **Performance Issues**
```powershell
# Verificar uso de memória
npm run analyze:bundle

# Limpar cache do Next.js
rm -rf .next

# Rebuild completo
npm run clean && npm run build
```

#### **Problemas de Acessibilidade**
```powershell
# Verificar configuração do screen reader
npm run a11y:debug

# Testar com diferentes navegadores
npm run test:cross-browser
```

### **🔧 Configurações Avançadas**

#### **VS Code Extensions**
```json
{
  "recommendations": [
    "bradlc.vscode-tailwindcss",
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-playwright.playwright",
    "deque-systems.vscode-axe-linter",
    "ms-vscode.vscode-speech"
  ]
}
```

#### **Configuração de Prettier**
```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "avoid"
}
```

#### **ESLint Configuration**
```json
{
  "extends": [
    "next/core-web-vitals",
    "@typescript-eslint/recommended",
    "plugin:jsx-a11y/recommended"
  ],
  "rules": {
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/aria-role": "error",
    "jsx-a11y/click-events-have-key-events": "error"
  }
}
```

---

## 🚀 **Deploy para Produção**

### **📦 Build de Produção**
```powershell
# Build otimizado
npm run build

# Verificar build
npm run start

# Análise de bundle
npm run analyze
```

### **☁️ Deploy na Vercel (Recomendado)**
```powershell
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod

# Configurar domínio personalizado
vercel domains add mae-conecta.com.br
```

### **🔒 Configurações de Segurança**
```bash
# Adicionar ao .env.production
NEXT_PUBLIC_ENVIRONMENT=production
SECURITY_HEADERS=true
CSP_ENABLED=true
RATE_LIMITING=true
```

---

## 📚 **Próximos Passos**

### **🎯 Após Setup Completo**
1. ✅ **Explore a aplicação** em http://localhost:3000
2. 🎙️ **Teste o assistente Clara** com comandos de voz
3. ♿ **Verifique acessibilidade** com leitores de tela
4. 📱 **Teste responsividade** em diferentes dispositivos
5. 🧪 **Execute testes** para garantir qualidade

### **🔄 Workflow de Desenvolvimento**
1. **Criar nova branch**: `git checkout -b feature/nome-da-feature`
2. **Desenvolver**: Seguir padrões estabelecidos
3. **Testar**: `npm run test:all`
4. **Commit**: Usar conventional commits
5. **Push e PR**: Para review da equipe

### **📖 Documentação Adicional**
- 📁 [Estrutura do Projeto](./PROJECT-STRUCTURE.md)
- 🏗️ [Arquitetura](./docs/ARCHITECTURE.md)
- ♿ [Guia de Acessibilidade](./docs/ACCESSIBILITY.md)
- 🎙️ [Comandos de Voz](./docs/VOICE-COMMANDS.md)
- 🔌 [API Documentation](./docs/API.md)

---

**✨ Pronto! Sua aplicação Mãe Conecta está funcionando e pronta para fazer a diferença na vida das mães brasileiras.**

**🆘 Problemas? Abra uma issue no GitHub ou consulte nossa documentação detalhada.**
npm start
```

### **⚙️ Backend (Node.js) - Em desenvolvimento**
```powershell
cd backend

# Instalar dependências
npm install

# Configurar banco de dados
npm run db:setup

# Executar migrações
npm run db:migrate

# Executar seeds
npm run db:seed

# Iniciar em modo desenvolvimento
npm run dev

# API estará disponível em:
# http://localhost:4000/graphql
```

### **🤖 Serviços de IA (Python) - Futuro**
```powershell
cd ai-services

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Executar serviço
python main.py
```

---

## 🛠 Scripts Disponíveis

### No diretório raiz:
```powershell
npm run dev:frontend          # Executa frontend em desenvolvimento
npm run build:frontend        # Build de produção do frontend
npm run start:frontend        # Executa frontend em produção
npm run install:all          # Instala todas as dependências

### No diretório frontend:
```bash
npm run dev                  # Desenvolvimento com hot reload
npm run build               # Build otimizado para produção
npm run start               # Servidor de produção
npm run lint                # Verificação de código
npm run type-check          # Verificação de TypeScript
```

## 📱 Testando no Mobile

### Android/iOS:
1. Execute `npm run dev` no frontend
2. Acesse via IP local: `http://[SEU-IP]:3000`
3. Adicione à tela inicial para experiência PWA completa

### Recursos testáveis:
- ✅ **Assistente de Voz Clara** (botão flutuante)
- ✅ **Painel de Acessibilidade** (ícone de engrenagem)
- ✅ **Modo offline** (após primeira visita)
- ✅ **Navegação por voz**
- ✅ **Alto contraste e tamanhos de fonte**
- ✅ **Temas claro/escuro**

## 🎙️ Comandos de Voz (Assistente Clara)

Pressione o botão do microfone e diga:
- **"Página inicial"** - Volta ao home
- **"Meus direitos"** - Abre Direitos Sem Medo
- **"Trabalho"** - Abre Conecta-Vagas
- **"Comunidade"** - Abre Ninhos de Apoio
- **"Cursos"** - Abre Academia da Mãe
- **"Saúde"** - Abre calendário de saúde
- **"Ajuda"** - Lista todos os comandos

## 🔧 Troubleshooting

### Erro de permissão de microfone:
- Acesse via HTTPS em produção
- No desenvolvimento, use `localhost` (não IP)

### PWA não instala:
- Verifique se está em HTTPS
- Teste em Chrome/Edge (melhor suporte)

### Problemas de performance:
- Verifique se Service Workers estão funcionando
- Limpe cache do navegador
- Use mode desenvolvimento para debug

## 🌐 Deploy

### Vercel (Recomendado):
```bash
npm install -g vercel
cd frontend
vercel
```

### Netlify:
```bash
cd frontend
npm run build
# Upload da pasta 'out' para Netlify
```

## 📊 Métricas de Performance

O projeto está otimizado para:
- ⚡ **Core Web Vitals** excelentes
- 📱 **Mobile First** (celulares básicos)
- ♿ **WCAG 2.1 AA** compliance
- 🔄 **Offline First** (PWA)
- 🎯 **Lighthouse Score**: 90+

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/nova-feature`
3. Commit: `git commit -m 'Adiciona nova feature'`
4. Push: `git push origin feature/nova-feature`
5. Abra um Pull Request

---

**Desenvolvido com 💜 para transformar vidas através da tecnologia**