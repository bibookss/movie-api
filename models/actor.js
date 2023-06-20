const serializeActor = (actor) => {
    return {
        id: actor.id,
        name: actor.name,
    };
};

module.exports = { serializeActor };
