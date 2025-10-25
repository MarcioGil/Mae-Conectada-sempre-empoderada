'use client';

import React from 'react';

export default function Navigation() {
  return (
    <nav className="bg-white shadow-sm border-b border-pink-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-pink-600">🤱 Mãe Conecta</h1>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <a href="#inicio" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium">
              Início
            </a>
            <a href="#recursos" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium">
              Recursos
            </a>
            <a href="#comunidade" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium">
              Comunidade
            </a>
            <a href="#ajuda" className="text-gray-700 hover:text-pink-600 px-3 py-2 rounded-md text-sm font-medium">
              Ajuda
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}