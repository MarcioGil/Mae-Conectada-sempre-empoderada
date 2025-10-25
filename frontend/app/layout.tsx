'use client'

import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import './globals.css'
import VoiceAssistant from '../components/VoiceAssistant'
import AccessibilityPanel from '../components/AccessibilityPanel'
import { AccessibilityProvider } from '../contexts/AccessibilityContext'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <html lang="pt-BR" className={inter.variable}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#d433ff" />
        <meta name="description" content="Plataforma de apoio e empoderamento para mães e cuidadores. Acesse seus direitos, encontre oportunidades e conecte-se com uma comunidade que te entende." />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        
        {/* Acessibilidade */}
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        
        {/* SEO */}
        <meta property="og:title" content="Mãe Conecta - Empoderamento através da tecnologia" />
        <meta property="og:description" content="Plataforma de apoio para mães e cuidadores com recursos de voz, assistência inteligente e comunidade inclusiva." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maeconecta.com.br" />
        <meta property="og:image" content="/images/og-image.png" />
        
        <title>Mãe Conecta - Sua jornada de empoderamento começa aqui</title>
      </head>
      <body className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans antialiased">
        <AccessibilityProvider>
          {/* Skip to main content - Acessibilidade */}
          <a 
            href="#main-content" 
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50 focus-visible"
          >
            Pular para o conteúdo principal
          </a>
          
          {/* Painel de Acessibilidade */}
          <AccessibilityPanel />
          
          {/* Conteúdo Principal */}
          <div id="app-container" className="min-h-screen flex flex-col">
            <main id="main-content" className="flex-1" role="main">
              {children}
            </main>
            
            {/* Assistente de Voz - Sempre acessível */}
            <VoiceAssistant />
          </div>
          
          {/* Anúncios para screen readers */}
          <div 
            id="announcements" 
            role="status" 
            aria-live="polite" 
            aria-atomic="true" 
            className="sr-only"
          />
          
          {/* Alerts urgentes para screen readers */}
          <div 
            id="alerts" 
            role="alert" 
            aria-live="assertive" 
            aria-atomic="true" 
            className="sr-only"
          />
        </AccessibilityProvider>
      </body>
    </html>
  )
}