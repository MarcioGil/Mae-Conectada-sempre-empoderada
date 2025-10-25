'use client'

import { useState, useEffect } from 'react'

interface EmergencyContact {
  id: string
  name: string
  phone: string
  type: 'family' | 'medical' | 'legal' | 'government'
  description: string
}

const defaultContacts: EmergencyContact[] = [
  {
    id: '1',
    name: 'SAMU',
    phone: '192',
    type: 'medical',
    description: 'Emergências médicas urgentes'
  },
  {
    id: '2', 
    name: 'Polícia Militar',
    phone: '190',
    type: 'legal',
    description: 'Emergências de segurança'
  },
  {
    id: '3',
    name: 'Bombeiros',
    phone: '193',
    type: 'medical',
    description: 'Emergências de incêndio e resgate'
  },
  {
    id: '4',
    name: 'Disque Denúncia Violência Mulher',
    phone: '180',
    type: 'legal',
    description: 'Central de atendimento à mulher'
  },
  {
    id: '5',
    name: 'Conselho Tutelar',
    phone: '136',
    type: 'government',
    description: 'Proteção de crianças e adolescentes'
  },
  {
    id: '6',
    name: 'CAPS - Centro de Atenção Psicossocial',
    phone: '0800-644-0011',
    type: 'medical', 
    description: 'Saúde mental e apoio psicológico'
  }
]

export default function EmergencySystem() {
  const [contacts, setContacts] = useState<EmergencyContact[]>(defaultContacts)
  const [isEmergency, setIsEmergency] = useState(false)
  const [emergencyType, setEmergencyType] = useState<string>('')
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    // Tentar obter localização para emergências
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.log('Localização não disponível:', error)
        }
      )
    }
  }, [])

  const makeCall = (phone: string, contactName: string) => {
    // Registrar a chamada de emergência
    console.log(`Chamada de emergência para ${contactName}: ${phone}`)
    
    // Tentar fazer a chamada
    if (typeof window !== 'undefined') {
      window.open(`tel:${phone}`, '_self')
    }
  }

  const sendLocationSMS = () => {
    if (location && typeof window !== 'undefined') {
      const message = encodeURIComponent(
        `EMERGÊNCIA FAMÍLIA MÃE CONECTA - Localização: https://maps.google.com/?q=${location.lat},${location.lng} - Preciso de ajuda urgente!`
      )
      window.open(`sms:?body=${message}`, '_self')
    }
  }

  const shareLocation = () => {
    if (navigator.share && location) {
      navigator.share({
        title: 'Minha Localização - Emergência',
        text: 'Estou em situação de emergência. Esta é minha localização atual:',
        url: `https://maps.google.com/?q=${location.lat},${location.lng}`
      })
    }
  }

  if (isEmergency) {
    return (
      <div className="min-h-screen bg-red-50 p-4">
        <div className="max-w-md mx-auto">
          <div className="bg-red-600 text-white p-6 rounded-t-xl text-center">
            <h1 className="text-2xl font-bold">🚨 MODO EMERGÊNCIA</h1>
            <p className="mt-2">Escolha o tipo de ajuda que precisa</p>
          </div>
          
          <div className="bg-white p-6 rounded-b-xl shadow-lg">
            <div className="grid gap-4">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => makeCall(contact.phone, contact.name)}
                  className={`
                    p-4 rounded-lg text-left transition-all duration-200
                    border-2 hover:scale-105 focus:outline-none focus:ring-2
                    ${contact.type === 'medical' ? 'bg-red-100 border-red-300 hover:bg-red-200' :
                      contact.type === 'legal' ? 'bg-blue-100 border-blue-300 hover:bg-blue-200' :
                      'bg-green-100 border-green-300 hover:bg-green-200'
                    }
                  `}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-800">{contact.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{contact.description}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-gray-800">{contact.phone}</div>
                      <div className="text-xs text-gray-500">Toque para ligar</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {location && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="font-bold text-gray-800 mb-3">🗺️ Enviar Localização</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={sendLocationSMS}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg font-medium"
                  >
                    📱 SMS
                  </button>
                  <button
                    onClick={shareLocation}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium"
                  >
                    📤 Compartilhar
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setIsEmergency(false)}
              className="w-full mt-6 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg font-medium"
            >
              Cancelar Emergência
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white border-2 border-red-300 rounded-xl p-4 shadow-lg max-w-sm">
      <div className="text-center mb-4">
        <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-white text-2xl">🚨</span>
        </div>
        <h2 className="text-lg font-bold text-gray-800">Central de Emergência</h2>
        <p className="text-sm text-gray-600">Ajuda rápida quando você mais precisa</p>
      </div>

      <button
        onClick={() => setIsEmergency(true)}
        className="w-full bg-red-500 hover:bg-red-600 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        🆘 ATIVAR EMERGÊNCIA
      </button>

      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Em caso de emergência real, toque no botão acima para acesso rápido a contatos de ajuda</p>
      </div>

      <div className="mt-3 pt-3 border-t border-gray-200">
        <h4 className="font-semibold text-sm text-gray-700 mb-2">Contatos Rápidos:</h4>
        <div className="grid grid-cols-3 gap-2">
          <button 
            onClick={() => makeCall('192', 'SAMU')}
            className="bg-red-100 hover:bg-red-200 text-red-700 p-2 rounded text-xs font-medium"
          >
            SAMU 192
          </button>
          <button 
            onClick={() => makeCall('190', 'Polícia')}
            className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-2 rounded text-xs font-medium"
          >
            PM 190
          </button>
          <button 
            onClick={() => makeCall('180', 'Mulher')}
            className="bg-purple-100 hover:bg-purple-200 text-purple-700 p-2 rounded text-xs font-medium"
          >
            Mulher 180
          </button>
        </div>
      </div>
    </div>
  )
}