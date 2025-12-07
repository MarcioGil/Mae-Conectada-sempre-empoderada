const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

const app = express();

// Segurança HTTP headers
app.use(helmet());

// Rate limiting (100 req/15min por IP)
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false
}));

// CORS restrito (ajuste origin conforme necessário)
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));

// LGPD: cabeçalho de consentimento
app.use((req, res, next) => {
  res.setHeader('X-LGPD-Consent', 'true');
  next();
});

app.use(express.json());

// ...existing code...
app.get('/vagas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vagas ORDER BY criado_em DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao listar vagas.' });
  }
});

// Buscar vaga por id
app.get('/vagas/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vagas WHERE id = $1', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Vaga não encontrada.' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar vaga.' });
  }
});

// Atualizar vaga
app.put('/vagas/:id', authenticateToken, async (req, res) => {
  const { titulo, descricao, localidade, remoto, horario } = req.body;
  try {
    const result = await pool.query(
      'UPDATE vagas SET titulo = $1, descricao = $2, localidade = $3, remoto = $4, horario = $5 WHERE id = $6 RETURNING *',
      [titulo, descricao, localidade, remoto, horario, req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ error: 'Vaga não encontrada.' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar vaga.' });
  }
});

// Deletar vaga
app.delete('/vagas/:id', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM vagas WHERE id = $1 RETURNING *', [req.params.id]);
    if (!result.rows.length) return res.status(404).json({ error: 'Vaga não encontrada.' });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao deletar vaga.' });
  }
});
dotenv.config();
// ...existing code...

// Middleware de autenticação JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Rota de teste
app.get('/', (req, res) => {
  res.json({ status: 'Backend rodando com segurança!' });
});

// Rota de registro de usuário
app.post('/register', async (req, res) => {
  const { nome, email, senha } = req.body;
  if (!nome || !email || !senha) return res.status(400).json({ error: 'Campos obrigatórios.' });
  const hash = await bcrypt.hash(senha, 10);
  try {
    await pool.query('INSERT INTO usuarios (nome, email, senha) VALUES ($1, $2, $3)', [nome, email, hash]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao registrar.' });
  }
});

// Rota de login
app.post('/login', async (req, res) => {
  const { email, senha } = req.body;
  if (!email || !senha) return res.status(400).json({ error: 'Campos obrigatórios.' });
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];
    if (!user) return res.status(401).json({ error: 'Usuário não encontrado.' });
    const valid = await bcrypt.compare(senha, user.senha);
    if (!valid) return res.status(401).json({ error: 'Senha inválida.' });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '2h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao logar.' });
  }
});

// Rota protegida de exemplo
app.get('/perfil', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT id, nome, email FROM usuarios WHERE id = $1', [req.user.id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar perfil.' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
