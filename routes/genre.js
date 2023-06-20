const express = require('express');
const router = express.Router();
const { getMoviesByGenre, getGenreById, getAllGenres } = require('../controllers/genreController');

// router.get('/:id/movies', getMoviesByGenre);
router.get('/:id', getGenreById);
router.get('/', getAllGenres);

module.exports = router;
