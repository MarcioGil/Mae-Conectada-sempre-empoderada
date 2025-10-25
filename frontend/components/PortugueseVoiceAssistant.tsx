'use client'

import { useState, useRef, useEffect } from 'react'

interface PortugueseVoiceAssistantProps {
  className?: string
}

export default function PortugueseVoiceAssistant({ className = '' }: PortugueseVoiceAssistantProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [lastCommand, setLastCommand] = useState('')
  const [status, setStatus] = useState('Pronta para ouvir')
  const recognitionRef = useRef<any>(null)

  useEffect(() => {
    // Verificar suporte do navegador
    if (typeof window !== 'undefined') {
      const hasRecognition = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window
      const hasSynthesis = 'speechSynthesis' in window
      setIsSupported(hasRecognition && hasSynthesis)
      
      if (!hasRecognition || !hasSynthesis) {
        setStatus('Navegador não suporta reconhecimento de voz')
      }
    }
  }, [])

  // Função para falar em português brasileiro
  const falarPortugues = (texto: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(texto)
      
      // Configuração específica para português brasileiro
      utterance.lang = 'pt-BR'
      utterance.rate = 0.85        // Velocidade mais lenta para melhor compreensão
      utterance.pitch = 1.1        // Tom ligeiramente mais alto (feminino)
      utterance.volume = 1.0       // Volume máximo
      
      // Tentar usar voz brasileira se disponível
      const voices = window.speechSynthesis.getVoices()
      const vozBrasileira = voices.find(voice => 
        voice.lang.includes('pt-BR') && voice.name.includes('Luciana')
      ) || voices.find(voice => 
        voice.lang.includes('pt-BR')
      ) || voices.find(voice => 
        voice.lang.includes('pt')
      )
      
      if (vozBrasileira) {
        utterance.voice = vozBrasileira
      }
      
      utterance.onstart = () => {
        setIsSpeaking(true)
        setStatus('Clara está falando...')
      }
      
      utterance.onend = () => {
        setIsSpeaking(false)
        setStatus('Pronta para ouvir')
      }
      
      utterance.onerror = () => {
        setIsSpeaking(false)
        setStatus('Erro na síntese de voz')
      }
      
      window.speechSynthesis.speak(utterance)
    }
  }

  // Função para começar a escutar
  const comecarEscutar = () => {
    if (!isSupported || typeof window === 'undefined') return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    
    if (SpeechRecognition && !isListening) {
      recognitionRef.current = new SpeechRecognition()
      
      // Configuração para português brasileiro
      recognitionRef.current.lang = 'pt-BR'
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = false
      recognitionRef.current.maxAlternatives = 1

      recognitionRef.current.onstart = () => {
        setIsListening(true)
        setStatus('Estou ouvindo você...')
      }

      recognitionRef.current.onresult = (event: any) => {
        const comando = event.results[0][0].transcript
        setLastCommand(comando)
        processarComando(comando)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
        setStatus('Pronta para ouvir')
      }

      recognitionRef.current.onerror = (event: any) => {
        setIsListening(false)
        setStatus('Erro no reconhecimento')
        falarPortugues('Desculpe, não consegui entender. Tente falar mais claramente.')
      }

      try {
        recognitionRef.current.start()
      } catch (error) {
        console.error('Erro ao iniciar reconhecimento:', error)
        setIsListening(false)
        setStatus('Erro ao iniciar')
        falarPortugues('Não consegui ativar o microfone. Tente novamente.')
      }
    }
  }

  // Função para parar de escutar
  const pararEscutar = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  // Função para processar comandos em português
  const processarComando = (comando: string) => {
    console.log('Comando recebido:', comando)
    const cmd = comando.toLowerCase().trim()
    
    // Saudações e cumprimentos
    if (cmd.includes('olá clara') || cmd.includes('oi clara') || cmd.includes('ei clara')) {
      falarPortugues('Olá! Sou Clara, sua assistente virtual. Como posso ajudar você hoje?')
      return
    }
    
    if (cmd.includes('bom dia clara')) {
      falarPortugues('Bom dia! Estou aqui para te apoiar. O que você precisa?')
      return
    }
    
    if (cmd.includes('boa tarde clara')) {
      falarPortugues('Boa tarde! Como posso ser útil para você?')
      return
    }
    
    if (cmd.includes('boa noite clara')) {
      falarPortugues('Boa noite! Em que posso ajudar?')
      return
    }
    
    // Despedidas
    if (cmd.includes('tchau') || cmd.includes('até logo') || cmd.includes('parar')) {
      falarPortugues('Até logo! Estarei aqui quando você precisar. Cuide-se bem!')
      return
    }
    
    // Agradecimentos
    if (cmd.includes('obrigada') || cmd.includes('obrigado') || cmd.includes('valeu')) {
      falarPortugues('De nada! Fico feliz em ajudar. Conte comigo sempre!')
      return
    }
    
    // Navegação - Direitos
    if (cmd.includes('direito') || cmd.includes('benefício') || cmd.includes('auxílio') || cmd.includes('bpc')) {
      falarPortugues('Abrindo seus direitos e benefícios. Vou mostrar tudo que você tem direito.')
      setTimeout(() => window.location.href = '/direitos', 1500)
      return
    }
    
    // Navegação - Trabalho
    if (cmd.includes('trabalho') || cmd.includes('emprego') || cmd.includes('vaga') || cmd.includes('renda')) {
      falarPortugues('Procurando oportunidades de trabalho e renda para você.')
      setTimeout(() => window.location.href = '/trabalho', 1500)
      return
    }
    
    // Navegação - Cursos
    if (cmd.includes('curso') || cmd.includes('estudo') || cmd.includes('aprender') || cmd.includes('capacitação')) {
      falarPortugues('Mostrando cursos e capacitações disponíveis para você.')
      setTimeout(() => window.location.href = '/cursos', 1500)
      return
    }
    
    // Navegação - Documentos
    if (cmd.includes('documento') || cmd.includes('papel') || cmd.includes('arquivo') || cmd.includes('carteira')) {
      falarPortugues('Abrindo seu centro de documentos. Vamos organizar seus papéis.')
      setTimeout(() => window.location.href = '/documentos', 1500)
      return
    }
    
    // Emergência
    if (cmd.includes('emergência') || cmd.includes('socorro') || cmd.includes('ajuda urgente') || cmd.includes('perigo')) {
      falarPortugues('Ativando sistema de emergência. Você não está sozinha.')
      setTimeout(() => window.location.href = '/emergencia', 1500)
      return
    }
    
    // Proteção
    if (cmd.includes('proteção') || cmd.includes('violência') || cmd.includes('agressão') || cmd.includes('segurança')) {
      falarPortugues('Abrindo recursos de proteção e segurança. Estamos aqui para te proteger.')
      setTimeout(() => window.location.href = '/protecao', 1500)
      return
    }
    
    // Comunidade
    if (cmd.includes('comunidade') || cmd.includes('grupo') || cmd.includes('outras mães') || cmd.includes('conversar')) {
      falarPortugues('Conectando você com a comunidade de mães. Vamos conversar!')
      setTimeout(() => window.location.href = '/comunidade', 1500)
      return
    }
    
    // WhatsApp
    if (cmd.includes('whatsapp') || cmd.includes('zap') || cmd.includes('grupo whatsapp')) {
      falarPortugues('Vou te ajudar a criar ou entrar em grupos do WhatsApp.')
      setTimeout(() => window.location.href = '/whatsapp', 1500)
      return
    }
    
    // Início
    if (cmd.includes('início') || cmd.includes('home') || cmd.includes('principal') || cmd.includes('voltar')) {
      falarPortugues('Voltando para a página inicial. Bem-vinda de volta!')
      setTimeout(() => window.location.href = '/', 1500)
      return
    }
    
    // Ajuda
    if (cmd.includes('ajuda') || cmd.includes('como usar') || cmd.includes('tutorial') || cmd.includes('o que fazer')) {
      falarPortugues('Posso te ajudar com direitos, trabalho, cursos, documentos, emergência, proteção e comunidade. Diga o que você precisa!')
      return
    }
    
    // Status da Clara
    if (cmd.includes('como você está') || cmd.includes('tudo bem')) {
      falarPortugues('Estou bem e pronta para te ajudar! E você, como está?')
      return
    }
    
    // Comando não reconhecido
    falarPortugues('Não entendi esse comando. Você pode dizer: direitos, trabalho, cursos, documentos, emergência, proteção, comunidade ou ajuda.')
  }

  // Função principal para alternar voz
  const alternarVoz = () => {
    if (isListening) {
      pararEscutar()
    } else if (isSpeaking) {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel()
        setIsSpeaking(false)
        setStatus('Pronta para ouvir')
      }
    } else {
      comecarEscutar()
    }
  }

  if (!isSupported) {
    return (
      <div className={`bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg ${className}`}>
        <p className="text-sm font-medium">❌ Assistente de voz não disponível</p>
        <p className="text-xs mt-1">Use Chrome, Edge ou Safari para ter acesso à Clara</p>
      </div>
    )
  }

  return (
    <div className={`bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4 shadow-lg ${className}`}>
      {/* Header da Clara */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white font-bold text-lg">C</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-gray-800">Clara</h3>
          <p className="text-xs text-gray-600">Assistente Virtual em Português</p>
        </div>
        {(isListening || isSpeaking) && (
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-150"></div>
          </div>
        )}
      </div>

      {/* Status atual */}
      <div className="mb-4 p-2 bg-white rounded-lg border">
        <p className="text-sm text-gray-700">
          <strong>Status:</strong> {status}
        </p>
        {lastCommand && (
          <p className="text-xs text-purple-600 mt-1">
            <strong>Último comando:</strong> "{lastCommand}"
          </p>
        )}
      </div>

      {/* Botão principal */}
      <button
        onClick={alternarVoz}
        className={`
          w-full py-4 px-4 rounded-xl font-bold text-sm transition-all duration-300 transform hover:scale-105
          ${isListening 
            ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg' 
            : isSpeaking
            ? 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg'
            : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg'
          }
          focus:outline-none focus:ring-4 focus:ring-purple-300 active:scale-95
        `}
        aria-label={
          isListening ? 'Parar de ouvir' : 
          isSpeaking ? 'Parar Clara de falar' : 
          'Ativar Clara - Assistente de Voz'
        }
      >
        {isListening ? (
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xl">🎤</span>
            <span>OUVINDO... (Clique para parar)</span>
          </div>
        ) : isSpeaking ? (
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xl">🔊</span>
            <span>CLARA FALANDO... (Clique para parar)</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <span className="text-xl">🎙️</span>
            <span>FALAR COM CLARA</span>
          </div>
        )}
      </button>

      {/* Dicas de uso */}
      <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
        <p className="text-xs font-semibold text-purple-800 mb-2">💡 Experimente dizer:</p>
        <div className="grid grid-cols-2 gap-1 text-xs text-purple-700">
          <span>• "Olá Clara"</span>
          <span>• "Meus direitos"</span>
          <span>• "Trabalho"</span>
          <span>• "Cursos"</span>
          <span>• "Emergência"</span>
          <span>• "Proteção"</span>
          <span>• "Comunidade"</span>
          <span>• "Ajuda"</span>
        </div>
      </div>
    </div>
  )
}