'use client';

import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function useInstallPrompt() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState(false);

  useEffect(() => {
    // Verificar se já está instalado
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                          (window.navigator as any).standalone ||
                          document.referrer.includes('android-app://');
      setIsInstalled(isStandalone);
    };

    // Listener para evento de instalação disponível
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setInstallPrompt(promptEvent);
      setIsInstallable(true);
    };

    // Listener para quando app é instalado
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
      setIsInstallable(false);
      setShowCustomPrompt(false);
      console.log('PWA foi instalado com sucesso!');
    };

    // Verificar se deve mostrar prompt customizado
    const checkCustomPrompt = () => {
      const hasSeenPrompt = localStorage.getItem('mae-conecta-install-prompt-seen');
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                          (window.navigator as any).standalone;
      
      if (!hasSeenPrompt && !isStandalone) {
        // Mostrar após 3 segundos para não ser intrusivo
        setTimeout(() => {
          setShowCustomPrompt(true);
        }, 3000);
      }
    };

    checkIfInstalled();
    checkCustomPrompt();

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const triggerInstall = async () => {
    if (!installPrompt) {
      // Se não há prompt nativo, mostrar instruções manuais
      setShowCustomPrompt(true);
      return;
    }

    try {
      await installPrompt.prompt();
      const choice = await installPrompt.userChoice;
      
      if (choice.outcome === 'accepted') {
        console.log('Usuário aceitou instalar o PWA');
      } else {
        console.log('Usuário recusou instalar o PWA');
      }
      
      setInstallPrompt(null);
      setIsInstallable(false);
    } catch (error) {
      console.error('Erro ao tentar instalar PWA:', error);
      setShowCustomPrompt(true);
    }
  };

  const dismissCustomPrompt = () => {
    setShowCustomPrompt(false);
    localStorage.setItem('mae-conecta-install-prompt-seen', 'true');
  };

  const canInstall = isInstallable || (!isInstalled && typeof window !== 'undefined');

  return {
    canInstall,
    isInstalled,
    isInstallable,
    showCustomPrompt,
    triggerInstall,
    dismissCustomPrompt,
    installPrompt
  };
}