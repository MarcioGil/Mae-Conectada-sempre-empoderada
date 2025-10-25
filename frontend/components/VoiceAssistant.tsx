'use client'

import { useState, useRef, useEffect } from 'react'
import { MicrophoneIcon, SpeakerWaveIcon, StopIcon } from '@heroicons/react/24/outline'
import { useAccessibility } from '../contexts/AccessibilityContext'

interface VoiceAssistantProps {
  className?: string
}

export default function VoiceAssistant({ className = '' }: VoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  const synthRef = useRef<SpeechSynthesis | null>(null)
  const { announceToScreenReader } = useAccessibility()

  useEffect(() => {
    // Verificar suporte para Web Speech API
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      const speechSynthesis = window.speechSynthesis

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.continuous = false
        recognitionRef.current.interimResults = false
        recognitionRef.current.lang = 'pt-BR'

        recognitionRef.current.onstart = () => {
          setIsListening(true)
          setError(null)
          announceToScreenReader('Assistente Clara está ouvindo')
        }

        recognitionRef.current.onresult = (event) => {
          const result = event.results[0][0].transcript
          setTranscript(result)
          handleVoiceCommand(result)
        }

        recognitionRef.current.onerror = (event) => {
          setError('Erro no reconhecimento de voz. Tente novamente.')
          setIsListening(false)
          announceToScreenReader('Erro no reconhecimento de voz')
        }

        recognitionRef.current.onend = () => {
          setIsListening(false)
        }
      }

      if (speechSynthesis) {
        synthRef.current = speechSynthesis
      }
    }
  }, [announceToScreenReader])

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start()
      } catch (error) {
        setError('Não foi possível iniciar o reconhecimento de voz')
        announceToScreenReader('Erro: Não foi possível iniciar o reconhecimento de voz')
      }
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const speak = (text: string) => {
    if (synthRef.current) {
      // Parar qualquer fala anterior
      synthRef.current.cancel()
      
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'pt-BR'
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1

      utterance.onstart = () => {
        setIsSpeaking(true)
        announceToScreenReader('Clara está falando')
      }

      utterance.onend = () => {
        setIsSpeaking(false)
      }

      utterance.onerror = () => {
        setIsSpeaking(false)
        setError('Erro na síntese de voz')
      }

      synthRef.current.speak(utterance)
    }
  }

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel()
      setIsSpeaking(false)
    }
  }

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()

    // Comandos básicos de navegação
    if (lowerCommand.includes('página inicial') || lowerCommand.includes('home')) {
      window.location.href = '/'
      speak('Navegando para a página inicial')
      return
    }

    if (lowerCommand.includes('meus direitos') || lowerCommand.includes('direitos')) {
      window.location.href = '/direitos'
      speak('Abrindo a seção Direitos Sem Medo')
      return
    }

    if (lowerCommand.includes('trabalho') || lowerCommand.includes('emprego') || lowerCommand.includes('vagas')) {
      window.location.href = '/trabalho'
      speak('Abrindo o Conecta Vagas')
      return
    }

    if (lowerCommand.includes('comunidade') || lowerCommand.includes('apoio')) {
      window.location.href = '/comunidade'
      speak('Abrindo os Ninhos de Apoio')
      return
    }

    if (lowerCommand.includes('cursos') || lowerCommand.includes('aprender')) {
      window.location.href = '/cursos'
      speak('Abrindo a Academia da Mãe')
      return
    }

    if (lowerCommand.includes('saúde') || lowerCommand.includes('consulta')) {
      window.location.href = '/saude'
      speak('Abrindo o calendário de saúde')
      return
    }

    if (lowerCommand.includes('ajuda') || lowerCommand.includes('socorro')) {
      speak('Estou aqui para te ajudar! Você pode dizer: meus direitos, trabalho, comunidade, cursos ou saúde para navegar pelo app. Ou me faça uma pergunta sobre seus direitos e benefícios.')
      return
    }

    // Comando genérico - resposta padrão
    speak('Desculpe, não entendi esse comando. Diga ajuda para conhecer os comandos disponíveis.')
  }

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${className}`}>
      {/* Botão principal do assistente */}
      <div className="relative">
        <button
          onClick={isListening ? stopListening : startListening}
          disabled={isSpeaking}
          className={`
            w-16 h-16 rounded-full shadow-lg transition-all duration-300 focus-visible
            ${isListening 
              ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
              : 'bg-primary-600 hover:bg-primary-700'
            }
            ${isSpeaking ? 'opacity-50 cursor-not-allowed' : ''}
            text-white touch-target-lg
          `}
          aria-label={isListening ? 'Parar de ouvir' : 'Ativar assistente de voz Clara'}
          aria-describedby="voice-assistant-description"
        >
          {isListening ? (
            <StopIcon className="w-8 h-8 mx-auto" />
          ) : (
            <MicrophoneIcon className="w-8 h-8 mx-auto" />
          )}
        </button>

        {/* Botão para parar a fala */}
        {isSpeaking && (
          <button
            onClick={stopSpeaking}
            className="absolute -top-2 -left-2 w-8 h-8 rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-md focus-visible"
            aria-label="Parar Clara de falar"
          >
            <SpeakerWaveIcon className="w-4 h-4 mx-auto" />
          </button>
        )}

        {/* Indicador visual de status */}
        {(isListening || isSpeaking) && (
          <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-green-400 animate-bounce" />
        )}
      </div>

      {/* Feedback textual escondido para screen readers */}
      <div 
        id="voice-assistant-description" 
        className="sr-only"
      >
        Assistente de voz Clara. Aperte para falar comandos como: meus direitos, trabalho, comunidade, cursos, saúde ou ajuda.
      </div>

      {/* Transcrição atual (para debug e acessibilidade) */}
      {transcript && (
        <div 
          className="absolute bottom-20 right-0 bg-black bg-opacity-80 text-white p-3 rounded-lg max-w-xs text-sm"
          role="status"
          aria-live="polite"
        >
          <p className="font-medium">Você disse:</p>
          <p>"{transcript}"</p>
        </div>
      )}

      {/* Mensagem de erro */}
      {error && (
        <div 
          className="absolute bottom-20 right-0 bg-red-600 text-white p-3 rounded-lg max-w-xs text-sm"
          role="alert"
          aria-live="assertive"
        >
          {error}
        </div>
      )}

      {/* Tutorial flutuante para novos usuários */}
      <div className="absolute bottom-20 right-0 bg-blue-600 text-white p-4 rounded-lg max-w-sm text-sm shadow-lg hidden" id="voice-tutorial">
        <h3 className="font-bold mb-2">👋 Oi! Eu sou a Clara!</h3>
        <p className="mb-2">Seu assistente de voz. Aperte o botão e diga:</p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>"Meus direitos" - para BPC e benefícios</li>
          <li>"Trabalho" - para encontrar vagas</li>
          <li>"Comunidade" - para conversar com outras mães</li>
          <li>"Ajuda" - para mais comandos</li>
        </ul>
        <button 
          className="mt-3 text-xs underline"
          onClick={() => document.getElementById('voice-tutorial')?.classList.add('hidden')}
        >
          Entendi!
        </button>
      </div>
    </div>
  )
}