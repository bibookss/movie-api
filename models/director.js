const serializeDirector = (director) => {
    return {
        id: director.id,
        name: director.name,
    };
};

module.exports = { serializeDirector };