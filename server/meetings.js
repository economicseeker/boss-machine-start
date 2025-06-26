const express = require('express');
const meetingsRouter = express.Router();
const { getAllFromDatabase, addToDatabase, deleteAllFromDatabase, createMeeting } = require('./db');

// GET /api/meetings - get all meetings
meetingsRouter.get('/', (req, res) => {
  const meetings = getAllFromDatabase('meetings');
  res.send(meetings);
});

// POST /api/meetings - create a new meeting
meetingsRouter.post('/', (req, res) => {
  const newMeeting = addToDatabase('meetings', createMeeting());
  res.status(201).send(newMeeting);
});

// DELETE /api/meetings - delete all meetings
meetingsRouter.delete('/', (req, res) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
});

module.exports = meetingsRouter; 