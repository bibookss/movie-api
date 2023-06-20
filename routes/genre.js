const express = require('express');
const router = express.Router();
const { getGenreById, getAllGenres } = require('../controllers/genreController');

router.get('/:id', getGenreById);
router.get('/', getAllGenres);

module.exports = router;
