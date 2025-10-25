'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { MicrophoneIcon, SpeakerWaveIcon, StopIcon } from '@heroicons/react/24/outline'
import { useAccessibility } from '../contexts/AccessibilityContext'

interface VoiceAssistantProps {
  className?: string
}

// Declarar tipos para Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any
    webkitSpeechRecognition: any
  }
}

export default function VoiceAssistant({ className = '' }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSupported, setIsSupported] = useState(false)
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const { announceToScreenReader } = useAccessibility()

  // Verificar suporte para Web Speech API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasRecognition = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
      const hasSynthesis = 'speechSynthesis' in window
      setIsSupported(hasRecognition && hasSynthesis)
      
      if (hasSynthesis) {
        synthRef.current = window.speechSynthesis
      }
      
      if (!hasRecognition || !hasSynthesis) {
        setError('Seu navegador não suporta reconhecimento de voz. Use Chrome ou Safari.')
      }
    }
  }, [])

  // Configurar reconhecimento de voz
  useEffect(() => {
    if (!isSupported || typeof window === 'undefined') return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.lang = 'pt-BR'

      recognitionRef.current.onstart = () => {
        console.log('Reconhecimento de voz iniciado')
        setIsListening(true)
        setError(null)
        announceToScreenReader('Clara está ouvindo você')
      }

      recognitionRef.current.onresult = (event: any) => {
        const result = event.results[0][0].transcript
        console.log('Reconhecido:', result)
        setTranscript(result)
        handleVoiceCommand(result)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Erro no reconhecimento:', event.error)
        setError(`Erro: ${event.error}. Tente novamente.`)
        setIsListening(false)
        announceToScreenReader('Erro no reconhecimento de voz')
      }

      recognitionRef.current.onend = () => {
        console.log('Reconhecimento finalizado')
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [isSupported, announceToScreenReader])

  const startListening = useCallback(() => {
    if (!isSupported) {
      setError('Reconhecimento de voz não suportado')
      return
    }

    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Erro ao iniciar reconhecimento:', error)
        setError('Não foi possível iniciar o reconhecimento de voz')
        announceToScreenReader('Erro: Não foi possível iniciar o reconhecimento de voz')
      }
    }
  }, [isListening, isSupported, announceToScreenReader])

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }, [isListening])

  const speak = useCallback((text: string) => {
    if (synthRef.current) {
      // Parar qualquer fala anterior
      synthRef.current.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'pt-BR'
      utterance.rate = 0.9
      utterance.pitch = 1.0
      utterance.volume = 1.0

      utterance.onstart = () => {
        setIsSpeaking(true)
        announceToScreenReader('Clara está falando')
      }

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      utterance.onerror = (event) => {
        console.error('Erro na síntese de voz:', event)
        setIsSpeaking(false)
        setError('Erro na síntese de voz')
      }

      synthRef.current.speak(utterance)
    }
  }, [announceToScreenReader])

  const stopSpeaking = useCallback(() => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }, [])

  const handleVoiceCommand = useCallback((command: string) => {
    const normalizedCommand = command.toLowerCase().trim()
    
    // Comandos de navegação simples
    if (normalizedCommand.includes('direitos') || normalizedCommand.includes('benefício')) {
      speak('Navegando para a seção de direitos. Aqui você pode conhecer seus direitos sociais.')
      setTimeout(() => {
        window.location.href = '/direitos'
      }, 2000)
      return
    }

    if (normalizedCommand.includes('trabalho') || normalizedCommand.includes('emprego')) {
      speak('Indo para oportunidades de trabalho. Vamos encontrar vagas para você.')
      setTimeout(() => {
        window.location.href = '/trabalho'
      }, 2000)
      return
    }

    if (normalizedCommand.includes('cursos') || normalizedCommand.includes('estudo')) {
      speak('Mostrando cursos disponíveis. Vamos capacitar você.')
      setTimeout(() => {
        window.location.href = '/cursos'
      }, 2000)
      return
    }

    if (normalizedCommand.includes('comunidade') || normalizedCommand.includes('apoio')) {
      speak('Conectando você à comunidade. Vamos conversar com outras mães.')
      setTimeout(() => {
        window.location.href = '/comunidade'
      }, 2000)
      return
    }

    if (normalizedCommand.includes('saúde') || normalizedCommand.includes('médico')) {
      speak('Abrindo informações de saúde. Cuidar de você é prioridade.')
      setTimeout(() => {
        window.location.href = '/saude'
      }, 2000)
      return
    }

    // Comandos de interação
    if (normalizedCommand.includes('olá') || normalizedCommand.includes('oi') || normalizedCommand.includes('clara')) {
      speak('Olá! Sou Clara, sua assistente virtual. Como posso ajudar você hoje?')
      return
    }

    if (normalizedCommand.includes('ajuda')) {
      speak('Posso te ajudar a navegar pelo app. Diga: direitos, trabalho, cursos, comunidade ou saúde para acessar essas seções.')
      return
    }

    if (normalizedCommand.includes('obrigad')) {
      speak('De nada! Estou sempre aqui para você. Precisando, é só chamar!')
      return
    }

    if (normalizedCommand.includes('tchau') || normalizedCommand.includes('até logo')) {
      speak('Até logo! Estarei aqui quando precisar. Cuide-se!')
      return
    }

    // Comando não reconhecido
    speak('Desculpe, não entendi. Tente dizer "ajuda" para ver o que posso fazer, ou diga "olá Clara" para começarmos.')
  }, [speak])

  // Função para alternar microfone
  const toggleMicrophone = useCallback(() => {
    if (isListening) {
      stopListening()
    } else {
      startListening()
    }
  }, [isListening, startListening, stopListening])

  // Função para alternar fala
  const toggleSpeaking = useCallback(() => {
    if (isSpeaking) {
      stopSpeaking()
    } else {
      speak('Olá! Sou Clara, sua assistente virtual. Como posso ajudar você hoje?')
    }
  }, [isSpeaking, speak, stopSpeaking])

  if (!isSupported) {
    return (
      <div className={`bg-red-50 border border-red-200 rounded-lg p-4 ${className}`}>
        <p className="text-red-700 text-sm">
          Seu navegador não suporta o assistente de voz. 
          Recomendamos usar Chrome ou Safari para ter acesso à Clara.
        </p>
      </div>
    )
  }

  return (
    <div className={`bg-white border border-purple-200 rounded-2xl p-6 shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">C</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Clara</h3>
            <p className="text-sm text-gray-600">Sua assistente virtual</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {(isListening || isSpeaking) && (
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          )}
        </div>
      </div>

      {/* Status */}
      <div className="mb-4">
        {isListening && (
          <p className="text-purple-600 text-sm font-medium">
            🎤 Ouvindo...
          </p>
        )}
        {isSpeaking && (
          <p className="text-blue-600 text-sm font-medium">
            🗣️ Clara está falando...
          </p>
        )}
        {transcript && (
          <p className="text-gray-700 text-sm mt-2">
            <strong>Você disse:</strong> "{transcript}"
          </p>
        )}
        {error && (
          <p className="text-red-600 text-sm mt-2">
            ⚠️ {error}
          </p>
        )}
      </div>

      {/* Controles */}
      <div className="flex space-x-3">
        <button
          onClick={toggleMicrophone}
          disabled={isSpeaking}
          className={`
            flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl
            font-medium text-sm transition-all duration-200
            ${isListening 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-purple-500 hover:bg-purple-600 text-white'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500
          `}
          aria-label={isListening ? 'Parar de ouvir' : 'Começar a ouvir'}
          aria-pressed={isListening}
        >
          {isListening ? (
            <>
              <StopIcon className="w-5 h-5" />
              <span>Parar</span>
            </>
          ) : (
            <>
              <MicrophoneIcon className="w-5 h-5" />
              <span>Falar</span>
            </>
          )}
        </button>

        <button
          onClick={toggleSpeaking}
          disabled={isListening}
          className={`
            flex-1 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl
            font-medium text-sm transition-all duration-200
            ${isSpeaking 
              ? 'bg-red-500 hover:bg-red-600 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
            }
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
          `}
          aria-label={isSpeaking ? 'Parar de falar' : 'Ouvir Clara'}
          aria-pressed={isSpeaking}
        >
          {isSpeaking ? (
            <>
              <StopIcon className="w-5 h-5" />
              <span>Silenciar</span>
            </>
          ) : (
            <>
              <SpeakerWaveIcon className="w-5 h-5" />
              <span>Ouvir Clara</span>
            </>
          )}
        </button>
      </div>

      {/* Dicas de uso */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <p className="text-xs text-gray-600 mb-2">
          <strong>Comandos de voz:</strong>
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          <div>"Olá Clara"</div>
          <div>"Meus direitos"</div>
          <div>"Buscar trabalho"</div>
          <div>"Ver cursos"</div>
          <div>"Ajuda"</div>
          <div>"Comunidade"</div>
        </div>
      </div>
    </div>
  )
}