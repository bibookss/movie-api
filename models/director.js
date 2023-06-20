const serializeDirector = (director) => {
    return {
        id: director.id,
        name: director.name,
        movies: director.movies.split(','),
    };
};

module.exports = { serializeDirector };