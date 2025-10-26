import { Inter } from 'next/font/google'
import './globals.css'
import ClaraTest from '../components/ClaraTest'
import { AccessibilityProvider } from '../contexts/AccessibilityContext'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata = {
  title: '🤱 Mãe Conecta - Plataforma de Apoio e Empoderamento',
  description: 'Plataforma completa de apoio e empoderamento para mães brasileiras',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.variable}>
        <AccessibilityProvider>
          <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
            {children}
            
            {/* Clara - Assistente Virtual Empoderada */}
            <ClaraTest />
            
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