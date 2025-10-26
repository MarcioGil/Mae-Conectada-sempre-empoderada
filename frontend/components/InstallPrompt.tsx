'use client';

import React, { useState, useEffect } from 'react';

interface InstallPromptProps {
  onClose: () => void;
}

export default function InstallPrompt({ onClose }: InstallPromptProps) {
  const [deviceType, setDeviceType] = useState<'android' | 'ios' | 'desktop' | 'unknown'>('unknown');
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Detectar se já está instalado como PWA
    const checkStandalone = () => {
      const isStandaloneMode = window.matchMedia('(display-mode: standalone)').matches ||
                              (window.navigator as any).standalone ||
                              document.referrer.includes('android-app://');
      setIsStandalone(isStandaloneMode);
    };

    // Detectar tipo de dispositivo
    const detectDevice = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      
      if (/android/.test(userAgent)) {
        setDeviceType('android');
      } else if (/iphone|ipad|ipod/.test(userAgent)) {
        setDeviceType('ios');
      } else if (/windows|mac|linux/.test(userAgent)) {
        setDeviceType('desktop');
      }
    };

    checkStandalone();
    detectDevice();
  }, []);

  // Não mostrar se já está instalado
  if (isStandalone) return null;

  const getInstructions = () => {
    switch (deviceType) {
      case 'android':
        return {
          icon: '📱',
          title: 'Instale o Mãe Conecta no seu celular!',
          steps: [
            'Toque nos 3 pontinhos (⋮) no canto superior direito',
            'Selecione "Adicionar à tela inicial" ou "Instalar aplicativo"',
            'Confirme a instalação'
          ],
          benefit: 'Acesso rápido direto da sua tela inicial!'
        };
      
      case 'ios':
        return {
          icon: '📱',
          title: 'Instale o Mãe Conecta no seu iPhone!',
          steps: [
            'Toque no ícone de Compartilhar (↑) na parte inferior',
            'Role para baixo e toque em "Adicionar à Tela de Início"',
            'Confirme tocando em "Adicionar"'
          ],
          benefit: 'App nativo na sua tela inicial!'
        };
      
      case 'desktop':
        return {
          icon: '💻',
          title: 'Instale o Mãe Conecta no seu computador!',
          steps: [
            'Clique no ícone de instalação (⊕) na barra de endereços',
            'Ou vá no menu (⋮) > "Instalar Mãe Conecta"',
            'Confirme a instalação'
          ],
          benefit: 'App dedicado no seu desktop!'
        };
      
      default:
        return {
          icon: '🌐',
          title: 'Use o Mãe Conecta como aplicativo!',
          steps: [
            'Adicione este site à sua tela inicial',
            'Funciona como um app nativo',
            'Sempre atualizado automaticamente'
          ],
          benefit: 'Experiência completa de aplicativo!'
        };
    }
  };

  const instructions = getInstructions();

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 z-50 shadow-lg">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-2xl">{instructions.icon}</span>
              <h3 className="font-bold text-lg">{instructions.title}</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-90 mb-2">Como instalar:</p>
                <ol className="text-sm space-y-1">
                  {instructions.steps.map((step, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-white/20 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold mr-2 mt-0.5">
                        {index + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white/10 rounded-lg p-3">
                  <p className="text-sm font-medium">✨ {instructions.benefit}</p>
                  <p className="text-xs opacity-80 mt-1">
                    • Funciona offline<br/>
                    • Atualizações automáticas<br/>
                    • Notificações push
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="ml-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            aria-label="Fechar"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="mt-3 text-center">
          <button
            onClick={onClose}
            className="text-xs bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full transition-colors"
          >
            Entendi, não mostrar novamente
          </button>
        </div>
      </div>
    </div>
  );
}