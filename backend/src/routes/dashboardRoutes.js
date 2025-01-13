// src/routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Define a rota para as estatísticas do dashboard
router.get('/stats', async (req, res) => {
  try {
    await dashboardController.getDashboardStats(req, res);
  } catch (error) {
    console.error('Erro na rota do dashboard:', error);
    res.status(500).json({
      message: 'Erro interno do servidor',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;