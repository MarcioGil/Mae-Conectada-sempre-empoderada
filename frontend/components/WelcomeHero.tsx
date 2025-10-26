'use client';

import React from 'react';

export default function WelcomeHero() {
  const handleComecarAgora = () => {
    // Scroll para os módulos
    const modulesSection = document.getElementById('modules-title');
    if (modulesSection) {
      modulesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleConhecerMais = () => {
    // Ir para página de educação
    window.location.href = '/educacao';
  };

  return (
    <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg p-8 mb-6">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          🤱 Bem-vinda ao Mãe Conecta
        </h1>
        <p className="text-lg md:text-xl mb-6 opacity-90">
          Uma plataforma completa de apoio e empoderamento para mães brasileiras
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={handleComecarAgora}
            className="bg-white text-pink-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            🚀 Começar Agora
          </button>
          <button 
            onClick={handleConhecerMais}
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
          >
            📚 Conheça Mais
          </button>
        </div>
      </div>
    </div>
  );
}