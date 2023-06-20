const serializeGenre = (genre) => {
    return {
        id: genre.id,
        name: genre.name,
    };
};

module.exports = { serializeGenre };