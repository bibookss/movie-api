const db = require('../config/database');
const { serializeDirector } = require('../models/director');

const getDirectorById = (req, res) => {
    const id = req.params.id;
    const query = `
        SELECT
            director.*,
            GROUP_CONCAT(DISTINCT movie.name) AS movies
        FROM
        director
            LEFT JOIN movie_director_through ON director.id = movie_director_through.director_id
            LEFT JOIN movie ON movie.id = movie_director_through.movie_id
        WHERE
            director.id = ?
        GROUP BY
            director.id
        `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred.' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Director not found.' });
            } else {
                res.json({
                    'status': 'success',
                    'data': serializeDirector(results[0])
                });
            }
        }
    });
};

const getAllDirectors = (req, res) => {   
    let { page, pageSize } = req.query;

	// Set default values if page or pageSize are not provided or invalid
	page = page ? parseInt(page) : 1;
	pageSize = pageSize ? parseInt(pageSize) : 10;

	const offset = (page - 1) * pageSize;
	const queryParams = [offset, parseInt(pageSize)];

    const query = `
        SELECT
            director.*,
            GROUP_CONCAT(DISTINCT movie.name) AS movies
        FROM
            director
            LEFT JOIN movie_director_through ON director.id = movie_director_through.director_id
            LEFT JOIN movie ON movie.id = movie_director_through.movie_id
        GROUP BY
            director.id
        LIMIT ?, ?
        `;

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred.' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Director not found.' });
            } else {
                const serializedDirectors = results.map(serializeDirector);
                res.json({
                    'status': 'success',
                    'data': serializedDirectors
                });
            }
        }
    });
};

module.exports = { getDirectorById, getAllDirectors };