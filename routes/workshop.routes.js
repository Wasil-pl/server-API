const express = require('express');
const router = express.Router();

const WorkshopsController = require('../controllers/workshop.controller');

router.get('/workshop', WorkshopsController.getAll);
router.get('/workshop/random', WorkshopsController.getRandom);
router.get('/workshop/:id', WorkshopsController.getById);
router.post('/workshop', WorkshopsController.addNew);
router.put('/workshop/:id', WorkshopsController.update);
router.delete('/workshop/:id', WorkshopsController.delete);

module.exports = router;
