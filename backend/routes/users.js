const express = require('express');
const router = express.Router();
const registerUser = require("../controllers/users/registerUser.js");
const loginUser = require("../controllers/users/loginUser.js");
const getAllUsers = require("../controllers/users/getAllUsers.js");
const getUserById = require("../controllers/users/getUserbyId.js");

router.post('/registerUser' , registerUser);
router.post('/loginUser' , loginUser);
router.get('/getAllUsers' , getAllUsers);
router.get('/getUserById/:user_id', getUserById);

module.exports = router;
 