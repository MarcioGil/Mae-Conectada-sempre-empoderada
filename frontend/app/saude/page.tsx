'use client';

export default function SaudePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <span className="text-6xl">🏥</span>
            <h1 className="text-3xl font-bold text-gray-900 mt-4">
              Saúde da Infância
            </h1>
            <p className="text-gray-600 mt-2">
              Calendário inteligente para cuidar da saúde do seu filho
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-teal-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-teal-800">
                📅 Calendário Inteligente
              </h3>
              <ul className="space-y-2 text-teal-700">
                <li>• Vacinas por idade</li>
                <li>• Consultas de rotina</li>
                <li>• Marcos do desenvolvimento</li>
                <li>• Exames periódicos</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-blue-800">
                🔔 Alertas Automáticos
              </h3>
              <ul className="space-y-2 text-blue-700">
                <li>• Lembretes de medicamentos</li>
                <li>• Avisos de consultas</li>
                <li>• Triagem de sintomas com IA</li>
                <li>• Perícias INSS programadas</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-lg font-semibold">
              🏥 Configurar Calendário de Saúde
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}