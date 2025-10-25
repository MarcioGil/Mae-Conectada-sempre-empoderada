'use client'

import React, { useState } from 'react'

interface EducationSection {
  id: string
  title: string
  icon: string
  description: string
  content: React.ReactNode
}

const EducationGrowth: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('mother-education')

  const educationSections: EducationSection[] = [
    {
      id: 'mother-education',
      title: 'Seus Estudos Importam',
      icon: '👩‍🎓',
      description: 'Continue estudando e conquistando seus sonhos',
      content: <MotherEducationContent />
    },
    {
      id: 'children-education',
      title: 'Educação dos Filhos',
      icon: '👶📚',
      description: 'Apoie o desenvolvimento educacional das crianças',
      content: <ChildrenEducationContent />
    },
    {
      id: 'financial-education',
      title: 'Educação Financeira',
      icon: '💰📈',
      description: 'Aprenda a organizar suas finanças e conquistar independência',
      content: <FinancialEducationContent />
    },
    {
      id: 'free-resources',
      title: 'Recursos Gratuitos',
      icon: '🎁📖',
      description: 'Cursos, livros e materiais educativos sem custo',
      content: <FreeResourcesContent />
    }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gradient-to-br from-purple-50 to-pink-50 min-h-screen">
      {/* Header Motivacional */}
      <div className="text-center mb-8 bg-white rounded-xl p-6 shadow-lg">
        <h1 className="text-3xl font-bold text-purple-800 mb-4">
          🌟 Educação & Crescimento 🌟
        </h1>
        <p className="text-lg text-gray-700 mb-4">
          <strong>"A educação é a arma mais poderosa que você pode usar para mudar o mundo"</strong>
        </p>
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg">
          <p className="text-purple-800 font-semibold">
            💝 Querida, investir em educação - sua e dos seus filhos - é plantar sementes para um futuro melhor. 
            Cada página lida, cada curso feito, cada nova habilidade é um passo na direção da sua independência e felicidade!
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {educationSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`p-4 rounded-xl text-center transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-purple-700 hover:bg-purple-100 shadow-md'
            }`}
          >
            <div className="text-3xl mb-2">{section.icon}</div>
            <h3 className="font-bold text-sm">{section.title}</h3>
            <p className="text-xs mt-1 opacity-80">{section.description}</p>
          </button>
        ))}
      </div>

      {/* Active Content */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        {educationSections.find(section => section.id === activeSection)?.content}
      </div>
    </div>
  )
}

// Componente: Educação da Mãe
const MotherEducationContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">
          👩‍🎓 Seus Estudos São Prioridade!
        </h2>
        <p className="text-lg text-gray-700">
          Nunca é tarde para realizar seus sonhos educacionais. Você merece crescer e se desenvolver!
        </p>
      </div>

      {/* Motivação */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-purple-800 mb-4">💪 Por que continuar estudando?</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🎯</span>
              <span><strong>Independência financeira:</strong> Melhores oportunidades de trabalho</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🧠</span>
              <span><strong>Autoestima:</strong> Você se sentirá mais confiante e realizada</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">👶</span>
              <span><strong>Exemplo para os filhos:</strong> Eles vão se orgulhar de você</span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🌱</span>
              <span><strong>Crescimento pessoal:</strong> Novos conhecimentos transformam vidas</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🤝</span>
              <span><strong>Rede de contatos:</strong> Conhecerá pessoas incríveis</span>
            </div>
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🏆</span>
              <span><strong>Conquista de sonhos:</strong> Você pode chegar onde quiser</span>
            </div>
          </div>
        </div>
      </div>

      {/* Opções de Estudo */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h4 className="text-lg font-bold text-blue-800 mb-4">🎓 Ensino Formal</h4>
          <ul className="space-y-2 text-sm">
            <li>• <strong>EJA (Educação de Jovens e Adultos):</strong> Termine o Ensino Fundamental ou Médio</li>
            <li>• <strong>ENEM:</strong> Acesso gratuito ao ensino superior</li>
            <li>• <strong>ProUni:</strong> Bolsas em universidades privadas</li>
            <li>• <strong>FIES:</strong> Financiamento estudantil facilitado</li>
            <li>• <strong>Universidades Públicas:</strong> Educação gratuita e de qualidade</li>
          </ul>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h4 className="text-lg font-bold text-green-800 mb-4">💻 Cursos Online</h4>
          <ul className="space-y-2 text-sm">
            <li>• <strong>Coursera:</strong> Cursos de universidades internacionais</li>
            <li>• <strong>Udemy:</strong> Milhares de cursos técnicos</li>
            <li>• <strong>Khan Academy:</strong> Educação gratuita em português</li>
            <li>• <strong>FGV Online:</strong> Cursos gratuitos de gestão</li>
            <li>• <strong>SENAI:</strong> Cursos técnicos e profissionalizantes</li>
          </ul>
        </div>
      </div>

      {/* Planejamento de Estudos */}
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h4 className="text-lg font-bold text-yellow-800 mb-4">📅 Como Organizar Seus Estudos</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h5 className="font-bold text-yellow-700 mb-2">⏰ Tempo</h5>
            <ul className="text-sm space-y-1">
              <li>• 30 minutos por dia já fazem diferença</li>
              <li>• Estude quando as crianças dormem</li>
              <li>• Use intervalos do trabalho</li>
              <li>• Fins de semana: 1-2 horas</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-yellow-700 mb-2">📍 Local</h5>
            <ul className="text-sm space-y-1">
              <li>• Crie um cantinho de estudos</li>
              <li>• Biblioteca pública (silêncio)</li>
              <li>• Aplicativos no celular</li>
              <li>• Grupos de estudo online</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-yellow-700 mb-2">🎯 Metas</h5>
            <ul className="text-sm space-y-1">
              <li>• Defina objetivos claros</li>
              <li>• Começa pequeno e vai crescendo</li>
              <li>• Celebre cada conquista</li>
              <li>• Seja paciente consigo mesma</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Apoio Emocional */}
      <div className="bg-rose-50 p-6 rounded-lg">
        <h4 className="text-lg font-bold text-rose-800 mb-4">💝 Mensagem Especial Para Você</h4>
        <p className="text-rose-700 italic text-center text-lg">
          "Querida, eu sei que às vezes parece impossível conciliar tudo - filhos, casa, trabalho e estudos. 
          Mas lembre-se: você não está sozinha nessa jornada. Cada mulher que conseguiu chegou até lá um passo de cada vez. 
          Você é capaz, você é inteligente, e você merece todas as oportunidades que a educação pode oferecer. 
          Seus filhos ficarão orgulhosos de ter uma mãe tão determinada!"
        </p>
      </div>
    </div>
  )
}

// Componente: Educação dos Filhos  
const ChildrenEducationContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">
          👶📚 Educação dos Seus Filhos
        </h2>
        <p className="text-lg text-gray-700">
          Apoie o desenvolvimento educacional das crianças desde cedo. Você é a primeira e mais importante educadora!
        </p>
      </div>

      {/* Por Faixa Etária */}
      <div className="grid gap-6">
        {/* 0-3 anos */}
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-blue-800 mb-4">👶 0 a 3 anos - Primeiros Passos</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-blue-700 mb-2">🗣️ Desenvolvimento da Linguagem</h4>
              <ul className="text-sm space-y-1">
                <li>• Converse muito com seu bebê</li>
                <li>• Leia historinhas todos os dias</li>
                <li>• Cante músicas infantis</li>
                <li>• Descreva o que estão fazendo</li>
                <li>• Responda aos balbucios</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-blue-700 mb-2">🧠 Estímulos Cognitivos</h4>
              <ul className="text-sm space-y-1">
                <li>• Brinquedos coloridos e sonoros</li>
                <li>• Brincadeiras de encaixe</li>
                <li>• Músicas com gestos</li>
                <li>• Livros de pano ou plástico</li>
                <li>• Muito carinho e atenção</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 3-6 anos */}
        <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-green-800 mb-4">🎨 3 a 6 anos - Descobertas</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-green-700 mb-2">✏️ Preparação para Alfabetização</h4>
              <ul className="text-sm space-y-1">
                <li>• Desenho livre e rabiscos</li>
                <li>• Identificação de letras e números</li>
                <li>• Jogos de memória</li>
                <li>• Quebra-cabeças simples</li>
                <li>• Histórias interativas</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-green-700 mb-2">🏫 Educação Infantil</h4>
              <ul className="text-sm space-y-1">
                <li>• Procure creches públicas de qualidade</li>
                <li>• Participe das atividades escolares</li>
                <li>• Converse com as professoras</li>
                <li>• Reforce em casa o que aprendem</li>
                <li>• Valorize cada conquista</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 6+ anos */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-purple-800 mb-4">📖 6+ anos - Vida Escolar</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-bold text-purple-700 mb-2">📚 Apoio aos Estudos</h4>
              <ul className="text-sm space-y-1">
                <li>• Crie rotina de lição de casa</li>
                <li>• Tenha um espaço para estudar</li>
                <li>• Ajude sem fazer por eles</li>
                <li>• Elogie o esforço, não só a nota</li>
                <li>• Esteja presente nas reuniões</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-purple-700 mb-2">🌟 Motivação</h4>
              <ul className="text-sm space-y-1">
                <li>• Mostre como a educação transforma</li>
                <li>• Conte sobre profissões interessantes</li>
                <li>• Visite bibliotecas e museus</li>
                <li>• Incentive hobbies educativos</li>
                <li>• Seja exemplo estudando também</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Recursos Práticos */}
      <div className="bg-orange-50 p-6 rounded-lg">
        <h4 className="text-lg font-bold text-orange-800 mb-4">🎁 Recursos Gratuitos para Crianças</h4>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <h5 className="font-bold text-orange-700 mb-2">📱 Apps Educativos</h5>
            <ul className="text-sm space-y-1">
              <li>• Khan Academy Kids</li>
              <li>• ABC do Bita</li>
              <li>• Leia Para uma Criança</li>
              <li>• Mundo Bita</li>
              <li>• PlayKids</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-orange-700 mb-2">📺 Conteúdo Educativo</h5>
            <ul className="text-sm space-y-1">
              <li>• TV Escola (canal público)</li>
              <li>• Sesame Street Brasil</li>
              <li>• Cocoricó</li>
              <li>• Peixonauta</li>
              <li>• Show da Luna</li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-orange-700 mb-2">📚 Leitura</h5>
            <ul className="text-sm space-y-1">
              <li>• Biblioteca pública local</li>
              <li>• Projeto "Leia para uma Criança"</li>
              <li>• Sites com histórias grátis</li>
              <li>• Troca de livros com vizinhos</li>
              <li>• Contação de histórias</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// Componente: Educação Financeira
const FinancialEducationContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">
          💰📈 Educação Financeira
        </h2>
        <p className="text-lg text-gray-700">
          Aprenda a organizar suas finanças e conquistar independência econômica!
        </p>
      </div>

      {/* Básico de Finanças */}
      <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-green-800 mb-4">💡 Conceitos Fundamentais</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">📊 Orçamento Familiar</h4>
              <p className="text-sm mb-2">Controle de entradas e saídas:</p>
              <ul className="text-sm space-y-1">
                <li>• <strong>Receitas:</strong> Salário, benefícios, rendas extras</li>
                <li>• <strong>Gastos Fixos:</strong> Aluguel, luz, água, telefone</li>
                <li>• <strong>Gastos Variáveis:</strong> Alimentação, transporte, roupas</li>
                <li>• <strong>Reserva:</strong> Sempre guarde algo, mesmo que pouco</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">🎯 Metas Financeiras</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Curto prazo:</strong> Emergências (3 meses de gastos)</li>
                <li>• <strong>Médio prazo:</strong> Curso, eletrodoméstico</li>
                <li>• <strong>Longo prazo:</strong> Casa própria, aposentadoria</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">🏦 Produtos Financeiros</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Conta Corrente:</strong> Para movimentação diária</li>
                <li>• <strong>Poupança:</strong> Para guardar dinheiro</li>
                <li>• <strong>Cartão de Crédito:</strong> Use com consciência</li>
                <li>• <strong>PIX:</strong> Transferências gratuitas e rápidas</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">⚠️ Evite Armadilhas</h4>
              <ul className="text-sm space-y-1">
                <li>• Empréstimos com juros altos</li>
                <li>• Cartão de crédito no limite</li>
                <li>• Compras por impulso</li>
                <li>• Esquemas "enriquecimento rápido"</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Planejamento Prático */}
      <div className="bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-blue-800 mb-4">📋 Seu Plano Financeiro</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-blue-700 mb-3">📝 Passo 1: Anote Tudo</h4>
            <ul className="text-sm space-y-1">
              <li>• Lista todas as receitas</li>
              <li>• Anote todos os gastos por 1 mês</li>
              <li>• Use caderno ou app no celular</li>
              <li>• Seja honesta com os valores</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-blue-700 mb-3">⚖️ Passo 2: Analise</h4>
            <ul className="text-sm space-y-1">
              <li>• Onde o dinheiro está indo?</li>
              <li>• Quais gastos pode reduzir?</li>
              <li>• Está gastando mais que ganha?</li>
              <li>• Tem gastos desnecessários?</li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-blue-700 mb-3">🎯 Passo 3: Organize</h4>
            <ul className="text-sm space-y-1">
              <li>• Priorize gastos essenciais</li>
              <li>• Negocie contas em atraso</li>
              <li>• Crie metas de economia</li>
              <li>• Procure fontes de renda extra</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Renda Extra */}
      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-purple-800 mb-4">💼 Ideias de Renda Extra</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-purple-700 mb-3">🏠 Em Casa</h4>
            <ul className="text-sm space-y-1">
              <li>• Cozinhar para vender (bolos, salgados)</li>
              <li>• Costura e artesanato</li>
              <li>• Cuidar de crianças dos vizinhos</li>
              <li>• Venda online de produtos</li>
              <li>• Aulas particulares</li>
              <li>• Manicure e pedicure</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-purple-700 mb-3">📱 Online</h4>
            <ul className="text-sm space-y-1">
              <li>• Freelancer de digitação</li>
              <li>• Venda em redes sociais</li>
              <li>• Afiliada de produtos</li>
              <li>• Consultoria em sua área</li>
              <li>• Criação de conteúdo</li>
              <li>• Serviços de design simples</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Benefícios Sociais */}
      <div className="bg-yellow-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-yellow-800 mb-4">🏛️ Benefícios e Auxílios</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-bold text-yellow-700 mb-2">👨‍👩‍👧‍👦 Para Famílias</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>Bolsa Família:</strong> Auxílio mensal para famílias em vulnerabilidade</li>
              <li>• <strong>Auxílio Creche:</strong> Para quem trabalha e tem filhos pequenos</li>
              <li>• <strong>Vale Gás:</strong> Desconto na compra de botijão</li>
              <li>• <strong>Tarifa Social:</strong> Desconto na conta de luz</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-yellow-700 mb-2">👩 Para Mulheres</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>Qualifica Mulher:</strong> Cursos profissionalizantes gratuitos</li>
              <li>• <strong>Pronaf Mulher:</strong> Crédito para atividades rurais</li>
              <li>• <strong>MEI:</strong> Formalização como microempresária</li>
              <li>• <strong>FGTS:</strong> Saque em situações especiais</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mensagem Motivacional */}
      <div className="bg-rose-50 p-6 rounded-lg">
        <h4 className="text-lg font-bold text-rose-800 mb-4">💝 Lembre-se</h4>
        <p className="text-rose-700 italic text-center text-lg">
          "Querida, independência financeira não acontece da noite para o dia. É um processo que exige paciência, 
          planejamento e pequenas mudanças diárias. Cada real economizado é um passo na direção da sua liberdade. 
          Você tem a força e a inteligência necessárias para transformar sua situação financeira!"
        </p>
      </div>
    </div>
  )
}

// Componente: Recursos Gratuitos
const FreeResourcesContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-purple-800 mb-4">
          🎁📖 Recursos Educativos Gratuitos
        </h2>
        <p className="text-lg text-gray-700">
          Conhecimento de qualidade sem gastar nada! Aproveite essas oportunidades incríveis.
        </p>
      </div>

      {/* Plataformas Online */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-blue-800 mb-4">💻 Cursos Online Gratuitos</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold text-blue-700 mb-2">🎓 Universidades e Instituições</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Coursera:</strong> Cursos de universidades do mundo todo</li>
                <li>• <strong>FGV Online:</strong> Administração e gestão</li>
                <li>• <strong>Fundação Bradesco:</strong> Tecnologia e administração</li>
                <li>• <strong>SENAI:</strong> Cursos técnicos e industriais</li>
                <li>• <strong>SEBRAE:</strong> Empreendedorismo e negócios</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold text-blue-700 mb-2">🧠 Desenvolvimento Pessoal</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Khan Academy:</strong> Matemática e ciências</li>
                <li>• <strong>Duolingo:</strong> Idiomas grátis</li>
                <li>• <strong>Codecademy:</strong> Programação básica</li>
                <li>• <strong>TED-Ed:</strong> Vídeos educativos curtos</li>
                <li>• <strong>YouTube Edu:</strong> Canal educacional</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-green-800 mb-4">📚 Livros e Leitura</h3>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">📖 Bibliotecas Digitais</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Biblioteca Nacional Digital:</strong> Acervo nacional</li>
                <li>• <strong>Domínio Público:</strong> Livros clássicos grátis</li>
                <li>• <strong>Amazon Kindle Unlimited:</strong> Teste grátis</li>
                <li>• <strong>Biblioteca de sua cidade:</strong> Empréstimos locais</li>
                <li>• <strong>Projeto Gutenberg:</strong> Livros em domínio público</li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-lg">
              <h4 className="font-bold text-green-700 mb-2">🎧 Audiolivros e Podcasts</h4>
              <ul className="text-sm space-y-1">
                <li>• <strong>Spotify:</strong> Podcasts educativos</li>
                <li>• <strong>Audible:</strong> Teste grátis de audiolivros</li>
                <li>• <strong>Ubook:</strong> Resumos de livros</li>
                <li>• <strong>Google Podcasts:</strong> Conteúdo educativo</li>
                <li>• <strong>Rádio Batuta:</strong> Cultura nacional</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Apps Móveis */}
      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-purple-800 mb-4">📱 Apps Educativos para o Celular</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-purple-700 mb-2">🌍 Idiomas</h4>
            <ul className="text-sm space-y-1">
              <li>• Duolingo</li>
              <li>• Busuu</li>
              <li>• Babbel</li>
              <li>• HelloTalk</li>
              <li>• Memrise</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-purple-700 mb-2">🧮 Matemática</h4>
            <ul className="text-sm space-y-1">
              <li>• Khan Academy</li>
              <li>• Photomath</li>
              <li>• Microsoft Math</li>
              <li>• Matemática do ENEM</li>
              <li>• GeoGebra</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-purple-700 mb-2">💼 Profissional</h4>
            <ul className="text-sm space-y-1">
              <li>• LinkedIn Learning</li>
              <li>• Coursera</li>
              <li>• Udemy</li>
              <li>• Google Digital</li>
              <li>• Microsoft Learn</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Recursos Governamentais */}
      <div className="bg-orange-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-orange-800 mb-4">🏛️ Programas Governamentais</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-orange-700 mb-2">🎓 Educação Formal</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>EJA:</strong> Educação de Jovens e Adultos</li>
              <li>• <strong>ENEM:</strong> Exame Nacional do Ensino Médio</li>
              <li>• <strong>ProUni:</strong> Programa Universidade para Todos</li>
              <li>• <strong>FIES:</strong> Fundo de Financiamento Estudantil</li>
              <li>• <strong>SISU:</strong> Sistema de Seleção Unificada</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-orange-700 mb-2">💼 Qualificação Profissional</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>PRONATEC:</strong> Programa Nacional de Acesso ao Ensino Técnico</li>
              <li>• <strong>Mulheres Mil:</strong> Qualificação para mulheres</li>
              <li>• <strong>SENAI:</strong> Cursos técnicos industriais</li>
              <li>• <strong>SENAC:</strong> Cursos na área de serviços</li>
              <li>• <strong>SINE:</strong> Sistema Nacional de Emprego</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Dicas de Estudo */}
      <div className="bg-pink-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-pink-800 mb-4">📚 Dicas para Estudar de Forma Eficiente</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-pink-700 mb-3">⏰ Gestão do Tempo</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>Técnica Pomodoro:</strong> 25 min estudando + 5 min pausa</li>
              <li>• <strong>Horários fixos:</strong> Crie uma rotina diária</li>
              <li>• <strong>Prioridades:</strong> Comece pelo mais difícil</li>
              <li>• <strong>Intervalos:</strong> Cérebro precisa descansar</li>
              <li>• <strong>Revisão:</strong> Repasse o conteúdo regularmente</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-pink-700 mb-3">🎯 Técnicas de Aprendizado</h4>
            <ul className="text-sm space-y-1">
              <li>• <strong>Mapas mentais:</strong> Organize informações visualmente</li>
              <li>• <strong>Resumos:</strong> Escreva com suas próprias palavras</li>
              <li>• <strong>Flashcards:</strong> Para memorização</li>
              <li>• <strong>Ensine alguém:</strong> Explique para aprender melhor</li>
              <li>• <strong>Pratique:</strong> Faça exercícios e simulados</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Comunidades de Apoio */}
      <div className="bg-indigo-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-indigo-800 mb-4">🤝 Comunidades de Aprendizado</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-indigo-700 mb-2">💬 Grupos de Estudo</h4>
            <ul className="text-sm space-y-1">
              <li>• WhatsApp de estudos</li>
              <li>• Facebook grupos educacionais</li>
              <li>• Discord servidores de estudo</li>
              <li>• Telegram canais educativos</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-indigo-700 mb-2">🌐 Redes Sociais</h4>
            <ul className="text-sm space-y-1">
              <li>• LinkedIn para networking</li>
              <li>• Instagram educacional</li>
              <li>• YouTube canais didáticos</li>
              <li>• Reddit comunidades de aprendizado</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg">
            <h4 className="font-bold text-indigo-700 mb-2">🏫 Presencial</h4>
            <ul className="text-sm space-y-1">
              <li>• Biblioteca municipal</li>
              <li>• Centros comunitários</li>
              <li>• Igrejas com grupos de estudo</li>
              <li>• Associações de bairro</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Motivação Final */}
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-lg">
        <h4 className="text-lg font-bold text-purple-800 mb-4 text-center">🌟 Sua Jornada de Aprendizado</h4>
        <p className="text-purple-700 italic text-center text-lg">
          "Querida, o conhecimento é o único tesouro que ninguém pode tirar de você. Cada curso feito, 
          cada livro lido, cada habilidade aprendida é um investimento no seu futuro e no futuro dos seus filhos. 
          Comece hoje, mesmo que seja com 15 minutos. O importante é dar o primeiro passo. 
          Você é capaz de aprender qualquer coisa que quiser!"
        </p>
      </div>
    </div>
  )
}

export default EducationGrowth