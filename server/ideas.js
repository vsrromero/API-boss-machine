const ideasRouter = require('express').Router();

module.exports = ideasRouter;

const {
    getAllFromDatabase, 
    addToDatabase, 
    getFromDatabaseById, 
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

ideasRouter.param('ideaId', (req, res, next, id) => {
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        req.idea = idea;
        next();
    } else {
        res.status(404).send('idea ID not found');
    }
});

ideasRouter.get('/', (req, res, next) => {
    const allideas = getAllFromDatabase('ideas')
    res.send(allideas);
    });

ideasRouter.post('/', (req, res, next) => {
    const newIdea = addToDatabase('ideas', req.body);
    console.log(newIdea);
    res.status(201).send(newIdea);
});

ideasRouter.get('/:ideaId', (req, res, next) => {
    res.send(req.idea);
});

ideasRouter.put('/:ideaId', (req, res, next) => {
    const updatedIdea = updateInstanceInDatabase('ideas', req.body);
    console.log(updatedIdea)
    res.send(updatedIdea);
});

ideasRouter.delete('/:ideaId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);

    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});