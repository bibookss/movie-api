const db = require('../config/database');

const getDirectorById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM director WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred.' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Director not found.' });
            } else {
                res.json(results[0]);
            }
        }
    });
};

const getAllDirectors = (req, res) => {   
    const query = 'SELECT * FROM director';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred.' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Director not found.' });
            } else {
                res.json(results);
            }
        }
    });
};

const getMoviesByDirector = (req, res) => {

};

module.exports = { getMoviesByDirector, getDirectorById, getAllDirectors };