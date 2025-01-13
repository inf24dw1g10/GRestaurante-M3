const { Dish } = require('../models');

const dishController = {
  async create(req, res) {
    try {
      const dish = await Dish.create(req.body);
      return res.status(201).json(dish);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const dishes = await Dish.findAll();
      return res.json(dishes);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async findOne(req, res) {
    try {
      const dish = await Dish.findByPk(req.params.id);
      if (!dish) {
        return res.status(404).json({ error: 'Dish not found' });
      }
      return res.json(dish);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const dish = await Dish.findByPk(req.params.id);
      if (!dish) {
        return res.status(404).json({ error: 'Dish not found' });
      }
      await dish.update(req.body);
      return res.json(dish);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const dish = await Dish.findByPk(req.params.id);
      if (!dish) {
        return res.status(404).json({ error: 'Dish not found' });
      }
      await dish.destroy();
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
};

module.exports = dishController;