'use client'

import { useState, useRef, useEffect } from 'react'
import { MESSAGES, VOICE_CONFIG, getBestPortugueseVoice, normalizeCommand, matchCommand } from '../utils/portuguese'

interface SimpleVoiceButtonProps {
  className?: string
}

export default function SimpleVoiceButton({ className = '' }: SimpleVoiceButtonProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [lastCommand, setLastCommand] = useState('')
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Verificar suporte no navegador
    if (typeof window !== 'undefined') {
      const hasRecognition = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
      const hasSynthesis = 'speechSynthesis' in window
      setIsSupported(hasRecognition && hasSynthesis)
    }
  }, [])

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      
      // Configurar para português brasileiro
      utterance.lang = VOICE_CONFIG.LANGUAGE
      utterance.rate = VOICE_CONFIG.RATE
      utterance.pitch = VOICE_CONFIG.PITCH
      utterance.volume = VOICE_CONFIG.VOLUME
      
      // Tentar usar a melhor voz em português
      const bestVoice = getBestPortugueseVoice()
      if (bestVoice) {
        utterance.voice = bestVoice
      }
      
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      utterance.onerror = () => {
        setIsSpeaking(false)
        console.error('Erro na síntese de voz')
      }
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    if (!isSupported || typeof window === 'undefined') return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (SpeechRecognition && !isListening) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.lang = VOICE_CONFIG.LANGUAGE
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        speak(MESSAGES.CLARA.LISTENING)
      }

      recognitionRef.current.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase()
        setLastCommand(command)
        handleCommand(command)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
        speak(MESSAGES.CLARA.ERROR_RECOGNITION)
      }

      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Erro ao iniciar reconhecimento:', error)
        setIsListening(false)
        speak(MESSAGES.CLARA.ERROR_RECOGNITION)
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const handleCommand = (command: string) => {
    console.log('Comando recebido:', command)
    const cmd = normalizeCommand(command)
    
    // Verificar saudações
    if (matchCommand(cmd, MESSAGES.VOICE_COMMANDS.HELLO)) {
      speak(MESSAGES.CLARA.GREETING)
      return
    }
    
    // Verificar despedidas
    if (matchCommand(cmd, MESSAGES.VOICE_COMMANDS.GOODBYE)) {
      speak(MESSAGES.CLARA.GOODBYE)
      return
    }
    
    // Verificar agradecimentos
    if (matchCommand(cmd, MESSAGES.VOICE_COMMANDS.THANKS)) {
      speak(MESSAGES.CLARA.THANKS_RESPONSE)
      return
    }
    
    // Verificar comandos de navegação
    if (matchCommand(cmd, MESSAGES.VOICE_COMMANDS.RIGHTS)) {
      speak(MESSAGES.NAVIGATION.GOING_TO_RIGHTS)
      setTimeout(() => window.location.href = '/direitos', 1000)
      return
    }
    
    if (matchCommand(cmd, MESSAGES.VOICE_COMMANDS.WORK)) {
      speak(MESSAGES.NAVIGATION.GOING_TO_WORK)
      setTimeout(() => window.location.href = '/trabalho', 1000)
      return
    }
    
    if (matchCommand(cmd, MESSAGES.VOICE_COMMANDS.COURSES)) {
      speak(MESSAGES.NAVIGATION.GOING_TO_COURSES)
      setTimeout(() => window.location.href = '/cursos', 1000)
      return
    }
    
    if (matchCommand(cmd, MESSAGES.VOICE_COMMANDS.DOCUMENTS)) {
      speak(MESSAGES.NAVIGATION.GOING_TO_DOCUMENTS)
      setTimeout(() => window.location.href = '/documentos', 1000)
      return
    }
    
    if (matchCommand(cmd, MESSAGES.VOICE_COMMANDS.EMERGENCY)) {
      speak(MESSAGES.NAVIGATION.GOING_TO_EMERGENCY)
      setTimeout(() => window.location.href = '/emergencia', 1000)
      return
    }
    
    if (matchCommand(cmd, MESSAGES.VOICE_COMMANDS.PROTECTION)) {
      speak(MESSAGES.NAVIGATION.GOING_TO_PROTECTION)
      setTimeout(() => window.location.href = '/protecao', 1000)
      return
    }
    
    if (matchCommand(cmd, MESSAGES.VOICE_COMMANDS.COMMUNITY)) {
      speak(MESSAGES.NAVIGATION.GOING_TO_COMMUNITY)
      setTimeout(() => window.location.href = '/comunidade', 1000)
      return
    }
    
    if (matchCommand(cmd, MESSAGES.VOICE_COMMANDS.HOME)) {
      speak(MESSAGES.NAVIGATION.GOING_TO_HOME)
      setTimeout(() => window.location.href = '/', 1000)
      return
    }
    
    if (matchCommand(cmd, MESSAGES.VOICE_COMMANDS.HELP)) {
      speak(MESSAGES.CLARA.COMMANDS_HELP)
      return
    }
    
    // Comando não reconhecido
    speak(MESSAGES.CLARA.NOT_UNDERSTOOD)
  }

  const toggleVoice = () => {
    if (isListening) {
      stopListening()
    } else if (isSpeaking) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
      }
    } else {
      startListening()
    }
  }

  if (!isSupported) {
    return (
      <div className={`bg-gray-200 text-gray-600 p-4 rounded-lg ${className}`}>
        <p className="text-sm">{MESSAGES.CLARA.NOT_SUPPORTED}</p>
      </div>
    )
  }

  return (
    <div className={`bg-white border-2 border-purple-300 rounded-xl p-4 shadow-lg ${className}`}>
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">C</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">Clara</h3>
          <p className="text-xs text-gray-600">Assistente Virtual</p>
        </div>
        {(isListening || isSpeaking) && (
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        )}
      </div>

      <button
        onClick={toggleVoice}
        className={`
          w-full py-3 px-4 rounded-lg font-medium text-sm transition-all duration-200
          ${isListening 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : isSpeaking
            ? 'bg-orange-500 hover:bg-orange-600 text-white'
            : 'bg-purple-500 hover:bg-purple-600 text-white'
          }
          focus:outline-none focus:ring-2 focus:ring-purple-300
        `}
        aria-label={
          isListening ? MESSAGES.UI.STOP_LISTENING : 
          isSpeaking ? MESSAGES.UI.STOP_SPEAKING : 
          MESSAGES.UI.START_SPEAKING
        }
      >
        {isListening ? (
          <>🎤 {MESSAGES.STATUS.LISTENING}</>
        ) : isSpeaking ? (
          <>🔊 {MESSAGES.STATUS.SPEAKING}</>
        ) : (
          <>🎙️ {MESSAGES.UI.START_SPEAKING}</>
        )}
      </button>

      <div className="mt-3 text-xs text-gray-500">
        <p><strong>Diga:</strong> "Olá Clara", "Direitos", "Trabalho", "Cursos" ou "Ajuda"</p>
        {lastCommand && (
          <p className="mt-1 text-purple-600">
            <strong>Último comando:</strong> "{lastCommand}"
          </p>
        )}
      </div>
    </div>
  )
}