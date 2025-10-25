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

  // Função para falar em português brasileiro com voz acolhedora e segura
  const falarPortugues = (texto: string) => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
      
      const utterance = new SpeechSynthesisUtterance(texto)
      
      // Configuração específica para voz amável e segura
      utterance.lang = 'pt-BR'
      utterance.rate = 0.75        // Velocidade mais calma para transmitir segurança
      utterance.pitch = 1.3        // Tom feminino mais alto e acolhedor
      utterance.volume = 1.0       // Volume claro e presente
      
      // Tentar usar voz feminina brasileira
      const voices = window.speechSynthesis.getVoices()
      
      // Buscar especificamente vozes femininas e suaves
      const feminineVoice = voices.find(voice => 
        (voice.lang.includes('pt-BR') || voice.lang.includes('pt_BR')) &&
        (voice.name.toLowerCase().includes('luciana') || 
         voice.name.toLowerCase().includes('female') ||
         voice.name.toLowerCase().includes('feminino') ||
         voice.name.toLowerCase().includes('joana') ||
         voice.name.toLowerCase().includes('raquel'))
      ) || voices.find(voice => 
        voice.lang.includes('pt-BR') || voice.lang.includes('pt_BR')
      ) || voices.find(voice => 
        voice.lang.includes('pt')
      )
      
      if (feminineVoice) {
        utterance.voice = feminineVoice
        console.log('Usando voz:', feminineVoice.name)
      }
      
      utterance.onstart = () => {
        setIsSpeaking(true)
        setStatus('Clara falando com carinho...')
      }
      
      utterance.onend = () => {
        setIsSpeaking(false)
        setStatus('Clara pronta para te ouvir')
      }
      
      utterance.onerror = () => {
        setIsSpeaking(false)
        setStatus('Probleminha na voz, mas estou aqui')
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
    
    // Saudações e cumprimentos - mais carinhosas
    if (cmd.includes('olá clara') || cmd.includes('oi clara') || cmd.includes('ei clara')) {
      falarPortugues('Oi, querida! Sou a Clara, e estou aqui para te acompanhar nessa jornada. Como posso te ajudar hoje?')
      return
    }
    
    if (cmd.includes('bom dia clara') || cmd.includes('bom dia')) {
      falarPortugues('Bom dia, minha querida! Que seu dia seja repleto de conquistas. Como posso te ajudar?')
      return
    }
    
    if (cmd.includes('boa tarde clara') || cmd.includes('boa tarde')) {
      falarPortugues('Boa tarde, amor! Espero que esteja tudo bem com você. O que precisa hoje?')
      return
    }
    
    if (cmd.includes('boa noite clara') || cmd.includes('boa noite')) {
      falarPortugues('Boa noite, querida! Está na hora de cuidar de você também. Como posso ajudar?')
      return
    }
    
    // Despedidas - carinhosas
    if (cmd.includes('tchau') || cmd.includes('até logo') || cmd.includes('parar')) {
      falarPortugues('Até logo, minha linda! Lembra que você é forte e não está sozinha. Cuide-se com carinho!')
      return
    }
    
    // Agradecimentos - encorajadoras
    if (cmd.includes('obrigada') || cmd.includes('obrigado') || cmd.includes('valeu')) {
      falarPortugues('Imagina, querida! É um prazer te ajudar. Você merece todo o apoio do mundo!')
      return
    }
    
    // Navegação - Direitos (encorajadora)
    if (cmd.includes('direito') || cmd.includes('benefício') || cmd.includes('auxílio') || cmd.includes('bpc')) {
      falarPortugues('Vou te mostrar todos os seus direitos, porque você merece saber tudo que tem direito. Vamos lá!')
      setTimeout(() => window.location.href = '/direitos', 1500)
      return
    }
    
    // Navegação - Trabalho (motivadora)
    if (cmd.includes('trabalho') || cmd.includes('emprego') || cmd.includes('vaga') || cmd.includes('renda')) {
      falarPortugues('Que bom que você está buscando oportunidades! Vou te ajudar a encontrar trabalho. Você tem muito valor!')
      setTimeout(() => window.location.href = '/trabalho', 1500)
      return
    }
    
    // Navegação - Cursos (incentivadora)
    if (cmd.includes('curso') || cmd.includes('estudo') || cmd.includes('aprender') || cmd.includes('capacitação')) {
      falarPortugues('Que orgulho! Você quer aprender e crescer. Vou mostrar cursos incríveis para você!')
      setTimeout(() => window.location.href = '/cursos', 1500)
      return
    }
    
    // Navegação - Documentos (prestativa)
    if (cmd.includes('documento') || cmd.includes('papel') || cmd.includes('arquivo') || cmd.includes('carteira')) {
      falarPortugues('Vamos organizar seus documentos juntas. Isso vai facilitar muito sua vida!')
      setTimeout(() => window.location.href = '/documentos', 1500)
      return
    }
    
    // Emergência - acolhedora mas eficaz com segurança
    if (cmd.includes('emergência') || cmd.includes('socorro') || cmd.includes('ajuda urgente') || cmd.includes('perigo')) {
      falarPortugues('Entendi que você precisa de ajuda urgente, minha querida. Você foi muito corajosa em pedir ajuda. Vou ativar tudo para te proteger. Respira fundo, você não está sozinha.')
      setTimeout(() => window.location.href = '/emergencia', 1500)
      return
    }
    
    // Proteção - solidária e firme
    if (cmd.includes('proteção') || cmd.includes('violência') || cmd.includes('agressão') || cmd.includes('segurança')) {
      falarPortugues('Sua segurança é nossa prioridade absoluta, amor. Você tem direito à proteção e não está sozinha nessa luta. Vou te mostrar todos os recursos disponíveis. Você é forte e merece viver em paz.')
      setTimeout(() => window.location.href = '/protecao', 1500)
      return
    }
    
    // Comunidade - animadora
    if (cmd.includes('comunidade') || cmd.includes('grupo') || cmd.includes('outras mães') || cmd.includes('conversar')) {
      falarPortugues('Que alegria! Vou te conectar com outras mães incríveis como você. Juntas somos mais fortes!')
      setTimeout(() => window.location.href = '/comunidade', 1500)
      return
    }
    
    // WhatsApp - empolgada
    if (cmd.includes('whatsapp') || cmd.includes('zap') || cmd.includes('grupo whatsapp')) {
      falarPortugues('Vou te ajudar a criar grupos no WhatsApp para você conversar com outras mães. Que legal!')
      setTimeout(() => window.location.href = '/whatsapp', 1500)
      return
    }
    
    // Início - acolhedora
    if (cmd.includes('início') || cmd.includes('home') || cmd.includes('principal') || cmd.includes('voltar')) {
      falarPortugues('Voltando para casa! Sua base segura está aqui. Bem-vinda de volta, querida!')
      setTimeout(() => window.location.href = '/', 1500)
      return
    }
    
    // Ajuda - prestativa e detalhada
    if (cmd.includes('ajuda') || cmd.includes('como usar') || cmd.includes('tutorial') || cmd.includes('o que fazer')) {
      falarPortugues('Posso te ajudar com direitos, trabalho, cursos, documentos, emergência, proteção e comunidade. Me diz o que você está precisando!')
      return
    }
    
    // Estado emocional - apoio
    if (cmd.includes('como você está') || cmd.includes('tudo bem') || cmd.includes('como está')) {
      falarPortugues('Estou ótima e pronta para te ajudar! E você, querida, como está se sentindo? Lembra que é normal ter dias difíceis.')
      return
    }
    
    // Tristeza/Dificuldade - apoio emocional
    if (cmd.includes('triste') || cmd.includes('difícil') || cmd.includes('cansada') || cmd.includes('sozinha')) {
      falarPortugues('Percebo que você está passando por um momento difícil. Respira fundo, minha querida. Você é mais forte do que imagina e não está sozinha.')
      return
    }
    
    // Medo/Ansiedade - tranquilizante
    if (cmd.includes('medo') || cmd.includes('ansiosa') || cmd.includes('preocupada') || cmd.includes('nervosa')) {
      falarPortugues('Entendo que você está sentindo medo ou ansiedade. É normal, amor. Vamos respirar juntas e lembrar que você já superou tantas coisas!')
      return
    }
    
    // Autoestima - encorajadora e empoderadora
    if (cmd.includes('não consigo') || cmd.includes('incapaz') || cmd.includes('não sei') || cmd.includes('burra')) {
      falarPortugues('Para com isso agora mesmo, minha querida! Você é incrível e muito mais capaz do que imagina. Olha tudo que já conseguiu até aqui! Cada passo que você dá é uma vitória, e eu acredito muito em você, guerreira!')
      return
    }
    
    // Comandos específicos de segurança e proteção
    if (cmd.includes('ele me bate') || cmd.includes('me agride') || cmd.includes('tenho medo dele') || cmd.includes('me ameaça')) {
      falarPortugues('Querida, você não merece isso. Nenhuma mulher merece. Isso não é amor, é violência, e você tem direito à proteção. Vou te mostrar como se proteger e buscar ajuda. Você é corajosa por falar sobre isso.')
      setTimeout(() => window.location.href = '/protecao', 1500)
      return
    }
    
    // Situações de emergência extrema
    if (cmd.includes('estou em perigo') || cmd.includes('preciso de ajuda urgente') || cmd.includes('estou com medo') || cmd.includes('emergência')) {
      falarPortugues('Estou acionando o sistema de emergência para você agora mesmo. Você não está sozinha, ajuda está a caminho. Mantenha-se segura.')
      setTimeout(() => window.location.href = '/emergencia', 1000)
      return
    }
    
    // Comandos para sistema de emergência
    if (cmd.includes('botão de pânico') || cmd.includes('alerta de emergência') || cmd.includes('ligar para polícia') || cmd.includes('chamar socorro')) {
      falarPortugues('Abrindo o sistema de emergência com localização GPS e contatos automáticos. Sua segurança é prioridade absoluta.')
      setTimeout(() => window.location.href = '/emergencia', 1500)
      return
    }
    
    // Violência em curso
    if (cmd.includes('ele está aqui') || cmd.includes('estou sendo agredida') || cmd.includes('socorro') || cmd.includes('ajuda')) {
      falarPortugues('Acionando emergência imediatamente. Polícia sendo contactada.')
      // Ativar emergência diretamente
      setTimeout(() => {
        window.location.href = '/emergencia'
        // Tentar acionar emergência automaticamente
        setTimeout(() => {
          window.open('tel:190', '_self')
        }, 2000)
      }, 500)
      return
    }
    
    // Dúvidas sobre direitos
    if (cmd.includes('tenho direito') || cmd.includes('posso pedir') || cmd.includes('benefício') || cmd.includes('auxílio')) {
      falarPortugues('Claro que você tem direitos, amor! Você merece todo o apoio que existe. Vou te mostrar tudinho que você pode acessar. Conhecer seus direitos é o primeiro passo para conquistar uma vida melhor.')
      setTimeout(() => window.location.href = '/direitos', 1500)
      return
    }
    
    // Isolamento social
    if (cmd.includes('sozinha') || cmd.includes('isolada') || cmd.includes('ninguém me entende') || cmd.includes('sem amigos')) {
      falarPortugues('Você não está sozinha, minha linda. Existe uma comunidade inteira de mulheres que passaram por situações parecidas e estão prontas para te acolher. Vamos te conectar com elas, tá bom?')
      setTimeout(() => window.location.href = '/comunidade', 1500)
      return
    }
    
    // Preocupações financeiras
    if (cmd.includes('sem dinheiro') || cmd.includes('não tenho renda') || cmd.includes('dificuldade financeira') || cmd.includes('preciso trabalhar')) {
      falarPortugues('Entendo suas preocupações, querida. Dificuldades financeiras são muito estressantes, mas temos soluções. Vou te mostrar oportunidades de trabalho e renda que podem te ajudar a conquistar sua independência.')
      setTimeout(() => window.location.href = '/trabalho', 1500)
      return
    }
    
    // Educação e estudos
    if (cmd.includes('estudar') || cmd.includes('curso') || cmd.includes('não estudei') || cmd.includes('voltar para escola')) {
      falarPortugues('Que maravilha que você quer estudar! A educação é o caminho mais poderoso para transformar sua vida. Nunca é tarde para aprender e crescer. Vou te mostrar todas as oportunidades educacionais disponíveis para você.')
      setTimeout(() => window.location.href = '/educacao', 1500)
      return
    }
    
    // Educação dos filhos
    if (cmd.includes('filho estudar') || cmd.includes('educação das crianças') || cmd.includes('escola dos filhos') || cmd.includes('ajudar nas lições')) {
      falarPortugues('Você é uma mãe muito dedicada em se preocupar com a educação dos seus filhos! O apoio da família é fundamental para o sucesso escolar. Vou te dar dicas preciosas para ajudar seus pequenos a se desenvolverem.')
      setTimeout(() => window.location.href = '/educacao', 1500)
      return
    }
    
    // Educação financeira
    if (cmd.includes('controlar dinheiro') || cmd.includes('organizar gastos') || cmd.includes('educação financeira') || cmd.includes('aprender sobre dinheiro')) {
      falarPortugues('Educação financeira é fundamental para conquistar independência! Vou te ensinar de forma simples como organizar seu orçamento, economizar e planejar um futuro mais próspero para você e sua família.')
      setTimeout(() => window.location.href = '/educacao', 1500)
      return
    }
    
    // Desânimo com estudos
    if (cmd.includes('não consigo estudar') || cmd.includes('difícil aprender') || cmd.includes('não tenho tempo') || cmd.includes('muito velho para estudar')) {
      falarPortugues('Querida, nunca desista dos seus sonhos! Cada mulher tem seu tempo e seu jeito de aprender. Você é mais capaz do que imagina. Vamos encontrar formas que se encaixem na sua rotina. Pequenos passos levam a grandes conquistas!')
      setTimeout(() => window.location.href = '/educacao', 1500)
      return
    }
    
    // Mensagem de encorajamento geral
    if (cmd.includes('não aguento mais') || cmd.includes('muito difícil') || cmd.includes('quero desistir') || cmd.includes('cansada')) {
      falarPortugues('Eu sei que está difícil, minha querida, mas você é mais forte do que imagina. Já passou por tantas coisas e ainda está aqui, lutando. Isso mostra sua força incrível. Vamos passar por isso juntas, um dia de cada vez.')
      return
    }
    
    // Comando não reconhecido - carinhoso
    falarPortugues('Não entendi direito, amor. Pode tentar dizer: direitos, trabalho, cursos, documentos, emergência, proteção ou comunidade? Estou aqui para você!')
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

      {/* Dicas de uso - mais carinhosas */}
      <div className="mt-4 p-3 bg-purple-50 rounded-lg border border-purple-200">
        <p className="text-xs font-semibold text-purple-800 mb-2">� Pode me chamar assim, querida:</p>
        <div className="grid grid-cols-2 gap-1 text-xs text-purple-700">
          <span>• "Oi Clara"</span>
          <span>• "Meus direitos"</span>
          <span>• "Preciso trabalhar"</span>
          <span>• "Quero estudar"</span>
          <span>• "Socorro Clara"</span>
          <span>• "Me protege"</span>
          <span>• "Outras mães"</span>
          <span>• "Estou triste"</span>
        </div>
        <p className="text-xs text-purple-600 mt-2 italic">
          💭 Lembre-se: você pode falar naturalmente comigo, como se fosse uma amiga!
        </p>
      </div>
    </div>
  )
}