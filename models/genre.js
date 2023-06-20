const serializeGenre = (genre) => {
    return {
        id: genre.id,
        name: genre.name,
        movies: genre.movies.split(',')
    };
};

module.exports = { serializeGenre };