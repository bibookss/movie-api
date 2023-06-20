const db = require('../config/database');

const getGenreById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM genre WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred.' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Genre not found.' });
            } else {
                res.json(results[0]);
            }
        }
    });
};

const getAllGenres = (req, res) => {   
    const query = 'SELECT * FROM genre';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred.' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Genre not found.' });
            } else {
                res.json(results);
            }
        }
    });
};

const getMoviesByGenre = (req, res) => {
	
};

module.exports = { getMoviesByGenre, getGenreById, getAllGenres };