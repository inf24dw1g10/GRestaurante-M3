const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.post('/', reservationController.create);
router.get('/', reservationController.findAll);
router.get('/:id', reservationController.findOne);
router.put('/:id', reservationController.update);
router.post('/:id/cancel', reservationController.cancel);

module.exports = router;
