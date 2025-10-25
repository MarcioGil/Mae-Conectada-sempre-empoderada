'use client'

import { useState } from 'react'
import { 
  Cog6ToothIcon, 
  EyeIcon, 
  SpeakerWaveIcon,
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'
import { useAccessibility } from '../contexts/AccessibilityContext'

export default function AccessibilityPanel() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    state,
    increaseFontSize,
    decreaseFontSize,
    toggleContrast,
    toggleAnimations,
    toggleSoundEffects,
    adjustVoiceSpeed,
    setTheme,
    resetSettings,
    announceToScreenReader
  } = useAccessibility()

  const togglePanel = () => {
    setIsOpen(!isOpen)
    if (!isOpen) {
      announceToScreenReader('Painel de acessibilidade aberto')
    } else {
      announceToScreenReader('Painel de acessibilidade fechado')
    }
  }

  const handleFontIncrease = () => {
    increaseFontSize()
    announceToScreenReader('Tamanho da fonte aumentado')
  }

  const handleFontDecrease = () => {
    decreaseFontSize()
    announceToScreenReader('Tamanho da fonte diminuído')
  }

  const handleContrastToggle = () => {
    toggleContrast()
    announceToScreenReader(
      state.contrast === 'normal' 
        ? 'Alto contraste ativado' 
        : 'Alto contraste desativado'
    )
  }

  const handleAnimationsToggle = () => {
    toggleAnimations()
    announceToScreenReader(
      state.animations 
        ? 'Animações desativadas' 
        : 'Animações ativadas'
    )
  }

  const handleSoundToggle = () => {
    toggleSoundEffects()
    announceToScreenReader(
      state.soundEffects 
        ? 'Sons desativados' 
        : 'Sons ativados'
    )
  }

  const handleThemeChange = (theme: 'light' | 'dark' | 'auto') => {
    setTheme(theme)
    const themeNames = {
      light: 'claro',
      dark: 'escuro',
      auto: 'automático'
    }
    announceToScreenReader(`Tema ${themeNames[theme]} selecionado`)
  }

  const handleReset = () => {
    resetSettings()
    announceToScreenReader('Configurações de acessibilidade redefinidas')
  }

  return (
    <>
      {/* Botão para abrir painel */}
      <button
        onClick={togglePanel}
        className="fixed top-4 right-4 z-50 w-12 h-12 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg transition-all duration-200 focus-visible touch-target"
        aria-label="Abrir painel de acessibilidade"
        aria-expanded={isOpen}
        aria-controls="accessibility-panel"
      >
        <Cog6ToothIcon className="w-6 h-6 mx-auto" />
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={togglePanel}
          aria-hidden="true"
        />
      )}

      {/* Painel lateral */}
      <div
        id="accessibility-panel"
        className={`
          fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 overflow-y-auto
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        role="dialog"
        aria-modal="true"
        aria-labelledby="accessibility-panel-title"
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 
            id="accessibility-panel-title"
            className="text-xl font-bold text-gray-900 dark:text-gray-100"
          >
            ♿ Acessibilidade
          </h2>
          <button
            onClick={togglePanel}
            className="w-8 h-8 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center justify-center focus-visible"
            aria-label="Fechar painel de acessibilidade"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo do painel */}
        <div className="p-6 space-y-6">
          
          {/* Seção: Tamanho da Fonte */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              📝 Tamanho da Fonte
            </h3>
            <div className="flex items-center gap-3">
              <button
                onClick={handleFontDecrease}
                disabled={state.fontSize === 'small'}
                className="btn btn-outline text-sm disabled:opacity-50"
                aria-label="Diminuir tamanho da fonte"
              >
                A-
              </button>
              <span className="flex-1 text-center font-medium">
                {state.fontSize === 'small' && 'Pequeno'}
                {state.fontSize === 'medium' && 'Médio'}
                {state.fontSize === 'large' && 'Grande'}
                {state.fontSize === 'extra-large' && 'Extra Grande'}
              </span>
              <button
                onClick={handleFontIncrease}
                disabled={state.fontSize === 'extra-large'}
                className="btn btn-outline text-lg disabled:opacity-50"
                aria-label="Aumentar tamanho da fonte"
              >
                A+
              </button>
            </div>
          </section>

          {/* Seção: Contraste */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              🎨 Contraste
            </h3>
            <button
              onClick={handleContrastToggle}
              className={`w-full btn ${state.contrast === 'high' ? 'btn-primary' : 'btn-outline'}`}
              aria-pressed={state.contrast === 'high'}
            >
              <EyeIcon className="w-5 h-5 mr-2" />
              {state.contrast === 'high' ? 'Alto Contraste Ativo' : 'Ativar Alto Contraste'}
            </button>
          </section>

          {/* Seção: Tema */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              🌗 Tema
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => handleThemeChange('light')}
                className={`btn ${state.theme === 'light' ? 'btn-primary' : 'btn-outline'} flex-col py-3`}
                aria-pressed={state.theme === 'light'}
              >
                <SunIcon className="w-5 h-5 mb-1" />
                <span className="text-xs">Claro</span>
              </button>
              <button
                onClick={() => handleThemeChange('dark')}
                className={`btn ${state.theme === 'dark' ? 'btn-primary' : 'btn-outline'} flex-col py-3`}
                aria-pressed={state.theme === 'dark'}
              >
                <MoonIcon className="w-5 h-5 mb-1" />
                <span className="text-xs">Escuro</span>
              </button>
              <button
                onClick={() => handleThemeChange('auto')}
                className={`btn ${state.theme === 'auto' ? 'btn-primary' : 'btn-outline'} flex-col py-3`}
                aria-pressed={state.theme === 'auto'}
              >
                <ComputerDesktopIcon className="w-5 h-5 mb-1" />
                <span className="text-xs">Auto</span>
              </button>
            </div>
          </section>

          {/* Seção: Animações */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              ✨ Animações
            </h3>
            <button
              onClick={handleAnimationsToggle}
              className={`w-full btn ${state.animations ? 'btn-primary' : 'btn-outline'}`}
              aria-pressed={state.animations}
            >
              {state.animations ? 'Animações Ativas' : 'Animações Desativadas'}
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Desative se você tem sensibilidade a movimento
            </p>
          </section>

          {/* Seção: Sons */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              🔊 Efeitos Sonoros
            </h3>
            <button
              onClick={handleSoundToggle}
              className={`w-full btn ${state.soundEffects ? 'btn-primary' : 'btn-outline'}`}
              aria-pressed={state.soundEffects}
            >
              <SpeakerWaveIcon className="w-5 h-5 mr-2" />
              {state.soundEffects ? 'Sons Ativos' : 'Sons Desativados'}
            </button>
          </section>

          {/* Seção: Velocidade da Voz */}
          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
              🗣️ Velocidade da Voz
            </h3>
            <div className="space-y-3">
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={state.voiceSpeed}
                onChange={(e) => adjustVoiceSpeed(parseFloat(e.target.value))}
                className="w-full"
                aria-label="Velocidade da voz da Clara"
              />
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Lenta</span>
                <span className="font-medium">{state.voiceSpeed}x</span>
                <span>Rápida</span>
              </div>
            </div>
          </section>

          {/* Informações de Navegação por Teclado */}
          <section className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
              ⌨️ Atalhos do Teclado
            </h3>
            <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">Tab</kbd> - Navegar</li>
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">Enter/Space</kbd> - Ativar</li>
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">Esc</kbd> - Fechar menus</li>
              <li><kbd className="px-1 bg-gray-200 dark:bg-gray-700 rounded">Alt + A</kbd> - Acessibilidade</li>
            </ul>
          </section>

          {/* Botão de Reset */}
          <section>
            <button
              onClick={handleReset}
              className="w-full btn btn-outline text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              🔄 Redefinir Configurações
            </button>
          </section>

        </div>
      </div>
    </>
  )
}