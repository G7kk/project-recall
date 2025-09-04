const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

// Importação das rotas
const authRoutes = require('./src/routes/authRoutes');
const deckRoutes = require('./src/routes/deckRoutes');
const flashcardRoutes = require('./src/routes/flashcardRoutes');
const profileRoutes = require('./src/routes/profileRoutes');
const analyticsRoutes = require('./src/routes/analyticsRoutes');
const shareRoutes = require('./src/routes/shareRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares essenciais
app.use(cors());
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// --- ROTAS DA API ---
// Todas as rotas da API serão prefixadas com /api
app.use('/api/auth', authRoutes);
app.use('/api/decks', deckRoutes);
app.use('/api/flashcards', flashcardRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api', shareRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'API do Recall está funcionando!' });
});


// --- SERVIR O FRONTEND (PARA PRODUÇÃO) ---
// Este bloco deve vir DEPOIS de todas as rotas da API
const frontendDistPath = path.join(__dirname, '..', 'frontend', 'dist');
app.use(express.static(frontendDistPath));

// Rota "catch-all": Qualquer requisição GET que não seja para a API
// deve servir o index.html do React.
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});


// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

module.exports = app;