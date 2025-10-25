'use client'

import { useState } from 'react'

export default function ClaraMinimal() {
  const [isActive, setIsActive] = useState(false)
  const [status, setStatus] = useState('Clique para falar comigo')

  const speak = (text: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'pt-BR'
      utterance.rate = 0.9
      utterance.pitch = 1.1
      
      setStatus('Clara falando...')
      
      utterance.onend = () => {
        setStatus('Clique para falar comigo')
        setIsActive(false)
      }
      
      window.speechSynthesis.speak(utterance)
    }
  }

  const handleClick = () => {
    if (isActive) {
      // Para tudo
      window.speechSynthesis?.cancel()
      setIsActive(false)
      setStatus('Clique para falar comigo')
      return
    }

    setIsActive(true)
    setStatus('Fale agora!')
    
    // Reconhecimento de voz direto
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      const recognition = new SpeechRecognition()
      
      recognition.lang = 'pt-BR'
      recognition.continuous = false
      recognition.interimResults = false
      
      recognition.onresult = (event: any) => {
        const command = event.results[0][0].transcript.toLowerCase()
        setStatus(`Você disse: "${command}"`)
        processCommand(command)
        setIsActive(false)
      }
      
      recognition.onerror = () => {
        setStatus('Erro - tente de novo')
        setIsActive(false)
      }
      
      recognition.onend = () => {
        setIsActive(false)
        if (status === 'Fale agora!') {
          setStatus('Não ouvi nada - tente de novo')
        }
      }
      
      // Timeout de 5 segundos
      setTimeout(() => {
        if (recognition) {
          recognition.stop()
          setIsActive(false)
          if (status === 'Fale agora!') {
            setStatus('Tempo esgotado - tente de novo')
          }
        }
      }, 5000)
      
      try {
        recognition.start()
      } catch (error) {
        setStatus('Erro no microfone')
        setIsActive(false)
      }
    } else {
      setStatus('Navegador não suporta voz')
      setIsActive(false)
    }
  }

  const processCommand = (command: string) => {
    const cmd = command.toLowerCase()
    
    if (cmd.includes('olá') || cmd.includes('oi') || cmd.includes('clara')) {
      speak('Oi querida! Sou a Clara. Como posso te ajudar?')
    } else if (cmd.includes('direito')) {
      speak('Vamos ver seus direitos!')
      setTimeout(() => window.location.href = '/direitos', 2000)
    } else if (cmd.includes('trabalho')) {
      speak('Vamos buscar trabalho!')
      setTimeout(() => window.location.href = '/trabalho', 2000)
    } else if (cmd.includes('curso') || cmd.includes('estudo')) {
      speak('Ótimo! Vamos estudar!')
      setTimeout(() => window.location.href = '/cursos', 2000)
    } else if (cmd.includes('educação')) {
      speak('Que bom que quer aprender!')
      setTimeout(() => window.location.href = '/educacao', 2000)
    } else if (cmd.includes('emergência') || cmd.includes('socorro')) {
      speak('Acionando emergência!')
      setTimeout(() => window.location.href = '/emergencia', 2000)
    } else if (cmd.includes('documento')) {
      speak('Vamos organizar documentos!')
      setTimeout(() => window.location.href = '/documentos', 2000)
    } else if (cmd.includes('ajuda')) {
      speak('Posso te ajudar com direitos, trabalho, cursos, educação, emergência ou documentos. O que você precisa?')
    } else {
      speak('Não entendi. Tente dizer: direitos, trabalho, cursos, emergência ou ajuda.')
    }
  }

  return (
    <div className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300 rounded-xl p-4 shadow-lg max-w-sm">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">C</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">Clara</h3>
          <p className="text-xs text-gray-600">Assistente Virtual</p>
        </div>
        {isActive && (
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
          </div>
        )}
      </div>

      {/* Status */}
      <div className="mb-3 p-2 bg-white rounded-lg border border-purple-200">
        <p className="text-sm text-gray-700 text-center">{status}</p>
      </div>

      {/* Botão Principal */}
      <button
        onClick={handleClick}
        className={`
          w-full py-4 px-4 rounded-xl font-bold text-sm transition-all duration-200 transform hover:scale-105 active:scale-95
          ${isActive 
            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white' 
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white'
          }
          focus:outline-none focus:ring-4 focus:ring-purple-300 shadow-lg
        `}
      >
        {isActive ? (
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xl">🎤</span>
            <span>OUVINDO... (clique para parar)</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xl">🎙️</span>
            <span>FALAR COM CLARA</span>
          </div>
        )}
      </button>

      {/* Dicas */}
      <div className="mt-3 p-2 bg-purple-50 rounded-lg border border-purple-200">
        <p className="text-xs text-purple-700 text-center">
          <strong>Diga:</strong> "Olá Clara", "Direitos", "Trabalho", "Cursos", "Emergência" ou "Ajuda"
        </p>
      </div>
    </div>
  )
}