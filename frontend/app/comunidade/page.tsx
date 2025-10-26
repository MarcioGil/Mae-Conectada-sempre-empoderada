'use client';

export default function ComunidadePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <span className="text-6xl">👩‍👧‍👦</span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              Ninhos de Apoio 2.0
            </h1>
            <p className="text-gray-600 mt-2">
              Conecte-se com mães que vivem desafios similares
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-pink-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-pink-800">
                💕 Match de Afinidades
              </h3>
              <ul className="space-y-2 text-pink-700">
                <li>• Mães na mesma região</li>
                <li>• Filhos com idades similares</li>
                <li>• Desafios em comum</li>
                <li>• Interesses compartilhados</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-purple-800">
                🛡️ Ambiente Seguro
              </h3>
              <ul className="space-y-2 text-purple-700">
                <li>• Chat moderado 24h</li>
                <li>• Verificação de identidade</li>
                <li>• Grupos temáticos</li>
                <li>• Eventos presenciais</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-3 rounded-lg font-semibold">
              💜 Encontrar Minha Comunidade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}