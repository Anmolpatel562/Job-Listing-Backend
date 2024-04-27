const express = require('express');
const route = express.Router();
const {registerUser, userLogIn} = require('../controllers/User');


route.post('/register',registerUser);
route.post('/login', userLogIn);

module.exports = route;