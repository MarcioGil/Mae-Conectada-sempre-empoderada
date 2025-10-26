'use client';

import React, { useState } from 'react';

export default function ClaraSimple() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('');

  const falar = (texto: string) => {
    try {
      if ('speechSynthesis' in window) {
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        speechSynthesis.speak(fala);
      }
    } catch (error) {
      console.log('Erro na fala:', error);
    }
  };

  const abrirChat = () => {
    console.log('Botão clicado!');
    setIsVisible(true);
    const msg = 'Oi! Eu sou a Clara! Como posso ajudar você?';
    setMessage(msg);
    falar(msg);
  };

  const fecharChat = () => {
    console.log('Fechando chat');
    setIsVisible(false);
    setMessage('');
  };

  const ajudaAmamentacao = () => {
    console.log('Botão amamentação clicado');
    const msg = 'Você tem direito a amamentar! É lei! Se alguém te incomodar, é crime!';
    setMessage(msg);
    falar(msg);
  };

  const ajudaViolencia = () => {
    console.log('Botão violência clicado');
    const msg = 'Você não merece violência! Ligue 180 para Maria da Penha ou 190 para emergência!';
    setMessage(msg);
    falar(msg);
  };

  const ajudaDireitos = () => {
    console.log('Botão direitos clicado');
    const msg = 'Seus direitos são sagrados! Procure a Defensoria Pública - é gratuito!';
    setMessage(msg);
    falar(msg);
  };

  return (
    <>
      {/* Botão da Clara */}
      <button
        onClick={abrirChat}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '80px',
          height: '80px',
          backgroundColor: '#ec4899',
          color: 'white',
          borderRadius: '50%',
          border: 'none',
          fontSize: '30px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
        }}
      >
        👩‍⚕️
      </button>

      {/* Chat da Clara */}
      {isVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1001
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '20px',
              maxWidth: '400px',
              width: '90%',
              maxHeight: '80%',
              overflow: 'auto'
            }}
          >
            {/* Header */}
            <div
              style={{
                backgroundColor: '#ec4899',
                color: 'white',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '15px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <div>
                <h3 style={{ margin: 0 }}>👩‍⚕️ Clara</h3>
                <p style={{ margin: 0, fontSize: '14px' }}>Sua Assistente</p>
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
            <div
              style={{
                backgroundColor: '#fce7f3',
                padding: '15px',
                borderRadius: '10px',
                marginBottom: '15px',
                border: '2px solid #ec4899'
              }}
            >
              <p style={{ margin: 0, color: '#333' }}>
                {message || 'Clique em uma opção para começar!'}
              </p>
            </div>

            {/* Botões */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button
                onClick={ajudaAmamentacao}
                style={{
                  backgroundColor: '#ec4899',
                  color: 'white',
                  border: 'none',
                  padding: '15px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                🤱 Amamentação & Direitos
              </button>

              <button
                onClick={ajudaViolencia}
                style={{
                  backgroundColor: '#dc2626',
                  color: 'white',
                  border: 'none',
                  padding: '15px',
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
                  padding: '15px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ⚖️ Meus Direitos Legais
              </button>
            </div>

            <div
              style={{
                marginTop: '15px',
                padding: '10px',
                backgroundColor: '#f3e8ff',
                borderRadius: '8px',
                textAlign: 'center'
              }}
            >
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                💜 Você é forte e nunca está sozinha! 💜
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}