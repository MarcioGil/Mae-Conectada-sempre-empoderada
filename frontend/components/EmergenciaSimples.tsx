'use client';

import React, { useState, useEffect } from 'react';
import { getCurrentLocation, requestLocationPermission, EmergencyLocationResult } from '../services/geolocation';

export default function EmergenciaSimples() {
  const [alertSent, setAlertSent] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [locationData, setLocationData] = useState<EmergencyLocationResult | null>(null);
  const [gpsStatus, setGpsStatus] = useState<'checking' | 'available' | 'denied' | 'unavailable'>('checking');

  // Detectar dispositivo e solicitar permissão de GPS
  useEffect(() => {
    const checkMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    setIsMobile(checkMobile);

    // Solicitar permissão de GPS antecipadamente
    checkGPSPermission();
  }, []);

  const checkGPSPermission = async () => {
    try {
      const hasPermission = await requestLocationPermission();
      setGpsStatus(hasPermission ? 'available' : 'denied');
      if (!hasPermission) {
        alert('Permissão de localização negada. Ative o GPS nas configurações do seu dispositivo e recarregue a página.');
      }
    } catch (e) {
      setGpsStatus('unavailable');
      alert('Erro ao solicitar permissão de localização. Tente recarregar a página ou usar outro navegador.');
      console.error('Erro ao solicitar permissão de localização:', e);
    }
  };

  const getLocationForEmergency = async () => {
    setGpsStatus('checking');
    try {
      const result = await getCurrentLocation();
      setLocationData(result);
      setGpsStatus(result.success ? 'available' : 'unavailable');
      if (!result.success) {
        alert('Não foi possível obter sua localização: ' + result.message + '\n\nDicas:\n- Ative o GPS do seu dispositivo\n- Permita o acesso à localização no navegador\n- Use HTTPS e recarregue a página');
        console.warn('Falha ao obter localização:', result.message);
      }
      return result;
    } catch (e) {
      setGpsStatus('unavailable');
      alert('Erro inesperado ao obter localização. Tente recarregar a página ou usar outro navegador.');
      console.error('Erro inesperado ao obter localização:', e);
      return { success: false, message: 'Erro inesperado ao obter localização.' };
    }
  };

  const handleEmergencyCall = async (number: string, description: string) => {
    // Prevenir múltiplas chamadas
    if (alertSent) return;
    
    setAlertSent(true);
    
    // Tentar obter localização primeiro
    const locationResult = await getLocationForEmergency();
    
    // Detectar se é mobile ou desktop
    const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let emergencyMessage = `🚨 EMERGÊNCIA: ${description}`;
    
    if (locationResult.success && locationResult.location) {
      emergencyMessage += `\n\n📍 LOCALIZAÇÃO:\nLat: ${locationResult.location.latitude.toFixed(6)}\nLong: ${locationResult.location.longitude.toFixed(6)}\n🗺️ ${locationResult.googleMapsUrl}`;
    } else {
      emergencyMessage += `\n\n⚠️ Localização não disponível: ${locationResult.message}`;
    }
    
    if (isMobileDevice) {
      // No celular: tentar ligar
      try {
        // Mostrar localização antes da ligação
        if (locationResult.success) {
          alert(emergencyMessage);
        }
        window.location.href = `tel:${number}`;
      } catch (error) {
        alert(`📞 Discue manualmente: ${number}\n\n${emergencyMessage}`);
      }
    } else {
      // No desktop: copiar número e localização
      const confirmCall = confirm(`${emergencyMessage}\n\nClique OK para copiar o número ${number}`);
      
      if (confirmCall && navigator.clipboard) {
        const textToCopy = locationResult.success 
          ? `${number}\n\nLocalização: ${locationResult.location!.latitude.toFixed(6)}, ${locationResult.location!.longitude.toFixed(6)}\nMapa: ${locationResult.googleMapsUrl}`
          : `${number}\n\nEmergência: ${description}`;
          
        navigator.clipboard.writeText(textToCopy).then(() => {
          alert(`✅ Dados copiados!\nDiscue ${number} no seu celular.`);
        }).catch(() => {
          alert(`📞 Discue agora: ${number}\n\n${emergencyMessage}`);
        });
      } else if (confirmCall) {
        alert(`📞 Discue agora: ${number}\n\n${emergencyMessage}`);
      }
    }
    
    // Reset após 5 segundos
    setTimeout(() => setAlertSent(false), 5000);
  };

  const sendWhatsAppAlert = async () => {
    if (alertSent) return;
    
    setAlertSent(true);
    
    // Obter localização para o WhatsApp
    const locationResult = await getLocationForEmergency();
    
    let message = `🆘 EMERGÊNCIA! 🆘
Preciso de ajuda urgente!

👤 Usuária do Mãe Conecta
⏰ ${new Date().toLocaleString('pt-BR')}`;

    if (locationResult.success && locationResult.whatsappMessage) {
      message = locationResult.whatsappMessage;
    } else {
      message += `\n\n⚠️ Localização não disponível: ${locationResult.message}

� Por favor me localize ou chame as autoridades:
• 190 - Polícia
• 180 - Central da Mulher  
• 192 - SAMU`;
    }

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    
    try {
      window.open(whatsappUrl, '_blank');
      alert('✅ WhatsApp aberto! Selecione um contato para enviar sua localização de emergência.');
    } catch (error) {
      // Fallback: copiar mensagem
      if (navigator.clipboard) {
        navigator.clipboard.writeText(message).then(() => {
          alert('📋 Mensagem de emergência copiada! Cole em qualquer app de mensagens.');
        });
      } else {
        alert(`📋 Copie esta mensagem de emergência:\n\n${message}`);
      }
    }
    
    setTimeout(() => setAlertSent(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 p-4">
      <div className="max-w-2xl mx-auto">
        
        {/* Header de Emergência */}
        <div className="bg-red-600 text-white rounded-lg p-6 mb-6 text-center">
          <span className="text-6xl block mb-4">🆘</span>
          <h1 className="text-2xl font-bold mb-2">CENTRAL DE EMERGÊNCIA</h1>
          <p className="text-red-100">Você não está sozinha. Ajuda está a caminho!</p>
          
          {/* Status do GPS */}
          <div className="mt-4 p-3 rounded-lg" style={{
            backgroundColor: gpsStatus === 'available' ? '#10B981' : 
                           gpsStatus === 'checking' ? '#F59E0B' : '#EF4444'
          }}>
            {gpsStatus === 'checking' && (
              <>
                <div className="animate-spin inline-block w-4 h-4 border-2 border-white rounded-full border-t-transparent mr-2"></div>
                📡 Verificando GPS...
              </>
            )}
            {gpsStatus === 'available' && (
              <>📍 GPS Ativo - Localização será enviada automaticamente</>
            )}
            {gpsStatus === 'denied' && (
              <>⚠️ GPS Negado - Ative nas configurações para maior segurança</>
            )}
            {gpsStatus === 'unavailable' && (
              <>❌ GPS Indisponível - Chamadas ainda funcionam</>
            )}
          </div>
          
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

        {/* Teste de GPS */}
        {gpsStatus !== 'available' && (
          <div className="mb-6">
            <button
              onClick={checkGPSPermission}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-3"
            >
              <span className="text-2xl">📡</span>
              <span>ATIVAR GPS PARA EMERGÊNCIAS</span>
            </button>
            <p className="text-sm text-gray-600 mt-2 text-center">
              Recomendado: Ative a localização para que os socorristas possam te encontrar mais rapidamente.<br/>
              <b>Dicas:</b> Ative o GPS, permita localização no navegador, use HTTPS e recarregue a página.<br/>
              Se continuar com problemas, tente outro navegador ou dispositivo.<br/>
              <span style={{color:'#b91c1c'}}>Se aparecer "GPS Negado" ou "Indisponível", verifique as permissões do navegador.</span>
            </p>
          </div>
        )}

        {/* Informações da localização atual */}
        {locationData && locationData.success && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-800 mb-2">📍 Sua Localização Atual:</h3>
            <p className="text-sm text-green-700">
              Coordenadas: {locationData.location!.latitude.toFixed(6)}, {locationData.location!.longitude.toFixed(6)}
            </p>
            <p className="text-sm text-green-700">
              Precisão: ~{Math.round(locationData.location!.accuracy)}m
            </p>
            {locationData.googleMapsUrl && (
              <a 
                href={locationData.googleMapsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm underline"
              >
                🗺️ Ver no Google Maps
              </a>
            )}
          </div>
        )}

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