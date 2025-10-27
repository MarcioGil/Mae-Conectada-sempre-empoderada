# 🤖 SCRIPT DE AUTOMAÇÃO TOTAL - GERAR APK

## 🚀 Execute este script no PowerShell:

```powershell
# MAE CONECTA - GERAÇÃO APK AUTOMATIZADA
Write-Host "🚀 INICIANDO GERAÇÃO APK MÃE CONECTA..." -ForegroundColor Green

# 1. Navegar para frontend
cd "C:\Projeto-mae-conecta\Mae-Conecta\frontend"

# 2. Instalar Capacitor
Write-Host "📦 Instalando Capacitor..." -ForegroundColor Yellow
npm install -g @capacitor/cli
npm install @capacitor/core @capacitor/android --save

# 3. Build do projeto
Write-Host "🔨 Fazendo build do projeto..." -ForegroundColor Yellow
npm run build

# 4. Inicializar Capacitor
Write-Host "⚡ Configurando app mobile..." -ForegroundColor Yellow
npx cap init "Mae Conecta" com.maeconecta.app --web-dir=out

# 5. Adicionar plataforma Android
Write-Host "📱 Adicionando plataforma Android..." -ForegroundColor Yellow
npx cap add android

# 6. Sincronizar arquivos
Write-Host "🔄 Sincronizando arquivos..." -ForegroundColor Yellow
npx cap sync

Write-Host "✅ PRONTO! Agora execute:" -ForegroundColor Green
Write-Host "npx cap open android" -ForegroundColor Cyan
Write-Host "No Android Studio: Build > Generate Signed Bundle/APK" -ForegroundColor Cyan
```

## 📋 DADOS PARA COPIAR/COLAR:

### **📱 APKPURE SUBMISSION:**
```
App Name: Mãe Conecta - Empoderamento Digital
Package Name: com.maeconecta.app
Version: 1.0.0
Category: Lifestyle
Short Description: IA Clara + GPS Emergência + Comunidade Segura
Long Description: Plataforma completa de apoio e empoderamento para mães brasileiras com assistente IA Clara, sistema GPS de emergência, módulos educacionais e comunidade segura. 100% gratuito e seguro!
Tags: empoderamento feminino, mães brasileiras, assistente virtual, emergência GPS, direitos da mulher
Developer: Mãe Conecta Team
Email: [SEU EMAIL]
Website: https://marciogil.github.io/Mae-Conecta/
```

### **🛍️ AMAZON APPSTORE:**
```
Content Rating: Everyone
Target Audience: Women, Mothers, Brazilian Portuguese speakers
Privacy Policy: https://marciogil.github.io/Mae-Conecta/privacy
Support Email: [SEU EMAIL]
Languages: Portuguese (Brazil)
```

### **🆓 F-DROID REQUEST:**
```
Title: Add Mãe Conecta to F-Droid
Repository: https://github.com/MarcioGil/Mae-Conecta
License: MIT
Summary: Digital empowerment platform for Brazilian mothers
Description: Complete support and empowerment platform for Brazilian mothers with AI assistant Clara, GPS emergency system, educational modules and safe community. 100% free and open source!
Categories: Education, Internet
Build: Yes (Next.js static export)
```

## ⚡ EXECUÇÃO RÁPIDA:

### **OPÇÃO 1: SCRIPT AUTOMÁTICO (RECOMENDADO)**
1. Copie o script PowerShell acima
2. Cole no PowerShell como Administrator
3. Aguarde 5-10 minutos
4. Execute: `npx cap open android`
5. No Android Studio: Build > Generate Signed Bundle/APK

### **OPÇÃO 2: MANUAL SIMPLES**
1. `cd frontend`
2. `npm install @capacitor/core @capacitor/android --save`
3. `npx cap init "Mae Conecta" com.maeconecta.app --web-dir=out`
4. `npx cap add android`
5. `npx cap sync`
6. `npx cap open android`

## 🎯 RESULTADO:
- APK gerado localmente
- Todos os dados prontos para copiar
- Templates para todas as lojas
- Processo reduzido para 10 minutos

**🚀 Quer que eu crie mais algum script específico?**