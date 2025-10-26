'use client';

export default function TrabalhoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <span className="text-6xl">🧠</span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              Conecta-Vagas Turbo
            </h1>
            <p className="text-gray-600 mt-2">
              IA detecta suas habilidades e encontra oportunidades perfeitas
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-800">
                🎯 Detector de Habilidades
              </h3>
              <ul className="space-y-2 text-green-700">
                <li>• Analisa experiências como mãe</li>
                <li>• Identifica soft skills</li>
                <li>• Mapeia competências ocultas</li>
                <li>• Sugere áreas de atuação</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">
                📝 Currículo Inteligente
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Ajuste automático por vaga</li>
                <li>• Destaca pontos fortes</li>
                <li>• Simulador de entrevistas</li>
                <li>• Dicas personalizadas</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold">
              🚀 Descobrir Minhas Habilidades
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}