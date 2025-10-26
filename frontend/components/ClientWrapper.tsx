'use client';

import React from 'react';
import ClaraBasic from './ClaraBasic';
import InstallPrompt from './InstallPrompt';
import InstallButton from './InstallButton';
import { useInstallPrompt } from '../hooks/useInstallPrompt';

export default function ClientWrapper() {
  const { showCustomPrompt, dismissCustomPrompt } = useInstallPrompt();

  return (
    <>
      {/* Banner de instalação inteligente */}
      {showCustomPrompt && (
        <InstallPrompt onClose={dismissCustomPrompt} />
      )}
      
      {/* Clara - Assistente Virtual Empoderada */}
      <ClaraBasic />
      
      {/* Botão de instalação flutuante */}
      <InstallButton />
    </>
  );
}