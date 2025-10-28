'use client'

import { useEffect, useState } from 'react'
import { useAccessibility } from '../contexts/AccessibilityContext'
import Navigation from '../components/Navigation'
import ComplianceCard from '../components/ComplianceCard'
import QuickActions from '../components/QuickActions'
import { createRoute } from '../utils/routes'
import WelcomeHero from '../components/WelcomeHero'
import AnaLyzSimples from '../components/AnaLyzSimples'

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { announceToScreenReader } = useAccessibility()

  useEffect(() => {
    setMounted(true)
    announceToScreenReader('Bem-vinda ao Mãe Conecta')
  }, [announceToScreenReader])

  if (!mounted) {

    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
      {/* Navegação */}
      <Navigation />
      <WelcomeHero />
  {/* AnaLyzSimples: Assistente Virtual */}
  <AnaLyzSimples />
      {/* Seção Principal */}
      <main className="container-mobile md:container-tablet lg:container-desktop py-8">
        <div>
          <section className="mb-12" aria-labelledby="quick-actions-title">
            <h2 id="quick-actions-title" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">🚀 Ações Rápidas</h2>
            <QuickActions />
          </section>
          <section aria-labelledby="modules-title">
            <h2 id="modules-title" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">💜 Seus Módulos de Empoderamento</h2>
            <div className="grid-responsive">
              <ComplianceCard
                title="🛡 Direitos Sem Medo"
                description="Checklist do BPC, análise de documentos e relatórios automáticos para defensoria"
                href={createRoute('/direitos')}
                icon="🛡"
                color="bg-gradient-to-br from-blue-500 to-blue-600"
                features={["Checklist dinâmico do BPC","IA analisa documentos faltantes","Detecta violações de direitos","Gera relatórios PDF automáticos"]}
              />
              <ComplianceCard
                title="🧠 Conecta-Vagas Turbo"
                    description="IA detecta suas habilidades invisíveis e encontra oportunidades perfeitas"
                    href={createRoute('/trabalho')}
                    icon="🧠"
                    color="bg-gradient-to-br from-green-500 to-green-600"
                    features={["Detector de habilidades com IA","Ajuste automático de currículo","Simulador de entrevistas","Vagas compatíveis com horário escolar"]}
                  />
                  <ComplianceCard
                    title="👩‍👧‍👦 Ninhos de Apoio 2.0"
                    description="Conecte-se com mães que vivem desafios similares aos seus"
                    href={createRoute('/comunidade')}
                    icon="👩‍👧‍👦"
                    color="bg-gradient-to-br from-pink-500 to-pink-600"
                    features={["Match de afinidades","Chat seguro e moderado","Eventos presenciais e online","Mapa com acessibilidade"]}
                  />
                  <ComplianceCard
                    title="📚 Academia da Mãe"
                    description="Cursos rápidos que transformam habilidades em renda"
                    href={createRoute('/cursos')}
                    icon="📚"
                    color="bg-gradient-to-br from-purple-500 to-purple-600"
                    features={["Microcertificações","IA indica melhor ROI","Caminho para MEI","Integração com marketplaces"]}
                  />
                  <ComplianceCard
                    title="🧩 Jornada de Acolhimento"
                    description="Conquiste seus direitos como um jogo, com recompensas reais"
                    href={createRoute('/jornada')}
                    icon="🧩"
                    color="bg-gradient-to-br from-orange-500 to-orange-600"
                    features={["Gamificação: 'Conquiste o CadÚnico'","Sistema de badges","Recompensas reais","Descontos e créditos"]}
                  />
                  <ComplianceCard
                    title="🏥 Saúde da Infância"
                    description="Calendário inteligente para cuidar da saúde do seu filho"
                    href={createRoute('/saude')}
                    icon="🏥"
                    color="bg-gradient-to-br from-teal-500 to-teal-600"
                    features={["Calendário inteligente","Alertas automáticos","Triagem com IA","Lembrete de perícias INSS"]}
                  />
                </div>
              </section>
              <section className="mt-16 py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-soft" aria-labelledby="impact-title">
                <h2 id="impact-title" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">🌟 Nosso Impacto Social</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  <div className="p-4">
                    <div className="text-3xl font-bold text-primary-600 mb-2">1.2K+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Mães Empoderadas</div>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl font-bold text-green-600 mb-2">350+</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Benefícios Conquistados</div>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl font-bold text-blue-600 mb-2">89%</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Taxa de Sucesso</div>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Assistente Clara</div>
                  </div>
                </div>
              </section>
              <section className="mt-16" aria-labelledby="testimonials-title">
                <h2 id="testimonials-title" className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">💬 Histórias de Transformação</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="card">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      "O Mãe Conecta me ajudou a conseguir o BPC do meu filho em apenas 3 meses. A Clara me guiou em cada passo e eu não me senti sozinha."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">M</div>
                      <div className="ml-3">
                        <div className="font-medium">Maria Silva</div>
                        <div className="text-sm text-gray-500">Mãe de João, 8 anos</div>
                      </div>
                    </div>
                  </div>
                  <div className="card">
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      "Encontrei um trabalho home office perfeito através do Conecta-Vagas. Agora posso cuidar da minha filha e ter minha independência financeira."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">A</div>
                      <div className="ml-3">
                        <div className="font-medium">Ana Costa</div>
                        <div className="text-sm text-gray-500">Mãe de Sofia, 5 anos</div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </main>
          {/* Footer */}
          <footer className="bg-gray-900 text-white py-8 mt-16">
            <div className="container-mobile md:container-tablet lg:container-desktop text-center">
              <p className="text-gray-300 mb-4">
                Desenvolvido com 💜 para transformar vidas através da tecnologia
              </p>
              <p className="text-sm text-gray-400">
                Mãe Conecta - Sua jornada de empoderamento começa aqui
              </p>
            </div>
          </footer>
        </div>
      )
}