const express = require('express');
const ideasRouter = express.Router();
const { getAllFromDatabase, getFromDatabaseById, addToDatabase, updateInstanceInDatabase, deleteFromDatabasebyId } = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// GET /api/ideas - get all ideas
ideasRouter.get('/', (req, res) => {
  const ideas = getAllFromDatabase('ideas');
  res.send(ideas);
});

// POST /api/ideas - create a new idea
ideasRouter.post('/', checkMillionDollarIdea, (req, res) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

// GET /api/ideas/:ideaId - get a single idea by id
ideasRouter.param('ideaId', (req, res, next, id) => {
  const idea = getFromDatabaseById('ideas', id);
  if (!idea) {
    return res.status(404).send();
  }
  req.idea = idea;
  next();
});

ideasRouter.get('/:ideaId', (req, res) => {
  res.send(req.idea);
});

// PUT /api/ideas/:ideaId - update a single idea by id
ideasRouter.put('/:ideaId', checkMillionDollarIdea, (req, res) => {
  if (req.body.id !== req.params.ideaId) {
    return res.status(400).send();
  }
  const updatedIdea = updateInstanceInDatabase('ideas', req.body);
  if (updatedIdea) {
    res.send(updatedIdea);
  } else {
    res.status(404).send();
  }
});

// DELETE /api/ideas/:ideaId - delete a single idea by id
ideasRouter.delete('/:ideaId', (req, res) => {
  const deleted = deleteFromDatabasebyId('ideas', req.params.ideaId);
  if (deleted) {
    res.status(204).send();
  } else {
    res.status(404).send();
  }
});

module.exports = ideasRouter; 