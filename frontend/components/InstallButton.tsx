'use client';

import React from 'react';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

export default function InstallButton() {
  const { canInstall, isInstalled, triggerInstall } = useInstallPrompt();

  // Não mostrar se já está instalado
  if (isInstalled || !canInstall) return null;

  return (
    <button
      onClick={triggerInstall}
      className="fixed bottom-20 right-6 bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 z-40 group"
      aria-label="Instalar Mãe Conecta como aplicativo"
    >
      <div className="flex items-center space-x-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        </svg>
        <span className="hidden group-hover:block text-sm font-medium whitespace-nowrap">
          Instalar App
        </span>
      </div>
      
      {/* Indicador pulsante */}
      <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
    </button>
  );
}