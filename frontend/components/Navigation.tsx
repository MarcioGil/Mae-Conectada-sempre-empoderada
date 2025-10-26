'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Navigation() {
  const router = useRouter();

  const handleNavigation = (route: string) => {
    if (route === 'inicio') {
      router.push('/');
    } else if (route === 'recursos') {
      // Scroll para os módulos se estiver na página inicial
      const modulesSection = document.getElementById('modules-title');
      if (modulesSection) {
        modulesSection.scrollIntoView({ behavior: 'smooth' });
      } else {
        router.push('/#modules-title');
      }
    } else if (route === 'comunidade') {
      router.push('/comunidade');
    } else if (route === 'ajuda') {
      router.push('/emergencia');
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 cursor-pointer" onClick={() => handleNavigation('inicio')}>
              <h1 className="text-xl font-bold text-pink-600">🤱 Mãe Conecta</h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={() => handleNavigation('inicio')}
              className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Início
            </button>
            <button 
              onClick={() => handleNavigation('recursos')}
              className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Recursos
            </button>
            <button 
              onClick={() => handleNavigation('comunidade')}
              className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Comunidade
            </button>
            <button 
              onClick={() => handleNavigation('ajuda')}
              className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium"
            >
              Ajuda
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}