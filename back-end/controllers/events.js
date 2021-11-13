const {request} = require('./axios');
const { Events } = require('../models/Event')
const { Users } = require('../models/User')
const mongoose = require('mongoose')
const {EVENTS: fakeEventsData} = require('../mock-data/events');
const generateRandomInt = require('../utils/generate-random-int')

const acceptPending = (req, res) =>
  request()
    .post('/events.json')
    .then((data) => {
      res
        .status(200)
        .json({message: 'accepted', event: {...data, id: req.body.id}});
    })
    .catch((e) => {
      console.error(e);
      res.status(200).json({
        message: 'accepted',
        event: {
          ...fakeEventsData[0],
          id: req.body.id,
        },
      });
    });

const declinePending = (req, res) =>
  request()
    .post('/events.json')
    .then((data) => {
      res
        .status(200)
        .json({message: 'declined', event: {...data, id: req.body.id}});
    })
    .catch((e) => {
      console.error(e);
      res.status(200).json({
        message: 'declined',
        event: {
          ...fakeEventsData[0],
          id: req.body.id,
        },
      });
    });

const getPendingEvents = async (_, res) => {
  const pendingEvents = []
  }

const getAllEvents = async (_, res) => {
    const ID = generateRandomInt(0, 100)
    Events.findOne({chatId: ID}, function(err, foundEvents) {
      if (err) res.send(err);
      else {
        res.send(foundEvents)
      }
    })
  }

const createEvent = async (req, res) => {
  // data from form
  const {name, date, time, location, description} = req.body;

  res.status(200).json({
    name,
    date,
    time,
    location,
    description,
  });
};

module.exports = {
  acceptPending,
  declinePending,
  getPendingEvents,
  createEvent,
  getAllEvents,
};
