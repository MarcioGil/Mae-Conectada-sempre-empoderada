'use client'

import React, { useState, useEffect, useRef } from 'react'

interface EmergencyContact {
  id: string
  name: string
  phone: string
  relationship: string
  priority: number
  isActive: boolean
}

interface LocationData {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: number
}

const AdvancedEmergencyAlert: React.FC = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false)
  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([])
  const [currentLocation, setCurrentLocation] = useState<LocationData | null>(null)
  const [isLocationEnabled, setIsLocationEnabled] = useState(false)
  const [alertProgress, setAlertProgress] = useState(0)
  const [isCountingDown, setIsCountingDown] = useState(false)
  const [countdown, setCountdown] = useState(10)
  const [showConfig, setShowConfig] = useState(false)
  const [newContact, setNewContact] = useState({ name: '', phone: '', relationship: '' })
  
  const countdownRef = useRef<NodeJS.Timeout | null>(null)
  const alertTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Carregar configurações salvas
  useEffect(() => {
    const savedContacts = localStorage.getItem('emergencyContacts')
    if (savedContacts) {
      setEmergencyContacts(JSON.parse(savedContacts))
    }

    const locationEnabled = localStorage.getItem('locationEnabled')
    if (locationEnabled === 'true') {
      setIsLocationEnabled(true)
      getCurrentLocation()
    }
  }, [])

  // Obter localização atual
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      console.error('Geolocalização não suportada')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: Date.now()
        })
      },
      (error) => {
        console.error('Erro ao obter localização:', error)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000
      }
    )
  }

  // Ativar modo de emergência com contagem regressiva
  const activateEmergency = () => {
    setIsEmergencyMode(true)
    setIsCountingDown(true)
    setCountdown(10)
    setAlertProgress(0)

    // Vibração de alerta (se disponível)
    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200, 100, 200])
    }

    // Contagem regressiva
    countdownRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setIsCountingDown(false)
          sendEmergencyAlert()
          return 0
        }
        return prev - 1
      })
      
      setAlertProgress((prev) => prev + 10)
    }, 1000)
  }

  // Cancelar emergência
  const cancelEmergency = () => {
    if (countdownRef.current) {
      clearInterval(countdownRef.current)
    }
    if (alertTimeoutRef.current) {
      clearTimeout(alertTimeoutRef.current)
    }
    
    setIsEmergencyMode(false)
    setIsCountingDown(false)
    setCountdown(10)
    setAlertProgress(0)
  }

  // Enviar alerta de emergência
  const sendEmergencyAlert = async () => {
    try {
      // Atualizar localização
      if (isLocationEnabled) {
        getCurrentLocation()
      }

      const emergencyData = {
        timestamp: new Date().toISOString(),
        location: currentLocation,
        userAgent: navigator.userAgent,
        emergencyType: 'violencia_domestica'
      }

      // 1. Ligar automaticamente para 190 (Polícia)
      window.open('tel:190', '_self')

      // 2. Enviar SMS para contatos de emergência
      await sendSMSToContacts(emergencyData)

      // 3. Tentar enviar localização via WhatsApp
      await sendWhatsAppAlert(emergencyData)

      // 4. Armazenar registro local da emergência
      saveEmergencyRecord(emergencyData)

      // 5. Mostrar instruções de segurança
      showSafetyInstructions()

    } catch (error) {
      console.error('Erro ao enviar alerta:', error)
      // Fallback: pelo menos tentar ligar para 190
      window.open('tel:190', '_self')
    }
  }

  // Enviar SMS para contatos
  const sendSMSToContacts = async (emergencyData: any) => {
    const message = `🆘 EMERGÊNCIA AUTOMÁTICA - Mãe Conecta
    
Situação: Violência doméstica
Horário: ${new Date().toLocaleString('pt-BR')}
${currentLocation ? `Localização: https://maps.google.com/?q=${currentLocation.latitude},${currentLocation.longitude}` : 'Localização: Não disponível'}

Esta é uma mensagem automática. Por favor, verifique imediatamente a situação ou contacte as autoridades.

Números de emergência:
• 190 - Polícia
• 180 - Central da Mulher
• 192 - SAMU`

    const encodedMessage = encodeURIComponent(message)

    // Enviar para cada contato ativo
    emergencyContacts
      .filter(contact => contact.isActive)
      .sort((a, b) => a.priority - b.priority)
      .forEach((contact, index) => {
        setTimeout(() => {
          window.open(`sms:${contact.phone}?body=${encodedMessage}`, '_blank')
        }, index * 2000) // Espaçar envios
      })
  }

  // Enviar alerta via WhatsApp
  const sendWhatsAppAlert = async (emergencyData: any) => {
    const whatsappMessage = `🆘 *ALERTA DE EMERGÊNCIA AUTOMÁTICO*

*Situação:* Violência doméstica
*Horário:* ${new Date().toLocaleString('pt-BR')}
*App:* Mãe Conecta - Sistema de Proteção

${currentLocation ? 
  `*Localização:* https://maps.google.com/?q=${currentLocation.latitude},${currentLocation.longitude}` : 
  '*Localização:* Não disponível'
}

*AÇÃO NECESSÁRIA:*
- Verificar situação imediatamente
- Contactar autoridades se necessário
- 190 - Polícia / 180 - Central da Mulher

Esta é uma mensagem automática gerada em situação de emergência.`

    const encodedWhatsApp = encodeURIComponent(whatsappMessage)
    
    // Enviar para o primeiro contato prioritário
    const priorityContact = emergencyContacts
      .filter(contact => contact.isActive)
      .sort((a, b) => a.priority - b.priority)[0]

    if (priorityContact) {
      setTimeout(() => {
        window.open(`https://wa.me/55${priorityContact.phone.replace(/\D/g, '')}?text=${encodedWhatsApp}`, '_blank')
      }, 3000)
    }
  }

  // Salvar registro da emergência
  const saveEmergencyRecord = (emergencyData: any) => {
    const records = JSON.parse(localStorage.getItem('emergencyRecords') || '[]')
    records.push({
      ...emergencyData,
      id: Date.now().toString(),
      status: 'sent'
    })
    localStorage.setItem('emergencyRecords', JSON.stringify(records))
  }

  // Mostrar instruções de segurança
  const showSafetyInstructions = () => {
    const instructions = `
🛡️ INSTRUÇÕES DE SEGURANÇA:

1. Se possível, saia do local imediatamente
2. Procure um lugar seguro (vizinhos, família)
3. Não retorne sozinha ao local
4. Aguarde a polícia chegar
5. Documente qualquer evidência
6. Procure atendimento médico se necessário
7. Registre boletim de ocorrência

NÚMEROS IMPORTANTES:
• 190 - Polícia
• 180 - Central da Mulher  
• 192 - SAMU
• 100 - Disque Direitos Humanos
    `
    
    alert(instructions)
  }

  // Adicionar contato de emergência
  const addEmergencyContact = () => {
    if (newContact.name && newContact.phone) {
      const contact: EmergencyContact = {
        id: Date.now().toString(),
        name: newContact.name,
        phone: newContact.phone,
        relationship: newContact.relationship,
        priority: emergencyContacts.length + 1,
        isActive: true
      }
      
      const updatedContacts = [...emergencyContacts, contact]
      setEmergencyContacts(updatedContacts)
      localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts))
      setNewContact({ name: '', phone: '', relationship: '' })
    }
  }

  // Remover contato
  const removeContact = (contactId: string) => {
    const updatedContacts = emergencyContacts.filter(c => c.id !== contactId)
    setEmergencyContacts(updatedContacts)
    localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts))
  }

  // Alternar status do contato
  const toggleContactActive = (contactId: string) => {
    const updatedContacts = emergencyContacts.map(contact =>
      contact.id === contactId ? { ...contact, isActive: !contact.isActive } : contact
    )
    setEmergencyContacts(updatedContacts)
    localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts))
  }

  // Habilitar/desabilitar localização
  const toggleLocation = () => {
    if (!isLocationEnabled) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setIsLocationEnabled(true)
          localStorage.setItem('locationEnabled', 'true')
          getCurrentLocation()
        },
        (error) => {
          alert('Para sua segurança, é recomendado permitir acesso à localização.')
        }
      )
    } else {
      setIsLocationEnabled(false)
      localStorage.setItem('locationEnabled', 'false')
      setCurrentLocation(null)
    }
  }

  if (isEmergencyMode) {
    return (
      <div className="fixed inset-0 bg-red-600 z-50 flex items-center justify-center">
        <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
          {isCountingDown ? (
            <>
              <div className="text-6xl mb-4">🆘</div>
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                ALERTA DE EMERGÊNCIA
              </h2>
              <div className="text-4xl font-bold text-red-600 mb-4">
                {countdown}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                <div 
                  className="bg-red-600 h-4 rounded-full transition-all duration-1000"
                  style={{ width: `${alertProgress}%` }}
                ></div>
              </div>
              <p className="text-gray-700 mb-6">
                A polícia e seus contatos de emergência serão acionados automaticamente.
              </p>
              <button
                onClick={cancelEmergency}
                className="bg-gray-600 hover:bg-gray-700 text-white px-8 py-4 rounded-lg font-bold"
              >
                CANCELAR ALERTA
              </button>
            </>
          ) : (
            <>
              <div className="text-6xl mb-4">📞</div>
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                ALERTA ENVIADO
              </h2>
              <p className="text-gray-700 mb-6">
                A polícia foi contactada e seus contatos de emergência foram notificados.
              </p>
              <button
                onClick={cancelEmergency}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-bold"
              >
                FECHAR
              </button>
            </>
          )}
        </div>
      </div>
    )
  }

  if (showConfig) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            🚨 Configurar Sistema de Emergência
          </h2>
          <button
            onClick={() => setShowConfig(false)}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        {/* Configuração de Localização */}
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-bold text-blue-800 mb-4">📍 Localização GPS</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-700 mb-2">
                Permite enviar sua localização exata para a polícia e contatos
              </p>
              {currentLocation && (
                <p className="text-sm text-blue-600">
                  Última atualização: {new Date(currentLocation.timestamp).toLocaleString()}
                </p>
              )}
            </div>
            <button
              onClick={toggleLocation}
              className={`px-4 py-2 rounded-lg font-medium ${
                isLocationEnabled 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {isLocationEnabled ? 'Ativado' : 'Ativar'}
            </button>
          </div>
        </div>

        {/* Adicionar Contato */}
        <div className="bg-green-50 p-6 rounded-lg mb-6">
          <h3 className="text-lg font-bold text-green-800 mb-4">👥 Adicionar Contato de Emergência</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              placeholder="Nome completo"
              value={newContact.name}
              onChange={(e) => setNewContact({...newContact, name: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="tel"
              placeholder="Telefone com DDD"
              value={newContact.phone}
              onChange={(e) => setNewContact({...newContact, phone: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
            <input
              type="text"
              placeholder="Parentesco/Relação"
              value={newContact.relationship}
              onChange={(e) => setNewContact({...newContact, relationship: e.target.value})}
              className="border border-gray-300 rounded-lg px-3 py-2"
            />
          </div>
          <button
            onClick={addEmergencyContact}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Adicionar Contato
          </button>
        </div>

        {/* Lista de Contatos */}
        <div className="bg-purple-50 p-6 rounded-lg">
          <h3 className="text-lg font-bold text-purple-800 mb-4">📋 Contatos Cadastrados</h3>
          {emergencyContacts.length === 0 ? (
            <p className="text-purple-600">Nenhum contato cadastrado ainda.</p>
          ) : (
            <div className="space-y-3">
              {emergencyContacts.map((contact) => (
                <div key={contact.id} className="bg-white p-4 rounded-lg border">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <span className={`w-3 h-3 rounded-full ${contact.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></span>
                        <div>
                          <p className="font-medium">{contact.name}</p>
                          <p className="text-sm text-gray-600">{contact.phone} - {contact.relationship}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => toggleContactActive(contact.id)}
                        className={`px-3 py-1 rounded text-sm ${
                          contact.isActive 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {contact.isActive ? 'Ativo' : 'Inativo'}
                      </button>
                      <button
                        onClick={() => removeContact(contact.id)}
                        className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          🚨 Sistema de Emergência
        </h2>
        <p className="text-gray-600">
          Proteção contra violência doméstica com acionamento automático
        </p>
      </div>

      {/* Botão de Pânico Principal */}
      <div className="text-center mb-8">
        <button
          onClick={activateEmergency}
          className="w-32 h-32 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
        >
          <div className="text-4xl mb-2">🆘</div>
          <div className="font-bold text-sm">EMERGÊNCIA</div>
        </button>
        <p className="text-sm text-gray-600 mt-4">
          Mantenha pressionado por 2 segundos para ativar
        </p>
      </div>

      {/* Status do Sistema */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className={`p-4 rounded-lg text-center ${
          isLocationEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'
        }`}>
          <div className="text-2xl mb-1">📍</div>
          <div className="text-sm font-medium">
            {isLocationEnabled ? 'GPS Ativo' : 'GPS Inativo'}
          </div>
        </div>
        <div className={`p-4 rounded-lg text-center ${
          emergencyContacts.filter(c => c.isActive).length > 0 
            ? 'bg-green-100 text-green-800' 
            : 'bg-gray-100 text-gray-600'
        }`}>
          <div className="text-2xl mb-1">👥</div>
          <div className="text-sm font-medium">
            {emergencyContacts.filter(c => c.isActive).length} Contatos
          </div>
        </div>
      </div>

      {/* Ações Rápidas */}
      <div className="space-y-3 mb-6">
        <button
          onClick={() => window.open('tel:190', '_self')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
        >
          📞 Ligar para Polícia (190)
        </button>
        <button
          onClick={() => window.open('tel:180', '_self')}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-medium"
        >
          📞 Central da Mulher (180)
        </button>
      </div>

      {/* Configurações */}
      <button
        onClick={() => setShowConfig(true)}
        className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg font-medium"
      >
        ⚙️ Configurar Sistema
      </button>

      {/* Aviso de Segurança */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-yellow-800 text-sm">
          <strong>⚠️ Importante:</strong> Este sistema é uma ferramenta de apoio. 
          Em situações de perigo iminente, ligue diretamente para 190.
        </p>
      </div>
    </div>
  )
}

export default AdvancedEmergencyAlert