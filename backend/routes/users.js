const express = require('express');
const router = express.Router();
const register = require("../controllers/users/register.js");
const login = require("../controllers/users/login.js");
const getAllUsers = require("../controllers/users/getAllUsers.js");
const getUserById = require("../controllers/users/getUserbyId.js");

router.post('/register' , register);
router.post('/login' , login);
router.get('/getAllUsers' , getAllUsers);
router.get('/getUserById/:user_id', getUserById);

module.exports = router;
 