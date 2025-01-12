const Reservation = require('../models/Reservation');
const Table = require('../models/Table');
const Customer = require('../models/Customer');
const Dish = require('../models/Dish');

const reservationController = {
  async create(req, res) {
    try {
      // Verificar disponibilidade da mesa
      const table = await Table.findByPk(req.body.TableId);
      if (!table || table.status !== 'available') {
        return res.status(400).json({ error: 'Table not available' });
      }

      // Criar reserva
      const reservation = await Reservation.create(req.body);

      // Atualizar status da mesa
      await table.update({ status: 'reserved' });

      // Se houver pratos selecionados, associÃ¡-los Ã  reserva
      if (req.body.dishes && req.body.dishes.length > 0) {
        await reservation.addDishes(req.body.dishes);
      }

      // Retornar reserva com relacionamentos
      const fullReservation = await Reservation.findByPk(reservation.id, {
        include: [
          { model: Customer },
          { model: Table },
          { model: Dish }
        ]
      });

      res.status(201).json(fullReservation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async findAll(req, res) {
    try {
      const reservations = await Reservation.findAll({
        include: [
          { model: Customer },
          { model: Table },
          { model: Dish }
        ]
      });
      res.json(reservations);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async findOne(req, res) {
    try {
      const reservation = await Reservation.findByPk(req.params.id, {
        include: [
          { model: Customer },
          { model: Table },
          { model: Dish }
        ]
      });
      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const reservation = await Reservation.findByPk(req.params.id);
      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }

      // Se houver mudanÃ§a de status para 'cancelled', liberar a mesa
      if (req.body.status === 'cancelled') {
        const table = await Table.findByPk(reservation.TableId);
        if (table) {
          await table.update({ status: 'available' });
        }
      }

      await reservation.update(req.body);

      // Atualizar pratos se necessÃ¡rio
      if (req.body.dishes) {
        await reservation.setDishes(req.body.dishes);
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
      res.status(400).json({ error: error.message });
    }
  },

  async cancel(req, res) {
    try {
      const reservation = await Reservation.findByPk(req.params.id);
      if (!reservation) {
        return res.status(404).json({ error: 'Reservation not found' });
      }

      // Liberar a mesa
      const table = await Table.findByPk(reservation.TableId);
      if (table) {
        await table.update({ status: 'available' });
      }

      await reservation.update({ status: 'cancelled' });
      res.json(reservation);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = reservationController;