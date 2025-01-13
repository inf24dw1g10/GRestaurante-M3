// src/routes/tableRoutes.js
const express = require('express');
const router = express.Router();
const { Table } = require('../models');

// GET /api/tables - Lista todas as mesas
router.get('/', async (req, res) => {
  try {
    const tables = await Table.findAll();
    res.set('Content-Range', `tables 0-${tables.length}/${tables.length}`);
    res.set('X-Total-Count', tables.length.toString());
    res.json(tables);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/tables/:id - Obtém uma mesa específica
router.get('/:id', async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id);
    if (!table) {
      return res.status(404).json({ message: 'Mesa não encontrada' });
    }
    res.json(table);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/tables - Cria uma nova mesa
router.post('/', async (req, res) => {
  try {
    const table = await Table.create(req.body);
    res.status(201).json(table);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/tables/:id - Atualiza uma mesa
router.put('/:id', async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id);
    if (!table) {
      return res.status(404).json({ message: 'Mesa não encontrada' });
    }
    await table.update(req.body);
    res.json(table);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/tables/:id - Remove uma mesa
router.delete('/:id', async (req, res) => {
  try {
    const table = await Table.findByPk(req.params.id);
    if (!table) {
      return res.status(404).json({ message: 'Mesa não encontrada' });
    }
    await table.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;