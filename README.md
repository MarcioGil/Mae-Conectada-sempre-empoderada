# 🌟 Mãe Conecta

Uma plataforma que entrega informação acionável, empregabilidade real, apoio comunitário e inclusão total.

## 🚀 Visão Geral

O **Mãe Conecta** é uma plataforma digital inclusiva projetada para empoderar mães e cuidadores, oferecendo:

- 🎙 **Assistente Clara de Voz** - Conversas por voz com transcrição automática
- 🛡 **Direitos Sem Medo** - Checklist dinâmico do BPC e outros benefícios
- 🧩 **Jornada de Acolhimento** - Passos gamificados para conquistas reais
- 🧠 **Conecta-Vagas Turbo** - IA para detecção de habilidades e oportunidades
- 👩‍👧‍👦 **Ninhos de Apoio 2.0** - Comunidade segura e moderada
- 📚 **Academia da Mãe** - Cursos com microcertificações
- 🏥 **Saúde da Infância** - Calendário inteligente de saúde

## 🏗 Arquitetura

### Frontend
- **React** com **Next.js** (PWA)
- **Tailwind CSS** para design responsivo
- **Service Workers** para funcionalidade offline
- **Accessibility-first** design

### Backend
- **Node.js** + **Python** (microservices)
- **GraphQL/REST** APIs
- **PostgreSQL** + **Redis** + **ElasticSearch**

### IA e Integrações
- **LLM/GenAI** para assistência inteligente
- **Whisper/STT** + **TTS** para funcionalidades de voz
- **OpenStreetMap/Google Maps** com filtros de acessibilidade
- **Web Speech API** para comandos de voz

### Segurança
- **JWT** + **OAuth** para autenticação
- **Criptografia AES256** para dados sensíveis
- **LGPD compliant** com anonimização
- Modo "sigiloso" sem histórico

## 📁 Estrutura do Projeto

```
mae-conecta/
├── frontend/          # Next.js PWA
├── backend/           # Node.js API
├── ai-services/       # Python microservices para IA
├── docs/             # Documentação
├── docker/           # Configurações Docker
└── scripts/          # Scripts de automação
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+
- Python 3.9+
- Docker e Docker Compose
- PostgreSQL

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/MarcioGil/Mae-Conecta.git
cd Mae-Conecta
```

2. Instale as dependências:
```bash
npm run install:all
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

4. Execute o projeto em desenvolvimento:
```bash
npm run dev
```

## 🌟 Funcionalidades Principais

### 🎙 Assistente Clara de Voz
- Conversas por voz com transcrição automática
- Respostas com voz natural
- Suporte multilíngue (Português Brasil + Libras em breve)
- Acesso offline a comandos básicos

### 🛡 Direitos Sem Medo
- Checklist dinâmico do BPC e outros benefícios
- IA avalia documentos necessários
- Detecta violações de direitos
- Gera relatórios para defensoria (PDF)

### 🧩 Jornada de Acolhimento
- Gamificação: "Conquiste o CadÚnico", "Garanta o Laudo Escolar"
- Sistema de badges e recompensas
- Integração com APIs sociais
- Descontos parceiros e créditos de transporte

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🌍 Impacto Social

Este projeto visa transformar vidas através da tecnologia, promovendo:
- Inclusão digital e social
- Empoderamento feminino
- Acesso facilitado a direitos básicos
- Construção de comunidades de apoio

---

**Desenvolvido com 💜 para transformar vidas através da tecnologia**