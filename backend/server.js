const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// ...existing code...
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

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
app.listen(PORT, () => {
  console.log(`Servidor backend rodando na porta ${PORT}`);
});
