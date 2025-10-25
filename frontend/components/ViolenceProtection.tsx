'use client'

import { useState, useEffect } from 'react'

interface SafetyPlan {
  id: string
  emergencyContacts: string[]
  safeLocations: string[]
  importantDocuments: string[]
  escapeRoute: string
  safetyItems: string[]
  lastUpdated: string
}

interface SafetyTip {
  id: string
  title: string
  description: string
  category: 'prevention' | 'during' | 'after' | 'legal'
  isUrgent: boolean
}

const safetyTips: SafetyTip[] = [
  {
    id: '1',
    title: 'Sinais de Alerta de Relacionamento Abusivo',
    description: 'Controle excessivo, isolamento de amigos/família, ciúmes extremos, humilhações, ameaças, violência física ou sexual.',
    category: 'prevention',
    isUrgent: false
  },
  {
    id: '2',
    title: 'Como Pedir Ajuda Discretamente',
    description: 'Use códigos com pessoas de confiança, mantenha telefone carregado, decore números importantes, use apps de emergência.',
    category: 'during',
    isUrgent: true
  },
  {
    id: '3',
    title: 'Documentação de Evidências',
    description: 'Fotografe lesões, guarde mensagens/áudios ameaçadores, anote datas e horários, procure testemunhas.',
    category: 'legal',
    isUrgent: true
  },
  {
    id: '4',
    title: 'Plano de Segurança para Saída',
    description: 'Tenha bolsa pronta com documentos/dinheiro, identifique locais seguros, combine sinais com vizinhos.',
    category: 'during',
    isUrgent: true
  }
]

export default function ViolenceProtection() {
  const [currentTab, setCurrentTab] = useState<'tips' | 'plan' | 'support' | 'legal'>('tips')
  const [safetyPlan, setSafetyPlan] = useState<SafetyPlan | null>(null)
  const [showEmergencyMode, setShowEmergencyMode] = useState(false)
  const [isDiscreteMode, setIsDiscreteMode] = useState(false)

  // Função para ativar modo de emergência silencioso
  const activateEmergencyMode = () => {
    setShowEmergencyMode(true)
    // Vibrar dispositivo se disponível
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200])
    }
  }

  // Função para enviar localização por WhatsApp
  const sendLocationWhatsApp = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        const message = encodeURIComponent(
          `🚨 EMERGÊNCIA MÃE CONECTA - Preciso de ajuda urgente! Minha localização: https://maps.google.com/?q=${latitude},${longitude}`
        )
        window.open(`https://wa.me/?text=${message}`, '_blank')
      })
    }
  }

  // Função para criar grupo WhatsApp
  const createWhatsAppGroup = () => {
    const groupMessage = encodeURIComponent(
      `🤝 Olá! Você foi convidada para o grupo Mãe Conecta - Rede de Apoio. Um espaço seguro para mães se apoiarem mutuamente. Use este link para entrar: https://chat.whatsapp.com/convite-mae-conecta`
    )
    window.open(`https://wa.me/?text=${groupMessage}`, '_blank')
  }

  if (showEmergencyMode) {
    return (
      <div className="min-h-screen bg-red-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-red-600 text-white p-6 rounded-t-xl text-center">
            <h1 className="text-2xl font-bold">🚨 MODO EMERGÊNCIA SILENCIOSO</h1>
            <p className="mt-2">Escolha a ajuda que precisa</p>
          </div>
          
          <div className="bg-white p-6 rounded-b-xl shadow-lg space-y-4">
            {/* Botões de Emergência Discretos */}
            <button
              onClick={() => window.open('tel:180', '_self')}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-4 px-6 rounded-lg font-bold text-lg"
            >
              📞 Central da Mulher (180)
            </button>
            
            <button
              onClick={() => window.open('tel:190', '_self')}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg"
            >
              🚔 Polícia Militar (190)
            </button>
            
            <button
              onClick={sendLocationWhatsApp}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg font-bold text-lg"
            >
              📱 Enviar Localização WhatsApp
            </button>
            
            <button
              onClick={() => {
                const message = encodeURIComponent('Preciso de ajuda urgente! Por favor me ligue.')
                window.open(`sms:?body=${message}`, '_self')
              }}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-lg font-bold text-lg"
            >
              💬 SMS de Emergência
            </button>

            <button
              onClick={() => setShowEmergencyMode(false)}
              className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium"
            >
              Voltar (Modo Seguro)
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className={`${isDiscreteMode ? 'bg-gray-600' : 'bg-gradient-to-r from-purple-600 to-pink-600'} text-white p-6 rounded-t-xl`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              {isDiscreteMode ? '🔒 Modo Discreto' : '🛡️ Proteção e Segurança'}
            </h1>
            <p className="mt-2 opacity-90">
              {isDiscreteMode ? 'Interface discreta ativada' : 'Sua segurança é nossa prioridade'}
            </p>
          </div>
          <button
            onClick={() => setIsDiscreteMode(!isDiscreteMode)}
            className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm"
          >
            {isDiscreteMode ? '👁️ Mostrar' : '🔒 Discreto'}
          </button>
        </div>
      </div>

      {/* Botão de Emergência Sempre Visível */}
      <div className="bg-red-500 p-4 text-center">
        <button
          onClick={activateEmergencyMode}
          className="bg-red-700 hover:bg-red-800 text-white px-8 py-3 rounded-lg font-bold text-lg shadow-lg"
        >
          🆘 EMERGÊNCIA SILENCIOSA
        </button>
        <p className="text-white text-sm mt-2">Toque para ativação discreta</p>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-x border-gray-200">
        <div className="flex overflow-x-auto">
          {[
            { key: 'tips', label: 'Dicas Segurança', icon: '💡' },
            { key: 'plan', label: 'Plano Proteção', icon: '📋' },
            { key: 'support', label: 'Rede Apoio', icon: '🤝' },
            { key: 'legal', label: 'Ajuda Legal', icon: '⚖️' }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setCurrentTab(tab.key as any)}
              className={`flex-1 min-w-0 px-4 py-3 text-sm font-medium border-b-2 ${
                currentTab === tab.key
                  ? 'border-purple-500 text-purple-600 bg-purple-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="block">{tab.icon}</span>
              <span className="block mt-1">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="bg-white rounded-b-xl border border-t-0 border-gray-200 p-6">
        
        {/* Dicas de Segurança */}
        {currentTab === 'tips' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">💡 Dicas de Segurança</h2>
            
            <div className="grid gap-4">
              {safetyTips.map(tip => (
                <div
                  key={tip.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    tip.isUrgent 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-blue-500 bg-blue-50'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                  <p className="text-gray-700 text-sm">{tip.description}</p>
                  {tip.isUrgent && (
                    <span className="inline-block mt-2 bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                      Urgente
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Plano de Proteção */}
        {currentTab === 'plan' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">📋 Plano de Proteção Pessoal</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">📞 Contatos de Emergência</h3>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Nome e telefone de pessoa de confiança"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Contato adicional"
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                
                <h3 className="font-semibold text-gray-900 mt-6">🏠 Locais Seguros</h3>
                <textarea
                  placeholder="Endereços de casas de amigos, familiares ou abrigos"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows={3}
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">📄 Documentos Importantes</h3>
                <div className="space-y-2">
                  {['RG/CPF', 'Certidão Nascimento', 'Comprovante Residência', 'Carteira Trabalho'].map(doc => (
                    <label key={doc} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{doc}</span>
                    </label>
                  ))}
                </div>
                
                <h3 className="font-semibold text-gray-900 mt-6">💰 Itens de Emergência</h3>
                <div className="space-y-2">
                  {['Dinheiro reserva', 'Medicamentos', 'Roupas básicas', 'Chaves extras'].map(item => (
                    <label key={item} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{item}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium">
              💾 Salvar Plano de Segurança
            </button>
          </div>
        )}

        {/* Rede de Apoio */}
        {currentTab === 'support' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">🤝 Rede de Apoio</h2>
            
            <div className="grid gap-4">
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <h3 className="font-semibold text-green-900 mb-3">📱 Grupo WhatsApp Mãe Conecta</h3>
                <p className="text-green-800 text-sm mb-4">
                  Conecte-se com outras mães em situação similar. Compartilhe experiências, receba apoio e ajude outras mulheres.
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={createWhatsAppGroup}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    📱 Criar Grupo WhatsApp
                  </button>
                  <button
                    onClick={() => {
                      const joinMessage = encodeURIComponent('Olá! Gostaria de participar do grupo Mãe Conecta - Rede de Apoio')
                      window.open(`https://wa.me/5521964949427?text=${joinMessage}`, '_blank')
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
                  >
                    🤝 Solicitar Convite
                  </button>
                </div>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <h3 className="font-semibold text-purple-900 mb-3">👥 Encontros Presenciais</h3>
                <p className="text-purple-800 text-sm mb-4">
                  Participe de encontros seguros e reservados para compartilhar experiências pessoalmente.
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                  📅 Ver Próximos Encontros
                </button>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-900 mb-3">🏠 Casas de Abrigo</h3>
                <p className="text-yellow-800 text-sm mb-4">
                  Informações sobre casas de abrigo e acolhimento temporário em situações de emergência.
                </p>
                <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg font-medium">
                  🗺️ Localizar Abrigos
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Ajuda Legal */}
        {currentTab === 'legal' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">⚖️ Ajuda Legal</h2>
            
            <div className="grid gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">📋 Medida Protetiva</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Solicite medida protetiva de urgência para garantir sua segurança.
                </p>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                  📄 Como Solicitar
                </button>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">🏛️ Defensoria Pública</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Atendimento jurídico gratuito para mulheres em situação de violência.
                </p>
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                  📞 Contatos Defensoria
                </button>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-2">💼 Advogadas Voluntárias</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Rede de advogadas que oferecem atendimento pro bono para casos de violência.
                </p>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                  👩‍💼 Encontrar Advogada
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Números de Emergência Sempre Visíveis */}
      <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="font-medium text-red-900 mb-3">📞 Números de Emergência</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => window.open('tel:180', '_self')}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg text-center"
          >
            <div className="font-bold">180</div>
            <div className="text-xs">Central da Mulher</div>
          </button>
          <button
            onClick={() => window.open('tel:190', '_self')}
            className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg text-center"
          >
            <div className="font-bold">190</div>
            <div className="text-xs">Polícia Militar</div>
          </button>
          <button
            onClick={() => window.open('tel:192', '_self')}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg text-center"
          >
            <div className="font-bold">192</div>
            <div className="text-xs">SAMU</div>
          </button>
          <button
            onClick={() => window.open('tel:193', '_self')}
            className="bg-orange-600 hover:bg-orange-700 text-white p-3 rounded-lg text-center"
          >
            <div className="font-bold">193</div>
            <div className="text-xs">Bombeiros</div>
          </button>
        </div>
      </div>
    </div>
  )
}