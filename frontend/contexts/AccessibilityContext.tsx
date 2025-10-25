'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'

// Tipos para acessibilidade
interface AccessibilityState {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large'
  contrast: 'normal' | 'high'
  animations: boolean
  soundEffects: boolean
  voiceSpeed: number
  theme: 'light' | 'dark' | 'auto'
  screenReader: boolean
  keyboardNavigation: boolean
}

interface AccessibilityContextType {
  state: AccessibilityState
  increaseFontSize: () => void
  decreaseFontSize: () => void
  toggleContrast: () => void
  toggleAnimations: () => void
  toggleSoundEffects: () => void
  adjustVoiceSpeed: (speed: number) => void
  setTheme: (theme: 'light' | 'dark' | 'auto') => void
  announceToScreenReader: (message: string) => void
  resetSettings: () => void
}

type AccessibilityAction =
  | { type: 'INCREASE_FONT_SIZE' }
  | { type: 'DECREASE_FONT_SIZE' }
  | { type: 'TOGGLE_CONTRAST' }
  | { type: 'TOGGLE_ANIMATIONS' }
  | { type: 'TOGGLE_SOUND_EFFECTS' }
  | { type: 'SET_VOICE_SPEED'; payload: number }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'auto' }
  | { type: 'RESET_SETTINGS' }
  | { type: 'LOAD_SETTINGS'; payload: AccessibilityState }

// Estado inicial
const initialState: AccessibilityState = {
  fontSize: 'medium',
  contrast: 'normal',
  animations: true,
  soundEffects: true,
  voiceSpeed: 1,
  theme: 'auto',
  screenReader: false,
  keyboardNavigation: false
}

// Reducer para gerenciar estado
function accessibilityReducer(state: AccessibilityState, action: AccessibilityAction): AccessibilityState {
  switch (action.type) {
    case 'INCREASE_FONT_SIZE':
      const fontSizes = ['small', 'medium', 'large', 'extra-large'] as const
      const currentIndex = fontSizes.indexOf(state.fontSize)
      const nextIndex = Math.min(currentIndex + 1, fontSizes.length - 1)
      return { ...state, fontSize: fontSizes[nextIndex] }

    case 'DECREASE_FONT_SIZE':
      const fontSizesDecrease = ['small', 'medium', 'large', 'extra-large'] as const
      const currentIndexDecrease = fontSizesDecrease.indexOf(state.fontSize)
      const prevIndex = Math.max(currentIndexDecrease - 1, 0)
      return { ...state, fontSize: fontSizesDecrease[prevIndex] }

    case 'TOGGLE_CONTRAST':
      return { ...state, contrast: state.contrast === 'normal' ? 'high' : 'normal' }

    case 'TOGGLE_ANIMATIONS':
      return { ...state, animations: !state.animations }

    case 'TOGGLE_SOUND_EFFECTS':
      return { ...state, soundEffects: !state.soundEffects }

    case 'SET_VOICE_SPEED':
      return { ...state, voiceSpeed: action.payload }

    case 'SET_THEME':
      return { ...state, theme: action.payload }

    case 'RESET_SETTINGS':
      return initialState

    case 'LOAD_SETTINGS':
      return action.payload

    default:
      return state
  }
}

// Contexto
const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

// Provider
interface AccessibilityProviderProps {
  children: ReactNode
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [state, dispatch] = useReducer(accessibilityReducer, initialState)

  // Carregar configurações do localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('mae-conecta-accessibility')
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings)
        dispatch({ type: 'LOAD_SETTINGS', payload: parsedSettings })
      } catch (error) {
        console.warn('Erro ao carregar configurações de acessibilidade:', error)
      }
    }

    // Detectar se há screen reader
    const isScreenReaderActive = window.navigator.userAgent.includes('NVDA') || 
                                 window.navigator.userAgent.includes('JAWS') ||
                                 window.speechSynthesis

    if (isScreenReaderActive) {
      dispatch({ type: 'LOAD_SETTINGS', payload: { ...state, screenReader: true } })
    }
  }, [])

  // Salvar configurações no localStorage
  useEffect(() => {
    localStorage.setItem('mae-conecta-accessibility', JSON.stringify(state))
    
    // Aplicar configurações no documento
    applyAccessibilitySettings(state)
  }, [state])

  // Funções de controle
  const increaseFontSize = () => dispatch({ type: 'INCREASE_FONT_SIZE' })
  const decreaseFontSize = () => dispatch({ type: 'DECREASE_FONT_SIZE' })
  const toggleContrast = () => dispatch({ type: 'TOGGLE_CONTRAST' })
  const toggleAnimations = () => dispatch({ type: 'TOGGLE_ANIMATIONS' })
  const toggleSoundEffects = () => dispatch({ type: 'TOGGLE_SOUND_EFFECTS' })
  const adjustVoiceSpeed = (speed: number) => dispatch({ type: 'SET_VOICE_SPEED', payload: speed })
  const setTheme = (theme: 'light' | 'dark' | 'auto') => dispatch({ type: 'SET_THEME', payload: theme })
  const resetSettings = () => dispatch({ type: 'RESET_SETTINGS' })

  // Função para anunciar para screen readers
  const announceToScreenReader = (message: string) => {
    const announcement = document.getElementById('announcements')
    if (announcement) {
      announcement.textContent = message
      
      // Limpar após 1 segundo
      setTimeout(() => {
        announcement.textContent = ''
      }, 1000)
    }
  }

  const value: AccessibilityContextType = {
    state,
    increaseFontSize,
    decreaseFontSize,
    toggleContrast,
    toggleAnimations,
    toggleSoundEffects,
    adjustVoiceSpeed,
    setTheme,
    announceToScreenReader,
    resetSettings
  }

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  )
}

// Hook customizado
export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility deve ser usado dentro de AccessibilityProvider')
  }
  return context
}

// Função para aplicar configurações de acessibilidade
function applyAccessibilitySettings(settings: AccessibilityState) {
  const root = document.documentElement

  // Aplicar tamanho da fonte
  const fontSizeMap = {
    small: '14px',
    medium: '16px',
    large: '18px',
    'extra-large': '22px'
  }
  root.style.fontSize = fontSizeMap[settings.fontSize]

  // Aplicar contraste
  if (settings.contrast === 'high') {
    root.classList.add('high-contrast')
  } else {
    root.classList.remove('high-contrast')
  }

  // Aplicar tema
  if (settings.theme === 'dark') {
    root.classList.add('dark')
  } else if (settings.theme === 'light') {
    root.classList.remove('dark')
  } else {
    // Auto - seguir preferência do sistema
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (prefersDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  // Aplicar configurações de animação
  if (!settings.animations) {
    root.style.setProperty('--animation-duration', '0s')
    root.style.setProperty('--transition-duration', '0s')
  } else {
    root.style.removeProperty('--animation-duration')
    root.style.removeProperty('--transition-duration')
  }

  // Definir velocidade da voz
  root.style.setProperty('--voice-speed', settings.voiceSpeed.toString())
}