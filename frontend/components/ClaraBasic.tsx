'use client';

import React, { useState } from 'react';

export default function ClaraBasic() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [currentTopic, setCurrentTopic] = useState('');

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      speechSynthesis.cancel(); // Para qualquer fala anterior
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-BR';
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const handleClick = () => {
    setIsVisible(true);
    setCurrentTopic('inicio');
    const welcomeMsg = 'Oi, minha linda! 💜 Eu sou a Clara, sua companheira virtual. Estou aqui para te empoderar, te proteger e lutar ao seu lado. Você nunca está sozinha! Como posso te ajudar hoje?';
    setMessage(welcomeMsg);
    speakMessage(welcomeMsg);
  };

  const handleTopicClick = (topic: string) => {
    setCurrentTopic(topic);
    let responseMsg = '';
    
    switch(topic) {
      case 'amamentacao':
        responseMsg = '🤱 Mãe guerreira! A amamentação é seu direito e do seu bebê. Você tem direito a 6 meses de licença, pausas para amamentar no trabalho, e ninguém pode te discriminar por isso. Se alguém te incomodar em público, é CRIME! Lei 13.435/2017. Você é forte e está fazendo o melhor para seu filho! 💪';
        break;
      case 'violencia':
        responseMsg = '🛡️ Escuta bem, minha guerreira: VOCÊ NÃO MERECE VIOLÊNCIA! Se alguém te machuca, te ameaça ou te humilha - isso é CRIME! Ligue 180 (Maria da Penha), 190 (emergência) ou 197 (polícia civil). Você tem direito a medida protetiva, casa abrigo, auxílio emergencial. EU ACREDITO EM VOCÊ! Você é mais forte do que imagina! 🦋';
        break;
      case 'direitos':
        responseMsg = '⚖️ Seus direitos são SAGRADOS, minha linda! Você tem direito a: licença maternidade, estabilidade no emprego, creche para seu filho, auxílio-creche, pensão alimentícia, BPC se precisar. NINGUÉM pode te demitir por estar grávida ou amamentando. Se violaram seus direitos, procure a Defensoria Pública - é GRATUITO! Você merece respeito! 👑';
        break;
      case 'trabalho':
        responseMsg = '💼 Mãe empreendedora! Você pode trabalhar, estudar e ser mãe - porque você é PODEROSA! Procure: programa Mulher Empreendedora, microcrédito, qualificação profissional gratuita, concursos com cotas para mães. Seu filho não é obstáculo - é sua MOTIVAÇÃO! Vamos juntas conquistar sua independência financeira! 🚀';
        break;
      case 'saude':
        responseMsg = '🏥 Sua saúde é prioridade, rainha! Você tem direito a: pré-natal completo, parto humanizado, acompanhante no parto, consultas de emergência, exames gratuitos no SUS. Se te maltrataram, DENUNCIE! Ouvidoria SUS 136. Sua vida e do seu bebê valem TUDO! Cuide-se com carinho! 💖';
        break;
      case 'emergencia':
        responseMsg = '🚨 EMERGÊNCIA! Se está em perigo AGORA: Ligue 190! Para violência doméstica: 180. Ameaça de feminicídio: 197. Se tem criança envolvida: 100 (Disque Denúncia). CORRE PARA UM LOCAL SEGURO! Você não está sozinha - toda a rede de proteção está aqui por você! SUA VIDA IMPORTA! 🆘';
        break;
      default:
        responseMsg = 'Estou aqui para te empoderar e proteger, sempre! 💜';
    }
    
    setMessage(responseMsg);
    speakMessage(responseMsg);
  };

  const closeChat = () => {
    setIsVisible(false);
    setMessage('');
    setCurrentTopic('');
    speechSynthesis.cancel(); // Para a fala ao fechar
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 
                   text-white rounded-full shadow-2xl flex flex-col items-center justify-center 
                   text-lg transition-all duration-300 hover:scale-110 z-50 animate-bounce"
        aria-label="Conversar com Clara - Sua assistente protetora"
      >
        <span className="text-2xl mb-1">👩‍⚕️</span>
        <span className="text-xs font-bold">CLARA</span>
      </button>

      {/* Modal do chat */}
      {isVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-96 overflow-hidden">
            {/* Header */}
            <div className="bg-pink-500 text-white p-4 flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">👩‍⚕️</span>
                <div>
                  <h3 className="font-semibold">Clara</h3>
                  <p className="text-sm opacity-90">Assistente Virtual</p>
                </div>
              </div>
              <button
                onClick={closeChat}
                className="text-white hover:bg-pink-600 rounded-full w-8 h-8 flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            {/* Conteúdo */}
            <div className="p-4 max-h-96 overflow-y-auto">
              <div className="bg-pink-50 rounded-lg p-3 mb-4 border-l-4 border-pink-400">
                <p className="text-gray-800 text-sm leading-relaxed">{message}</p>
              </div>
              
              <div className="space-y-3">
                <button
                  className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white rounded-lg text-sm font-medium transition-all transform hover:scale-105"
                  onClick={() => handleTopicClick('amamentacao')}
                >
                  🤱 Amamentação & Direitos Maternos
                </button>
                
                <button
                  className="w-full py-3 px-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg text-sm font-medium transition-all transform hover:scale-105"
                  onClick={() => handleTopicClick('violencia')}
                >
                  🛡️ Proteção Contra Violência
                </button>
                
                <button
                  className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white rounded-lg text-sm font-medium transition-all transform hover:scale-105"
                  onClick={() => handleTopicClick('direitos')}
                >
                  ⚖️ Meus Direitos Legais
                </button>

                <button
                  className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg text-sm font-medium transition-all transform hover:scale-105"
                  onClick={() => handleTopicClick('trabalho')}
                >
                  💼 Trabalho & Empreendedorismo
                </button>

                <button
                  className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg text-sm font-medium transition-all transform hover:scale-105"
                  onClick={() => handleTopicClick('saude')}
                >
                  🏥 Saúde & Bem-estar
                </button>

                <button
                  className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-lg text-sm font-medium transition-all transform hover:scale-105 animate-pulse"
                  onClick={() => handleTopicClick('emergencia')}
                >
                  🚨 EMERGÊNCIA - Preciso de Ajuda AGORA!
                </button>
              </div>

              <div className="mt-4 p-3 bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  💜 <strong>Lembre-se:</strong> Você é forte, corajosa e merece todo o amor do mundo. Nunca está sozinha! 💜
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}