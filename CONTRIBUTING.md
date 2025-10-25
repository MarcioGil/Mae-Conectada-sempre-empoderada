# 🤝 Guia de Contribuição - Mãe Conecta

Obrigado por considerar contribuir com o **Mãe Conecta**! Este projeto tem como missão ajudar mães em situação de vulnerabilidade no Brasil, e sua contribuição pode fazer uma diferença real na vida dessas mulheres.

## 📋 **Código de Conduta**

### **🌟 Nossos Valores**
- **Inclusão**: Respeitamos todas as pessoas, independentemente de origem, gênero, raça, religião ou orientação
- **Empatia**: Lembramos sempre que estamos ajudando pessoas em situação vulnerable
- **Colaboração**: Trabalhamos juntos para criar soluções efetivas
- **Qualidade**: Mantemos altos padrões de código e acessibilidade
- **Transparência**: Comunicação clara e honesta em todas as interações

### **❌ Comportamentos Inaceitáveis**
- Linguagem ofensiva, discriminatória ou exclusiva
- Assédio de qualquer tipo
- Informações falsas sobre direitos ou benefícios sociais
- Spam ou conteúdo promocional não relacionado
- Violação de privacidade ou dados pessoais

## 🎯 **Como Contribuir**

### **🚀 Primeiros Passos**

1. **Fork** do repositório
2. **Clone** seu fork localmente
3. **Instale** as dependências (ver [SETUP.md](./SETUP.md))
4. **Configure** o ambiente de desenvolvimento
5. **Execute** os testes para garantir que tudo funciona

```bash
git clone https://github.com/SEU-USUARIO/mae-conecta.git
cd mae-conecta
npm install
npm run dev
npm run test
```

### **🔍 Encontrando Issues para Contribuir**

#### **🏷️ Labels Importantes**
- `good first issue` - Ideal para iniciantes
- `help wanted` - Precisamos de ajuda da comunidade
- `accessibility` - Melhorias de acessibilidade
- `social-impact` - Issues com alto impacto social
- `documentation` - Melhorias na documentação
- `performance` - Otimizações de performance
- `mobile` - Funcionalidades mobile
- `voice-assistant` - Assistente de voz Clara

#### **🎯 Áreas Prioritárias**
1. **Acessibilidade** - WCAG 2.1 AA compliance
2. **Performance Mobile** - Otimização para dispositivos limitados
3. **Assistente de Voz** - Melhorias na Clara
4. **Documentação** - Guias e tutoriais
5. **Testes** - Cobertura de testes
6. **Integrações** - APIs governamentais brasileiras

## 📝 **Processo de Desenvolvimento**

### **🌿 GitFlow Simplificado**

```bash
# 1. Criar nova branch a partir da main
git checkout main
git pull origin main
git checkout -b feature/nome-da-feature

# 2. Desenvolver
# ... fazer alterações

# 3. Testar
npm run test:all
npm run lint
npm run a11y:check

# 4. Commit (usar conventional commits)
git add .
git commit -m "feat: adiciona módulo de busca de empregos"

# 5. Push e criar PR
git push origin feature/nome-da-feature
```

### **📋 Conventional Commits**

Usamos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat: nova funcionalidade
fix: correção de bug
docs: mudanças na documentação
style: formatação, ponto e vírgula, etc
refactor: refatoração sem mudança de funcionalidade
test: adição ou correção de testes
chore: mudanças em build, CI, dependências
perf: melhorias de performance
a11y: melhorias de acessibilidade
```

**Exemplos:**
```bash
feat(voice): adiciona comando "buscar empregos"
fix(a11y): corrige contraste de botões secundários
docs(setup): atualiza guia de instalação
test(voice): adiciona testes para reconhecimento de voz
a11y(navigation): melhora navegação por teclado
```

### **🧪 Testes Obrigatórios**

Antes de submeter um PR, execute:

```bash
# Testes unitários
npm run test:unit

# Testes de acessibilidade
npm run test:a11y

# Testes de integração
npm run test:integration

# Verificação de lint
npm run lint

# Verificação de tipos
npm run type-check

# Build de produção
npm run build
```

### **♿ Checklist de Acessibilidade**

Para qualquer mudança na UI:

- [ ] **Contraste** mínimo 4.5:1 (AA)
- [ ] **Navegação por teclado** funcional
- [ ] **Screen reader** compatível
- [ ] **Zoom até 200%** sem scroll horizontal
- [ ] **Touch targets** mínimo 44x44px
- [ ] **Focus indicators** visíveis
- [ ] **Aria labels** apropriados
- [ ] **Semantic HTML** correto

## 📤 **Pull Requests**

### **📋 Template de PR**

```markdown
## 📝 Descrição
<!-- Descreva o que foi implementado/corrigido -->

## 🎯 Motivação
<!-- Por que essa mudança é necessária? Que problema resolve? -->

## 🧪 Como Testar
<!-- Passos para testar as mudanças -->

## 📱 Teste Mobile
<!-- Testado em dispositivos móveis? -->

## ♿ Acessibilidade
- [ ] Testado com screen reader
- [ ] Testado navegação por teclado
- [ ] Verificado contraste de cores
- [ ] Testado zoom 200%

## 📊 Performance
- [ ] Bundle size verificado
- [ ] Lighthouse score mantido (90+)
- [ ] Core Web Vitals verificados

## 🔒 LGPD/Privacidade
- [ ] Não adiciona coleta de dados desnecessária
- [ ] Respeita princípios de minimização
- [ ] Implementa consentimento quando necessário

## 📸 Screenshots
<!-- Adicione screenshots se aplicável -->

## 🔗 Issues Relacionadas
<!-- Fecha #123, relaciona com #456 -->
```

### **✅ Critérios de Aprovação**

- [ ] **Testes** passando (unit, integration, a11y)
- [ ] **Code review** aprovado por maintainer
- [ ] **Lighthouse score** ≥ 90
- [ ] **Accessibility check** aprovado
- [ ] **Mobile testing** realizado
- [ ] **Documentation** atualizada se necessário
- [ ] **Conventional commits** seguidos

## 🎨 **Padrões de Código**

### **📁 Estrutura de Arquivos**

```typescript
// ✅ Bom: Componente bem estruturado
interface ButtonProps {
  variant: 'primary' | 'secondary'
  size: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  disabled?: boolean
  'aria-label'?: string
}

export function Button({ 
  variant, 
  size, 
  children, 
  disabled,
  'aria-label': ariaLabel,
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        disabled && 'btn-disabled'
      )}
      disabled={disabled}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  )
}
```

### **🎨 CSS/Tailwind**

```css
/* ✅ Bom: Classes utilitárias bem organizadas */
.btn {
  @apply 
    inline-flex items-center justify-center
    px-4 py-2 rounded-lg
    font-medium text-sm
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed;
}

.btn-primary {
  @apply 
    bg-purple-600 text-white
    hover:bg-purple-700
    focus:ring-purple-500;
}
```

### **🧪 Testes**

```typescript
// ✅ Bom: Teste bem estruturado
describe('VoiceAssistant', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should start listening when microphone button is pressed', async () => {
    const user = userEvent.setup()
    render(<VoiceAssistant />)
    
    const micButton = screen.getByRole('button', { 
      name: /ativar assistente de voz/i 
    })
    
    await user.click(micButton)
    
    expect(screen.getByText(/ouvindo/i)).toBeInTheDocument()
    expect(micButton).toHaveAttribute('aria-pressed', 'true')
  })

  it('should be accessible with screen reader', async () => {
    const { container } = render(<VoiceAssistant />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })
})
```

## 🏗️ **Contribuições por Área**

### **🎙️ Assistente de Voz Clara**

```typescript
// Exemplo: Adicionar novo comando
const voiceCommands = {
  'buscar emprego': () => router.push('/trabalho'),
  'meus direitos': () => router.push('/direitos'),
  'falar com clara': () => startConversation(),
  // Adicione novos comandos aqui
}
```

### **♿ Acessibilidade**

```typescript
// Exemplo: Hook de acessibilidade
export function useAccessibility() {
  const [fontSize, setFontSize] = useState('normal')
  const [contrast, setContrast] = useState('normal')
  const [reduceMotion, setReduceMotion] = useState(false)
  
  // Implementação...
}
```

### **📱 Mobile/PWA**

```typescript
// Exemplo: Hook PWA
export function usePWA() {
  const [isInstallable, setIsInstallable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  
  const installPWA = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
      // ...
    }
  }
  
  return { isInstallable, installPWA }
}
```

## 📚 **Recursos para Contribuidores**

### **📖 Documentação Essencial**
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Tailwind CSS](https://tailwindcss.com/docs)

### **🛠️ Ferramentas Recomendadas**
- **VS Code** com extensões do projeto
- **React DevTools**
- **axe DevTools** para acessibilidade
- **Lighthouse** para performance
- **NVDA/JAWS** para teste de screen reader

### **🔗 Links Úteis**
- [LGPD - Lei Geral de Proteção de Dados](https://www.gov.br/cidadania/pt-br/acesso-a-informacao/lgpd)
- [Portal Gov.br APIs](https://www.gov.br/governodigital/pt-br/apis)
- [Cadastro Único](https://www.gov.br/cidadania/pt-br/acoes-e-programas/cadastro-unico)
- [DataSUS](https://datasus.saude.gov.br/)

## 🎖️ **Reconhecimento**

### **🏆 Hall da Fama**
Contribuidores ativos terão seu nome adicionado ao README.md e perfis especiais no site.

### **🎯 Programa de Mentoria**
Para novos contribuidores, oferecemos mentoria para:
- Primeiras contribuições open source
- Desenvolvimento com foco em acessibilidade
- Impacto social através de tecnologia

## 🆘 **Precisa de Ajuda?**

### **💬 Canais de Comunicação**
- **Issues**: Para bugs e features
- **Discussions**: Para perguntas gerais
- **Email**: contato@maeconecta.com.br

### **🔍 FAQ**

**Q: Posso contribuir sem saber programar?**
A: Sim! Precisamos de ajuda com documentação, testes manuais, tradução, design UX/UI e feedback de usuários.

**Q: Como garantir que minha contribuição terá impacto?**
A: Foque nas issues marcadas como `social-impact` e `help-wanted`. Essas têm prioridade alta.

**Q: Posso usar este código em projetos comerciais?**
A: Sim, a licença MIT permite. Mas encorajamos manter o caráter social.

---

## 🙏 **Agradecimentos**

Cada linha de código, cada teste, cada sugestão contribui para um Brasil mais justo para as mães. **Obrigado por fazer parte dessa missão!**

**✨ Juntos, estamos construindo uma rede de apoio que pode transformar vidas.**