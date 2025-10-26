'use client';

import React, { useState } from 'react';

export default function ClaraTest() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('Oi, minha linda! 💜 Eu sou a Clara!');

  const falar = (texto: string) => {
    console.log('Tentando falar:', texto);
    try {
      if ('speechSynthesis' in window) {
        const fala = new SpeechSynthesisUtterance(texto);
        fala.lang = 'pt-BR';
        speechSynthesis.speak(fala);
        console.log('Falando!');
      } else {
        console.log('Sem suporte a voz');
      }
    } catch (erro) {
      console.log('Erro:', erro);
    }
  };

  const abrirClara = () => {
    console.log('Abrindo Clara...');
    setIsOpen(true);
    setMessage('Oi, minha linda! 💜 Eu sou a Clara, sua companheira virtual!');
    falar('Oi, minha linda! Eu sou a Clara!');
  };

  const fecharClara = () => {
    console.log('Fechando Clara...');
    setIsOpen(false);
  };

  const ajudarViolencia = () => {
    console.log('Botão violência clicado');
    const msg = 'VOCÊ NÃO MERECE VIOLÊNCIA! Ligue 180 para Maria da Penha, 190 para emergência. EU ACREDITO EM VOCÊ!';
    setMessage(msg);
    falar(msg);
  };

  const ajudarDireitos = () => {
    console.log('Botão direitos clicado');
    const msg = 'Seus direitos são SAGRADOS! Você tem direito a licença maternidade, creche, auxílio. Procure a Defensoria Pública!';
    setMessage(msg);
    falar(msg);
  };

  const ajudarEmergencia = () => {
    console.log('Botão emergência clicado');
    const msg = 'EMERGÊNCIA! Se está em perigo AGORA: Ligue 190! Para violência doméstica: 180. SUA VIDA IMPORTA!';
    setMessage(msg);
    falar(msg);
  };

  return (
    <>
      {/* Botão da Clara */}
      <button
        onClick={abrirClara}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#e91e63',
          color: 'white',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
        }}
      >
        👩‍⚕️<br/>
        <small style={{fontSize: '10px'}}>CLARA</small>
      </button>

      {/* Modal da Clara */}
      {isOpen && (
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
          zIndex: 1001,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '10px',
            padding: '20px',
            maxWidth: '400px',
            width: '100%',
            maxHeight: '80vh',
            overflow: 'auto'
          }}>
            {/* Header */}
            <div style={{
              backgroundColor: '#e91e63',
              color: 'white',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '15px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div>
                <span style={{fontSize: '24px', marginRight: '10px'}}>👩‍⚕️</span>
                <strong>Clara - Sua Companheira</strong>
              </div>
              <button
                onClick={fecharClara}
                style={{
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: 'white',
                  fontSize: '20px',
                  cursor: 'pointer',
                  padding: '5px'
                }}
              >
                ✕
              </button>
            </div>

            {/* Mensagem */}
            <div style={{
              backgroundColor: '#fce4ec',
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '15px',
              borderLeft: '4px solid #e91e63'
            }}>
              <p style={{margin: 0, color: '#333', lineHeight: '1.5'}}>{message}</p>
            </div>

            {/* Botões */}
            <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
              <button
                onClick={ajudarViolencia}
                style={{
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                🛡️ Proteção Contra Violência
              </button>

              <button
                onClick={ajudarDireitos}
                style={{
                  backgroundColor: '#9c27b0',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                ⚖️ Meus Direitos Legais
              </button>

              <button
                onClick={ajudarEmergencia}
                style={{
                  backgroundColor: '#ff5722',
                  color: 'white',
                  border: 'none',
                  padding: '12px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                🚨 EMERGÊNCIA - Preciso de Ajuda AGORA!
              </button>
            </div>

            <div style={{
              backgroundColor: '#f3e5f5',
              padding: '10px',
              borderRadius: '6px',
              marginTop: '15px',
              textAlign: 'center'
            }}>
              <small style={{color: '#666'}}>
                💜 <strong>Lembre-se:</strong> Você é forte e nunca está sozinha! 💜
              </small>
            </div>
          </div>
        </div>
      )}
    </>
  );
}