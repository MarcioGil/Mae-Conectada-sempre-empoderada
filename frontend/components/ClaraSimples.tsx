'use client';

import React, { useState } from 'react';

export default function AnaLyzSimples() {
  const [isVisible, setIsVisible] = useState(false);

  const falar = (texto: string) => {
    try {
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        const voices = window.speechSynthesis.getVoices();
        // Lista de nomes de vozes femininas populares em pt-BR
        const nomesFemininos = [
          'luciana', 'camila', 'vitoria', 'maria', 'fernanda', 'br-female', 'female', 'mulher', 'google português do brasil', 'pt-br'
        ];
        // Tenta encontrar voz feminina por nome
        let vozFeminina = voices.find(v => v.lang.toLowerCase().startsWith('pt') && nomesFemininos.some(nome => v.name.toLowerCase().includes(nome)));
        // Se não achar, pega qualquer voz pt-BR
        if (!vozFeminina) {
          vozFeminina = voices.find(v => v.lang === 'pt-BR');
        }
        // Se ainda não achar, pega qualquer voz pt
        if (!vozFeminina) {
          vozFeminina = voices.find(v => v.lang.toLowerCase().startsWith('pt'));
        }
        utterance.voice = vozFeminina || null;
        window.speechSynthesis.speak(utterance);
        console.log('Falando:', texto, utterance.voice);
      } else {
        console.log('Síntese de voz não suportada');
      }
    } catch (error) {
      console.log('Erro ao falar:', error);
    }
  };

  const abrirChat = () => {
  console.log('Abrindo chat da Ana Lyz');
    setIsVisible(true);
  falar('Oi minha linda! Eu sou a Ana Lyz, sua companheira virtual!');
  };

  const fecharChat = () => {
  console.log('Fechando chat da Ana Lyz');
    setIsVisible(false);
  };

  const testarFala = () => {
  console.log('Testando fala da Ana Lyz');
    falar('Teste de fala! Você está me ouvindo?');
  };

  const ajudaViolencia = () => {
    console.log('Ajuda violência clicada');
    falar('Escuta bem, minha guerreira: VOCÊ NÃO MERECE VIOLÊNCIA! Ligue 180 para Maria da Penha ou 190 para emergência. EU ACREDITO EM VOCÊ!');
  };

  const ajudaDireitos = () => {
    console.log('Ajuda direitos clicada');
    falar('Seus direitos são sagrados! Você tem direito à licença maternidade, estabilidade no emprego e muito mais. Procure a Defensoria Pública se precisar!');
  };

  return (
    <>
      {/* Botão flutuante */}
      <button
        onClick={abrirChat}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '80px',
          height: '80px',
          backgroundColor: '#ec4899',
          color: 'white',
          borderRadius: '50%',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
      >
        👩‍⚕️<br/>
  <small style={{fontSize: '10px'}}>ANA LYZ</small>
      </button>

      {/* Modal do chat */}
      {isVisible && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1001
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            maxWidth: '400px',
            width: '90%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            {/* Header */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '20px',
              padding: '16px',
              backgroundColor: '#ec4899',
              color: 'white',
              borderRadius: '8px',
              margin: '-24px -24px 20px -24px'
            }}>
              <div>
                <h3 style={{margin: 0}}>👩‍⚕️ Ana Lyz - Sua Guerreira Digital</h3>
              </div>
              <button
                onClick={fecharChat}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '20px',
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            {/* Mensagem */}
            <div style={{
              backgroundColor: '#fce7f3',
              padding: '16px',
              borderRadius: '8px',
              marginBottom: '20px',
              borderLeft: '4px solid #ec4899'
            }}>
              <p style={{margin: 0, color: '#374151'}}>
                💜 Oi, minha linda! Eu sou a Ana Lyz, sua companheira virtual. 
                Estou aqui para te empoderar, te proteger e lutar ao seu lado. 
                Você nunca está sozinha! Como posso te ajudar hoje?
              </p>
            </div>

            {/* Botões */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
              <button
                onClick={testarFala}
                style={{
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                🔊 Testar Fala da Ana Lyz
              </button>

              <button
                onClick={ajudaViolencia}
                style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                🛡️ Proteção Contra Violência
              </button>

              <button
                onClick={ajudaDireitos}
                style={{
                  backgroundColor: '#7c3aed',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ⚖️ Meus Direitos Legais
              </button>
            </div>

            <div style={{
              marginTop: '20px',
              padding: '12px',
              backgroundColor: '#f3e8ff',
              borderRadius: '8px',
              textAlign: 'center'
            }}>
              <p style={{margin: 0, fontSize: '12px', color: '#6b7280'}}>
                💜 <strong>Lembre-se:</strong> Você é forte, corajosa e merece todo o amor do mundo!
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}