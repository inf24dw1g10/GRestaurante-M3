// src/controllers/reservationController.js
const { Reservation, Customer, Table, Dish, ReservationDishes } = require('../models');

exports.create = async (req, res) => {
  try {
    const { customerId, tableId, date, numberOfGuests, status, dishes } = req.body;

    // Validações
    if (!customerId) {
      return res.status(400).json({ message: 'Cliente é obrigatório' });
    }

    if (!tableId) {
      return res.status(400).json({ message: 'Mesa é obrigatória' });
    }

    // Verifica se o cliente existe
    const customer = await Customer.findByPk(customerId);
    if (!customer) {
      return res.status(400).json({ message: 'Cliente não encontrado' });
    }

    // Verifica se a mesa existe e está disponível
    const table = await Table.findByPk(tableId);
    if (!table) {
      return res.status(400).json({ message: 'Mesa não encontrada' });
    }
    if (table.status !== 'available') {
      return res.status(400).json({ message: 'Mesa não está disponível' });
    }

    // Cria a reserva com todos os campos necessários
    const reservation = await Reservation.create({
      customerId: parseInt(customerId),
      tableId: parseInt(tableId),
      date: new Date(date),
      numberOfGuests: parseInt(numberOfGuests),
      status: status || 'pending'
    });

    // Adiciona os pratos se houver
    if (dishes && Array.isArray(dishes)) {
      await Promise.all(dishes.map(dish => 
        ReservationDishes.create({
          reservationId: reservation.id,
          dishId: dish.id,
          quantity: parseInt(dish.quantity) || 1,
          notes: dish.notes || ''
        })
      ));
    }

    // Atualiza o status da mesa
    await table.update({ status: 'reserved' });

    // Busca a reserva completa com relacionamentos
    const completeReservation = await Reservation.findByPk(reservation.id, {
      include: [
        { 
          model: Customer,
          attributes: ['id', 'name', 'email', 'phone']
        },
        { 
          model: Table,
          attributes: ['id', 'number', 'capacity', 'status']
        },
        { 
          model: Dish,
          through: {
            attributes: ['quantity', 'notes']
          }
        }
      ]
    });

    res.status(201).json(completeReservation);
  } catch (error) {
    console.error('Erro ao criar reserva:', error);
    res.status(400).json({ 
      message: 'Erro ao criar reserva',
      error: error.message 
    });
  }
};