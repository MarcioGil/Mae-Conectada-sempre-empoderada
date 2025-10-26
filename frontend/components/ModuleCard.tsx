'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { navigateToPageSafely } from '../utils/navigation';

interface ModuleCardProps {
  title: string;
  description: string;
  icon: string;
  href?: string;
  color?: string;
  features?: string[];
  onClick?: () => void;
  className?: string;
}

export default function ModuleCard({ 
  title, 
  description, 
  icon, 
  href, 
  color = 'bg-white', 
  features = [], 
  onClick, 
  className = '' 
}: ModuleCardProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) {
      // Usar navegação super robusta para compliance total
      navigateToPageSafely(href);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div 
      className={`${color} rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{icon}</span>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-white/90 text-sm mb-4">{description}</p>
      
      {features.length > 0 && (
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center text-sm text-white/80">
              <span className="mr-2">✓</span>
              {feature}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}