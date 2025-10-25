'use client';

import React, { useState } from 'react';

export default function ClaraBasic() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setIsVisible(true);
    setMessage('Olá! Eu sou a Clara, sua assistente virtual. Como posso ajudar você hoje?');
    
    // Tentar falar (se suportado)
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(message);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  const closeChat = () => {
    setIsVisible(false);
    setMessage('');
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 w-16 h-16 bg-pink-500 hover:bg-pink-600 
                   text-white rounded-full shadow-lg flex items-center justify-center 
                   text-2xl transition-all duration-300 hover:scale-110 z-50"
        aria-label="Falar com Clara"
      >
        👩‍⚕️
      </button>

      {/* Modal do chat */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-hidden">
            {/* Header */}
            <div className="bg-pink-500 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">👩‍⚕️</span>
                <div>
                  <h3 className="font-semibold">Clara</h3>
                  <p className="text-sm opacity-90">Assistente Virtual</p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="text-white hover:bg-pink-600 rounded-full w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-4">
              <div className="bg-gray-100 rounded-lg p-3 mb-4">
                <p className="text-gray-800">{message}</p>
              </div>
              
              <div className="space-y-2">
                <button
                  className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm"
                  onClick={() => setMessage('🤱 Posso ajudar com amamentação, cuidados com o bebê e saúde materna!')}
                >
                  Ajuda com Amamentação
                </button>
                
                <button
                  className="w-full py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm"
                  onClick={() => setMessage('👶 Tenho dicas sobre cuidados com recém-nascidos e desenvolvimento infantil!')}
                >
                  Cuidados com Bebê
                </button>
                
                <button
                  className="w-full py-2 px-4 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm"
                  onClick={() => setMessage('🏥 Posso orientar sobre consultas, vacinas e emergências!')}
                >
                  Orientações Médicas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}