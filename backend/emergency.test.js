const request = require('supertest');
const express = require('express');
const app = express();
app.use(express.json());

// Mock endpoint for demonstration (replace with real import in prod)
app.post('/api/emergency/trigger', (req, res) => res.status(200).json({ delivered: true }));

describe('Emergency Endpoint', () => {
  it('should trigger emergency', async () => {
    const res = await request(app)
      .post('/api/emergency/trigger')
      .send({ userId: '1', lat: -23.5, lon: -46.6, mode: 'whatsapp', contacts: ['+5511999999999'] });
    expect(res.statusCode).toEqual(200);
    expect(res.body.delivered).toBe(true);
  });
});
