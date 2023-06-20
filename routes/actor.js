const express = require('express');
const router = express.Router();
const { getActorById, getAllActors } = require('../controllers/actorController');

router.get('/:id', getActorById);
router.get('/', getAllActors);

module.exports = router;
