'use client'

import { useState } from 'react'

interface NavItem {
  id: string
  title: string
  description: string
  icon: string
  color: string
  priority: 'high' | 'medium' | 'low'
  category: 'safety' | 'community' | 'resources' | 'documents' | 'education'
}

const navigationItems: NavItem[] = [
  {
    id: 'emergency',
    title: 'Emergência',
    description: 'Ajuda imediata e discreta',
    icon: '🆘',
    color: 'bg-red-500 hover:bg-red-600',
    priority: 'high',
    category: 'safety'
  },
  {
    id: 'protection',
    title: 'Proteção',
    description: 'Contra violência masculina',
    icon: '🛡️',
    color: 'bg-purple-500 hover:bg-purple-600',
    priority: 'high',
    category: 'safety'
  },
  {
    id: 'whatsapp',
    title: 'Grupo WhatsApp',
    description: 'Conecte com outras mães',
    icon: '📱',
    color: 'bg-green-500 hover:bg-green-600',
    priority: 'high',
    category: 'community'
  },
  {
    id: 'documents',
    title: 'Documentos',
    description: 'Organize papéis importantes',
    icon: '📄',
    color: 'bg-blue-500 hover:bg-blue-600',
    priority: 'medium',
    category: 'documents'
  },
  {
    id: 'education',
    title: 'Educação',
    description: 'Estudos e crescimento',
    icon: '🎓',
    color: 'bg-purple-500 hover:bg-purple-600',
    priority: 'medium',
    category: 'education'
  },
  {
    id: 'education',
    title: 'Aprenda',
    description: 'Seus direitos e recursos',
    icon: '📚',
    color: 'bg-indigo-500 hover:bg-indigo-600',
    priority: 'medium',
    category: 'resources'
  },
  {
    id: 'voice',
    title: 'Clara (Voz)',
    description: 'Assistente por comando de voz',
    icon: '🎤',
    color: 'bg-pink-500 hover:bg-pink-600',
    priority: 'medium',
    category: 'resources'
  }
]

interface EasyNavigationProps {
  onNavigate: (section: string) => void
}

export default function EasyNavigation({ onNavigate }: EasyNavigationProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showHelp, setShowHelp] = useState(false)

  const categories = [
    { key: 'all', label: 'Todos', icon: '🏠' },
    { key: 'safety', label: 'Segurança', icon: '🚨' },
    { key: 'community', label: 'Comunidade', icon: '👥' },
    { key: 'resources', label: 'Recursos', icon: '📚' },
    { key: 'documents', label: 'Documentos', icon: '📋' },
    { key: 'education', label: 'Educação', icon: '🎓' }
  ]

  const filteredItems = navigationItems.filter(item => 
    selectedCategory === 'all' || item.category === selectedCategory
  )

  const priorityOrder = { high: 0, medium: 1, low: 2 }
  const sortedItems = filteredItems.sort((a, b) => 
    priorityOrder[a.priority] - priorityOrder[b.priority]
  )

  const handleNavigation = (itemId: string) => {
    switch (itemId) {
      case 'emergency':
        // Ativar modo emergência
        document.dispatchEvent(new CustomEvent('activateEmergency'))
        break
      case 'protection':
        onNavigate('protection')
        break
      case 'whatsapp':
        // Abrir WhatsApp com mensagem para grupo
        const groupMessage = encodeURIComponent(
          '🤝 Olá! Gostaria de participar do grupo Mãe Conecta - Rede de Apoio'
        )
        window.open(`https://wa.me/5521964949427?text=${groupMessage}`, '_blank')
        break
      case 'documents':
        onNavigate('documents')
        break
      case 'education':
        onNavigate('education')
        break
      case 'voice':
        // Ativar assistente de voz
        document.dispatchEvent(new CustomEvent('activateVoice'))
        break
      default:
        onNavigate(itemId)
    }
  }

  const createWhatsAppGroup = () => {
    const adminMessage = encodeURIComponent(`
🤝 *MAE CONECTA - REDE DE APOIO*

Olá! Você está criando um grupo de apoio para mães. 

*REGRAS IMPORTANTES:*
• Respeito e acolhimento sempre
• Confidencialidade total 
• Apoio mútuo
• Segurança em primeiro lugar

Para emergências:
• 180 - Central da Mulher
• 190 - Polícia
• 192 - SAMU

Vamos nos apoiar! 💜
    `)
    
    window.open(`https://wa.me/?text=${adminMessage}`, '_blank')
  }

  if (showHelp) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">❓ Como usar o app</h2>
          <button
            onClick={() => setShowHelp(false)}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
            <h3 className="font-semibold text-red-900 mb-2">🆘 Emergência</h3>
            <p className="text-red-800 text-sm">
              Em situação de perigo, toque no botão vermelho "Emergência" para acesso rápido a ajuda.
              O modo é discreto e não emite sons que possam te colocar em risco.
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border-l-4 border-purple-500">
            <h3 className="font-semibold text-purple-900 mb-2">🛡️ Proteção</h3>
            <p className="text-purple-800 text-sm">
              Acesse dicas de segurança, planos de proteção e informações sobre como se proteger
              de relacionamentos abusivos.
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
            <h3 className="font-semibold text-green-900 mb-2">📱 Grupo WhatsApp</h3>
            <p className="text-green-800 text-sm">
              Conecte-se com outras mães em situação similar. Compartilhe experiências e receba apoio.
              É um espaço seguro e confidencial.
            </p>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
            <h3 className="font-semibold text-blue-900 mb-2">📄 Documentos</h3>
            <p className="text-blue-800 text-sm">
              Organize seus documentos importantes e da família. Tenha tudo em um lugar seguro
              e receba lembretes de renovação.
            </p>
          </div>

          <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-500">
            <h3 className="font-semibold text-indigo-900 mb-2">📚 Aprenda</h3>
            <p className="text-indigo-800 text-sm">
              Acesse guias sobre seus direitos, benefícios sociais, cuidados de saúde e muito mais.
              Conhecimento é empoderamento!
            </p>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg border-l-4 border-pink-500">
            <h3 className="font-semibold text-pink-900 mb-2">🎤 Clara (Voz)</h3>
            <p className="text-pink-800 text-sm">
              Use comandos de voz para navegar no app. Diga "direitos", "trabalho" ou "cursos"
              para a assistente Clara te ajudar.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
          <h4 className="font-semibold text-yellow-900 mb-2">💡 Dica Important</h4>
          <p className="text-yellow-800 text-sm">
            Se você está em situação de risco, use sempre o modo discreto. 
            Mantenha o app facilmente acessível e memorize os números de emergência.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">🏠 Mãe Conecta</h1>
            <p className="mt-1 opacity-90">Sua rede de apoio e proteção</p>
          </div>
          <button
            onClick={() => setShowHelp(true)}
            className="bg-white/20 hover:bg-white/30 px-3 py-2 rounded-lg text-sm font-medium"
          >
            ❓ Ajuda
          </button>
        </div>
      </div>

      {/* Emergency Alert */}
      <div className="bg-red-500 text-white p-3 text-center">
        <p className="text-sm font-medium">
          🆘 Em emergência? Toque no botão vermelho abaixo para ajuda discreta
        </p>
      </div>

      {/* Category Filter */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex overflow-x-auto gap-2 pb-2">
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.key
                  ? 'bg-purple-100 text-purple-800 border-2 border-purple-300'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Grid */}
      <div className="p-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {sortedItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              className={`${item.color} text-white p-4 rounded-xl shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500`}
            >
              <div className="text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="font-bold text-sm mb-1">{item.title}</div>
                <div className="text-xs opacity-90 leading-tight">{item.description}</div>
                {item.priority === 'high' && (
                  <div className="mt-2">
                    <span className="inline-block bg-white/20 px-2 py-1 rounded-full text-xs font-medium">
                      Prioridade
                    </span>
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <h3 className="font-semibold text-gray-900 mb-4">⚡ Ações Rápidas</h3>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={createWhatsAppGroup}
            className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg text-sm font-medium"
          >
            🗣️ Criar Grupo WhatsApp
          </button>
          <button
            onClick={() => {
              const sosMessage = encodeURIComponent('🆘 Preciso de ajuda! Esta é uma mensagem de emergência do app Mãe Conecta.')
              window.open(`sms:?body=${sosMessage}`, '_self')
            }}
            className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg text-sm font-medium"
          >
            📞 SMS Emergência
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-purple-50 border-t border-purple-200">
        <div className="text-center">
          <p className="text-sm text-purple-800 font-medium mb-2">
            💜 Você não está sozinha
          </p>
          <div className="flex justify-center space-x-4 text-xs text-purple-600">
            <span>180 - Central da Mulher</span>
            <span>190 - Polícia</span>
            <span>192 - SAMU</span>
          </div>
        </div>
      </div>
    </div>
  )
}