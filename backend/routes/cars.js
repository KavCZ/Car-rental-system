const express = require('express');
const router = express.Router();
const getAllCars = require("../controllers/cars/getAllCars.js");

router.get('/getAllCars', getAllCars);

module.exports = router;