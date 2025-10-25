'use client'

import { useState, useRef, useEffect } from 'react'

interface ClaraFixedProps {
  className?: string
}

export default function ClaraFixed({ className = '' }: ClaraFixedProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [status, setStatus] = useState('Pronta para conversar')
  const [lastCommand, setLastCommand] = useState('')
  const recognitionRef = useRef<any>(null)
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasRecognition = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
      const hasSynthesis = 'speechSynthesis' in window
      setIsSupported(hasRecognition && hasSynthesis)
      
      if (!hasRecognition || !hasSynthesis) {
        setStatus('Navegador não suporta voz - use Chrome ou Safari')
      }
    }
  }, [])

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'pt-BR'
      utterance.rate = 0.8
      utterance.pitch = 1.2
      utterance.volume = 1.0
      
      utterance.onstart = () => {
        setIsSpeaking(true)
        setStatus('Clara conversando...')
      }
      
      utterance.onend = () => {
        setIsSpeaking(false)
        setStatus('Pronta para conversar')
      }
      
      utterance.onerror = () => {
        setIsSpeaking(false)
        setStatus('Erro na voz')
      }
      
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
        setStatus('Te ouvindo...')
        
        // Timeout de 8 segundos
        timeoutRef.current = window.setTimeout(() => {
          stopListening()
          speak('Não consegui ouvir nada. Clique novamente para tentar!')
        }, 8000)
      }

      recognitionRef.current.onresult = (event: any) => {
        clearTimeouts()
        const command = event.results[0][0].transcript.toLowerCase()
        setLastCommand(command)
        processCommand(command)
      }

      recognitionRef.current.onend = () => {
        clearTimeouts()
        setIsListening(false)
        setStatus('Pronta para conversar')
      }

      recognitionRef.current.onerror = () => {
        clearTimeouts()
        setIsListening(false)
        setStatus('Erro - tente novamente')
        speak('Não consegui entender. Tente falar mais alto!')
      }

      try {
        recognitionRef.current.start()
      } catch (error) {
        clearTimeouts()
        setIsListening(false)
        setStatus('Erro ao iniciar')
        speak('Erro no microfone. Tente novamente!')
      }
    }
  }

  const stopListening = () => {
    clearTimeouts()
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
    setIsListening(false)
  }

  const clearTimeouts = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
  }

  const processCommand = (command: string) => {
    console.log('Comando:', command)
    const cmd = command.toLowerCase().trim()
    
    // Saudações
    if (cmd.includes('olá') || cmd.includes('oi') || cmd.includes('clara')) {
      speak('Oi querida! Sou a Clara. Diga direitos, trabalho, cursos, emergência ou ajuda!')
      return
    }
    
    // Navegação
    if (cmd.includes('direito')) {
      speak('Indo para seus direitos!')
      setTimeout(() => window.location.href = '/direitos', 1500)
      return
    }
    
    if (cmd.includes('trabalho')) {
      speak('Vamos buscar trabalho juntas!')
      setTimeout(() => window.location.href = '/trabalho', 1500)
      return
    }
    
    if (cmd.includes('curso') || cmd.includes('estudo')) {
      speak('Ótimo! Vamos estudar!')
      setTimeout(() => window.location.href = '/cursos', 1500)
      return
    }
    
    if (cmd.includes('educação') || cmd.includes('aprender')) {
      speak('Que bom que quer aprender!')
      setTimeout(() => window.location.href = '/educacao', 1500)
      return
    }
    
    if (cmd.includes('documento')) {
      speak('Vamos organizar seus documentos!')
      setTimeout(() => window.location.href = '/documentos', 1500)
      return
    }
    
    if (cmd.includes('emergência') || cmd.includes('socorro') || cmd.includes('ajuda urgente')) {
      speak('Acionando emergência! Você é corajosa!')
      setTimeout(() => window.location.href = '/emergencia', 1500)
      return
    }
    
    if (cmd.includes('proteção') || cmd.includes('proteger')) {
      speak('Vou te mostrar como se proteger!')
      setTimeout(() => window.location.href = '/protecao', 1500)
      return
    }
    
    if (cmd.includes('comunidade') || cmd.includes('mães')) {
      speak('Vamos conectar você com outras mães!')
      setTimeout(() => window.location.href = '/comunidade', 1500)
      return
    }
    
    if (cmd.includes('início') || cmd.includes('home')) {
      speak('Voltando para casa!')
      setTimeout(() => window.location.href = '/', 1500)
      return
    }
    
    if (cmd.includes('ajuda') || cmd.includes('comando')) {
      speak('Posso te ajudar com: direitos, trabalho, cursos, educação, documentos, emergência, proteção e comunidade. O que você precisa?')
      return
    }
    
    // Não entendeu
    speak('Não entendi. Tente: direitos, trabalho, cursos, emergência ou ajuda!')
  }

  const toggleVoice = () => {
    if (isListening) {
      stopListening()
    } else if (isSpeaking) {
      window.speechSynthesis?.cancel()
      setIsSpeaking(false)
      setStatus('Parei de falar')
    } else {
      startListening()
    }
  }

  if (!isSupported) {
    return (
      <div className={`bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg ${className}`}>
        <p className="text-sm">❌ Clara não funciona neste navegador</p>
        <p className="text-xs mt-1">Use Chrome, Edge ou Safari</p>
      </div>
    )
  }

  return (
    <div className={`bg-purple-50 border-2 border-purple-300 rounded-xl p-4 shadow-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold">C</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">Clara</h3>
          <p className="text-xs text-gray-600">{status}</p>
        </div>
        {(isListening || isSpeaking) && (
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
        )}
      </div>

      {/* Botão Principal */}
      <button
        onClick={toggleVoice}
        disabled={false}
        className={`
          w-full py-3 px-4 rounded-lg font-bold text-sm transition-all duration-200
          ${isListening 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : isSpeaking
            ? 'bg-orange-500 hover:bg-orange-600 text-white'
            : 'bg-purple-500 hover:bg-purple-600 text-white'
          }
          focus:outline-none focus:ring-2 focus:ring-purple-300
        `}
      >
        {isListening ? (
          <>🎤 OUVINDO... (clique para parar)</>
        ) : isSpeaking ? (
          <>🔊 FALANDO... (clique para parar)</>
        ) : (
          <>🎙️ CONVERSAR COM CLARA</>
        )}
      </button>

      {/* Último comando */}
      {lastCommand && (
        <div className="mt-3 p-2 bg-purple-100 rounded border">
          <p className="text-xs text-purple-700">
            <strong>Você disse:</strong> "{lastCommand}"
          </p>
        </div>
      )}

      {/* Dicas */}
      <div className="mt-3 p-2 bg-white rounded border">
        <p className="text-xs text-gray-600">
          <strong>Tente dizer:</strong> "Olá Clara", "Direitos", "Trabalho", "Cursos", "Emergência", "Ajuda"
        </p>
      </div>
    </div>
  )
}