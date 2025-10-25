'use client';

import React from 'react';

export default function QuickActions() {
  const actions = [
    { icon: '🚨', label: 'Emergência', action: () => alert('Chamando emergência...') },
    { icon: '💬', label: 'Chat Clara', action: () => console.log('Abrir chat Clara') },
    { icon: '📞', label: 'Suporte', action: () => alert('Ligando para suporte...') },
    { icon: '📚', label: 'Guias', action: () => console.log('Abrir guias') }
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