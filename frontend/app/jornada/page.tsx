'use client';

export default function JornadaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <span className="text-6xl">🧩</span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              Jornada de Acolhimento
            </h1>
            <p className="text-gray-600 mt-2">
              Conquiste seus direitos como um jogo, com recompensas reais
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-orange-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-orange-800">
                🎮 Sistema de Jogos
              </h3>
              <ul className="space-y-2 text-orange-700">
                <li>• Missão: "Conquiste o CadÚnico"</li>
                <li>• Level Up: "Mestre do BPC"</li>
                <li>• Achievement: "Documentos Completos"</li>
                <li>• Boss Fight: "Audiência no INSS"</li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-yellow-800">
                🏆 Recompensas Reais
              </h3>
              <ul className="space-y-2 text-yellow-700">
                <li>• Descontos em farmácias</li>
                <li>• Créditos para cursos</li>
                <li>• Consultas jurídicas gratuitas</li>
                <li>• Kit de produtos infantis</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-semibold">
              🎮 Começar Minha Jornada
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}