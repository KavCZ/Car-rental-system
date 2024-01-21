const express = require('express');
const router = express.Router();
const getAllCars = require("../controllers/cars/getAllCars.js");
const getCarById = require("../controllers/cars/getCarbyId.js");

router.get('/getAllCars', getAllCars);
router.get('/getCarById/:car_id', getCarById);

module.exports = router;