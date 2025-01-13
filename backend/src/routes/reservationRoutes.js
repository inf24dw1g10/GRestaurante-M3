// src/routes/reservationRoutes.js
const express = require('express');
const router = express.Router();
const { Reservation, Customer, Table, Dish, ReservationDishes } = require('../models');

// GET - Lista todas as reservas
router.get('/', async (req, res) => {
  try {
    const reservations = await Reservation.findAll({
      include: [
        { model: Customer },
        { model: Table }
      ]
    });
    const data = reservations.map(reservation => reservation.toJSON());
    res.setHeader('Content-Range', `reservations 0-${data.length}/${data.length}`);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// GET - Obtém uma reserva específica
router.get('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id, {
      include: [
        { model: Customer },
        { model: Table },
        { model: Dish }
      ]
    });
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST - Cria uma nova reserva
router.post('/', async (req, res) => {
  try {
    const { customerId, tableId, date, numberOfGuests, status, dishes } = req.body;

    // Cria a reserva
    const reservation = await Reservation.create({
      customerId,
      tableId,
      date,
      numberOfGuests,
      status: status || 'pending'
    });

    // Adiciona os pratos se existirem
    if (dishes && Array.isArray(dishes)) {
      await Promise.all(dishes.map(dish => 
        ReservationDishes.create({
          reservationId: reservation.id,
          dishId: dish.id,
          quantity: dish.quantity,
          notes: dish.notes
        })
      ));
    }

    // Atualiza o status da mesa
    await Table.update(
      { status: 'reserved' },
      { where: { id: tableId } }
    );

    // Retorna a reserva completa
    const completeReservation = await Reservation.findByPk(reservation.id, {
      include: [
        { model: Customer },
        { model: Table },
        { model: Dish }
      ]
    });

    res.status(201).json(completeReservation);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// PUT - Atualiza uma reserva
router.put('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }

    // Se estiver mudando o status para cancelado, libera a mesa
    if (req.body.status === 'cancelled' && reservation.status !== 'cancelled') {
      await Table.update(
        { status: 'available' },
        { where: { id: reservation.tableId } }
      );
    }

    await reservation.update(req.body);

    // Atualiza os pratos se necessário
    if (req.body.dishes && Array.isArray(req.body.dishes)) {
      // Remove os pratos antigos
      await ReservationDishes.destroy({
        where: { reservationId: reservation.id }
      });

      // Adiciona os novos pratos
      await Promise.all(req.body.dishes.map(dish => 
        ReservationDishes.create({
          reservationId: reservation.id,
          dishId: dish.id,
          quantity: dish.quantity,
          notes: dish.notes
        })
      ));
    }

    const updatedReservation = await Reservation.findByPk(reservation.id, {
      include: [
        { model: Customer },
        { model: Table },
        { model: Dish }
      ]
    });

    res.json(updatedReservation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE - Remove uma reserva
router.delete('/:id', async (req, res) => {
  try {
    const reservation = await Reservation.findByPk(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva não encontrada' });
    }

    // Libera a mesa
    await Table.update(
      { status: 'available' },
      { where: { id: reservation.tableId } }
    );

    // Remove a reserva
    await reservation.destroy();

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;