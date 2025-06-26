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

// BONUS: /api/minions/:minionId/work routes
const workRouter = express.Router({ mergeParams: true });

// GET all work for a minion
workRouter.get('/', (req, res) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (!minion) return res.status(404).send();
  const allWork = getAllFromDatabase('work');
  const minionWork = allWork.filter(work => work.minionId === req.params.minionId);
  res.send(minionWork);
});

// POST new work for a minion
workRouter.post('/', (req, res) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (!minion) return res.status(404).send();
  const newWork = { ...req.body, minionId: req.params.minionId };
  try {
    const created = addToDatabase('work', newWork);
    res.status(201).send(created);
  } catch (e) {
    res.status(400).send();
  }
});

// PUT update a work item for a minion
workRouter.put('/:workId', (req, res) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (!minion) return res.status(404).send();
  const allWork = getAllFromDatabase('work');
  const work = allWork.find(w => w.id === req.params.workId);
  if (!work) return res.status(404).send();
  if (req.body.minionId && req.body.minionId !== req.params.minionId) return res.status(400).send();
  const updatedWork = { ...req.body, id: req.params.workId, minionId: req.params.minionId };
  try {
    const updated = updateInstanceInDatabase('work', updatedWork);
    res.send(updated);
  } catch (e) {
    res.status(400).send();
  }
});

// DELETE a work item for a minion
workRouter.delete('/:workId', (req, res) => {
  const minion = getFromDatabaseById('minions', req.params.minionId);
  if (!minion) return res.status(404).send();
  const allWork = getAllFromDatabase('work');
  const work = allWork.find(w => w.id === req.params.workId);
  if (!work) return res.status(404).send();
  const deleted = deleteFromDatabaseById('work', req.params.workId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

minionsRouter.use('/:minionId/work', workRouter);

module.exports = minionsRouter; 