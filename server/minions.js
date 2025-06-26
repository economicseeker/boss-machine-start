const express = require('express');
const minionsRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');

// GET /api/minions - get all minions
minionsRouter.get('/', (req, res) => {
  const minions = getAllFromDatabase('minions');
  res.send(minions);
});

// POST /api/minions - create a new minion
minionsRouter.post('/', (req, res) => {
  const newMinion = addToDatabase('minions', req.body);
  res.status(201).send(newMinion);
});

// GET /api/minions/:minionId - get a single minion by id
minionsRouter.get('/:minionId', (req, res) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (minion) {
    res.send(minion);
  } else {
    res.status(404).send();
  }
});

// PUT /api/minions/:minionId - update a single minion by id
minionsRouter.put('/:minionId', (req, res) => {
  if (req.body.id !== req.params.minionId) {
    return res.status(400).send();
  }
  const updatedMinion = updateInstanceInDatabase('minions', req.body);
  if (updatedMinion) {
    res.send(updatedMinion);
  } else {
    res.status(404).send();
  }
});

// DELETE /api/minions/:minionId - delete a single minion by id
minionsRouter.delete('/:minionId', (req, res) => {
  const deleted = deleteFromDatabasebyId('minions', req.params.minionId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = minionsRouter; 