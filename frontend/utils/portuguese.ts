// Configuração de português brasileiro para toda a aplicação
export const PORTUGUESE_LOCALE = 'pt-BR'

// Mensagens em português brasileiro
export const MESSAGES = {
  // Assistente Clara - Tons mais acolhedores e carinhosos
  CLARA: {
    GREETING: 'Oi, querida! Sou a Clara, e estou aqui para te acompanhar nessa jornada. Como posso te ajudar hoje?',
    GREETING_SHORT: 'Olá, linda! Pode contar comigo. Em que posso te apoiar?',
    GREETING_MORNING: 'Bom dia, minha querida! Que seu dia seja repleto de conquistas. Como posso te ajudar?',
    GREETING_AFTERNOON: 'Boa tarde, amor! Espero que esteja tudo bem com você. O que precisa hoje?',
    GREETING_EVENING: 'Boa noite, querida! Está na hora de cuidar de você também. Como posso ajudar?',
    LISTENING: 'Estou aqui, te ouvindo com todo carinho...',
    SPEAKING: 'Clara está conversando com você...',
    ERROR_RECOGNITION: 'Desculpa, amor, não consegui entender bem. Pode repetir com calma?',
    ERROR_SYNTHESIS: 'Ops, tive um probleminha para falar. Tenta de novo, querida?',
    NOT_SUPPORTED: 'Querida, seu navegador não consegue me ouvir. Tenta usar o Chrome ou Safari, tá?',
    COMMANDS_HELP: 'Posso te ajudar com direitos, trabalho, cursos, emergência, documentos, proteção e muito mais. Me diz o que você está precisando!',
    GOODBYE: 'Até logo, minha linda! Lembra que você é forte e não está sozinha. Cuide-se com carinho!',
    THANKS_RESPONSE: 'Imagina, querida! É um prazer te ajudar. Você merece todo o apoio do mundo!',
    NOT_UNDERSTOOD: 'Não entendi direito, amor. Pode tentar dizer: direitos, trabalho, cursos, emergência, proteção ou ajuda? Estou aqui para você!',
    ENCOURAGEMENT: 'Você é incrível e mais forte do que imagina! Estou aqui para te apoiar sempre.',
    COMFORT: 'Respira fundo, querida. Você não está sozinha. Vamos passar por isso juntas!',
    EMPOWERMENT: 'Cada passo que você dá é uma vitória! Continue seguindo em frente, guerreira!'
  },

  // Navegação - Tons acolhedores
  NAVIGATION: {
    GOING_TO_RIGHTS: 'Vou te mostrar todos os seus direitos, porque você merece saber tudo que tem direito. Vamos lá!',
    GOING_TO_WORK: 'Que bom que você está buscando oportunidades! Vou te ajudar a encontrar trabalho. Você tem muito valor!',
    GOING_TO_COURSES: 'Que orgulho! Você quer aprender e crescer. Vou mostrar cursos incríveis para você!',
    GOING_TO_DOCUMENTS: 'Vamos organizar seus documentos juntas. Isso vai facilitar muito sua vida!',
    GOING_TO_EMERGENCY: 'Entendi que você precisa de ajuda urgente. Você é corajosa. Vou ativar tudo para te proteger!',
    GOING_TO_PROTECTION: 'Sua segurança é prioridade. Vou te mostrar todas as formas de proteção. Você não está sozinha!',
    GOING_TO_COMMUNITY: 'Que alegria! Vou te conectar com outras mães incríveis como você. Juntas somos mais fortes!',
    GOING_TO_HOME: 'Voltando para casa! Sua base segura está aqui. Bem-vinda de volta, querida!'
  },

  // Sistema de Emergência - Tranquilizante mas eficaz
  EMERGENCY: {
    ACTIVATED: 'Sistema ativado, minha querida. Você está segura agora. Respira fundo, vai dar tudo certo.',
    LOCATION_SENT: 'Sua localização foi enviada para pessoas que podem te ajudar. Você foi muito corajosa!',
    HELP_CALLED: 'Ajuda está vindo, amor. Mantenha-se forte. Você não está sozinha nessa.',
    SILENT_MODE: 'Modo silencioso ativado. Estou te protegendo discretamente. Você está segura.'
  },

  // Botões e Interface - Linguagem carinhosa
  UI: {
    START_LISTENING: 'Conversar com Clara',
    STOP_LISTENING: 'Pausar conversa',
    START_SPEAKING: 'Falar com a Clara',
    STOP_SPEAKING: 'Clara, para um pouquinho',
    ACTIVATE_EMERGENCY: 'Preciso de Ajuda Urgente',
    CREATE_WHATSAPP_GROUP: 'Criar Grupo no WhatsApp',
    OPEN_DOCUMENTS: 'Ver Meus Documentos',
    LEARN_RIGHTS: 'Conhecer Meus Direitos',
    GET_HELP: 'Como Usar a Plataforma'
  },

  // Status e Feedback
  STATUS: {
    MICROPHONE_ON: 'Clara está ouvindo',
    MICROPHONE_OFF: 'Clara em pausa',
    SPEAKING: 'Clara conversando...',
    LISTENING: 'Clara ouvindo você...',
    PROCESSING: 'Clara pensando...',
    ERROR: 'Ops, algo deu errado',
    SUCCESS: 'Perfeito!',
    LOADING: 'Carregando com carinho...'
  },

  // Mensagens de apoio emocional
  EMOTIONAL_SUPPORT: {
    STRESS: 'Percebo que você pode estar estressada. Que tal respirar fundo? Você está indo muito bem!',
    ENCOURAGEMENT: 'Você é uma guerreira! Cada dia que passa você fica mais forte.',
    CONFIDENCE: 'Confie em você, querida. Você tem tudo que precisa para vencer!',
    HOPE: 'Dias difíceis passam, mas sua força permanece. Continue acreditando!',
    STRENGTH: 'Você já superou tantas coisas! Esta também vai passar.',
    GRATITUDE: 'Que alegria poder te acompanhar nessa jornada. Você é especial!'
  },

  // Categorias e Seções
  CATEGORIES: {
    ALL: 'Todos',
    SAFETY: 'Segurança',
    COMMUNITY: 'Comunidade',
    RESOURCES: 'Recursos',
    DOCUMENTS: 'Documentos',
    EDUCATION: 'Educação'
  },

  // Comandos de Voz Reconhecidos
  VOICE_COMMANDS: {
    // Saudações
    HELLO: ['olá clara', 'oi clara', 'clara', 'ei clara'],
    GOODBYE: ['tchau', 'até logo', 'goodbye', 'parar'],
    THANKS: ['obrigada', 'obrigado', 'valeu', 'muito obrigada'],
    
    // Navegação
    RIGHTS: ['direitos', 'benefícios', 'meus direitos', 'benefício'],
    WORK: ['trabalho', 'emprego', 'vagas', 'oportunidades'],
    COURSES: ['cursos', 'estudar', 'aprender', 'capacitação'],
    DOCUMENTS: ['documentos', 'papéis', 'arquivo'],
    EMERGENCY: ['emergência', 'socorro', 'ajuda urgente', 'perigo'],
    PROTECTION: ['proteção', 'violência', 'segurança', 'agressão'],
    COMMUNITY: ['comunidade', 'grupo', 'outras mães', 'rede'],
    HOME: ['início', 'home', 'principal', 'menu'],
    
    // Ajuda
    HELP: ['ajuda', 'como usar', 'tutorial', 'o que fazer']
  }
}

// Configuração de voz em português brasileiro
export const VOICE_CONFIG = {
  LANGUAGE: 'pt-BR',
  RATE: 0.9,        // Velocidade da fala (0.1 a 10)
  PITCH: 1.0,       // Tom da voz (0 a 2)
  VOLUME: 1.0,      // Volume (0 a 1)
  VOICE_NAME: 'Microsoft Luciana Online (Natural) - Portuguese (Brazil)', // Voz preferida
  FALLBACK_VOICES: [
    'Google português do Brasil',
    'Microsoft Luciana - Portuguese (Brazil)',
    'Joana (enhanced)', // iOS Brasil
    'Luciana', // Windows Brasil
    'pt-BR-Standard-A' // Google Cloud TTS
  ]
}

// Função para selecionar a melhor voz em português brasileiro
export function getBestPortugueseVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    return null
  }

  const voices = window.speechSynthesis.getVoices()
  
  // Priorizar vozes em português brasileiro
  const brazilianVoices = voices.filter(voice => 
    voice.lang.includes('pt-BR') || voice.lang.includes('pt_BR')
  )
  
  // Procurar por voz preferida
  for (const preferredName of [VOICE_CONFIG.VOICE_NAME, ...VOICE_CONFIG.FALLBACK_VOICES]) {
    const voice = brazilianVoices.find(v => v.name.includes(preferredName))
    if (voice) return voice
  }
  
  // Retornar primeira voz brasileira disponível
  return brazilianVoices[0] || voices.find(v => v.lang.includes('pt')) || null
}

// Função para normalizar comandos de voz
export function normalizeCommand(command: string): string {
  return command
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
}

// Função para verificar se comando está na lista
export function matchCommand(input: string, commandList: string[]): boolean {
  const normalized = normalizeCommand(input)
  return commandList.some(cmd => normalized.includes(normalizeCommand(cmd)))
}