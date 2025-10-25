# 📁 Estrutura do Projeto Mãe Conecta

## 🗂️ **Organização do Repositório**

```
Mae-Conecta/
├── 📖 README.md                 # Documentação principal
├── 📋 SETUP.md                  # Guia de instalação
├── 👤 PROFILE.md                # Apresentação do desenvolvedor
├── 📁 PROJECT-STRUCTURE.md      # Este arquivo
├── ⚙️ package.json              # Configuração do monorepo
├── 🔐 .env.example              # Variáveis de ambiente
├── 🚫 .gitignore                # Arquivos ignorados
├── 📄 LICENSE                   # Licença MIT
│
├── 🎨 frontend/                 # Aplicação React/Next.js
│   ├── 📱 app/                  # App Router (Next.js 14)
│   │   ├── 🏠 page.tsx          # Página inicial
│   │   ├── 🎨 layout.tsx        # Layout principal
│   │   ├── 🎯 globals.css       # Estilos globais
│   │   ├── 🛡️ direitos/         # Módulo Direitos Sem Medo
│   │   ├── 💼 trabalho/         # Módulo Conecta-Vagas
│   │   ├── 👥 comunidade/       # Módulo Ninhos de Apoio
│   │   ├── 📚 cursos/           # Módulo Academia da Mãe
│   │   ├── 🎮 jornada/          # Módulo Jornada de Acolhimento
│   │   └── 🏥 saude/            # Módulo Saúde da Infância
│   │
│   ├── 🧩 components/           # Componentes reutilizáveis
│   │   ├── 🎙️ VoiceAssistant.tsx    # Assistente Clara
│   │   ├── ♿ AccessibilityPanel.tsx # Painel de acessibilidade
│   │   ├── 🧭 Navigation.tsx         # Navegação principal
│   │   ├── 🃏 ModuleCard.tsx         # Cards dos módulos
│   │   ├── ⚡ QuickActions.tsx       # Ações rápidas
│   │   ├── 🎊 WelcomeHero.tsx        # Seção hero
│   │   ├── 🔘 ui/                    # Componentes base (Button, Input, etc.)
│   │   ├── 📊 charts/                # Gráficos e visualizações
│   │   └── 📱 mobile/                # Componentes específicos mobile
│   │
│   ├── 🧠 contexts/             # Context API
│   │   ├── 🎯 AccessibilityContext.tsx  # Estado de acessibilidade
│   │   ├── 👤 UserContext.tsx           # Estado do usuário
│   │   ├── 🎙️ VoiceContext.tsx          # Estado do assistente de voz
│   │   └── 🌙 ThemeContext.tsx          # Estado do tema
│   │
│   ├── 🪝 hooks/                # Custom hooks
│   │   ├── 🎙️ useVoiceRecognition.ts   # Hook para reconhecimento de voz
│   │   ├── ♿ useAccessibility.ts       # Hook para acessibilidade
│   │   ├── 📱 useMediaQuery.ts          # Hook para responsividade
│   │   ├── 🔄 useLocalStorage.ts        # Hook para localStorage
│   │   └── 🌐 useOnlineStatus.ts        # Hook para status de conexão
│   │
│   ├── 🛠️ lib/                  # Utilitários e configurações
│   │   ├── 🎯 utils.ts              # Funções utilitárias
│   │   ├── 🔐 auth.ts               # Configuração de autenticação
│   │   ├── 🌐 api.ts                # Cliente API
│   │   ├── 📊 analytics.ts          # Analytics e tracking
│   │   └── 🧭 constants.ts          # Constantes da aplicação
│   │
│   ├── 📱 public/               # Arquivos estáticos
│   │   ├── 📋 manifest.json         # Manifest PWA
│   │   ├── 🎯 favicon.ico           # Favicon
│   │   ├── 🖼️ icons/                # Ícones PWA
│   │   ├── 🖼️ images/               # Imagens estáticas
│   │   └── 👥 avatars/              # Avatares padrão
│   │
│   ├── 🎨 styles/               # Estilos organizados
│   │   ├── 🎯 globals.css           # Estilos globais
│   │   ├── 🧩 components.css        # Estilos de componentes
│   │   ├── ♿ accessibility.css     # Estilos de acessibilidade
│   │   └── 📱 mobile.css            # Estilos específicos mobile
│   │
│   ├── 🧪 __tests__/            # Testes
│   │   ├── 🧩 components/           # Testes de componentes
│   │   ├── 🪝 hooks/                # Testes de hooks
│   │   ├── 📄 pages/                # Testes de páginas
│   │   ├── ♿ accessibility/         # Testes de acessibilidade
│   │   └── 🎮 e2e/                  # Testes end-to-end
│   │
│   ├── ⚙️ next.config.js        # Configuração Next.js
│   ├── 🎨 tailwind.config.js    # Configuração Tailwind
│   ├── 📦 package.json          # Dependências frontend
│   ├── 📝 tsconfig.json         # Configuração TypeScript
│   ├── 🎨 postcss.config.js     # Configuração PostCSS
│   └── 🧪 jest.config.js        # Configuração Jest
│
├── ⚙️ backend/                  # API Node.js (em desenvolvimento)
│   ├── 📁 src/                  # Código fonte
│   │   ├── 🚀 index.ts              # Entry point
│   │   ├── 🔌 app.ts                # Configuração Express
│   │   ├── 🛣️ routes/               # Rotas da API
│   │   ├── 🎯 controllers/          # Controllers
│   │   ├── 📊 models/               # Modelos de dados
│   │   ├── 🛠️ services/             # Lógica de negócio
│   │   ├── 🔌 middleware/           # Middlewares
│   │   └── 🛠️ utils/                # Utilitários
│   │
│   ├── 🗄️ prisma/               # Configuração Prisma
│   │   ├── 📊 schema.prisma         # Schema do banco
│   │   ├── 🌱 seeds/                # Seeds do banco
│   │   └── 🔄 migrations/           # Migrações
│   │
│   ├── 🧪 tests/                # Testes backend
│   ├── ⚙️ package.json          # Dependências backend
│   ├── 📝 tsconfig.json         # TypeScript config
│   └── 🌐 .env.example          # Variáveis de ambiente
│
├── 🤖 ai-services/              # Serviços de IA (futuro)
│   ├── 🐍 main.py               # FastAPI entry point
│   ├── 🧠 models/               # Modelos de IA
│   ├── 🔌 api/                  # Endpoints da IA
│   ├── 🛠️ utils/                # Utilitários Python
│   ├── 📊 data/                 # Datasets e modelos
│   ├── 📦 requirements.txt      # Dependências Python
│   └── 🧪 tests/                # Testes Python
│
├── 📚 docs/                     # Documentação detalhada
│   ├── 🏗️ ARCHITECTURE.md       # Documentação da arquitetura
│   ├── 🔌 API.md                # Documentação da API
│   ├── ♿ ACCESSIBILITY.md      # Guia de acessibilidade
│   ├── 🎙️ VOICE-COMMANDS.md     # Comandos de voz
│   ├── 🚀 DEPLOYMENT.md         # Guia de deploy
│   ├── 🤝 CONTRIBUTING.md       # Guia de contribuição
│   └── 🔒 SECURITY.md           # Política de segurança
│
├── 🐳 docker/                   # Configurações Docker
│   ├── 🐳 docker-compose.yml    # Desenvolvimento
│   ├── 🚀 docker-compose.prod.yml # Produção
│   ├── 🎨 frontend.dockerfile   # Dockerfile frontend
│   ├── ⚙️ backend.dockerfile    # Dockerfile backend
│   └── 🤖 ai.dockerfile         # Dockerfile IA
│
├── 🚀 .github/                  # GitHub workflows
│   ├── 🔧 workflows/            # GitHub Actions
│   │   ├── 🧪 ci.yml            # Integração contínua
│   │   ├── 🚀 deploy.yml        # Deploy automático
│   │   ├── 🔒 security.yml      # Verificações de segurança
│   │   └── ♿ accessibility.yml # Testes de acessibilidade
│   │
│   └── 📋 ISSUE_TEMPLATE/       # Templates de issues
│       ├── 🐛 bug_report.md     # Report de bugs
│       ├── ✨ feature_request.md # Solicitação de features
│       └── ♿ accessibility.md   # Issues de acessibilidade
│
└── 📊 analytics/                # Scripts de análise
    ├── 📈 performance.js        # Análise de performance
    ├── ♿ accessibility.js      # Análise de acessibilidade
    ├── 📱 mobile.js             # Análise mobile
    └── 📊 reports/              # Relatórios gerados
```

---

## 📋 **Convenções e Padrões**

### **📁 Nomenclatura de Arquivos**
```
PascalCase:     Components React (Button.tsx, VoiceAssistant.tsx)
camelCase:      Hooks, utils, services (useVoice.ts, apiClient.ts)
kebab-case:     Páginas, rotas (meus-direitos/, trabalho/)
UPPERCASE:      Constantes, env (API_URL, DATABASE_URL)
lowercase:      Configs (next.config.js, tailwind.config.js)
```

### **🏗️ Arquitetura de Componentes**
```
src/components/
├── ui/              # Componentes base (Button, Input, Modal)
├── forms/           # Formulários específicos
├── layout/          # Componentes de layout (Header, Footer)
├── features/        # Componentes específicos de features
└── providers/       # Context providers
```

### **🎯 Padrões de Código**

#### **React Components**
```typescript
// ✅ Bom: Componente funcional com TypeScript
interface ButtonProps {
  variant: 'primary' | 'secondary'
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}

export function Button({ variant, children, onClick, disabled }: ButtonProps) {
  return (
    <button 
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  )
}
```

#### **Custom Hooks**
```typescript
// ✅ Bom: Hook customizado com TypeScript
export function useVoiceRecognition() {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  
  const startListening = useCallback(() => {
    // Implementação...
  }, [])
  
  return { isListening, transcript, startListening }
}
```

#### **API Services**
```typescript
// ✅ Bom: Serviço de API tipado
interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export class ApiClient {
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    // Implementação...
  }
}
```

---

## 🧪 **Estratégia de Testes**

### **Pirâmide de Testes**
```
        🔺 E2E Tests (5%)
       🔺🔺 Integration Tests (15%)
      🔺🔺🔺 Unit Tests (80%)
```

### **Tipos de Teste**

#### **🧪 Unit Tests (Jest + React Testing Library)**
```typescript
// Exemplo: Teste de componente
describe('VoiceAssistant', () => {
  it('should start listening when microphone button is clicked', () => {
    render(<VoiceAssistant />)
    const micButton = screen.getByLabelText(/ativar assistente/i)
    fireEvent.click(micButton)
    expect(screen.getByText(/ouvindo/i)).toBeInTheDocument()
  })
})
```

#### **♿ Accessibility Tests**
```typescript
// Exemplo: Teste de acessibilidade
import { axe, toHaveNoViolations } from 'jest-axe'

expect.extend(toHaveNoViolations)

test('should not have accessibility violations', async () => {
  const { container } = render(<AccessibilityPanel />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

#### **🎮 E2E Tests (Playwright)**
```typescript
// Exemplo: Teste end-to-end
test('user can navigate using voice commands', async ({ page }) => {
  await page.goto('/')
  await page.click('[aria-label="Ativar assistente de voz"]')
  await page.waitForSelector('[data-testid="voice-listening"]')
  // Simular comando de voz...
  await expect(page).toHaveURL('/direitos')
})
```

---

## 🔄 **Workflow de Desenvolvimento**

### **🚀 GitFlow Simplificado**
```
main           # Produção (sempre deployável)
├── develop    # Desenvolvimento (features integradas)
├── feature/*  # Features individuais
├── hotfix/*   # Correções urgentes
└── release/*  # Preparação para release
```

### **📋 Commit Convention**
```
feat: adiciona novo módulo de voz
fix: corrige bug no assistente Clara  
docs: atualiza documentação da API
style: ajusta cores do tema escuro
refactor: melhora performance do PWA
test: adiciona testes de acessibilidade
chore: atualiza dependências
```

### **🔄 Pull Request Process**
1. ✅ **Testes passando** (unit + integration + a11y)
2. 🔍 **Code review** por pelo menos 1 pessoa
3. 📊 **Lighthouse score** mantido (90+)
4. ♿ **Accessibility check** (axe-core)
5. 📱 **Mobile testing** realizado
6. 🚀 **Deploy preview** verificado

---

## 📊 **Métricas e Monitoramento**

### **📈 Performance Tracking**
- **Core Web Vitals** (LCP, FID, CLS)
- **Bundle size** monitoring
- **API response times**
- **Error rates** e crash analytics

### **♿ Accessibility Monitoring**
- **WCAG compliance** automated tests
- **Screen reader** compatibility
- **Keyboard navigation** coverage
- **Color contrast** validation

### **📱 Mobile Metrics**
- **Touch target** sizes
- **Viewport** optimization
- **Offline functionality** coverage
- **PWA** install rates

---

## 🔐 **Segurança e Compliance**

### **🛡️ Security Measures**
- **HTTPS** obrigatório
- **CSP** (Content Security Policy)
- **Input sanitization**
- **Rate limiting**
- **Authentication** JWT + refresh tokens

### **📋 LGPD Compliance**
- **Data minimization**
- **Consent management**
- **Right to deletion**
- **Data encryption** AES-256
- **Audit logs**

### **♿ Accessibility Compliance**
- **WCAG 2.1 AA** compliance
- **Screen reader** testing
- **Keyboard navigation**
- **Color contrast** 4.5:1 minimum
- **Focus management**

---

## 🚀 **Roadmap Técnico**

### **📅 Sprint 1-2 (Atual)**
- ✅ Frontend PWA base
- ✅ Assistente de voz Clara  
- ✅ Sistema de acessibilidade
- 🔄 Testes automatizados

### **📅 Sprint 3-4**
- 🔄 Backend API GraphQL
- 🔄 Sistema de autenticação
- 🔄 Módulo Direitos Sem Medo
- 🔄 Integração com IA

### **📅 Sprint 5-6**
- 📅 Módulo Conecta-Vagas
- 📅 Sistema de gamificação
- 📅 Chat da comunidade
- 📅 Analytics avançado

### **📅 Sprint 7+**
- 📅 App mobile nativo
- 📅 Suporte a Libras
- 📅 Parcerias institucionais
- 📅 Escala e performance

---

**📚 Esta estrutura reflete as melhores práticas de desenvolvimento moderno, focando em qualidade, acessibilidade e impacto social.**