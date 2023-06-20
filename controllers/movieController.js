const db = require('../config/database');
const { serializeMovie } = require('../models/movie');

exports.getMovieById = (req, res) => {
	const id = req.params.id;
	const query = `
    SELECT
      movie.*,
      GROUP_CONCAT(DISTINCT genre.name) AS genres,
      GROUP_CONCAT(DISTINCT director.name) AS directors,
      GROUP_CONCAT(DISTINCT actor.name) AS actors
    FROM
      movie
      LEFT JOIN movie_genre_through ON movie.id = movie_genre_through.movie_id
      LEFT JOIN genre ON genre.id = movie_genre_through.genre_id
      LEFT JOIN movie_director_through ON movie.id = movie_director_through.movie_id
      LEFT JOIN director ON director.id = movie_director_through.director_id
      LEFT JOIN movie_actor_through ON movie.id = movie_actor_through.movie_id
      LEFT JOIN actor ON actor.id = movie_actor_through.actor_id
    WHERE
      movie.id = ?
    GROUP BY
      movie.id
  `;
	db.query(query, [id], (err, results) => {
		if (err) {
			console.error('Error executing query:', err);
			res.status(500).json({ error: 'An error occurred.' });
		} else {
			if (results.length === 0) {
				res.status(404).json({ error: 'Movie not found.' });
			} else {
				res.json({
					'status': 'success',
					'data':serializeMovie(results[0])
				});
			}
		}
	});
};

exports.getAllMovies = (req, res) => {	
	let { page, pageSize } = req.query;
	
	// Set default values if page or pageSize are not provided or invalid
	page = page ? parseInt(page) : 1;
	pageSize = pageSize ? parseInt(pageSize) : 10;

	const offset = (page - 1) * pageSize;
	const queryParams = [offset, parseInt(pageSize)];

	const query = `
    SELECT
      movie.*,
      GROUP_CONCAT(DISTINCT genre.name) AS genres,
      GROUP_CONCAT(DISTINCT director.name) AS directors,
      GROUP_CONCAT(DISTINCT actor.name) AS actors
    FROM
      movie
      LEFT JOIN movie_genre_through ON movie.id = movie_genre_through.movie_id
      LEFT JOIN genre ON genre.id = movie_genre_through.genre_id
      LEFT JOIN movie_director_through ON movie.id = movie_director_through.movie_id
      LEFT JOIN director ON director.id = movie_director_through.director_id
      LEFT JOIN movie_actor_through ON movie.id = movie_actor_through.movie_id
      LEFT JOIN actor ON actor.id = movie_actor_through.actor_id
    GROUP BY
      movie.id
	LIMIT ?, ?
  `;

	db.query(query, queryParams, (err, results) => {
		if (err) {
			console.error('Error executing query:', err);
			res.status(500).json({ error: 'An error occurred.' });
		} else {
			if (results.length === 0) {
				res.status(404).json({ error: 'Movie not found.' });
			} else {
				const serializedMovies = results.map(serializeMovie);
				res.json({
					status: 'success',
					data: serializedMovies
				});
			}
		}
	});
};

