const minionsRouter = require('express').Router();

module.exports = minionsRouter;

const {
    getAllFromDatabase, 
    addToDatabase, 
    getFromDatabaseById, 
    updateInstanceInDatabase,
    deleteFromDatabasebyId
} = require('./db');

minionsRouter.param('minionId', (req, res, next, id) => {
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        req.minion = minion;
        next();
    } else {
        res.status(404).send('Minion ID not found');
    }
});

minionsRouter.get('/', (req, res, next) => {
    const allMinions = getAllFromDatabase('minions')
    res.send(allMinions);
    });

minionsRouter.post('/', (req, res, next) => {
    const newMinion = addToDatabase('minions', req.body);
    console.log(newMinion);
    res.status(201).send(newMinion);
});

minionsRouter.get('/:minionId', (req, res, next) => {
    res.send(req.minion);
});

minionsRouter.put('/:minionId', (req, res, next) => {
    const updatedMinion = updateInstanceInDatabase('minions', req.body);
    console.log(updatedMinion)
    res.send(updatedMinion);
});

minionsRouter.delete('/:minionId', (req, res, next) => {
    const deleted = deleteFromDatabasebyId('minions', req.params.minionId);

    if (deleted) {
        res.status(204);
    } else {
        res.status(500);
    }
    res.send();
});