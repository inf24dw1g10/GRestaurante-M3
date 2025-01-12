const Customer = require('../models/Customer');

const customerController = {
  async create(req, res) {
    try {
      const customer = await Customer.create(req.body);
      res.status(201).json(customer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const customers = await Customer.findAll();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findOne(req, res) {
    try {
      const customer = await Customer.findByPk(req.params.id);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      res.json(customer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const customer = await Customer.findByPk(req.params.id);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      await customer.update(req.body);
      res.json(customer);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const customer = await Customer.findByPk(req.params.id);
      if (!customer) {
        return res.status(404).json({ error: 'Customer not found' });
      }
      await customer.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = customerController;
