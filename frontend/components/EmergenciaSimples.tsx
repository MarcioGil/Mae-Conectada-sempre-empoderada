'use client';

import React, { useState, useEffect } from 'react';

export default function EmergenciaSimples() {
  const [alertSent, setAlertSent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar dispositivo
  useEffect(() => {
    const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(checkMobile);
  }, []);

  const handleEmergencyCall = (number: string, description: string) => {
    // Prevenir múltiplas chamadas
    if (alertSent) return;
    
    setAlertSent(true);
    
    // Detectar se é mobile ou desktop
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobileDevice) {
      // No celular: tentar ligar uma vez apenas
      try {
        window.location.href = `tel:${number}`;
      } catch (error) {
        alert(`📞 Discue manualmente: ${number} (${description})`);
      }
    } else {
      // No desktop: copiar número
      const confirmCall = confirm(`📞 EMERGÊNCIA!\n\nNúmero: ${number} (${description})\n\nNo computador, você precisa discar manualmente.\nClique OK para copiar o número.`);
      
      if (confirmCall && navigator.clipboard) {
        navigator.clipboard.writeText(number).then(() => {
          alert(`✅ Número ${number} copiado!\nDiscue agora no seu celular.`);
        }).catch(() => {
          alert(`📞 Discue agora: ${number} (${description})`);
        });
      } else if (confirmCall) {
        alert(`📞 Discue agora: ${number} (${description})`);
      }
    }
    
    // Reset após 5 segundos (tempo maior para evitar conflitos)
    setTimeout(() => setAlertSent(false), 5000);
  };

  const sendWhatsAppAlert = () => {
    const message = `🆘 EMERGÊNCIA! Preciso de ajuda urgente! 
    
📍 Por favor me localize ou chame as autoridades:
• 190 - Polícia
• 180 - Central da Mulher  
• 192 - SAMU

Horário: ${new Date().toLocaleString('pt-BR')}`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header de Emergência */}
        <div className="bg-red-600 text-white rounded-lg p-6 mb-6 text-center">
          <span className="text-6xl block mb-4">🆘</span>
          <h1 className="text-2xl font-bold mb-2">CENTRAL DE EMERGÊNCIA</h1>
          <p className="text-red-100">Você não está sozinha. Ajuda está a caminho!</p>
          
          {/* Indicador de dispositivo */}
          {isMobile ? (
            <div className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
              📱 Modo Celular: Ligações diretas ativadas
            </div>
          ) : (
            <div className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded">
              💻 Modo Desktop: Números serão copiados para discar no celular
            </div>
          )}
        </div>

        {/* Botões de Emergência */}
        <div className="space-y-4">
          
          {/* Polícia */}
          <button
            onClick={() => handleEmergencyCall('190', 'Polícia Militar')}
            disabled={alertSent}
            className={`w-full p-6 rounded-lg font-bold text-xl flex items-center justify-center space-x-4 transition-all transform hover:scale-105 ${
              alertSent 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700 text-white'
            }`}
          >
            <span className="text-3xl">🚔</span>
            <span>{alertSent ? 'CHAMANDO...' : '190 - POLÍCIA MILITAR'}</span>
          </button>

          {/* Central da Mulher */}
          <button
            onClick={() => handleEmergencyCall('180', 'Central da Mulher')}
            disabled={alertSent}
            className={`w-full p-6 rounded-lg font-bold text-xl flex items-center justify-center space-x-4 transition-all transform hover:scale-105 ${
              alertSent 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-purple-600 hover:bg-purple-700 text-white'
            }`}
          >
            <span className="text-3xl">👩‍⚖️</span>
            <span>{alertSent ? 'CHAMANDO...' : '180 - CENTRAL DA MULHER'}</span>
          </button>

          {/* SAMU */}
          <button
            onClick={() => handleEmergencyCall('192', 'SAMU')}
            disabled={alertSent}
            className={`w-full p-6 rounded-lg font-bold text-xl flex items-center justify-center space-x-4 transition-all transform hover:scale-105 ${
              alertSent 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            <span className="text-3xl">🚑</span>
            <span>{alertSent ? 'CHAMANDO...' : '192 - SAMU'}</span>
          </button>

          {/* WhatsApp de Emergência */}
          <button
            onClick={sendWhatsAppAlert}
            className="w-full bg-green-500 hover:bg-green-600 text-white p-6 rounded-lg font-bold text-xl flex items-center justify-center space-x-4 transition-all transform hover:scale-105"
          >
            <span className="text-3xl">📱</span>
            <span>ENVIAR ALERTA POR WHATSAPP</span>
          </button>
        </div>

        {/* Feedback */}
        {alertSent && (
          <div className="mt-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            ✅ Chamada iniciada! Se o número não conectar, tente outro ou vá para um local seguro.
          </div>
        )}

        {/* Instruções de Segurança */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-bold text-blue-800 mb-4">🛡️ INSTRUÇÕES DE SEGURANÇA:</h3>
          <ul className="space-y-2 text-blue-700">
            <li>• Se estiver em perigo IMEDIATO, CORRA para local seguro</li>
            <li>• Mantenha o celular carregado e com crédito</li>
            <li>• Memorize endereços de locais seguros próximos</li>
            <li>• Tenha sempre documento de identidade</li>
            <li>• Em caso de perseguição, vá para local com muita gente</li>
          </ul>
        </div>

        {/* Botão Voltar */}
        <div className="mt-6 text-center">
          <button
            onClick={() => window.history.back()}
            className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-3 rounded-lg font-semibold"
          >
            ← Voltar para Início
          </button>
        </div>
      </div>
    </div>
  );
}