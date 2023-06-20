const db = require('../config/database');
const { serializeActor } = require('../models/actor');

const getActorById = (req, res) => {
    const id = req.params.id;
    const query = `
        SELECT
            actor.*,
            GROUP_CONCAT(DISTINCT movie.name) AS movies
        FROM
            actor
            LEFT JOIN movie_actor_through ON actor.id = movie_actor_through.actor_id
            LEFT JOIN movie ON movie.id = movie_actor_through.movie_id
        WHERE
            actor.id = ?
        GROUP BY
            actor.id
        `;
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred.' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Actor not found.' });
            } else {
                res.json({
                    'status': 'success',
                    'data': serializeActor(results[0])
                });
            }
        }
    });
};

const getAllActors = (req, res) => {   
    let { page, pageSize } = req.query;

    // Set default values if page or pageSize are not provided or invalid
    page = page ? parseInt(page) : 1;
    pageSize = pageSize ? parseInt(pageSize) : 10;

    const offset = (page - 1) * pageSize;
	const queryParams = [offset, parseInt(pageSize)];

    const query = `
        SELECT
            actor.*,
            GROUP_CONCAT(DISTINCT movie.name) AS movies
        FROM
            actor
            LEFT JOIN movie_actor_through ON actor.id = movie_actor_through.actor_id
            LEFT JOIN movie ON movie.id = movie_actor_through.movie_id
        GROUP BY
            actor.id
        LIMIT ?, ?
    `;

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred.' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Actor not found.' });
            } else {
                const serializedActors = results.map(serializeActor);
                res.json({
                    'status': 'success',
                    'data': serializedActors
                });
            }
        }
    });
};


module.exports = { getActorById, getAllActors };