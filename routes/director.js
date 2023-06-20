const express = require('express');
const router = express.Router();
const { getMoviesByDirector, getDirectorById, getAllDirectors } = require('../controllers/directorController');

// router.get('/:id/movies', getMoviesByDirector);
router.get('/:id', getDirectorById);
router.get('/', getAllDirectors);

module.exports = router;
