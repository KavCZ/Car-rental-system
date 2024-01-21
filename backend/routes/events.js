const express = require('express');
const router = express.Router();
const getAllEvents = require("../controllers/events/getAllEvents.js");
const getEventById = require("../controllers/events/getEventById.js");

router.get('/getAllEvents', getAllEvents);
router.get('/getEventById/:event_id', getEventById);

module.exports = router;