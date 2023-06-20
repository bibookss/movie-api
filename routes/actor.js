const express = require('express');
const router = express.Router();
const { getActorById, getAllActors, getMovieByActor } = require('../controllers/actorController');

// router.get('/:id/movies', getMoviesByActor);
router.get('/:id', getActorById);
router.get('/', getAllActors);

module.exports = router;
