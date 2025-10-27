import { Inter } from 'next/font/google'
import './globals.css'
import ClientWrapper from '../components/ClientWrapper'
import { AccessibilityProvider } from '../contexts/AccessibilityContext'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata = {
  title: 'Mãe Conecta - Empoderamento Digital para Mães Brasileiras',
  description: 'Plataforma completa de apoio e empoderamento para mães brasileiras com IA Clara, GPS de emergência e comunidade segura. 100% gratuito!',
  manifest: '/Mae-Conecta/manifest.json',
  icons: {
    icon: '/Mae-Conecta/icons/icon-192x192.png',
    apple: '/Mae-Conecta/icons/icon-192x192.png',
  },
}

export const viewport = {
  themeColor: '#d433ff',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  viewportFit: 'cover'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="manifest" href="/Mae-Conecta/manifest.json" />
        <meta name="theme-color" content="#d433ff" />
        <meta name="background-color" content="#ffffff" />
        <meta name="display" content="standalone" />
        <meta name="orientation" content="portrait" />
        <link rel="icon" href="/Mae-Conecta/icons/icon-192x192.png" />
        <link rel="apple-touch-icon" href="/Mae-Conecta/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Mãe Conecta" />
      </head>
      <body className={inter.variable}>
        <AccessibilityProvider>
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
            {children}
            
            <ClientWrapper />
            
            {/* Alert para screen readers */}
            <div 
              id="alerts" 
              role="alert" 
              aria-live="assertive" 
              aria-atomic="true" 
              className="sr-only"
            />
          </div>
        </AccessibilityProvider>
      </body>
    </html>
  )
}