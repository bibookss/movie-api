const db = require('../config/database');

exports.getMovieById = (req, res) => {
	const id = req.params.id;

	db.query('SELECT * FROM movie WHERE id = ?', [id], (err, results) => {
		if (err) {
			console.error('Error executing query:', err);
			res.status(500).json({ error: 'An error occurred.' });
		} else {
			if (results.length === 0) {
				res.status(404).json({ error: 'Movie not found.' });
			} else {
				res.json(results[0]);
			}
		}
	});
};

exports.getAllMovies = (req, res) => {	
	db.query('SELECT * FROM movie', (err, results) => {
		if (err) {
			console.error('Error executing query:', err);
			res.status(500).json({ error: 'An error occurred.' });
		} else {
			if (results.length === 0) {
				res.status(404).json({ error: 'Movie not found.' });
			} else {
				res.json(results);
			}
		}
	});
};

