'use client'

import { useState, useRef, useEffect } from 'react'

interface SimpleVoiceButtonProps {
  className?: string
}

export default function SimpleVoiceButton({ className = '' }: SimpleVoiceButtonProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
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
      utterance.lang = 'pt-BR'
      utterance.rate = 0.9
      utterance.onstart = () => setIsSpeaking(true)
      utterance.onend = () => setIsSpeaking(false)
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const startListening = () => {
    if (!isSupported || typeof window === 'undefined') return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (SpeechRecognition && !isListening) {
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.lang = 'pt-BR'
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false

      recognitionRef.current.onstart = () => {
        setIsListening(true)
      }

      recognitionRef.current.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase()
        handleCommand(command)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current.onerror = () => {
        setIsListening(false)
        speak('Erro no reconhecimento. Tente novamente.')
      }

      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Erro ao iniciar reconhecimento:', error)
        setIsListening(false)
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
    
    if (command.includes('direito') || command.includes('benefício')) {
      speak('Abrindo seção de direitos')
      setTimeout(() => window.location.href = '/direitos', 1000)
    } else if (command.includes('trabalho') || command.includes('emprego')) {
      speak('Buscando oportunidades de trabalho')
      setTimeout(() => window.location.href = '/trabalho', 1000)
    } else if (command.includes('curso') || command.includes('estudo')) {
      speak('Mostrando cursos disponíveis')
      setTimeout(() => window.location.href = '/cursos', 1000)
    } else if (command.includes('ajuda')) {
      speak('Posso te ajudar com direitos, trabalho, cursos e muito mais. Como posso ajudar você hoje?')
    } else if (command.includes('clara') || command.includes('olá')) {
      speak('Olá! Sou Clara, sua assistente virtual. Como posso ajudar você hoje?')
    } else {
      speak('Não entendi. Diga: direitos, trabalho, cursos ou ajuda.')
    }
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
        <p className="text-sm">Assistente de voz não disponível neste navegador</p>
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
          isListening ? 'Parar de ouvir' : 
          isSpeaking ? 'Parar de falar' : 
          'Ativar assistente Clara'
        }
      >
        {isListening ? (
          <>🎤 Ouvindo...</>
        ) : isSpeaking ? (
          <>🔊 Falando...</>
        ) : (
          <>🎙️ Falar com Clara</>
        )}
      </button>

      <div className="mt-3 text-xs text-gray-500">
        <p><strong>Diga:</strong> "Olá Clara", "Direitos", "Trabalho", "Cursos" ou "Ajuda"</p>
      </div>
    </div>
  )
}