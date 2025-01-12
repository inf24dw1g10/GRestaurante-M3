const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');

router.post('/', dishController.create);
router.get('/', dishController.findAll);
router.get('/:id', dishController.findOne);
router.put('/:id', dishController.update);
router.delete('/:id', dishController.delete);

module.exports = router;