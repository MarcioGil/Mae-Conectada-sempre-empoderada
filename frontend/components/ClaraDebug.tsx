'use client';

import React, { useState, useEffect } from 'react';
import { messagesConfig } from '../utils/portuguese';

export default function ClaraDebug() {
  const [status, setStatus] = useState('Verificando compatibilidade...');
  const [debug, setDebug] = useState<string[]>([]);
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const addDebug = (message: string) => {
    console.log('Clara Debug:', message);
    setDebug(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  useEffect(() => {
    // Verificar compatibilidade básica
    addDebug('Iniciando verificações...');
    
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setStatus('❌ Navegador não suporta reconhecimento de voz');
      addDebug('SpeechRecognition não disponível');
      return;
    }

    setIsSupported(true);
    setStatus('✅ Navegador compatível');
    addDebug('SpeechRecognition disponível');

    // Verificar HTTPS
    if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
      addDebug('⚠️ HTTPS necessário para reconhecimento de voz');
    }

    // Verificar permissões do microfone
    navigator.mediaDevices?.getUserMedia({ audio: true })
      .then(() => {
        addDebug('✅ Permissão de microfone concedida');
      })
      .catch((error) => {
        addDebug(`❌ Erro de permissão de microfone: ${error.message}`);
      });

  }, []);

  const testSpeechRecognition = () => {
    if (!isSupported) {
      addDebug('❌ Teste cancelado - navegador não compatível');
      return;
    }

    addDebug('🧪 Iniciando teste de reconhecimento...');
    setIsListening(true);

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = 'pt-BR';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => {
        addDebug('🎤 Reconhecimento iniciado');
      };

      recognition.onresult = (event: any) => {
        const result = event.results[0][0].transcript;
        addDebug(`✅ Resultado: "${result}"`);
        setIsListening(false);
      };

      recognition.onerror = (event: any) => {
        addDebug(`❌ Erro: ${event.error}`);
        setIsListening(false);
      };

      recognition.onend = () => {
        addDebug('🛑 Reconhecimento finalizado');
        setIsListening(false);
      };

      // Timeout de segurança
      setTimeout(() => {
        if (isListening) {
          recognition.stop();
          addDebug('⏰ Timeout - reconhecimento interrompido');
          setIsListening(false);
        }
      }, 5000);

      recognition.start();

    } catch (error: any) {
      addDebug(`❌ Erro ao iniciar reconhecimento: ${error.message}`);
      setIsListening(false);
    }
  };

  const clearDebug = () => {
    setDebug([]);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white shadow-2xl rounded-lg border border-gray-200 max-w-md">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-800">Clara Debug</h3>
          <button
            onClick={clearDebug}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            Limpar
          </button>
        </div>

        <div className="mb-3">
          <p className="text-sm font-medium text-gray-700">Status:</p>
          <p className="text-sm text-gray-600">{status}</p>
        </div>

        <div className="space-y-2 mb-4">
          <button
            onClick={testSpeechRecognition}
            disabled={!isSupported || isListening}
            className={`w-full py-2 px-4 rounded text-sm font-medium ${
              !isSupported 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isListening
                ? 'bg-red-500 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {isListening ? '🎤 Ouvindo...' : '🧪 Testar Reconhecimento'}
          </button>
        </div>

        <div className="border-t pt-3">
          <p className="text-xs font-medium text-gray-700 mb-2">Log de Debug:</p>
          <div className="bg-gray-50 rounded p-2 max-h-40 overflow-y-auto">
            {debug.length === 0 ? (
              <p className="text-xs text-gray-500">Nenhum evento registrado</p>
            ) : (
              debug.map((msg, index) => (
                <p key={index} className="text-xs text-gray-600 mb-1">
                  {msg}
                </p>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}