'use client'

import { useState } from 'react'

interface EducationalResource {
  id: string
  title: string
  category: 'rights' | 'health' | 'education' | 'work' | 'benefits' | 'legal' | 'childcare'
  type: 'article' | 'video' | 'checklist' | 'form' | 'guide'
  description: string
  content: string
  difficulty: 'basic' | 'intermediate' | 'advanced'
  estimatedTime: string
  tags: string[]
  isFavorite: boolean
  views: number
}

const categories = [
  { key: 'rights', label: 'Direitos da Mulher', icon: '⚖️' },
  { key: 'health', label: 'Saúde da Família', icon: '🏥' },
  { key: 'education', label: 'Educação', icon: '📚' },
  { key: 'work', label: 'Trabalho e Emprego', icon: '💼' },
  { key: 'benefits', label: 'Benefícios Sociais', icon: '🤝' },
  { key: 'legal', label: 'Orientação Jurídica', icon: '📋' },
  { key: 'childcare', label: 'Cuidados Infantis', icon: '👶' }
]

const sampleResources: EducationalResource[] = [
  {
    id: '1',
    title: 'Como Registrar Boletim de Ocorrência',
    category: 'legal',
    type: 'guide',
    description: 'Passo a passo para registrar um B.O. em casos de violência doméstica',
    content: `
## Como Registrar um Boletim de Ocorrência

### Quando registrar:
- Violência física ou psicológica
- Ameaças
- Perturbação do sossego
- Descumprimento de medida protetiva

### Onde registrar:
1. **Delegacia da Mulher** (preferencial)
2. **Delegacia comum** (24h)
3. **Online** (em alguns estados)

### Documentos necessários:
- RG ou CPF
- Comprovante de residência
- Fotos de lesões (se houver)
- Laudos médicos (se houver)
- Prints de mensagens/áudios

### Passo a passo:
1. Vá à delegacia mais próxima
2. Relate os fatos com detalhes
3. Forneça dados do agressor
4. Solicite cópia do B.O.
5. Guarde o número do protocolo

### Importante:
- Não é necessário advogado
- É gratuito
- Pode ser feito a qualquer hora
- Leve testemunhas se possível
    `,
    difficulty: 'basic',
    estimatedTime: '10 min',
    tags: ['violência', 'delegacia', 'direitos', 'segurança'],
    isFavorite: false,
    views: 234
  },
  {
    id: '2',
    title: 'Auxílio Brasil - Como Se Cadastrar',
    category: 'benefits',
    type: 'checklist',
    description: 'Lista completa de documentos e procedimentos para o Auxílio Brasil',
    content: `
## Cadastro Auxílio Brasil - Checklist

### ✅ Documentos Obrigatórios:
- [ ] CPF do responsável familiar
- [ ] RG ou CNH do responsável
- [ ] Certidão de nascimento ou casamento
- [ ] Comprovante de residência (até 3 meses)
- [ ] Carteira de trabalho
- [ ] Comprovante de renda (se houver)

### ✅ Documentos dos Filhos:
- [ ] Certidão de nascimento
- [ ] CPF (acima de 12 anos)
- [ ] Cartão de vacinação atualizado
- [ ] Declaração escolar

### ✅ Onde Fazer:
- [ ] CRAS mais próximo
- [ ] Postos de atendimento
- [ ] Através do app Auxílio Brasil

### ✅ Critérios:
- [ ] Renda familiar até R$ 210 por pessoa
- [ ] Estar inscrito no CadÚnico
- [ ] Dados atualizados nos últimos 2 anos

### ✅ Compromissos:
- [ ] Manter crianças na escola
- [ ] Acompanhar vacinação
- [ ] Fazer pré-natal (gestantes)
- [ ] Atualizar dados quando necessário
    `,
    difficulty: 'basic',
    estimatedTime: '15 min',
    tags: ['auxílio', 'benefício', 'cadastro', 'renda'],
    isFavorite: true,
    views: 456
  },
  {
    id: '3',
    title: 'Primeiros Socorros para Crianças',
    category: 'health',
    type: 'guide',
    description: 'Procedimentos básicos de emergência para acidentes infantis',
    content: `
## Primeiros Socorros - Crianças

### 🚨 Emergências - Ligue 192 (SAMU)

### Engasgo:
1. **Bebê (até 1 ano):**
   - Vire de bruços no seu antebraço
   - 5 pancadas nas costas entre as omoplatas
   - Vire e faça 5 compressões no peito

2. **Criança (acima 1 ano):**
   - Fique atrás da criança
   - Manobra de Heimlich
   - Compressão no abdômen para cima

### Febre Alta:
- Medir temperatura
- Banho morno
- Roupas leves
- Muito líquido
- Medicação conforme orientação médica
- Procurar médico se persistir

### Quedas:
- Manter calma
- Não mover se suspeita de fratura
- Aplicar gelo em hematomas
- Observar sinais de concussão
- Procurar atendimento se necessário

### Queimaduras:
- Água fria corrente por 10-15 min
- Não usar pasta de dente ou manteiga
- Não estourar bolhas
- Procurar atendimento médico

### Kit Primeiros Socorros:
- Termômetro
- Soro fisiológico
- Gaze estéril
- Esparadrapo
- Álcool em gel
- Medicamentos básicos
    `,
    difficulty: 'intermediate',
    estimatedTime: '20 min',
    tags: ['emergência', 'criança', 'saúde', 'segurança'],
    isFavorite: false,
    views: 178
  }
]

export default function EducationalResources() {
  const [resources, setResources] = useState<EducationalResource[]>(sampleResources)
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedResource, setSelectedResource] = useState<EducationalResource | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [favoriteFilter, setFavoriteFilter] = useState(false)

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === '' || resource.category === selectedCategory
    const matchesFavorite = !favoriteFilter || resource.isFavorite
    return matchesSearch && matchesCategory && matchesFavorite
  })

  const toggleFavorite = (resourceId: string) => {
    setResources(resources.map(resource => 
      resource.id === resourceId 
        ? { ...resource, isFavorite: !resource.isFavorite }
        : resource
    ))
  }

  const getCategoryIcon = (category: string) => {
    const cat = categories.find(c => c.key === category)
    return cat ? cat.icon : '📄'
  }

  const getCategoryLabel = (category: string) => {
    const cat = categories.find(c => c.key === category)
    return cat ? cat.label : 'Categoria'
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic': return 'bg-green-100 text-green-800'
      case 'intermediate': return 'bg-yellow-100 text-yellow-800'
      case 'advanced': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return '📰'
      case 'video': return '🎥'
      case 'checklist': return '✅'
      case 'form': return '📝'
      case 'guide': return '📖'
      default: return '📄'
    }
  }

  if (selectedResource) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSelectedResource(null)}
                className="text-white hover:text-purple-200 text-xl"
              >
                ← Voltar
              </button>
              <button
                onClick={() => toggleFavorite(selectedResource.id)}
                className={`text-2xl ${selectedResource.isFavorite ? 'text-yellow-300' : 'text-white'}`}
              >
                {selectedResource.isFavorite ? '★' : '☆'}
              </button>
            </div>
            <div className="mt-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{getCategoryIcon(selectedResource.category)}</span>
                <span className="text-sm opacity-90">{getCategoryLabel(selectedResource.category)}</span>
              </div>
              <h1 className="text-2xl font-bold">{selectedResource.title}</h1>
              <p className="mt-2 opacity-90">{selectedResource.description}</p>
            </div>
          </div>

          {/* Meta Info */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <span>{getTypeIcon(selectedResource.type)}</span>
                <span className="capitalize">{selectedResource.type}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>⏱️</span>
                <span>{selectedResource.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>👁️</span>
                <span>{selectedResource.views} visualizações</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedResource.difficulty)}`}>
                {selectedResource.difficulty === 'basic' ? 'Básico' : 
                 selectedResource.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
              </span>
            </div>
            <div className="mt-3">
              <div className="flex flex-wrap gap-2">
                {selectedResource.tags.map(tag => (
                  <span key={tag} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="prose max-w-none">
              <div dangerouslySetInnerHTML={{ 
                __html: selectedResource.content.replace(/\n/g, '<br>').replace(/### /g, '<h3>').replace(/## /g, '<h2>').replace(/# /g, '<h1>')
              }} />
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-wrap gap-3">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
                📤 Compartilhar
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium">
                📱 Enviar por WhatsApp
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium">
                📄 Baixar PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-6 rounded-t-xl">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          📚 Centro Educacional
        </h1>
        <p className="mt-2 opacity-90">Aprenda sobre seus direitos e recursos disponíveis</p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 border-x border-gray-200">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar recursos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">Todas as categorias</option>
            {categories.map(category => (
              <option key={category.key} value={category.key}>
                {category.icon} {category.label}
              </option>
            ))}
          </select>
          <button
            onClick={() => setFavoriteFilter(!favoriteFilter)}
            className={`px-4 py-2 rounded-lg font-medium ${
              favoriteFilter 
                ? 'bg-yellow-500 text-white' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ★ Favoritos
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {categories.map(category => (
            <button
              key={category.key}
              onClick={() => setSelectedCategory(category.key === selectedCategory ? '' : category.key)}
              className={`p-3 rounded-lg text-center transition-all ${
                selectedCategory === category.key
                  ? 'bg-purple-100 text-purple-800 border-2 border-purple-300'
                  : 'bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              <div className="text-2xl mb-1">{category.icon}</div>
              <div className="text-xs font-medium">{category.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="bg-white rounded-b-xl border border-t-0 border-gray-200 p-6">
        {filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum recurso encontrado</h3>
            <p className="text-gray-600">Tente ajustar os filtros ou termos de busca.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(resource => (
              <div
                key={resource.id}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedResource(resource)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{getCategoryIcon(resource.category)}</span>
                    <span className="text-lg">{getTypeIcon(resource.type)}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(resource.id)
                    }}
                    className={`text-xl ${resource.isFavorite ? 'text-yellow-500' : 'text-gray-300'}`}
                  >
                    {resource.isFavorite ? '★' : '☆'}
                  </button>
                </div>
                
                <h3 className="font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>⏱️ {resource.estimatedTime}</span>
                  <span>👁️ {resource.views}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty === 'basic' ? 'Básico' : 
                     resource.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                  </span>
                  <span className="text-sm text-purple-600 font-medium">Ver mais →</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Quick Access */}
      <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
        <h4 className="font-medium text-purple-900 mb-3">🔥 Acesso Rápido</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button className="bg-white hover:bg-purple-50 text-purple-700 p-3 rounded-lg text-sm font-medium border border-purple-200">
            📞 Números Úteis
          </button>
          <button className="bg-white hover:bg-purple-50 text-purple-700 p-3 rounded-lg text-sm font-medium border border-purple-200">
            📋 Formulários
          </button>
          <button className="bg-white hover:bg-purple-50 text-purple-700 p-3 rounded-lg text-sm font-medium border border-purple-200">
            💡 Dicas Rápidas
          </button>
          <button className="bg-white hover:bg-purple-50 text-purple-700 p-3 rounded-lg text-sm font-medium border border-purple-200">
            🆘 Emergências
          </button>
        </div>
      </div>
    </div>
  )
}