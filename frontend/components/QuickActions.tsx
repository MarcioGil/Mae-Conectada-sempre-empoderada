'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { navigateToRoute } from '../utils/routes';

export default function QuickActions() {
  const router = useRouter();

  const actions = [
    { 
      icon: '🚨', 
      label: 'Emergência', 
      action: () => navigateToRoute(router, '/emergencia')
    },
    { 
      icon: '💬', 
      label: 'Chat Clara', 
      action: () => {
        // A Clara já está disponível no botão flutuante
        alert('💜 A Clara está no botão roxo no canto da tela! Clique nela para conversar.');
      }
    },
    { 
      icon: '📞', 
      label: 'Suporte', 
      action: () => {
        const message = `💜 Preciso de ajuda com o Mãe Conecta`;
        const whatsapp = `https://wa.me/5521964949427?text=${encodeURIComponent(message)}`;
        window.open(whatsapp, '_blank');
      }
    },
    { 
      icon: '📚', 
      label: 'Guias', 
      action: () => router.push('/educacao')
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className="flex flex-col items-center p-3 rounded-lg border border-gray-200 hover:bg-pink-50 hover:border-pink-300 transition-colors"
          >
            <span className="text-2xl mb-1">{action.icon}</span>
            <span className="text-sm font-medium text-gray-700">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}