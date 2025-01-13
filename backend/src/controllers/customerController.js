// src/controllers/customerController.js
const { Customer } = require('../models');

exports.getAll = async (req, res) => {
  try {
    // Busca todos os clientes
    const customers = await Customer.findAll({
      order: [['id', 'ASC']]
    });
    
    // Certifica-se de que temos um array plano de objetos
    const data = customers.map(customer => ({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone
    }));

    // Define os cabeçalhos necessários para o React Admin
    res.set({
      'Access-Control-Expose-Headers': 'X-Total-Count, Content-Range',
      'X-Total-Count': data.length.toString(),
      'Content-Range': `customers 0-${data.length}/${data.length}`
    });

    // Retorna os dados como array
    res.json(data);
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    res.json({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.create = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);
    res.status(201).json({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.update = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    await customer.update(req.body);
    res.json({
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const customer = await Customer.findByPk(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Cliente não encontrado' });
    }
    await customer.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};