'use client';

export default function DireitosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <span className="text-6xl">🛡️</span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              Direitos Sem Medo
            </h1>
            <p className="text-gray-600 mt-2">
              Checklist do BPC e análise de documentos automática
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">
                ✓ Checklist BPC
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Renda familiar per capita</li>
                <li>• Documentos médicos</li>
                <li>• Comprovantes de residência</li>
                <li>• Cadastro Único atualizado</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-green-800">
                ✓ Análise Automática
              </h3>
              <ul className="space-y-2 text-green-700">
                <li>• Detecta documentos faltantes</li>
                <li>• Identifica violações de direitos</li>
                <li>• Gera relatórios para defensoria</li>
                <li>• Orientações jurídicas</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold">
              🚀 Começar Análise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}