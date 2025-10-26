'use client';

import React, { useState } from 'react';
import { navigateToPageSafely } from '../utils/navigation';

interface ComplianceCardProps {
  title: string;
  description: string;
  icon: string;
  href?: string;
  color?: string;
  features?: string[];
  onClick?: () => void;
  className?: string;
}

export default function ComplianceCard({ 
  title, 
  description, 
  icon, 
  href, 
  color = 'bg-white', 
  features = [], 
  onClick, 
  className = '' 
}: ComplianceCardProps) {
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSafeClick = async () => {
    if (isNavigating) return; // Prevenir cliques duplos
    
    setIsNavigating(true);
    
    try {
      if (href) {
        // Log para compliance e debug
        console.log('🔍 Compliance Navigation:', {
          title,
          href,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          currentUrl: window.location.href
        });
        
        // Navegação segura e rastreável
        navigateToPageSafely(href);
        
      } else if (onClick) {
        onClick();
      }
    } catch (error) {
      console.error('❌ Erro de compliance na navegação:', error);
      
      // Fallback para compliance - sempre redirecionar para home em caso de erro
      if (typeof window !== 'undefined') {
        window.location.href = '/Mae-Conecta/';
      }
    } finally {
      // Reset após 2 segundos
      setTimeout(() => setIsNavigating(false), 2000);
    }
  };

  return (
    <div 
      className={`${color} rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-300 cursor-pointer transform hover:scale-[1.02] ${className} ${isNavigating ? 'opacity-75 cursor-wait' : ''}`}
      onClick={handleSafeClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSafeClick();
        }
      }}
      aria-label={`Acessar ${title}: ${description}`}
    >
      <div className="flex items-start space-x-4">
        <div className="text-4xl flex-shrink-0">
          {icon}
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">
            {title}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {description}
          </p>
          
          {features && features.length > 0 && (
            <div className="space-y-1">
              {features.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center text-xs text-gray-500">
                  <div className="w-1 h-1 bg-purple-400 rounded-full mr-2 flex-shrink-0"></div>
                  {feature}
                </div>
              ))}
              {features.length > 3 && (
                <div className="text-xs text-gray-400 font-medium">
                  +{features.length - 3} recursos
                </div>
              )}
            </div>
          )}
          
          {isNavigating && (
            <div className="mt-3 flex items-center text-sm text-purple-600">
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-purple-600 border-t-transparent mr-2"></div>
              Carregando...
            </div>
          )}
        </div>
        
        <div className="flex-shrink-0 text-gray-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}