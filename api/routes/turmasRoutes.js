const express = require('express');
const router = express.Router();
const TurmaController = require('../controllers/turmasController');

router.post('/', TurmaController.create);
router.get('/', TurmaController.getAll);
router.get('/:id', TurmaController.getById);
router.put('/:id', TurmaController.update);
router.delete('/:id', TurmaController.delete);

module.exports = router;
