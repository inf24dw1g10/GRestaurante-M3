const { Table } = require('../models');

const tableController = {
  async create(req, res) {
    try {
      const table = await Table.create(req.body);
      return res.status(201).json(table);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const tables = await Table.findAll();
      return res.json(tables);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async findAvailable(req, res) {
    try {
      const availableTables = await Table.findAll({
        where: { status: 'available' }
      });
      return res.json(availableTables);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async findOne(req, res) {
    try {
      const table = await Table.findByPk(req.params.id);
      if (!table) {
        return res.status(404).json({ error: 'Table not found' });
      }
      return res.json(table);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const table = await Table.findByPk(req.params.id);
      if (!table) {
        return res.status(404).json({ error: 'Table not found' });
      }
      await table.update(req.body);
      return res.json(table);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
};

module.exports = tableController;