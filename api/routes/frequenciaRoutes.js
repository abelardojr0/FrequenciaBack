const express = require('express');
const router = express.Router();
const FrequenciaController = require('../controllers/frequenciaControllers');

router.post('/', FrequenciaController.create);
router.get('/', FrequenciaController.getAll);
router.get('/:id', FrequenciaController.getById);
router.put('/:id', FrequenciaController.update);
router.delete('/:id', FrequenciaController.delete);

module.exports = router;
