const db = require('../config/database');

const getActorById = (req, res) => {
    const id = req.params.id;
    const query = 'SELECT * FROM actor WHERE id = ?';

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred.' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Actor not found.' });
            } else {
                res.json(results[0]);
            }
        }
    });
};

const getAllActors = (req, res) => {   
    const query = 'SELECT * FROM actor';

    db.query(query, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred.' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Actor not found.' });
            } else {
                res.json(results);
            }
        }
    });
};

const getMovieByActor = (req, res) => {
}; 

module.exports = { getMovieByActor, getActorById, getAllActors };