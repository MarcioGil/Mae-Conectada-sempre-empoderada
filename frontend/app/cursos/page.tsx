'use client';

export default function CursosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <span className="text-6xl">📚</span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              Academia da Mãe
            </h1>
            <p className="text-gray-600 mt-2">
              Cursos rápidos que transformam habilidades em renda
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-800">
                🎓 Microcertificações
              </h3>
              <ul className="space-y-2 text-purple-700">
                <li>• Marketing Digital para Mães</li>
                <li>• Artesanato que Vende</li>
                <li>• Cuidados Infantis Especializados</li>
                <li>• Gestão Financeira Familiar</li>
              </ul>
            </div>

            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-orange-800">
                💰 ROI Inteligente
              </h3>
              <ul className="space-y-2 text-orange-700">
                <li>• IA calcula melhor investimento</li>
                <li>• Tempo de retorno estimado</li>
                <li>• Demanda regional analisada</li>
                <li>• Caminho para formalização</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg font-semibold">
              📚 Ver Cursos Disponíveis
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}