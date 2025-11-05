# 📱 GERAÇÃO DE APK - MÃE CONECTA

## 🛠️ MÉTODO 1: PWA BUILDER (MICROSOFT) - RECOMENDADO

### ✅ **Passos para gerar APK:**

1. **Acesse**: https://www.pwabuilder.com/
2. **URL**: Cole https://marciogil.github.io/Mae-Conectada-sempre-empoderada/
3. **Gerar**: Clique em "Package For Stores"
4. **Android**: Escolha "Google Play Store Package"
5. **Download**: Baixe o APK gerado

### 📋 **Configurações Recomendadas:**

```json
{
  "name": "Mãe Conecta",
  "packageId": "com.maeconecta.app",
  "host": "marciogil.github.io",
  "startUrl": "/Mae-Conecta/",
  "themeColor": "#d433ff",
  "backgroundColor": "#ffffff",
  "iconUrl": "https://marciogil.github.io/Mae-Conectada-sempre-empoderada/icons/icon-512x512.png"
}
```

## 🛠️ MÉTODO 2: CAPACITOR (ALTERNATIVO)

### 📦 **Instalação e Setup:**

```bash
# 1. Instalar Capacitor
npm install @capacitor/core @capacitor/android
npm install -g @capacitor/cli

# 2. Inicializar projeto
npx cap init "Mãe Conecta" com.maeconecta.app

# 3. Adicionar plataforma Android
npx cap add android

# 4. Build do PWA
npm run build

# 5. Sincronizar com Capacitor
npx cap sync

# 6. Abrir no Android Studio
npx cap open android
```

## 🏪 **PREPARAÇÃO PARA LOJAS:**

### 📱 **APKPure - Setup Rápido:**
1. Criar conta em: https://apkpure.com/developer
2. Upload do APK + screenshots
3. Preencher metadados
4. Submeter (aprovação: 1-3 dias)

### 🆓 **F-Droid - Setup Open Source:**
1. Fork do repositório no GitHub
2. Adicionar metadados F-Droid
3. Submeter PR: https://gitlab.com/fdroid/rfp
4. Aprovação: 2-4 semanas

### 🛍️ **Amazon Appstore:**
1. Conta: https://developer.amazon.com/
2. Upload APK + assets
3. Teste de compatibilidade
4. Aprovação: 7-14 dias

## 📸 **ASSETS NECESSÁRIOS:**

### **Screenshots (1080x1920px):**
- Tela inicial com Clara
- Emergência GPS ativa
- Módulos educacionais
- Comunidade segura

### **Ícones:**
- 48x48, 72x72, 96x96, 144x144, 192x192, 512x512

### **Descrições:**
- Título: "Mãe Conecta - Empoderamento Digital"
- Resumo: "IA Clara + GPS Emergência + Comunidade Segura"
- Descrição completa: 4000 caracteres

## 🚀 **CRONOGRAMA DE LANÇAMENTO:**

### **Semana 1:**
- ✅ APK gerado via PWA Builder
- ✅ Screenshots profissionais
- ✅ Metadados completos

### **Semana 2:**
- 📤 Submissão APKPure (rápida)
- 📤 Submissão Amazon Appstore
- 📝 Preparação F-Droid

### **Semana 3-4:**
- ✅ APKPure aprovado e online
- 🔄 Amazon em revisão
- 📝 F-Droid em preparação

### **Mês 2:**
- ✅ Todas as lojas ativas
- 📊 Métricas de download
- 🚀 Marketing orgânico

## 🎯 **PRÓXIMO PASSO:**

**ESCOLHA SEU MÉTODO:**
1. **PWA Builder** (mais fácil, online)
2. **Capacitor** (mais controle, local)

Qual prefere? Posso guiar você pelo processo completo! 🚀