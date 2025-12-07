const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

// Mock endpoints for demonstration (replace with real imports in prod)
app.post('/api/auth/register', (req, res) => res.status(201).json({ success: true }));
app.post('/api/auth/login', (req, res) => res.status(200).json({ accessToken: 'token', refreshToken: 'refresh' }));
app.post('/api/auth/refresh', (req, res) => res.status(200).json({ accessToken: 'newtoken' }));
app.get('/api/user/me', (req, res) => res.status(200).json({ id: '1', email: 'test@example.com', name: 'Test' }));
app.post('/api/emergency/trigger', (req, res) => res.status(200).json({ delivered: true }));
app.post('/api/community/rooms/123/message', (req, res) => res.status(201).json({ sent: true }));
app.get('/api/vacancies', (req, res) => res.status(200).json([{ id: '1', title: 'Vaga 1', desc: '...' }]));
app.post('/api/voice/command', (req, res) => res.status(200).json({ result: 'Comando reconhecido' }));

// Test suite

describe('Integração - Fluxos Críticos', () => {
  let accessToken = '';
  let refreshToken = '';

  it('deve registrar e logar usuário', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: '123456', name: 'Test' })
      .expect(201);
    const login = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: '123456' })
      .expect(200);
    accessToken = login.body.accessToken;
    refreshToken = login.body.refreshToken;
    expect(accessToken).toBeDefined();
    expect(refreshToken).toBeDefined();
  });

  it('deve acessar perfil autenticado', async () => {
    const res = await request(app)
      .get('/api/user/me')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
    expect(res.body.email).toBe('test@example.com');
  });

  it('deve acionar emergência', async () => {
    await request(app)
      .post('/api/emergency/trigger')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ userId: '1', lat: -23.5, lon: -46.6, mode: 'whatsapp', contacts: ['+5511999999999'] })
      .expect(200);
  });

  it('deve enviar mensagem na comunidade', async () => {
    await request(app)
      .post('/api/community/rooms/123/message')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({ message: 'Olá comunidade!' })
      .expect(201);
  });

  it('deve listar vagas', async () => {
    const res = await request(app)
      .get('/api/vacancies')
      .expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('deve enviar comando de voz', async () => {
    await request(app)
      .post('/api/voice/command')
      .set('Authorization', `Bearer ${accessToken}`)
      .attach('audio', Buffer.from('audio'), 'audio.wav')
      .expect(200);
  });

  it('deve renovar token', async () => {
    const res = await request(app)
      .post('/api/auth/refresh')
      .send({ refreshToken })
      .expect(200);
    expect(res.body.accessToken).toBeDefined();
  });
});
