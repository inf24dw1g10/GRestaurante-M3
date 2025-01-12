const Dish = require('../models/Dish');

const dishController = {
  async create(req, res) {
    try {
      const dish = await Dish.create(req.body);
      res.status(201).json(dish);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const dishes = await Dish.findAll();
      res.json(dishes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findOne(req, res) {
    try {
      const dish = await Dish.findByPk(req.params.id);
      if (!dish) {
        return res.status(404).json({ error: 'Dish not found' });
      }
      res.json(dish);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const dish = await Dish.findByPk(req.params.id);
      if (!dish) {
        return res.status(404).json({ error: 'Dish not found' });
      }
      await dish.update(req.body);
      res.json(dish);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      const dish = await Dish.findByPk(req.params.id);
      if (!dish) {
        return res.status(404).json({ error: 'Dish not found' });
      }
      await dish.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = dishController;
