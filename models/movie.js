const serializeMovie = (movie) => {
    if (movie.genres !== null) {
        genres = movie.genres.split(',');
    } else {
        genres = [];
    }

    if (movie.directors !== null) {
        directors = movie.directors.split(',');
    } else {
        directors = [];
    }

    if (movie.actors !== null) {
        actors = movie.actors.split(',');
    } else {
        actors = [];
    }

    return {
        id: movie.id,
        title: movie.name,
        description: movie.description,
        genres: genres,
        certification: movie.certification,
        release: movie.release,
        runtime: movie.duration + ' minutes',
        directors: directors,
        actors: actors
    };
};

module.exports = { serializeMovie };