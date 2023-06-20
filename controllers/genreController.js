const db = require('../config/database');
const { serializeGenre } = require('../models/genre');

const getGenreById = (req, res) => {
    const id = req.params.id;
    const query = `
        SELECT 
            genre.*,
            GROUP_CONCAT(DISTINCT movie.name) AS movies
        FROM
            genre
            LEFT JOIN movie_genre_through ON genre.id = movie_genre_through.genre_id
            LEFT JOIN movie ON movie.id = movie_genre_through.movie_id
        WHERE
            genre.id = ?
        GROUP BY
            genre.id
    `;


    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred.' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Genre not found.' });
            } else {
                res.json({
                    'status': 'success',
                    'data': serializeGenre(results[0])
                });
            }
        }
    });
};

const getAllGenres = (req, res) => {   
    let { page, pageSize } = req.query;

	// Set default values if page or pageSize are not provided or invalid
	page = page ? parseInt(page) : 1;
	pageSize = pageSize ? parseInt(pageSize) : 10;

	const offset = (page - 1) * pageSize;
	const queryParams = [offset, parseInt(pageSize)];

    const query = `
        SELECT 
            genre.*,
            GROUP_CONCAT(DISTINCT movie.name) AS movies
        FROM
            genre
            LEFT JOIN movie_genre_through ON genre.id = movie_genre_through.genre_id
            LEFT JOIN movie ON movie.id = movie_genre_through.movie_id
        GROUP BY
            genre.id
        LIMIT ?, ?
    `;

    db.query(query, queryParams, (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'An error occurred.' });
        } else {
            if (results.length === 0) {
                res.status(404).json({ error: 'Genre not found.' });
            } else {
                const serializedResults = results.map(serializeGenre);
                res.json({
                    'status': 'success',
                    'data': serializedResults
                });
            }
        }
    });
};

const getMoviesByGenre = (req, res) => {
	
};

module.exports = { getMoviesByGenre, getGenreById, getAllGenres };