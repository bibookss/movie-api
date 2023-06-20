const express = require('express');
const router = express.Router();
const { getDirectorById, getAllDirectors } = require('../controllers/directorController');

router.get('/:id', getDirectorById);
router.get('/', getAllDirectors);

module.exports = router;
