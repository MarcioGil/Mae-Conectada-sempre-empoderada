'use client'

import { useState, useEffect } from 'react'

interface Message {
  id: string
  author: string
  content: string
  timestamp: string
  category: 'question' | 'support' | 'resource' | 'emergency'
  isAnonymous: boolean
  likes: number
  replies: Reply[]
  tags: string[]
}

interface Reply {
  id: string
  author: string
  content: string
  timestamp: string
  isAnonymous: boolean
  likes: number
}

interface ChatRoom {
  id: string
  name: string
  description: string
  category: string
  icon: string
  memberCount: number
  isActive: boolean
}

const chatRooms: ChatRoom[] = [
  {
    id: '1',
    name: 'Apoio Mútuo',
    description: 'Compartilhe experiências e receba apoio da comunidade',
    category: 'support',
    icon: '🤝',
    memberCount: 127,
    isActive: true
  },
  {
    id: '2',
    name: 'Direitos da Mulher',
    description: 'Esclareça dúvidas sobre direitos legais e proteção',
    category: 'rights',
    icon: '⚖️',
    memberCount: 89,
    isActive: true
  },
  {
    id: '3',
    name: 'Cuidados Infantis',
    description: 'Dicas de maternidade, saúde e educação infantil',
    category: 'childcare',
    icon: '👶',
    memberCount: 156,
    isActive: true
  },
  {
    id: '4',
    name: 'Oportunidades de Trabalho',
    description: 'Compartilhe vagas e oportunidades de capacitação',
    category: 'work',
    icon: '💼',
    memberCount: 73,
    isActive: true
  },
  {
    id: '5',
    name: 'Emergências',
    description: 'Canal para situações urgentes e pedidos de ajuda',
    category: 'emergency',
    icon: '🚨',
    memberCount: 45,
    isActive: true
  }
]

const sampleMessages: Message[] = [
  {
    id: '1',
    author: 'Maria S.',
    content: 'Gostaria de saber como posso solicitar a pensão alimentícia para meu filho. Alguém já passou por isso?',
    timestamp: '2024-01-15 14:30',
    category: 'question',
    isAnonymous: false,
    likes: 3,
    replies: [
      {
        id: '1-1',
        author: 'Ana L.',
        content: 'Você pode procurar a Defensoria Pública ou um advogado particular. É importante ter a certidão de nascimento da criança e comprovantes de renda do pai.',
        timestamp: '2024-01-15 15:45',
        isAnonymous: false,
        likes: 5
      },
      {
        id: '1-2',
        author: 'Usuária Anônima',
        content: 'Eu consegui através da Defensoria Pública. Foi gratuito e me ajudaram muito. Demora um pouco, mas vale a pena.',
        timestamp: '2024-01-15 16:20',
        isAnonymous: true,
        likes: 2
      }
    ],
    tags: ['pensao-alimenticia', 'direitos', 'filhos']
  },
  {
    id: '2',
    author: 'Usuária Anônima',
    content: 'Estou em situação de violência doméstica e preciso de ajuda urgente. Tenho medo de denunciar.',
    timestamp: '2024-01-15 10:15',
    category: 'emergency',
    isAnonymous: true,
    likes: 0,
    replies: [
      {
        id: '2-1',
        author: 'Moderadora Clara',
        content: 'Você não está sozinha. Entre em contato comigo pelo privado. Posso te ajudar com informações sobre casas de abrigo e orientação jurídica. Sua segurança é prioridade.',
        timestamp: '2024-01-15 10:20',
        isAnonymous: false,
        likes: 8
      }
    ],
    tags: ['violencia-domestica', 'emergencia', 'apoio']
  },
  {
    id: '3',
    author: 'Carla M.',
    content: 'Descobri uma oportunidade de curso gratuito de informática básica na Casa da Mulher. Compartilho o link nos comentários!',
    timestamp: '2024-01-14 09:00',
    category: 'resource',
    isAnonymous: false,
    likes: 12,
    replies: [],
    tags: ['curso', 'capacitacao', 'gratuito']
  }
]

export default function CommunityChat() {
  const [selectedRoom, setSelectedRoom] = useState<ChatRoom | null>(null)
  const [messages, setMessages] = useState<Message[]>(sampleMessages)
  const [newMessage, setNewMessage] = useState('')
  const [messageCategory, setMessageCategory] = useState<Message['category']>('question')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [showMessageForm, setShowMessageForm] = useState(false)
  const [currentUser] = useState('Usuária Atual')

  const addMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        author: isAnonymous ? 'Usuária Anônima' : currentUser,
        content: newMessage,
        timestamp: new Date().toLocaleString('pt-BR'),
        category: messageCategory,
        isAnonymous,
        likes: 0,
        replies: [],
        tags: []
      }
      setMessages([message, ...messages])
      setNewMessage('')
      setShowMessageForm(false)
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'question': return 'bg-blue-100 text-blue-800'
      case 'support': return 'bg-green-100 text-green-800'
      case 'resource': return 'bg-purple-100 text-purple-800'
      case 'emergency': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'question': return 'Pergunta'
      case 'support': return 'Apoio'
      case 'resource': return 'Recurso'
      case 'emergency': return 'Emergência'
      default: return 'Mensagem'
    }
  }

  if (selectedRoom) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Room Header */}
          <div className="bg-gradient-to-r from-pink-600 to-pink-800 text-white p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedRoom(null)}
                className="text-white hover:text-pink-200 text-xl"
              >
                ← Voltar
              </button>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                <span className="text-sm">{selectedRoom.memberCount} membros online</span>
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{selectedRoom.icon}</span>
                <div>
                  <h1 className="text-2xl font-bold">{selectedRoom.name}</h1>
                  <p className="opacity-90">{selectedRoom.description}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Message Form */}
          <div className="p-4 border-b border-gray-200">
            {showMessageForm ? (
              <div className="space-y-4">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Compartilhe sua mensagem com a comunidade..."
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  rows={3}
                />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <select
                      value={messageCategory}
                      onChange={(e) => setMessageCategory(e.target.value as Message['category'])}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                    >
                      <option value="question">❓ Pergunta</option>
                      <option value="support">🤝 Apoio</option>
                      <option value="resource">📚 Recurso</option>
                      <option value="emergency">🚨 Emergência</option>
                    </select>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="rounded"
                      />
                      <span className="text-sm text-gray-600">Postar anonimamente</span>
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowMessageForm(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={addMessage}
                      className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-lg font-medium"
                    >
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowMessageForm(true)}
                className="w-full p-3 text-left text-gray-500 border border-gray-300 rounded-lg hover:border-pink-500 focus:ring-2 focus:ring-pink-500"
              >
                Compartilhe sua experiência ou faça uma pergunta...
              </button>
            )}
          </div>

          {/* Messages */}
          <div className="max-h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-gray-500">
                <div className="text-4xl mb-4">💬</div>
                <h3 className="text-lg font-medium mb-2">Seja a primeira a compartilhar!</h3>
                <p>Inicie uma conversa ou faça uma pergunta para a comunidade.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {messages.map((message) => (
                  <div key={message.id} className="p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                        {message.isAnonymous ? '?' : message.author.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">
                            {message.author}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(message.category)}`}>
                            {getCategoryLabel(message.category)}
                          </span>
                          <span className="text-sm text-gray-500">{message.timestamp}</span>
                        </div>
                        <p className="text-gray-800 mb-2">{message.content}</p>
                        
                        {message.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {message.tags.map(tag => (
                              <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <button className="flex items-center gap-1 hover:text-pink-600">
                            <span>👍</span>
                            <span>{message.likes}</span>
                          </button>
                          <button className="hover:text-pink-600">
                            💬 Responder
                          </button>
                          <button className="hover:text-pink-600">
                            📤 Compartilhar
                          </button>
                        </div>

                        {/* Replies */}
                        {message.replies.length > 0 && (
                          <div className="mt-3 ml-4 border-l-2 border-gray-200 pl-4">
                            {message.replies.map((reply) => (
                              <div key={reply.id} className="mb-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    {reply.isAnonymous ? '?' : reply.author.charAt(0)}
                                  </div>
                                  <span className="font-medium text-sm text-gray-900">
                                    {reply.author}
                                  </span>
                                  <span className="text-xs text-gray-500">{reply.timestamp}</span>
                                </div>
                                <p className="text-sm text-gray-700 mb-1">{reply.content}</p>
                                <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-pink-600">
                                  <span>👍</span>
                                  <span>{reply.likes}</span>
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h4 className="font-medium text-yellow-900 mb-2">📋 Diretrizes da Comunidade</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Seja respeitosa e acolhedora com todas as participantes</li>
            <li>• Mantenha a privacidade e segurança da comunidade</li>
            <li>• Não compartilhe informações pessoais públicamente</li>
            <li>• Use a opção anônima para assuntos sensíveis</li>
            <li>• Em emergências, procure ajuda imediata (190, 192, 180)</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-600 to-pink-800 text-white p-6 rounded-t-xl">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          💬 Comunidade Mãe Conecta
        </h1>
        <p className="mt-2 opacity-90">Conecte-se, compartilhe e apoie outras mulheres</p>
      </div>

      {/* Stats */}
      <div className="bg-white p-6 border-x border-gray-200">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-pink-600">127</div>
            <div className="text-sm text-gray-600">Membros Online</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-600">45</div>
            <div className="text-sm text-gray-600">Mensagens Hoje</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-600">12</div>
            <div className="text-sm text-gray-600">Perguntas Respondidas</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-pink-600">8</div>
            <div className="text-sm text-gray-600">Recursos Compartilhados</div>
          </div>
        </div>
      </div>

      {/* Chat Rooms */}
      <div className="bg-white rounded-b-xl border border-t-0 border-gray-200 p-6">
        <h2 className="text-lg font-semibold mb-4">🏠 Salas de Conversa</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {chatRooms.map((room) => (
            <button
              key={room.id}
              onClick={() => setSelectedRoom(room)}
              className="p-4 border border-gray-200 rounded-lg hover:shadow-lg transition-all text-left hover:border-pink-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{room.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{room.name}</h3>
                    <p className="text-sm text-gray-600">{room.description}</p>
                  </div>
                </div>
                {room.isActive && (
                  <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                )}
              </div>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>👥 {room.memberCount} membros</span>
                <span className="text-pink-600 font-medium">Entrar →</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-6 bg-pink-50 border border-pink-200 rounded-lg p-4">
        <h4 className="font-medium text-pink-900 mb-3">🔥 Atividade Recente</h4>
        <div className="space-y-2">
          <div className="text-sm text-pink-800">
            • <strong>Maria S.</strong> fez uma pergunta sobre pensão alimentícia
          </div>
          <div className="text-sm text-pink-800">
            • <strong>Carla M.</strong> compartilhou um recurso sobre curso gratuito
          </div>
          <div className="text-sm text-pink-800">
            • <strong>Ana L.</strong> respondeu uma pergunta na sala "Direitos da Mulher"
          </div>
        </div>
      </div>
    </div>
  )
}