const express = require('express');
const router = express.Router();

const movieRoutes = require('./movie');
const directorRoutes = require('./director');
const actorRoutes = require('./actor');
const genreRoutes = require('./genre');
const errorRoutes = require('./error');

router.use('/movies', movieRoutes);
router.use('/directors', directorRoutes);
router.use('/actors', actorRoutes);
router.use('/genres', genreRoutes);
router.use(errorRoutes);
module.exports = router;
