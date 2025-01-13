// src/app.js
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const app = express();

app.use(cors({
  origin: '*',
  exposedHeaders: ['Content-Range', 'X-Total-Count']
}));

app.use(express.json());

// Middleware para adicionar Content-Range
app.use((req, res, next) => {
  const sendResponse = res.json;
  res.json = function(body) {
    if (Array.isArray(body)) {
      res.setHeader('Content-Range', `${req.path.split('/')[1]} 0-${body.length}/${body.length}`);
      res.setHeader('X-Total-Count', body.length.toString());
    }
    return sendResponse.call(this, body);
  };
  next();
});

// Rotas
app.use('/api/customers', require('./routes/customerRoutes'));
app.use('/api/dishes', require('./routes/dishRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/tables', require('./routes/tableRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes')); // Nova rota

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com banco de dados estabelecida.');
    
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados com o banco de dados.');
    
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
    process.exit(1);
  }
};

startServer();