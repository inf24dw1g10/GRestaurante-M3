const express = require('express');
const router = express.Router();
const tableController = require('../controllers/tableController');

router.post('/', tableController.create);
router.get('/', tableController.findAll);
router.get('/available', tableController.findAvailable);
router.put('/:id', tableController.update);

module.exports = router;
