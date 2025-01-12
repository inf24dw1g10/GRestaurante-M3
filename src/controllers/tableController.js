const Table = require('../models/Table');

const tableController = {
  async create(req, res) {
    try {
      const table = await Table.create(req.body);
      res.status(201).json(table);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const tables = await Table.findAll();
      res.json(tables);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findAvailable(req, res) {
    try {
      const tables = await Table.findAll({
        where: { status: 'available' }
      });
      res.json(tables);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const table = await Table.findByPk(req.params.id);
      if (!table) {
        return res.status(404).json({ error: 'Table not found' });
      }
      await table.update(req.body);
      res.json(table);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = tableController;