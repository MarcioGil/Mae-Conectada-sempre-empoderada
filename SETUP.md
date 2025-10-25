# 🚀 Como Executar o Mãe Conecta

## 📋 Pré-requisitos

- **Node.js** 18+ (recomendado: 18.18.0)
- **npm** 9+ ou **yarn**
- **Git**

## ⚡ Instalação Rápida

### 1. Clone o repositório
```bash
git clone https://github.com/MarcioGil/Mae-Conecta.git
cd Mae-Conecta
```

### 2. Instale as dependências
```bash
# Instalar dependências do projeto principal
npm install

# Instalar dependências do frontend
cd frontend
npm install
cd ..
```

### 3. Execute em desenvolvimento
```bash
# Na raiz do projeto
npm run dev:frontend

# OU diretamente no frontend
cd frontend
npm run dev
```

### 4. Acesse a aplicação
- **Frontend**: http://localhost:3000
- **PWA**: Funciona offline após primeiro carregamento

## 🛠 Scripts Disponíveis

### No diretório raiz:
```bash
npm run dev:frontend          # Executa frontend em desenvolvimento
npm run build:frontend        # Build de produção do frontend
npm run start:frontend        # Executa frontend em produção
npm run install:all          # Instala todas as dependências
```

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