const serializeActor = (actor) => {
    return {
        id: actor.id,
        name: actor.name,
        movies: actor.movies.split(',')
    };
};

module.exports = { serializeActor };
