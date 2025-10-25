// Configuração de português brasileiro para toda a aplicação
export const PORTUGUESE_LOCALE = 'pt-BR'

// Mensagens em português brasileiro
export const MESSAGES = {
  // Assistente Clara
  CLARA: {
    GREETING: 'Olá! Sou Clara, sua assistente virtual. Como posso ajudar você hoje?',
    GREETING_SHORT: 'Oi! Estou aqui para te apoiar. Em que posso ser útil?',
    LISTENING: 'Estou ouvindo...',
    SPEAKING: 'Clara está falando...',
    ERROR_RECOGNITION: 'Não consegui entender. Tente falar mais claramente.',
    ERROR_SYNTHESIS: 'Erro na síntese de voz. Tente novamente.',
    NOT_SUPPORTED: 'Seu navegador não suporta reconhecimento de voz. Use Chrome ou Safari.',
    COMMANDS_HELP: 'Você pode dizer: direitos, trabalho, cursos, emergência, documentos ou ajuda.',
    GOODBYE: 'Até logo! Estarei aqui quando precisar. Cuide-se!',
    THANKS_RESPONSE: 'De nada! Estou sempre aqui para você. Precisando, é só chamar!',
    NOT_UNDERSTOOD: 'Desculpe, não entendi. Tente dizer "ajuda" para ver o que posso fazer.'
  },

  // Navegação e Comandos
  NAVIGATION: {
    GOING_TO_RIGHTS: 'Abrindo seus direitos e benefícios.',
    GOING_TO_WORK: 'Buscando oportunidades de trabalho para você.',
    GOING_TO_COURSES: 'Mostrando cursos e capacitações disponíveis.',
    GOING_TO_DOCUMENTS: 'Abrindo centro de documentos.',
    GOING_TO_EMERGENCY: 'Ativando sistema de emergência.',
    GOING_TO_PROTECTION: 'Abrindo proteção contra violência.',
    GOING_TO_COMMUNITY: 'Conectando você à comunidade.',
    GOING_TO_HOME: 'Voltando à página inicial. Bem-vinda de volta!'
  },

  // Sistema de Emergência
  EMERGENCY: {
    ACTIVATED: 'Sistema de emergência ativado. Você está segura.',
    LOCATION_SENT: 'Localização enviada para contatos de emergência.',
    HELP_CALLED: 'Ajuda está sendo chamada. Mantenha-se segura.',
    SILENT_MODE: 'Modo silencioso ativado. Sistema funcionando discretamente.'
  },

  // Botões e Interface
  UI: {
    START_LISTENING: 'Começar a ouvir',
    STOP_LISTENING: 'Parar de ouvir',
    START_SPEAKING: 'Falar com Clara',
    STOP_SPEAKING: 'Parar de falar',
    ACTIVATE_EMERGENCY: 'Ativar Emergência',
    CREATE_WHATSAPP_GROUP: 'Criar Grupo WhatsApp',
    OPEN_DOCUMENTS: 'Abrir Documentos',
    LEARN_RIGHTS: 'Aprender Direitos',
    GET_HELP: 'Obter Ajuda'
  },

  // Status e Feedback
  STATUS: {
    MICROPHONE_ON: 'Microfone ligado',
    MICROPHONE_OFF: 'Microfone desligado',
    SPEAKING: 'Falando...',
    LISTENING: 'Ouvindo...',
    PROCESSING: 'Processando...',
    ERROR: 'Erro',
    SUCCESS: 'Sucesso',
    LOADING: 'Carregando...'
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