'use client'

import { useState } from 'react'

interface Document {
  id: string
  name: string
  type: 'birth-certificate' | 'cpf' | 'rg' | 'work-card' | 'medical' | 'school' | 'benefit' | 'other'
  familyMember: string
  dateAdded: string
  expiryDate?: string
  notes: string
  hasPhoto: boolean
  isUrgent: boolean
}

const documentTypes = [
  { key: 'birth-certificate', label: 'Certidão de Nascimento', icon: '📄' },
  { key: 'cpf', label: 'CPF', icon: '🆔' },
  { key: 'rg', label: 'RG / Identidade', icon: '📇' },
  { key: 'work-card', label: 'Carteira de Trabalho', icon: '💼' },
  { key: 'medical', label: 'Documentos Médicos', icon: '🏥' },
  { key: 'school', label: 'Documentos Escolares', icon: '🎓' },
  { key: 'benefit', label: 'Benefícios Sociais', icon: '🤝' },
  { key: 'other', label: 'Outros', icon: '📋' }
]

export default function DocumentCenter() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [selectedType, setSelectedType] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [newDocument, setNewDocument] = useState({
    name: '',
    type: '',
    familyMember: '',
    notes: '',
    expiryDate: '',
    isUrgent: false
  })

  const addDocument = () => {
    if (newDocument.name && newDocument.type && newDocument.familyMember) {
      const document: Document = {
        id: Date.now().toString(),
        name: newDocument.name,
        type: newDocument.type as Document['type'],
        familyMember: newDocument.familyMember,
        dateAdded: new Date().toLocaleDateString('pt-BR'),
        expiryDate: newDocument.expiryDate || undefined,
        notes: newDocument.notes,
        hasPhoto: false,
        isUrgent: newDocument.isUrgent
      }
      setDocuments([...documents, document])
      setNewDocument({ name: '', type: '', familyMember: '', notes: '', expiryDate: '', isUrgent: false })
      setShowAddForm(false)
    }
  }

  const getTypeIcon = (type: string) => {
    const docType = documentTypes.find(dt => dt.key === type)
    return docType ? docType.icon : '📄'
  }

  const getTypeLabel = (type: string) => {
    const docType = documentTypes.find(dt => dt.key === type)
    return docType ? docType.label : 'Documento'
  }

  const isExpiringSoon = (expiryDate?: string) => {
    if (!expiryDate) return false
    const expiry = new Date(expiryDate)
    const today = new Date()
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays <= 30 && diffDays >= 0
  }

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.familyMember.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         getTypeLabel(doc.type).toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = selectedType === '' || doc.type === selectedType
    return matchesSearch && matchesType
  })

  const urgentDocuments = documents.filter(doc => doc.isUrgent || isExpiringSoon(doc.expiryDate))

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-xl">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📁 Centro de Documentos
        </h1>
        <p className="mt-2 opacity-90">Organize e gerencie documentos importantes da família</p>
      </div>

      {/* Urgent Documents Alert */}
      {urgentDocuments.length > 0 && (
        <div className="bg-orange-100 border-l-4 border-orange-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <span className="text-orange-500 text-xl">⚠️</span>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-orange-800">
                Atenção! {urgentDocuments.length} documento(s) requer(em) atenção
              </h3>
              <div className="mt-2 text-sm text-orange-700">
                {urgentDocuments.map(doc => (
                  <div key={doc.id} className="mb-1">
                    • {doc.name} ({doc.familyMember})
                    {isExpiringSoon(doc.expiryDate) && " - Vence em breve"}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="bg-white p-6 border-x border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 mb-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar documentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Todos os tipos</option>
            {documentTypes.map(type => (
              <option key={type.key} value={type.key}>
                {type.icon} {type.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium whitespace-nowrap"
          >
            + Adicionar
          </button>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <button className="bg-green-100 hover:bg-green-200 text-green-800 p-3 rounded-lg text-sm font-medium">
            📸 Tirar Foto
          </button>
          <button className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 p-3 rounded-lg text-sm font-medium">
            📤 Compartilhar
          </button>
          <button className="bg-purple-100 hover:bg-purple-200 text-purple-800 p-3 rounded-lg text-sm font-medium">
            📊 Relatório
          </button>
          <button className="bg-red-100 hover:bg-red-200 text-red-800 p-3 rounded-lg text-sm font-medium">
            🗓️ Lembretes
          </button>
        </div>
      </div>

      {/* Add Document Form */}
      {showAddForm && (
        <div className="bg-gray-50 p-6 border-x border-gray-200">
          <h3 className="text-lg font-semibold mb-4">Adicionar Novo Documento</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nome do documento"
              value={newDocument.name}
              onChange={(e) => setNewDocument({...newDocument, name: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newDocument.type}
              onChange={(e) => setNewDocument({...newDocument, type: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Selecione o tipo</option>
              {documentTypes.map(type => (
                <option key={type.key} value={type.key}>
                  {type.icon} {type.label}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Membro da família"
              value={newDocument.familyMember}
              onChange={(e) => setNewDocument({...newDocument, familyMember: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              placeholder="Data de validade (opcional)"
              value={newDocument.expiryDate}
              onChange={(e) => setNewDocument({...newDocument, expiryDate: e.target.value})}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <textarea
            placeholder="Observações (opcional)"
            value={newDocument.notes}
            onChange={(e) => setNewDocument({...newDocument, notes: e.target.value})}
            className="w-full mt-3 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            rows={2}
          />
          <div className="flex items-center mt-3">
            <input
              type="checkbox"
              id="urgent"
              checked={newDocument.isUrgent}
              onChange={(e) => setNewDocument({...newDocument, isUrgent: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="urgent" className="text-sm text-gray-700">Marcar como urgente</label>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={addDocument}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Salvar
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Documents List */}
      <div className="bg-white rounded-b-xl border border-t-0 border-gray-200 overflow-hidden">
        {filteredDocuments.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <div className="text-4xl mb-4">📄</div>
            <h3 className="text-lg font-medium mb-2">Nenhum documento encontrado</h3>
            <p>Comece adicionando seus primeiros documentos importantes.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{getTypeIcon(doc.type)}</div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{doc.name}</h4>
                      <p className="text-sm text-gray-600">{getTypeLabel(doc.type)}</p>
                      <p className="text-sm text-gray-500">👤 {doc.familyMember}</p>
                      {doc.notes && (
                        <p className="text-sm text-gray-600 mt-1">📝 {doc.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Adicionado em {doc.dateAdded}</div>
                    {doc.expiryDate && (
                      <div className={`text-xs mt-1 ${isExpiringSoon(doc.expiryDate) ? 'text-red-600 font-medium' : 'text-gray-500'}`}>
                        Validade: {new Date(doc.expiryDate).toLocaleDateString('pt-BR')}
                      </div>
                    )}
                    {doc.isUrgent && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                        Urgente
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">💡 Dicas importantes:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Mantenha fotos dos documentos em local seguro</li>
          <li>• Configure lembretes para renovação de documentos com validade</li>
          <li>• Use a busca para encontrar rapidamente documentos específicos</li>
          <li>• Marque como urgente documentos que precisam de atenção imediata</li>
        </ul>
      </div>
    </div>
  )
}